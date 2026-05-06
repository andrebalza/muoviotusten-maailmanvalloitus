<section class="about-page" aria-labelledby="about-title">
  <div class="about-hero">
    <a class="about-hero__logo-link" href="/" aria-label="Muoviotusten maailmanvalloitus">
      <img class="about-hero__logo" src="/public/assets/textlogo_500x97.png" alt="Muoviotuspeli">
    </a>
    <p class="eyebrow" id="about-eyebrow">Tietoa pelistä</p>
    <h1 id="about-title">Muoviotusten maailmanvalloitus</h1>
    <p class="lead" id="about-lead">Pedagoginen jättilautapeli ja yhteisötaideteos.</p>

    <div class="about-language" aria-label="Language">
      <button class="about-language__button" type="button" data-about-language="fi" aria-label="Suomi">🇫🇮</button>
      <button class="about-language__button" type="button" data-about-language="en" aria-label="English">🇬🇧</button>
    </div>

    <div class="about-jump-nav" role="tablist" aria-label="About page sections">
      <button class="about-jump about-jump--green" type="button" role="tab" id="about-nav-story" data-about-tab="story" aria-controls="about-story">Tarina</button>
      <button class="about-jump about-jump--coral" type="button" role="tab" id="about-nav-what" data-about-tab="what" aria-controls="about-what">Mistä on kyse?</button>
      <button class="about-jump about-jump--blue" type="button" role="tab" id="about-nav-play" data-about-tab="play" aria-controls="about-play">Peliohjeet</button>
      <button class="about-jump about-jump--navy" type="button" role="tab" id="about-nav-creators" data-about-tab="creators" aria-controls="about-creators">Tekijät</button>
      <button class="about-jump about-jump--beige" type="button" role="tab" id="about-nav-vote" data-about-tab="vote" aria-controls="about-vote">Äänestä</button>
    </div>
  </div>

  <section class="about-section" id="about-story" data-about-panel="story" role="tabpanel" aria-labelledby="about-nav-story">
    <h2 id="about-story-title">Tarina</h2>
    <div class="about-text-stack" id="about-story-body"></div>
  </section>

  <section class="about-section" id="about-what" data-about-panel="what" role="tabpanel" aria-labelledby="about-nav-what" hidden>
    <h2 id="about-what-title">Mistä on kyse?</h2>
    <div class="about-text-stack" id="about-what-body"></div>
  </section>

  <section class="about-section" id="about-play" data-about-panel="play" role="tabpanel" aria-labelledby="about-nav-play" hidden>
    <h2 id="about-play-title">Peliohjeet</h2>
    <div class="about-text-stack" id="about-play-body"></div>
    <h3 id="about-flow-title">Pelin kulku</h3>
    <ol class="about-step-list" id="about-flow-list"></ol>
  </section>

  <section class="about-section about-section--vote" id="about-vote" data-about-panel="vote" role="tabpanel" aria-labelledby="about-nav-vote" hidden>
    <h2 id="about-vote-title">Äänestä suosikkia!</h2>
    <div class="about-text-stack" id="about-vote-body"></div>
    <a class="button button-gallery" href="/gallery/index.php?/category/1" id="about-gallery-button">Galleria</a>
  </section>

  <section class="about-section" id="about-creators" data-about-panel="creators" role="tabpanel" aria-labelledby="about-nav-creators" hidden>
    <h2 id="about-creators-title">Tekijät</h2>
    <div class="about-logo-stack">
      <div class="about-logo-group">
        <div class="about-logo-row about-logo-row--creator">
          <a class="about-logo-link" href="https://muoviamo.fi" aria-label="Muoviamo">
            <img class="about-logo about-logo--muoviamo" src="/public/assets/muoviamo-logo-blue-red.png" alt="Muoviamo">
          </a>
          <img class="about-logo about-logo--maaria" src="/public/assets/Maaria-Klemetti-logo-800x266.png" alt="Maaria Klemetti">
        </div>
      </div>

      <div class="about-logo-group">
        <div class="about-logo-row about-logo-row--partners">
          <img class="about-logo about-logo--tiedetta" src="/public/assets/tiedetta-kaikille_full_kulta.png" alt="Tiedettä kaikille">
          <img class="about-logo about-logo--kulttuuriaitta" src="/public/assets/kulttuuriaitta-valkoinen-webuseonly.png" alt="Kulttuuriaitta">
          <img class="about-logo about-logo--skr" src="/public/assets/SKR_Keski-Suomi_Vertical_White.png" alt="Suomen Kulttuurirahasto Keski-Suomi">
        </div>
      </div>
    </div>
    <div class="about-text-stack" id="about-funding-body"></div>
  </section>
</section>
