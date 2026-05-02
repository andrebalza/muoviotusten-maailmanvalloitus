<section class="panel" id="finish-step-achievement">
  <div class="card stack">
    <h1 id="finish-title">Great achievement!</h1>
    <p id="finish-achievement-text"></p>
  </div>
  <div class="button-row">
    <button class="button button-primary" type="button" id="finish-continue-build">Continue to building</button>
  </div>
</section>

<section class="panel" id="finish-step-build" hidden>
  <div class="card stack">
    <p id="finish-build-instructions"></p>
  </div>
  <div class="button-row">
    <button class="button button-primary" type="button" id="finish-creature-ready">Creature is ready</button>
  </div>
</section>

<section class="panel" id="finish-step-form" hidden>
  <form id="finish-form" class="stack" enctype="multipart/form-data" novalidate>
    <div class="field">
      <label class="field-label" for="creature_name" id="creature-name-label">Creature name</label>
      <input class="input" type="text" id="creature_name" name="creature_name" required>
    </div>

    <div class="field">
      <label class="field-label" for="special_ability" id="ability-label">Creature ability</label>
      <textarea class="input input-textarea" id="special_ability" name="special_ability" rows="4" required></textarea>
    </div>

    <div class="field">
      <label class="field-label" for="parts_count" id="parts-count-label">How many parts does your creature have?</label>
      <input class="input" type="number" inputmode="numeric" id="parts_count" name="parts_count" min="0" max="99" step="1" required>
    </div>

    <fieldset class="materials-group stack">
      <legend class="materials-group__title" id="materials-label">Building materials</legend>
      <div class="field">
        <label class="field-label" for="rubber_bands" id="rubber-bands-label">Rubber bands</label>
        <input class="input" type="number" inputmode="numeric" id="rubber_bands" name="rubber_bands" min="0" max="999" step="1" required>
      </div>
      <div class="field">
        <label class="field-label" for="cable_ties" id="cable-ties-label">Cable ties</label>
        <input class="input" type="number" inputmode="numeric" id="cable_ties" name="cable_ties" min="0" max="999" step="1" required>
      </div>
      <div class="field">
        <label class="field-label" for="tape_cm" id="tape-cm-label">Tape (cm)</label>
        <input class="input" type="number" inputmode="numeric" id="tape_cm" name="tape_cm" min="0" max="9999" step="1" required>
      </div>
    </fieldset>

    <div class="field photo-field">
      <span class="field-label" id="photo-label">Take a photo of the creature</span>
      <label class="photo-trigger" for="photo" id="photo-trigger">
        <svg class="photo-trigger__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M9 4l-1.5 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.5L15 4H9zm3 4.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
        </svg>
        <span class="photo-trigger__label" id="photo-trigger-label">Take photo</span>
      </label>
      <input class="photo-input" type="file" id="photo" name="photo" accept="image/*" capture="environment" required>
      <div class="photo-preview" id="photo-preview" hidden>
        <img class="photo-preview__img" id="photo-preview-img" alt="">
        <span class="photo-preview__name" id="photo-preview-name"></span>
      </div>
    </div>

    <div id="finish-message" class="stack"></div>

    <div class="button-row">
      <button class="button button-primary" type="submit" id="finish-submit">Submit</button>
    </div>
  </form>
</section>

<section class="panel" id="finish-step-success" hidden>
  <div class="card stack">
    <h2 id="finish-success-title">The creature was submitted successfully.</h2>
  </div>
  <div class="button-row">
    <a class="button button-primary" href="/gallery/index.php?/category/1" id="finish-success-gallery">Open gallery</a>
  </div>
</section>
