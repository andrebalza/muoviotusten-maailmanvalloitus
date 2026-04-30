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

<section class="start-flow" id="start-flow" hidden>
  <div class="start-flow__hero">
    <img src="/public/assets/start_logo_image.png" alt="" class="start-flow__hero-img">
  </div>

  <div class="start-flow__steps">

    <div class="start-step" data-step="language" hidden>
      <h2 class="start-step__title" id="step-language-title">Choose language</h2>
      <div class="start-step__buttons">
        <button class="big-button" type="button" data-language="fi">Suomi</button>
        <button class="big-button" type="button" data-language="en">English</button>
      </div>
    </div>

    <div class="start-step" data-step="age" hidden>
      <h2 class="start-step__title" id="step-age-title">How old are you?</h2>
      <div class="start-step__buttons">
        <button class="big-button" type="button" data-age="hard" id="age-over-button">Over 9 years</button>
        <button class="big-button" type="button" data-age="easy" id="age-under-button">Under 9 years</button>
      </div>
      <button class="start-step__back" type="button" data-back="language" id="age-back">Back</button>
    </div>

    <div class="start-step start-step--roll" data-step="roll" hidden>
      <img class="roll-screen__logo" src="/public/assets/textlogo_500x97.png" alt="Muoviotuspeli">
      <h2 class="start-step__title start-step__title--display" id="step-roll-title">Roll the dice</h2>
      <img class="roll-screen__dice" src="/public/assets/dice_blue_500x536.png" alt="">
      <div class="roll-card">
        <h3 class="roll-card__title" id="step-roll-prompt">What number did you get?</h3>
        <div class="die-grid" id="roll-grid">
          <button class="die-cell" type="button" data-roll="1">1</button>
          <button class="die-cell" type="button" data-roll="2">2</button>
          <button class="die-cell" type="button" data-roll="3">3</button>
          <button class="die-cell" type="button" data-roll="4">4</button>
          <button class="die-cell" type="button" data-roll="5">5</button>
          <button class="die-cell" type="button" data-roll="6">6</button>
        </div>
      </div>
      <button class="start-step__back" type="button" data-back="age" id="roll-back">Back</button>
    </div>

    <div class="start-step" data-step="track" hidden>
      <h2 class="start-step__title" id="step-track-title">Choose your track</h2>
      <div class="start-step__buttons" id="track-buttons"></div>
      <button class="start-step__back" type="button" data-back="roll" id="track-back">Back</button>
    </div>

  </div>
</section>
