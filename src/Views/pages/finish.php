<section class="panel hero-panel">
  <p class="eyebrow" id="finish-eyebrow">Finish</p>
  <h1 id="finish-title">Build and submit your creature</h1>
  <p class="lead" id="finish-lead">See which parts you unlocked, build the creature physically, take a photo, and submit it to the gallery.</p>
</section>

<section class="panel">
  <div id="finish-summary" class="stack"></div>
</section>

<section class="panel">
  <form id="finish-form" class="stack" enctype="multipart/form-data" novalidate>
    <div class="field">
      <label class="field-label" for="creature_name" id="creature-name-label">Creature name</label>
      <input class="input" type="text" id="creature_name" name="creature_name" required>
    </div>

    <div class="field">
      <label class="field-label" for="special_ability" id="ability-label">Special ability</label>
      <textarea class="input input-textarea" id="special_ability" name="special_ability" rows="4" required></textarea>
    </div>

    <div class="field photo-field">
      <span class="field-label" id="photo-label">Creature photo</span>
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
      <p class="muted" id="photo-help">The photo should show only the creature, not people.</p>
    </div>

    <div id="finish-message" class="stack"></div>

    <div class="button-row">
      <button class="button button-primary" type="submit" id="finish-submit">Submit creature</button>
      <a class="button button-secondary" href="/gallery/index.php?/category/1" id="finish-gallery-link">Open gallery</a>
    </div>
  </form>
</section>
