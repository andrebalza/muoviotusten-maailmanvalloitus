(function(){
  'use strict';

  const boot = window.__APP_BOOT__ || {};
  const app = boot.app || {};
  const settings = app.settings || {};
  const STORAGE_KEY = settings.storageKey || 'muoviotukset.v1';
  const MAX_TIPS = Number(settings.maxTips || 5);

  const copy = {
    fi: {
      navScan: 'Skannaa',
      navAbout: 'Peliohje',
      navGallery: 'Galleria',
      trackLabel: 'Rata',
      activeBoxLabel: 'Aktiivinen laatikko',
      partsLabel: 'Osat',
      tipsLabel: 'Vinkit',
      resumeTitle: 'Nykyinen peli',
      continueScanning: 'Jatka skannausta',
      restart: 'Aloita alusta',
      stepLanguage: 'Valitse kieli',
      stepAge: 'Minkä ikäinen olet?',
      ageOver: 'Yli 9-vuotias',
      ageUnder: 'Alle 9-vuotias',
      stepRoll: 'Heitä noppaa',
      stepRollPrompt: 'Minkä luvun sait?',
      stepTrack: 'Valitse rata',
      back: 'Takaisin',
      easy: 'Helppo',
      hard: 'Vaikea',
      openGallery: 'Avaa galleria',
      scannerEyebrow: 'Sovelluksen sisäinen skanneri',
      scannerTitle: 'Skannaa seuraava QR',
      scannerLead: 'Kysymys-, mutaatio- ja maali-QR-koodit skannataan tämän sovelluksen sisällä. Vain saman verkkotunnuksen pelilinkit hyväksytään.',
      scannerWaiting: 'Odotetaan kameran käyttöoikeutta…',
      scannerReady: 'Suuntaa kamera QR-koodiin.',
      scannerRetry: 'Yritä kameraa uudelleen',
      scannerInvalid: 'Tämä QR-koodi ei kuulu tähän peliin.',
      scannerNoCamera: 'Kameraa ei voitu käynnistää. Tarkista selaimen lupa-asetukset.',
      questionEyebrow: 'Kysymyssarja',
      questionLead: 'Vastaa kysymykseen nähdäksesi, avaako otuksesi seuraavan ruumiinosan.',
      alreadyPassedTitle: 'Tämä kysymys on jo ohitettu',
      alreadyPassedBody: 'Tälle ruudulle on jo vastattu. Heittäkää noppaa ja skannatkaa seuraava uusi QR-koodi.',
      useTip: 'Käytä vinkki',
      tipUsed: 'Vinkki käytetty',
      answer: 'Vastaa',
      textAnswerLabel: 'Kirjoita vastauksesi',
      correct: 'Oikein!',
      wrong: 'Väärin tällä kertaa',
      nextScan: 'Skannaa seuraava QR',
      correctAnswer: 'Oikea vastaus',
      explanation: 'Selitys',
      unlockedPart: 'Avasitte ruumiinosan',
      missedPart: 'Menetitte tämän ruumiinosan',
      noSession: 'Aloita peli ensin aloitussivulta.',
      mutationEyebrow: 'Mutaatio',
      mutationTitle: 'Mutaatio aktivoitui',
      mutationLead: 'Aktiivinen laatikko vaihtuu heti ja pysyy näkyvissä sovelluksen yläosassa.',
      mutationApplied: 'Aktiivinen laatikko on nyt',
      finishEyebrow: 'Maali',
      finishTitle: 'Rakenna ja lähetä otuksesi',
      finishLead: 'Katso avaamasi osat, rakenna otus fyysisesti, ota kuva ja lähetä se galleriaan.',
      creatureName: 'Otuksen nimi',
      specialAbility: 'Erikoiskyky',
      photo: 'Otuksen kuva',
      photoHelp: 'Kuvassa pitäisi näkyä vain otus, ei ihmisiä.',
      submitCreature: 'Lähetä otus',
      finishSummaryTitle: 'Avaamanne osat',
      noUnlockedParts: 'Ette avanneet yhtään osaa, mutta voitte silti lähettää otuksenne.',
      submissionSuccess: 'Otus lähetettiin onnistuneesti galleriaan.',
      submissionFailed: 'Lähetys epäonnistui.',
      requiredFields: 'Täytä kaikki kentät ja lisää kuva ennen lähetystä.',
      continueHome: 'Palaa alkuun',
      difficultyEasy: 'Helppo',
      difficultyHard: 'Vaikea',
      partsCount: '{count} / {total} avattu',
      tipsCount: '{used} / {max} käytetty',
      trackSummary: 'Rata {track}: {faction}',
      activeBoxSummary: 'Aktiivinen laatikko: {box}',
      difficultySummary: 'Vaikeustaso: {difficulty}',
      selectedTrackSummary: 'Valittu rata: {track}',
      aboutEyebrow: 'Tietoa pelistä',
      aboutTitle: 'Ohjeet ja yhteystiedot',
      aboutLead: 'Tälle sivulle kootaan pelin ohjeet, tukitiedot ja projektin yhteystiedot.',
      aboutInstructionsTitle: 'Ohjeet',
      aboutInstructionsCopy: 'Sisältö tarkentuu myöhemmin.',
      aboutInstructionsStep1: 'Aloita peli aloitus-QR-koodista.',
      aboutInstructionsStep2: 'Yksi laite tarkoittaa yhtä ryhmää.',
      aboutInstructionsStep3: 'Skannaa kysymys-, mutaatio- ja maali-QR-koodit tämän sovelluksen sisällä.',
      aboutContactsTitle: 'Yhteystiedot',
      aboutContactsCopy: 'Yhteystiedot lisätään myöhemmin.',
      aboutContactSupportTitle: 'Pelin tuki',
      aboutContactSupportCopy: 'TBD',
      aboutContactProjectTitle: 'Projektin yhteyshenkilö',
      aboutContactProjectCopy: 'TBD',
      aboutPracticalTitle: 'Käytännön tiedot',
      aboutPracticalCopy: 'Tähän voidaan koota saavutettavuus-, turvallisuus-, tietosuoja- ja galleriatiedot.',
    },
    en: {
      navScan: 'Scan',
      navAbout: 'About',
      navGallery: 'Gallery',
      trackLabel: 'Track',
      activeBoxLabel: 'Active box',
      partsLabel: 'Parts',
      tipsLabel: 'Tips',
      resumeTitle: 'Current session',
      continueScanning: 'Continue scanning',
      restart: 'Start over',
      stepLanguage: 'Choose language',
      stepAge: 'How old are you?',
      ageOver: 'Over 9 years',
      ageUnder: 'Under 9 years',
      stepRoll: 'Roll the dice',
      stepRollPrompt: 'What number did you get?',
      stepTrack: 'Choose your track',
      back: 'Back',
      easy: 'Easy',
      hard: 'Hard',
      openGallery: 'Open gallery',
      scannerEyebrow: 'In-app scanner',
      scannerTitle: 'Scan the next QR',
      scannerLead: 'Question, mutation, and finish QR codes are scanned inside this web app. Only same-origin gameplay links are accepted.',
      scannerWaiting: 'Waiting for camera access…',
      scannerReady: 'Point the camera at a QR code.',
      scannerRetry: 'Retry camera',
      scannerInvalid: 'That QR code is not part of this game.',
      scannerNoCamera: 'The camera could not be started. Check the browser permission settings.',
      questionEyebrow: 'Question set',
      questionLead: 'Answer the question to see whether your creature unlocks the next body part.',
      alreadyPassedTitle: 'This question was already passed',
      alreadyPassedBody: 'This tile was already answered. Roll the die and scan the next new QR code.',
      useTip: 'Use tip',
      tipUsed: 'Tip used',
      answer: 'Answer',
      textAnswerLabel: 'Type your answer',
      correct: 'Correct!',
      wrong: 'Not this time',
      nextScan: 'Scan the next QR',
      correctAnswer: 'Correct answer',
      explanation: 'Explanation',
      unlockedPart: 'You unlocked a body part',
      missedPart: 'You permanently missed this body part',
      noSession: 'Start the game from the home page first.',
      mutationEyebrow: 'Mutation',
      mutationTitle: 'Mutation activated',
      mutationLead: 'The active box changes immediately and stays visible at the top of the app.',
      mutationApplied: 'The active box is now',
      finishEyebrow: 'Finish',
      finishTitle: 'Build and submit your creature',
      finishLead: 'See which parts you unlocked, build the creature physically, take a photo, and submit it to the gallery.',
      creatureName: 'Creature name',
      specialAbility: 'Special ability',
      photo: 'Creature photo',
      photoHelp: 'The photo should show only the creature, not people.',
      submitCreature: 'Submit creature',
      finishSummaryTitle: 'Unlocked parts',
      noUnlockedParts: 'You did not unlock any parts, but you can still submit your creature.',
      submissionSuccess: 'The creature was submitted successfully.',
      submissionFailed: 'Submission failed.',
      requiredFields: 'Fill in all fields and add a photo before submitting.',
      continueHome: 'Back to start',
      difficultyEasy: 'Easy',
      difficultyHard: 'Hard',
      partsCount: '{count} / {total} unlocked',
      tipsCount: '{used} / {max} used',
      trackSummary: 'Track {track}: {faction}',
      activeBoxSummary: 'Active box: {box}',
      difficultySummary: 'Difficulty: {difficulty}',
      selectedTrackSummary: 'Selected track: {track}',
      aboutEyebrow: 'About the game',
      aboutTitle: 'Instructions and contacts',
      aboutLead: 'This page will collect game instructions, support details, and project contacts.',
      aboutInstructionsTitle: 'Instructions',
      aboutInstructionsCopy: 'Content to be added.',
      aboutInstructionsStep1: 'Start the game from the begin-game QR code.',
      aboutInstructionsStep2: 'One device equals one group.',
      aboutInstructionsStep3: 'Scan question, mutation, and finish QR codes inside this app.',
      aboutContactsTitle: 'Contacts',
      aboutContactsCopy: 'Contact details will be added later.',
      aboutContactSupportTitle: 'Game support',
      aboutContactSupportCopy: 'TBD',
      aboutContactProjectTitle: 'Project contact',
      aboutContactProjectCopy: 'TBD',
      aboutPracticalTitle: 'Practical notes',
      aboutPracticalCopy: 'Accessibility, safety, privacy, and gallery notes can be collected here.',
    },
  };

  document.addEventListener('DOMContentLoaded', function(){
    const state = loadState();
    applyGlobalCopy(state);
    renderSessionStrip(state);

    if(boot.page === 'home'){
      initHome(state);
    }
    else if(boot.page === 'scan'){
      initScanPage(state);
    }
    else if(boot.page === 'question'){
      initQuestionPage(state);
    }
    else if(boot.page === 'mutation'){
      initMutationPage(state);
    }
    else if(boot.page === 'finish'){
      initFinishPage(state);
    }
    else if(boot.page === 'about'){
      initAboutPage(state);
    }
  });

  function initHome(state){
    const resumePanel = document.getElementById('resume-panel');
    const resumeSummary = document.getElementById('resume-summary');
    const startFlow = document.getElementById('start-flow');
    const restartButton = document.getElementById('restart-button');

    if(state){
      const lang = currentLanguage(state);
      const t = ui(lang);
      document.body.classList.remove('start-flow-active');
      resumePanel.hidden = false;
      startFlow.hidden = true;
      setText('resume-title', t.resumeTitle);
      setText('resume-scan-button', t.continueScanning);
      setText('restart-button', t.restart);
      resumeSummary.innerHTML = [
        `<div class="card">${escapeHtml(format(t.trackSummary, {track: state.trackId, faction: getTrack(state.trackId).faction[lang]}))}</div>`,
        `<div class="card">${escapeHtml(format(t.activeBoxSummary, {box: activeBoxLabel(state, lang)}))}</div>`,
        `<div class="card">${escapeHtml(format(t.difficultySummary, {difficulty: state.difficulty === 'hard' ? t.hard : t.easy}))}</div>`,
      ].join('');

      if(restartButton){
        restartButton.addEventListener('click', function(){
          clearState();
          window.location.assign('/');
        });
      }
      return;
    }

    document.body.classList.add('start-flow-active');
    resumePanel.hidden = true;
    startFlow.hidden = false;

    const choices = {language: 'fi', difficulty: null, roll: null, trackId: null};
    const order = ['language', 'age', 'roll', 'track'];
    const steps = {};
    order.forEach(function(name){
      steps[name] = startFlow.querySelector('[data-step="'+name+'"]');
    });

    const heroEl = startFlow.querySelector('.start-flow__hero');

    function showStep(name){
      order.forEach(function(other){
        steps[other].hidden = (other !== name);
      });
      if(heroEl){
        heroEl.hidden = (name === 'roll');
      }
      startFlow.classList.toggle('start-flow--roll', name === 'roll');
      applyStartCopy();
    }

    function applyStartCopy(){
      const t = ui(choices.language);
      setText('step-language-title', t.stepLanguage);
      setText('step-age-title', t.stepAge);
      setText('age-over-button', t.ageOver);
      setText('age-under-button', t.ageUnder);
      setText('step-roll-title', t.stepRoll);
      setText('step-roll-prompt', t.stepRollPrompt);
      setText('step-track-title', t.stepTrack);
      setText('age-back', t.back);
      setText('roll-back', t.back);
      setText('track-back', t.back);
    }

    steps.language.querySelectorAll('[data-language]').forEach(function(button){
      button.addEventListener('click', function(){
        choices.language = button.getAttribute('data-language') === 'en' ? 'en' : 'fi';
        applyStartCopy();
        applyGlobalCopy({language: choices.language});
        showStep('age');
      });
    });

    steps.age.querySelectorAll('[data-age]').forEach(function(button){
      button.addEventListener('click', function(){
        choices.difficulty = button.getAttribute('data-age');
        showStep('roll');
      });
    });

    steps.roll.querySelectorAll('[data-roll]').forEach(function(button){
      button.addEventListener('click', function(){
        const roll = Number(button.getAttribute('data-roll'));
        choices.roll = roll;
        if(roll === 6){
          renderTrackButtons();
          showStep('track');
          return;
        }
        choices.trackId = roll;
        finishStart();
      });
    });

    function renderTrackButtons(){
      const lang = choices.language;
      const container = document.getElementById('track-buttons');
      container.innerHTML = (app.tracks || []).map(function(track){
        return '<button class="big-button" type="button" data-track="'+track.id+'">'
          +'<span class="big-button__title">'+escapeHtml(track.faction[lang])+'</span>'
          +'<span class="big-button__sub">'+escapeHtml(track.mainBox[lang])+'</span>'
          +'</button>';
      }).join('');
      container.querySelectorAll('[data-track]').forEach(function(button){
        button.addEventListener('click', function(){
          choices.trackId = Number(button.getAttribute('data-track'));
          finishStart();
        });
      });
    }

    startFlow.querySelectorAll('[data-back]').forEach(function(button){
      button.addEventListener('click', function(){
        showStep(button.getAttribute('data-back'));
      });
    });

    function finishStart(){
      saveState(newSession(choices.language, choices.difficulty || 'easy', choices.trackId));
      window.location.assign('/scan');
    }

    showStep('language');
  }

  function initScanPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    setText('scan-eyebrow', t.scannerEyebrow);
    setText('scan-title', t.scannerTitle);
    setText('scan-lead', t.scannerLead);
    setText('scanner-status', t.scannerWaiting);
    setText('scanner-retry', t.scannerRetry);

    if(!state){
      setText('scanner-status', t.noSession);
      return;
    }

    const video = document.getElementById('scanner-video');
    const status = document.getElementById('scanner-status');
    const retry = document.getElementById('scanner-retry');
    let stream = null;
    let frameTimer = null;
    let detecting = false;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', {willReadFrequently: true});
    const detector = typeof window.BarcodeDetector === 'function'
      ? new window.BarcodeDetector({formats: ['qr_code']})
      : null;

    async function start(){
      stop();

      try{
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {ideal: 'environment'},
          },
          audio: false,
        });

        video.srcObject = stream;
        await video.play();
        status.textContent = t.scannerReady;

        frameTimer = window.setInterval(async function(){
          if(detecting || video.readyState < 2 || !context){
            return;
          }

          detecting = true;

          try{
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            let rawValue = null;

            if(detector){
              const bitmap = await createImageBitmap(canvas);
              const codes = await detector.detect(bitmap);
              bitmap.close();
              rawValue = codes[0] && codes[0].rawValue ? String(codes[0].rawValue) : null;
            }
            else if(window.jsQR){
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const code = window.jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'dontInvert'});
              rawValue = code && code.data ? String(code.data) : null;
            }

            if(rawValue){
              const nextUrl = validateQr(rawValue);
              if(nextUrl){
                stop();
                window.location.assign(nextUrl);
                return;
              }
              status.textContent = t.scannerInvalid;
            }
          }
          catch(error){
            status.textContent = t.scannerNoCamera;
          }
          finally{
            detecting = false;
          }
        }, 350);
      }
      catch(error){
        status.textContent = t.scannerNoCamera;
      }
    }

    function stop(){
      if(frameTimer){
        window.clearInterval(frameTimer);
        frameTimer = null;
      }

      if(stream){
        stream.getTracks().forEach(function(track){
          track.stop();
        });
        stream = null;
      }
    }

    retry.addEventListener('click', function(){
      start();
    });

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      start();
    }
    else{
      status.textContent = t.scannerNoCamera;
    }
  }

  function initAboutPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    setText('about-eyebrow', t.aboutEyebrow);
    setText('about-title', t.aboutTitle);
    setText('about-lead', t.aboutLead);
    setText('about-instructions-title', t.aboutInstructionsTitle);
    setText('about-instructions-copy', t.aboutInstructionsCopy);
    setText('about-instructions-step-1', t.aboutInstructionsStep1);
    setText('about-instructions-step-2', t.aboutInstructionsStep2);
    setText('about-instructions-step-3', t.aboutInstructionsStep3);
    setText('about-contacts-title', t.aboutContactsTitle);
    setText('about-contacts-copy', t.aboutContactsCopy);
    setText('about-contact-support-title', t.aboutContactSupportTitle);
    setText('about-contact-support-copy', t.aboutContactSupportCopy);
    setText('about-contact-project-title', t.aboutContactProjectTitle);
    setText('about-contact-project-copy', t.aboutContactProjectCopy);
    setText('about-practical-title', t.aboutPracticalTitle);
    setText('about-practical-copy', t.aboutPracticalCopy);
    setText('about-scan-button', t.navScan);
    setText('about-gallery-button', t.navGallery);
  }

  function initQuestionPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    const panel = document.getElementById('question-content');
    const questionSet = boot.questionSet || null;

    setText('question-eyebrow', `${t.questionEyebrow} ${questionSet ? questionSet.setId : ''}`.trim());
    setText('question-title', questionSet ? `${t.questionEyebrow} ${questionSet.setId}` : t.questionEyebrow);
    setText('question-lead', t.questionLead);

    if(!state || !questionSet){
      panel.innerHTML = renderNotice('feedback feedback-error', t.noSession, `<a class="button button-primary" href="/">${escapeHtml(t.continueHome)}</a>`);
      return;
    }

    const setKey = String(questionSet.setId);

    if(state.answeredSets[setKey]){
      panel.innerHTML = renderNotice('feedback', t.alreadyPassedTitle, `<p>${escapeHtml(t.alreadyPassedBody)}</p><a class="button button-primary" href="/scan">${escapeHtml(t.nextScan)}</a>`);
      return;
    }

    const difficultyQuestions = (questionSet.questions || {})[state.difficulty] || [];

    if(!difficultyQuestions.length){
      panel.innerHTML = renderNotice('feedback feedback-error', 'Missing content', '<p>This question set has no content for the selected difficulty.</p>');
      return;
    }

    let selectedId = state.selectedQuestionBySet[setKey];
    let question = difficultyQuestions.find(function(item){
      return item.id === selectedId;
    });

    if(!question){
      question = difficultyQuestions[Math.floor(Math.random() * difficultyQuestions.length)];
      state.selectedQuestionBySet[setKey] = question.id;
      saveState(state);
    }

    panel.innerHTML = renderQuestion(question, state, lang);

    const tipButton = document.getElementById('tip-button');
    const form = document.getElementById('question-form');
    const tipContainer = document.getElementById('tip-container');

    if(tipButton){
      tipButton.addEventListener('click', function(){
        if(state.tipUsage[setKey]){
          return;
        }
        if(state.usedTips >= MAX_TIPS){
          return;
        }
        state.usedTips += 1;
        state.tipUsage[setKey] = question.id;
        saveState(state);
        renderSessionStrip(state);
        tipContainer.hidden = false;
        tipButton.disabled = true;
        tipButton.textContent = t.tipUsed;
      });
    }

    form.addEventListener('submit', function(event){
      event.preventDefault();
      const result = evaluateQuestion(question, form, lang);
      const part = app.parts[state.currentPartIndex] || null;

      state.answeredSets[setKey] = {
        questionId: question.id,
        correct: result.correct,
        partId: part ? part.id : null,
      };

      if(part && result.correct){
        state.unlockedPartIds.push(part.id);
      }

      state.currentPartIndex = Math.min(state.currentPartIndex + 1, app.parts.length);
      saveState(state);
      renderSessionStrip(state);

      panel.innerHTML = renderQuestionResult(question, result, part, lang);
    });
  }

  function initMutationPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    const panel = document.getElementById('mutation-content');
    const mutation = boot.mutation || null;

    setText('mutation-eyebrow', t.mutationEyebrow);
    setText('mutation-title', t.mutationTitle);
    setText('mutation-lead', t.mutationLead);

    if(!state || !mutation){
      panel.innerHTML = renderNotice('feedback feedback-error', t.noSession, `<a class="button button-primary" href="/">${escapeHtml(t.continueHome)}</a>`);
      return;
    }

    state.mutation = mutation.slug;
    saveState(state);
    renderSessionStrip(state);

    panel.innerHTML = `
      <div class="feedback feedback-success">
        <p class="pill">${escapeHtml(localized(mutation.name, lang))}</p>
        <h2>${escapeHtml(t.mutationApplied)}</h2>
        <p>${escapeHtml(activeBoxLabel(state, lang))}</p>
        <p class="muted">${escapeHtml(localized(mutation.description, lang))}</p>
      </div>
      <div class="button-row">
        <a class="button button-primary" href="/scan">${escapeHtml(t.nextScan)}</a>
      </div>
    `;
  }

  function initFinishPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    const summary = document.getElementById('finish-summary');
    const form = document.getElementById('finish-form');
    const message = document.getElementById('finish-message');

    setText('finish-eyebrow', t.finishEyebrow);
    setText('finish-title', t.finishTitle);
    setText('finish-lead', t.finishLead);
    setText('creature-name-label', t.creatureName);
    setText('ability-label', t.specialAbility);
    setText('photo-label', t.photo);
    setText('photo-help', t.photoHelp);
    setText('finish-submit', t.submitCreature);
    setText('finish-gallery-link', t.openGallery);

    if(!state){
      summary.innerHTML = renderNotice('feedback feedback-error', t.noSession, `<a class="button button-primary" href="/">${escapeHtml(t.continueHome)}</a>`);
      form.hidden = true;
      return;
    }

    summary.innerHTML = renderFinishSummary(state, lang);

    form.addEventListener('submit', async function(event){
      event.preventDefault();

      if(!(form instanceof HTMLFormElement)){
        return;
      }

      const formData = new FormData(form);
      const photo = formData.get('photo');

      if(!formData.get('creature_name') || !formData.get('special_ability') || !(photo instanceof File) || photo.size === 0){
        message.innerHTML = renderNotice('feedback feedback-error', t.submissionFailed, `<p>${escapeHtml(t.requiredFields)}</p>`);
        return;
      }

      formData.append('game_state', JSON.stringify(submissionState(state, lang)));

      try{
        const response = await fetch('/api/submissions', {
          method: 'POST',
          body: formData,
        });

        const payload = await response.json();

        if(!response.ok){
          throw new Error(payload.error || t.submissionFailed);
        }

        message.innerHTML = renderNotice('feedback feedback-success', t.submissionSuccess, `<a class="button button-primary" href="/gallery/index.php?/category/1">${escapeHtml(t.openGallery)}</a>`);
      }
      catch(error){
        message.innerHTML = renderNotice('feedback feedback-error', t.submissionFailed, `<p>${escapeHtml(error.message || t.submissionFailed)}</p>`);
      }
    });
  }

  function renderQuestion(question, state, lang){
    const t = ui(lang);
    const setKey = String(boot.questionSet.setId);
    const tipAvailable = Boolean(question.tip && !state.tipUsage[setKey] && state.usedTips < MAX_TIPS);
    const isText = question.type === 'text';
    const inputMarkup = isText
      ? `<div class="field">
          <label class="field-label" for="text-answer">${escapeHtml(t.textAnswerLabel)}</label>
          <input class="input" type="text" id="text-answer" name="text_answer" autocomplete="off" required>
        </div>`
      : `<div class="question-options">${question.options.map(function(option){
          return `<label class="option-button"><input type="radio" name="option" value="${escapeHtml(option.id)}" required><span>${escapeHtml(localized(option.text, lang))}</span></label>`;
        }).join('')}</div>`;

    return `
      <div class="card stack">
        <p class="pill">${escapeHtml(state.difficulty === 'hard' ? t.hard : t.easy)}</p>
        <h2>${escapeHtml(localized(question.prompt, lang))}</h2>
        ${question.note ? `<p class="muted">${escapeHtml(localized(question.note, lang))}</p>` : ''}
      </div>
      <form id="question-form" class="stack">
        ${inputMarkup}
        ${question.tip ? `
          <div class="card stack">
            <div class="button-row">
              <button class="button button-secondary" id="tip-button" type="button" ${tipAvailable ? '' : 'disabled'}>${escapeHtml(tipAvailable ? t.useTip : t.tipUsed)}</button>
              <span class="pill">${escapeHtml(format(t.tipsCount, {used: state.usedTips, max: MAX_TIPS}))}</span>
            </div>
            <div id="tip-container" ${state.tipUsage[setKey] ? '' : 'hidden'}>
              <p class="muted">${escapeHtml(localized(question.tip, lang))}</p>
            </div>
          </div>
        ` : ''}
        <div class="button-row">
          <button class="button button-primary" type="submit">${escapeHtml(t.answer)}</button>
        </div>
      </form>
    `;
  }

  function renderQuestionResult(question, result, part, lang){
    const t = ui(lang);
    const answerMarkup = question.type === 'text'
      ? `<div class="card"><strong>${escapeHtml(t.correctAnswer)}:</strong> ${escapeHtml(localized(question.answerSummary, lang))}</div>`
      : `<div class="question-options">${question.options.map(function(option){
          const classes = ['option-button'];
          if(option.id === question.correctOptionId){
            classes.push('option-correct');
          }
          else if(option.id === result.submittedValue){
            classes.push('option-wrong');
          }
          return `<div class="${classes.join(' ')}"><span>${escapeHtml(localized(option.text, lang))}</span></div>`;
        }).join('')}</div>`;

    const outcomeTitle = result.correct ? t.correct : t.wrong;
    const outcomeClass = result.correct ? 'feedback feedback-success' : 'feedback feedback-error';
    const partCopy = part
      ? `<div class="card">
          <strong>${escapeHtml(result.correct ? t.unlockedPart : t.missedPart)}:</strong>
          ${escapeHtml(localized(part.name, lang))}
          <p class="muted">${escapeHtml(localized(part.unlockText, lang))}</p>
        </div>`
      : '';

    return `
      <div class="${outcomeClass}">
        <h2>${escapeHtml(outcomeTitle)}</h2>
        ${result.correct ? '' : `<p>${escapeHtml(localized(question.answerSummary, lang))}</p>`}
      </div>
      ${answerMarkup}
      <div class="card stack">
        <strong>${escapeHtml(t.explanation)}</strong>
        <p class="muted">${escapeHtml(localized(question.explanation, lang))}</p>
      </div>
      ${partCopy}
      <div class="button-row">
        <a class="button button-primary" href="/scan">${escapeHtml(t.nextScan)}</a>
      </div>
    `;
  }

  function renderFinishSummary(state, lang){
    const t = ui(lang);
    const unlockedParts = state.unlockedPartIds.map(function(partId){
      return findPart(partId);
    }).filter(Boolean);

    const partMarkup = unlockedParts.length
      ? `<ul class="list">${unlockedParts.map(function(part){
          return `<li>${escapeHtml(localized(part.name, lang))}</li>`;
        }).join('')}</ul>`
      : `<p class="muted">${escapeHtml(t.noUnlockedParts)}</p>`;

    return `
      <div class="summary-grid">
        <div class="card">
          <strong>${escapeHtml(t.finishSummaryTitle)}</strong>
          ${partMarkup}
        </div>
        <div class="card">${escapeHtml(format(t.trackSummary, {track: state.trackId, faction: getTrack(state.trackId).faction[lang]}))}</div>
        <div class="card">${escapeHtml(format(t.activeBoxSummary, {box: activeBoxLabel(state, lang)}))}</div>
      </div>
    `;
  }

  function renderSessionStrip(state){
    const strip = document.getElementById('session-strip');

    if(!strip){
      return;
    }

    if(!state){
      strip.hidden = true;
      return;
    }

    const lang = currentLanguage(state);
    const t = ui(lang);
    const track = getTrack(state.trackId);
    strip.hidden = false;
    setText('status-track-label', t.trackLabel);
    setText('status-box-label', t.activeBoxLabel);
    setText('status-parts-label', t.partsLabel);
    setText('status-tips-label', t.tipsLabel);
    setText('status-track', track ? `#${track.id} · ${track.faction[lang]}` : '-');
    setText('status-box', activeBoxLabel(state, lang));
    setText('status-parts', format(t.partsCount, {count: state.unlockedPartIds.length, total: app.parts.length}));
    setText('status-tips', format(t.tipsCount, {used: state.usedTips, max: MAX_TIPS}));
  }

  function applyGlobalCopy(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    setText('nav-scan', t.navScan);
    setText('nav-about', t.navAbout);
    setText('nav-gallery', t.navGallery);
  }

  function populateTrackSelector(lang){
    const select = document.getElementById('track-choice');
    const t = ui(lang);

    if(!select){
      return;
    }

    select.innerHTML = `<option value="">${escapeHtml(t.chooseFreeTrack)}</option>` + app.tracks.map(function(track){
      return `<option value="${track.id}">#${track.id} · ${escapeHtml(track.mainBox[lang])} · ${escapeHtml(track.faction[lang])}</option>`;
    }).join('');
  }

  function evaluateQuestion(question, form, lang){
    if(question.type === 'text'){
      const input = form.querySelector('[name="text_answer"]');
      const value = String(input && input.value ? input.value : '').trim();
      const normalized = normalize(value);
      const accepted = (question.acceptedAnswers || []).map(normalize);
      return {
        correct: accepted.includes(normalized),
        submittedValue: value,
      };
    }

    const data = new FormData(form);
    const submittedValue = String(data.get('option') || '');
    return {
      correct: submittedValue === question.correctOptionId,
      submittedValue: submittedValue,
    };
  }

  function validateQr(rawValue){
    try{
      const url = new URL(rawValue, window.location.origin);
      if(url.origin !== window.location.origin){
        return null;
      }

      if(url.pathname === '/question'){
        const setId = Number(url.searchParams.get('set'));
        return setId >= 1 && setId <= 13 ? `/question?set=${setId}` : null;
      }

      if(url.pathname === '/mutation'){
        const name = String(url.searchParams.get('name') || '').toLowerCase();
        return app.mutations && app.mutations[name] ? `/mutation?name=${encodeURIComponent(name)}` : null;
      }

      if(url.pathname === '/finish'){
        return '/finish';
      }
    }
    catch(error){
      return null;
    }

    return null;
  }

  function submissionState(state, lang){
    return {
      language: state.language,
      difficulty: state.difficulty,
      trackId: state.trackId,
      faction: getTrack(state.trackId).faction.en,
      activeBoxLabel: activeBoxLabel(state, lang),
      mutation: state.mutation,
      unlockedPartIds: state.unlockedPartIds.slice(),
      unlockedPartNames: state.unlockedPartIds.map(function(partId){
        return localized(findPart(partId).name, lang);
      }),
      answeredSets: state.answeredSets,
    };
  }

  function newSession(language, difficulty, trackId){
    return {
      version: 1,
      language: language,
      difficulty: difficulty,
      trackId: trackId,
      mutation: null,
      currentPartIndex: 0,
      unlockedPartIds: [],
      answeredSets: {},
      selectedQuestionBySet: {},
      tipUsage: {},
      usedTips: 0,
      createdAt: new Date().toISOString(),
    };
  }

  function loadState(){
    try{
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if(!raw){
        return null;
      }
      const state = JSON.parse(raw);
      return typeof state === 'object' && state ? state : null;
    }
    catch(error){
      return null;
    }
  }

  function saveState(state){
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clearState(){
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function currentLanguage(state){
    return state && state.language === 'en' ? 'en' : 'fi';
  }

  function ui(language){
    return copy[language] || copy.fi;
  }

  function localized(value, language){
    if(value == null){
      return '';
    }
    if(typeof value === 'string'){
      return value;
    }
    return value[language] || value.fi || value.en || '';
  }

  function getTrack(trackId){
    return (app.tracks || []).find(function(track){
      return Number(track.id) === Number(trackId);
    });
  }

  function findPart(partId){
    return (app.parts || []).find(function(part){
      return part.id === partId;
    });
  }

  function activeBoxLabel(state, language){
    if(state.mutation && app.mutations && app.mutations[state.mutation]){
      return localized(app.mutations[state.mutation].activeBox, language);
    }
    const track = getTrack(state.trackId);
    return track ? localized(track.mainBox, language) : '';
  }

  function normalize(value){
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function setText(id, value){
    const element = document.getElementById(id);
    if(element){
      element.textContent = value;
    }
  }

  function format(template, params){
    return Object.keys(params).reduce(function(output, key){
      return output.replace(`{${key}}`, params[key]);
    }, template);
  }

  function renderNotice(classes, title, body){
    return `<div class="${classes}"><h2>${escapeHtml(title)}</h2>${body}</div>`;
  }

  function escapeHtml(value){
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
})();
