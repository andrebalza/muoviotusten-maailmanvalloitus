(function () {
	var apiPath = '/gallery/plugins/muoviotukset_voting/api.php';
	var tokenKey = 'muoviotukset.galleryVotingToken.v1';
	var pollInterval = 5000;

	var copy = {
		en: {
			vote: 'Vote',
			voted: 'Voted',
			noVotes: 'All 3 votes used',
			status: function (remaining) {
				return remaining === 1 ? 'You have 1 vote left.' : 'You have ' + remaining + ' votes left.';
			},
			already: 'You have already voted for this creature.',
			count: function (count) {
				return count === 1 ? '1 vote' : count + ' votes';
			}
		},
		fi: {
			vote: 'Anna ääni',
			voted: 'Äänestetty',
			noVotes: 'Kaikki 3 ääntä käytetty',
			status: function (remaining) {
				return remaining === 1 ? 'Sinulla on 1 ääni jäljellä.' : 'Sinulla on ' + remaining + ' ääntä jäljellä.';
			},
			already: 'Olet jo äänestänyt tätä otusta.',
			count: function (count) {
				return count === 1 ? '1 ääni' : count + ' ääntä';
			}
		}
	};

	function language() {
		var htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
		var stored = '';
		try {
			stored = localStorage.getItem('muoviotukset.language') || '';
		} catch (error) {}

		return htmlLang.indexOf('fi') === 0 || stored === 'fi' ? 'fi' : 'en';
	}

	function t() {
		return copy[language()] || copy.en;
	}

	function applyLanguageLabels() {
		var lang = language();
		document.querySelectorAll('[data-lang-' + lang + ']').forEach(function (node) {
			node.textContent = node.getAttribute('data-lang-' + lang);
		});
	}

	function getToken() {
		try {
			var existing = localStorage.getItem(tokenKey);
			if (existing) {
				return existing;
			}

			var bytes = new Uint8Array(24);
			window.crypto.getRandomValues(bytes);
			var token = Array.prototype.map.call(bytes, function (byte) {
				return ('0' + byte.toString(16)).slice(-2);
			}).join('');
			localStorage.setItem(tokenKey, token);
			return token;
		} catch (error) {
			var fallback = String(Date.now()) + String(Math.random()).replace(/\D/g, '') + String(Math.random()).replace(/\D/g, '');
			return fallback.slice(0, 64);
		}
	}

	function imageIdFromHref(href) {
		var match = href.match(/picture\.php\?\/(\d+)/);
		return match ? match[1] : null;
	}

	function requestCounts(ids, includeToken) {
		if (!ids.length) {
			return Promise.resolve({ ok: true, counts: {} });
		}

		var url = apiPath + '?ids=' + encodeURIComponent(ids.join(','));
		if (includeToken) {
			url += '&token=' + encodeURIComponent(getToken());
		}

		return fetch(url, { credentials: 'same-origin' }).then(function (response) {
			return response.json();
		});
	}

	function updateThumbnailBadges() {
		var links = Array.prototype.slice.call(document.querySelectorAll('#thumbnails a[href*="picture.php?/"]'));
		var ids = [];
		var byId = {};

		links.forEach(function (link) {
			var id = imageIdFromHref(link.getAttribute('href') || '');
			if (!id) {
				return;
			}
			ids.push(id);
			byId[id] = byId[id] || [];
			byId[id].push(link);
		});

		requestCounts(ids, false).then(function (data) {
			if (!data.ok) {
				return;
			}

			Object.keys(byId).forEach(function (id) {
				var count = Number(data.counts[id] || 0);
				byId[id].forEach(function (link) {
					var item = link.closest('li') || link.parentNode;
					var legend = findOrCreateCaption(item);
					var badge = rebuildCreatureCaption(legend, item, data.names && data.names[id] ? data.names[id] : '');
					badge.textContent = t().count(count);
				});
			});
		}).catch(function () {});
	}

	function findOrCreateCaption(item) {
		var legend = item.querySelector('.overDesc') || item.querySelector('.thumbLegend');
		if (legend) {
			return legend;
		}

		legend = document.createElement('div');
		legend.className = 'overDesc';
		item.appendChild(legend);
		return legend;
	}

	function rebuildCreatureCaption(legend, item, creatureName) {
		var badge = legend.querySelector('.muov-vote-badge') || document.createElement('span');
		var originalName = Array.prototype.slice.call(legend.childNodes).filter(function (node) {
			return node.nodeType === 3;
		}).map(function (node) {
			return node.textContent.trim();
		}).filter(Boolean).join(' ');
		var image = item.querySelector('img');
		var name = creatureName || originalName || (image ? image.getAttribute('alt') || '' : '');
		var star = legend.querySelector('.albSymbol') || item.querySelector('.albSymbol');
		var starClone = star ? star.cloneNode(true) : null;

		var row = document.createElement('span');
		row.className = 'muov-vote-name-row';
		row.setAttribute('data-creature-name', name);
		if (starClone) {
			row.appendChild(starClone);
		}

		badge.className = 'muov-vote-badge';
		legend.classList.add('muov-vote-caption');
		legend.replaceChildren(row, badge);

		return badge;
	}

	function updateVoteCard(card) {
		var imageId = card.getAttribute('data-image-id');
		var countNode = card.querySelector('[data-muov-vote-count]');
		var statusNode = card.querySelector('[data-muov-vote-status]');
		var button = card.querySelector('[data-muov-vote-button]');

		requestCounts([imageId], true).then(function (data) {
			if (!data.ok) {
				return;
			}

			var count = Number(data.counts[imageId] || 0);
			var remaining = Number(data.remaining || 0);
			var voted = Boolean(data.voted && data.voted[imageId]);

			countNode.textContent = count;
			statusNode.textContent = voted ? t().already : t().status(remaining);
			button.textContent = voted ? t().voted : remaining > 0 ? t().vote : t().noVotes;
			button.disabled = voted || remaining <= 0;
		}).catch(function () {});
	}

	function bindVoteCard(card) {
		var button = card.querySelector('[data-muov-vote-button]');
		var imageId = card.getAttribute('data-image-id');

		button.addEventListener('click', function () {
			button.disabled = true;
			fetch(apiPath, {
				method: 'POST',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image_id: imageId, token: getToken() })
			}).then(function (response) {
				return response.json();
			}).then(function () {
				updateVoteCard(card);
				updateThumbnailBadges();
			}).catch(function () {
				updateVoteCard(card);
			});
		});

		updateVoteCard(card);
		window.setInterval(function () {
			updateVoteCard(card);
		}, pollInterval);
	}

	function init() {
		applyLanguageLabels();
		updateThumbnailBadges();
		document.querySelectorAll('[data-muoviotukset-voting]').forEach(bindVoteCard);
		if (document.getElementById('thumbnails')) {
			window.setInterval(updateThumbnailBadges, pollInterval);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
