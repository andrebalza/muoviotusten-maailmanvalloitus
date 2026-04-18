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

    <div class="field">
      <label class="field-label" for="photo" id="photo-label">Creature photo</label>
      <input class="input" type="file" id="photo" name="photo" accept="image/*" capture="environment" required>
      <p class="muted" id="photo-help">The photo should show only the creature, not people.</p>
    </div>

    <div id="finish-message" class="stack"></div>

    <div class="button-row">
      <button class="button button-primary" type="submit" id="finish-submit">Submit creature</button>
      <a class="button button-secondary" href="/gallery" id="finish-gallery-link">Open gallery</a>
    </div>
  </form>
</section>
