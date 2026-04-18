#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${PORT:-8090}"
HOST="${HOST:-127.0.0.1}"
PHP_BIN="${PHP_BIN:-php}"
RUNTIME_DIR="${TMPDIR:-/tmp}muoviotukset-tailscale"
PID_FILE="${RUNTIME_DIR}/php-server.pid"
LOG_FILE="${RUNTIME_DIR}/php-server.log"

mkdir -p "${RUNTIME_DIR}"

find_tailscale() {
  if command -v tailscale >/dev/null 2>&1; then
    command -v tailscale
    return 0
  fi

  if [ -x /Applications/Tailscale.app/Contents/MacOS/Tailscale ]; then
    printf '%s\n' /Applications/Tailscale.app/Contents/MacOS/Tailscale
    return 0
  fi

  return 1
}

TAILSCALE_BIN="$(find_tailscale || true)"

require_tailscale() {
  if [ -z "${TAILSCALE_BIN}" ]; then
    printf 'Could not find the Tailscale CLI. Add `tailscale` to PATH or install the macOS app.\n' >&2
    exit 1
  fi
}

php_server_running() {
  if [ ! -f "${PID_FILE}" ]; then
    return 1
  fi

  local pid
  pid="$(cat "${PID_FILE}")"

  if [ -z "${pid}" ] || ! kill -0 "${pid}" >/dev/null 2>&1; then
    rm -f "${PID_FILE}"
    return 1
  fi

  return 0
}

current_funnel_info() {
  require_tailscale

  local status_json
  status_json="$("${TAILSCALE_BIN}" funnel status --json 2>/dev/null || true)"

  if [ -z "${status_json}" ]; then
    return 1
  fi

  STATUS_JSON="${status_json}" python3 - <<'PY'
import json
import os
import sys

raw = os.environ.get("STATUS_JSON", "")
if not raw.strip():
    sys.exit(1)

data = json.loads(raw)
web = data.get("Web") or {}
allow = data.get("AllowFunnel") or {}

for hostport, entry in web.items():
    if not allow.get(hostport):
        continue

    handlers = entry.get("Handlers") or {}
    root = handlers.get("/") or {}
    proxy = root.get("Proxy", "")
    host = hostport.split(":", 1)[0]
    print(f"https://{host}\t{proxy}")
    sys.exit(0)

sys.exit(1)
PY
}

current_funnel_url() {
  local info
  info="$(current_funnel_info || true)"

  if [ -z "${info}" ]; then
    return 1
  fi

  printf '%s\n' "${info%%$'\t'*}"
}

current_funnel_proxy() {
  local info
  info="$(current_funnel_info || true)"

  if [ -z "${info}" ] || [ "${info}" = "${info%%$'\t'*}" ]; then
    return 1
  fi

  printf '%s\n' "${info#*$'\t'}"
}

funnel_matches_app_port() {
  local proxy expected_a expected_b
  proxy="$(current_funnel_proxy || true)"
  expected_a="http://${HOST}:${PORT}"
  expected_b="http://localhost:${PORT}"

  [ "${proxy}" = "${expected_a}" ] || [ "${proxy}" = "${expected_b}" ]
}

start_php() {
  if php_server_running; then
    printf 'PHP server already running at http://%s:%s (pid %s)\n' "${HOST}" "${PORT}" "$(cat "${PID_FILE}")"
    return 0
  fi

  (
    cd "${ROOT}"
    nohup env APP_BASE_URL="${APP_BASE_URL:-http://${HOST}:${PORT}}" \
      "${PHP_BIN}" -S "${HOST}:${PORT}" index.php >>"${LOG_FILE}" 2>&1 &
    echo $! >"${PID_FILE}"
  )

  sleep 1

  if ! php_server_running; then
    printf 'PHP server failed to start. Check %s\n' "${LOG_FILE}" >&2
    exit 1
  fi
}

