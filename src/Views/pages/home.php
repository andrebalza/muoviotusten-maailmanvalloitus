<section class="panel hero-panel">
  <p class="eyebrow" id="home-eyebrow">QR-assisted floor game</p>
  <h1 id="home-title">Start a new creature run</h1>
  <p class="lead" id="home-lead">Scan the begin-game QR, roll the die, choose difficulty, and then continue all question, mutation, and finish scans inside this app.</p>
</section>

<section class="panel" id="resume-panel" hidden>
  <div class="panel-head">
    <h2 id="resume-title">Current session</h2>
  </div>
  <div id="resume-summary" class="stack"></div>
  <div class="button-row">
    <a class="button button-primary" href="/scan" id="resume-scan-button">Continue scanning</a>
    <button class="button button-secondary" id="restart-button" type="button">Start over</button>
  </div>
</section>

<section class="panel">
  <div class="panel-head">
    <h2 id="start-title">Begin game</h2>
    <p class="muted" id="start-copy">One device equals one group. Rolls 1–5 select a track directly. A roll of 6 lets the group choose any free track physically.</p>
  </div>

  <form id="start-form" class="stack">
    <div class="field">
      <label class="field-label" id="language-label">Language</label>
      <div class="choice-grid">
        <label class="choice-card">
          <input type="radio" name="language" value="fi" checked>
          <span>Suomi</span>
        </label>
        <label class="choice-card">
          <input type="radio" name="language" value="en">
          <span>English</span>
        </label>
      </div>
    </div>

    <div class="field">
      <label class="field-label" id="difficulty-label">Difficulty</label>
      <div class="choice-grid">
        <label class="choice-card">
          <input type="radio" name="difficulty" value="easy" checked>
          <span id="difficulty-easy-label">Easy</span>
        </label>
        <label class="choice-card">
          <input type="radio" name="difficulty" value="hard">
          <span id="difficulty-hard-label">Hard</span>
        </label>
      </div>
    </div>

    <div class="field">
      <span class="field-label" id="roll-label">Rolled die number</span>
      <div class="die-button-grid" role="radiogroup" aria-labelledby="roll-label">
        <label class="die-button">
          <input type="radio" name="roll" value="1" required>
          <span>1</span>
        </label>
        <label class="die-button">
          <input type="radio" name="roll" value="2">
          <span>2</span>
        </label>
        <label class="die-button">
          <input type="radio" name="roll" value="3">
          <span>3</span>
        </label>
        <label class="die-button">
          <input type="radio" name="roll" value="4">
          <span>4</span>
        </label>
        <label class="die-button">
          <input type="radio" name="roll" value="5">
          <span>5</span>
        </label>
        <label class="die-button">
          <input type="radio" name="roll" value="6">
          <span>6</span>
        </label>
      </div>
    </div>

    <div class="field" id="track-choice-field" hidden>
      <label class="field-label" for="track-choice" id="track-choice-label">Chosen track after rolling 6</label>
      <select class="input" id="track-choice" name="track_choice">
        <option value="">Choose a free track…</option>
      </select>
    </div>

    <div class="button-row">
      <button class="button button-primary" type="submit" id="start-button">Start game</button>
      <a class="button button-secondary" href="/gallery" id="gallery-button">Open gallery</a>
    </div>
  </form>
</section>
