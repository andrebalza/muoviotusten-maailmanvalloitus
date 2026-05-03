<section class="panel resume-panel" id="resume-panel" hidden>
  <div class="panel-head">
    <h2 id="resume-title">Current session</h2>
  </div>
  <div id="resume-summary" class="resume-status-grid"></div>
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

    <div class="start-step start-step--confirm" data-step="confirm" hidden>
      <p class="track-confirm__eyebrow" id="track-confirm-eyebrow">You got:</p>
      <div class="track-confirm__burst" aria-hidden="true">
        <span class="track-confirm__ray track-confirm__ray--green track-confirm__ray--left-top"></span>
        <span class="track-confirm__ray track-confirm__ray--blue track-confirm__ray--left-mid"></span>
        <span class="track-confirm__ray track-confirm__ray--red track-confirm__ray--left-low"></span>
        <span class="track-confirm__number" id="track-confirm-number">1</span>
        <span class="track-confirm__ray track-confirm__ray--green track-confirm__ray--right-top"></span>
        <span class="track-confirm__ray track-confirm__ray--blue track-confirm__ray--right-mid"></span>
        <span class="track-confirm__ray track-confirm__ray--red track-confirm__ray--right-low"></span>
      </div>
      <h2 class="track-confirm__title" id="track-confirm-title">Is the track free?</h2>
      <div class="track-confirm__actions">
        <button class="track-confirm__button track-confirm__button--yes" type="button" id="track-confirm-yes">YES</button>
        <button class="track-confirm__button track-confirm__button--no" type="button" id="track-confirm-no">NO</button>
      </div>
    </div>

    <div class="start-step start-step--track-intro" data-step="intro" hidden>
      <div class="track-intro">
        <h2 class="track-intro__title" id="track-intro-title">Track 3</h2>
        <p class="track-intro__belongs" id="track-intro-belongs">belongs to faction</p>
        <p class="track-intro__faction" id="track-intro-faction">Propellukset.</p>
        <img class="track-intro__creature" id="track-intro-image" src="/public/assets/creatures-small/03_propellukset_no_bkg_760.png" alt="">
        <div class="track-intro__info">
          <div class="track-intro__icon-wrap" aria-hidden="true">
            <img class="track-intro__icon" src="/assets/icons/lightbulb_transparent.svg" alt="">
          </div>
          <p class="track-intro__description" id="track-intro-description">Placeholder description goes here.</p>
        </div>
        <button class="track-intro__continue" type="button" id="track-intro-continue">
          <span id="track-intro-continue-label">Continue</span>
        </button>
      </div>
    </div>

  </div>
</section>