start_funnel() {
  require_tailscale
  "${TAILSCALE_BIN}" funnel --bg --yes "http://${HOST}:${PORT}" >/dev/null
}

stop_php() {
  if ! php_server_running; then
    printf 'PHP server is not running.\n'
    return 0
  fi

  local pid
  pid="$(cat "${PID_FILE}")"
  kill "${pid}" >/dev/null 2>&1 || true
  rm -f "${PID_FILE}"
  printf 'Stopped PHP server (pid %s).\n' "${pid}"
}

stop_funnel() {
  require_tailscale
  "${TAILSCALE_BIN}" funnel reset >/dev/null
  printf 'Reset Tailscale Funnel config on this node.\n'
}

print_status() {
  local php_state="stopped"
  local php_pid=""
  local funnel_url=""
  local funnel_proxy=""

  if php_server_running; then
    php_state="running"
    php_pid="$(cat "${PID_FILE}")"
  fi

  funnel_url="$(current_funnel_url || true)"
  funnel_proxy="$(current_funnel_proxy || true)"

  printf 'PHP server: %s' "${php_state}"
  if [ -n "${php_pid}" ]; then
    printf ' (pid %s)' "${php_pid}"
  fi
  printf '\n'
  printf 'Local URL: http://%s:%s\n' "${HOST}" "${PORT}"

  if [ -n "${funnel_url}" ]; then
    printf 'Public URL: %s\n' "${funnel_url}"
    printf 'Funnel target: %s\n' "${funnel_proxy:-unknown}"
    if funnel_matches_app_port; then
      printf 'Funnel status: pointing at this app\n'
    else
      printf 'Funnel status: pointing somewhere else on this node\n'
    fi
  else
    printf 'Public URL: not configured\n'
  fi

  printf 'Log file: %s\n' "${LOG_FILE}"
}

regenerate_qr() {
  local funnel_url
  funnel_url="$(current_funnel_url || true)"

  if [ -z "${funnel_url}" ]; then
    printf 'No Tailscale Funnel URL found. Run `%s start` first.\n' "$(basename "$0")" >&2
    exit 1
  fi

  if ! funnel_matches_app_port; then
    printf 'The current Funnel URL is not pointing at this app port (%s). Run `%s start` first.\n' "${PORT}" "$(basename "$0")" >&2
    exit 1
  fi

  (
    cd "${ROOT}"
    TAILSCALE_BASE_URL="${funnel_url}" "${PHP_BIN}" bin/generate-qr.php
  )

  printf 'QR bundles regenerated. Tailscale bundle uses %s\n' "${funnel_url}"
}

start_all() {
  start_php
  start_funnel

  local funnel_url
  funnel_url="$(current_funnel_url || true)"

  printf 'Local server is running at http://%s:%s\n' "${HOST}" "${PORT}"
  if [ -n "${funnel_url}" ]; then
    printf 'Externally available at %s\n' "${funnel_url}"
    printf 'For full QR-flow testing, regenerate QR assets with `%s qr` so the codes match the same origin.\n' "$(basename "$0")"
  else
    printf 'Funnel started, but the public URL could not be detected. Run `%s status`.\n' "$(basename "$0")"
  fi
}

usage() {
  cat <<EOF
Usage: $(basename "$0") <start|status|stop|qr>

Commands:
  start   Start the PHP dev server and publish it via Tailscale Funnel
  status  Show local server and Funnel status
  stop    Stop the PHP dev server and reset Funnel on this node
  qr      Regenerate printable QR files using the current Funnel URL as APP_BASE_URL

Environment overrides:
  PORT     Local PHP port (default: 8090)
  HOST     Local PHP host (default: 127.0.0.1)
  PHP_BIN  PHP binary (default: php)
EOF
}

case "${1:-}" in
  start)
    start_all
    ;;
  status)
    print_status
    ;;
  stop)
    stop_php
    stop_funnel
    ;;
  qr)
    regenerate_qr
    ;;
  *)
    usage
    exit 1
    ;;
esac
