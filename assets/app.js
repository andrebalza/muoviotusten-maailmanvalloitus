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
      activeBoxLabel: 'Laatikko',
      partsLabel: 'Osat',
      tipsLabel: 'Vinkit',
      resumeTitle: 'Nykyinen tila',
      continueScanning: 'Jatka skannausta',
      restart: 'Aloita alusta',
      stepLanguage: 'Valitse kieli',
      stepAge: 'Minkä ikäinen olet?',
      ageOver: 'Yli 9-vuotias',
      ageUnder: 'Alle 9-vuotias',
      stepRoll: 'Heitä noppaa',
      stepRollPrompt: 'Minkä luvun sait?',
      stepTrack: 'Valitse mikä tahansa rata',
      trackConfirmEyebrow: 'Sait radan {track}',
      trackConfirmTitle: 'Onko rata vapaa?',
      trackConfirmYes: 'KYLLÄ',
      trackConfirmNo: 'EI',
      trackIntroTitle: 'Mene\nradalle {track}',
      trackIntroBelongs: 'Se kuuluu lahkolle',
      trackIntroContinue: 'JATKA',
      back: 'Takaisin',
      easy: 'Helppo',
      hard: 'Vaikea',
      openGallery: 'Avaa galleria',
      scannerEyebrow: 'Sovelluksen sisäinen skanneri',
      scannerTitle: 'Skannaa seuraava QR',
      scannerLead: 'Kysymys-, mutaatio- ja maali-QR-koodit skannataan tämän sovelluksen sisällä. Vain saman verkkotunnuksen pelilinkit hyväksytään.',
      scannerIdle: 'Avaa kamera napauttamalla "Skannaa".',
      scannerStart: 'Skannaa',
      scannerIntro1: 'Heitä noppaa ja siirry seuraavaan ruutuun.',
      scannerIntro2: 'Jos ruudussa on QR-koodi, skannaa se.',
      scannerWaiting: 'Odotetaan kameran käyttöoikeutta…',
      scannerReady: 'Suuntaa kamera QR-koodiin.',
      scannerNativeWaiting: 'Skannaa QR-koodi avautuvalla lukijalla.',
      scannerRetry: 'Yritä kameraa uudelleen',
      scannerInvalid: 'Tämä QR-koodi ei kuulu tähän peliin.',
      scannerNoCamera: 'Kameraa ei voitu käynnistää. Tarkista selaimen lupa-asetukset.',
      questionEyebrow: 'Kysymyssarja',
      questionLead: 'Vastaa kysymykseen nähdäksesi, avaako otuksesi seuraavan ruumiinosan.',
      alreadyPassedTitle: 'Tämä kysymys on jo ohitettu',
      alreadyPassedBody: 'Tälle ruudulle on jo vastattu.',
      useTip: 'Käytä vinkki',
      tipUsed: 'Vinkki käytetty',
      tipsRemaining: 'Olet käyttänyt {used} vinkkiä, sinulla on {remaining} vinkkiä jäljellä',
      tipTitle: 'Vinkki',
      answer: 'Vastaa',
      textAnswerLabel: 'Kirjoita vastauksesi',
      correct: 'Oikein!',
      wrong: 'Väärin!',
      nextScan: 'Skannaa seuraava QR',
      continueAction: 'Jatka',
      correctAnswer: 'Oikea vastaus',
      explanation: 'Selitys',
      missedPart: 'Menetitte tämän ruumiinosan',
      noSession: 'Aloita peli ensin aloitussivulta.',
      mutationEyebrow: 'Mutaatio',
      mutationTitle: 'Mutaatio aktivoitui',
      mutationLead: 'Saat kaksi seuraavaa otuksen osaa, ja laatikko vaihtuu heti.',
      mutationProceed: 'Jatka',
      noMutationParts: 'Kaikki otuksen osat on jo avattu.',
      mutationAlreadyAwarded: 'Tämä mutaatio on jo aktivoitu. Et saa siitä uusia osia, mutta laatikkosääntö pysyy voimassa.',
      finishTitle: 'Otuksesi kehittyi upeasti!',
      finishContinueBuild: 'Jatka rakentamiseen',
      finishBuildTitle: 'On aika rakentaa!',
      finishBuildIntro: [
        'Evoluutiossa kaikki osat eivät aina säily, vaan osa muuttuu tai katoaa.',
        'Vie otuksesi rakennuspisteelle ja kokoa se valitsemistasi osista.'
      ],
      finishBuildInstructions: [
        'Valitse osat pelissä saamiesi osien joukosta.',
        'Rakenna otus käyttämällä kuminauhoja, nippusiteitä ja teippiä.',
        'Käytä materiaaleja mahdollisimman vähän.',
        'Jätä loput osat pöydällä olevaan laatikkoon.'
      ],
      finishReadyNote: 'Kun otuksesi on valmis, klikkaa alla olevaa painiketta.',
      finishCreatureReady: 'Otus on valmis',
      creatureName: 'Otuksen nimi',
      specialAbility: 'Millainen erikoiskyky otuksellasi on? Keksi itse!',
      teamName: 'Ryhmänne nimi / luokka',
      partsCountLabel: 'Kuinka monta otuksen osaa käytitte? Kirjoita numero.',
      materialsTitle: 'Rakennusmateriaalit',
      materialsLabel: 'Kuinka paljon kiinnitysmateriaaleja käytitte? Kirjoita määrä numeroin.',
      rubberBands: 'Kuminauhat',
      cableTies: 'Nippusiteet',
      tapeCm: 'Teippi (cm)',
      photo: 'Mene valokuvauspisteelle ja ota otuksestasi kuva',
      photoTake: 'Ota kuva',
      photoRetake: 'Ota uusi kuva',
      submitCreature: 'Lähetä',
      submissionSuccess: 'Otus on nyt galleriassa!',
      submissionFailed: 'Lähetys epäonnistui.',
      requiredFields: 'Täytä kaikki kentät ja lisää kuva. Osat 0-99, kuminauhat ja nippusiteet 0-999, teippi 0-9999 cm.',
      continueHome: 'Palaa alkuun',
      difficultyEasy: 'Helppo',
      difficultyHard: 'Vaikea',
      difficultyLabel: 'Vaikeustaso',
      partsCount: '{count} / {total}',
      tipsCount: '{used} / {max}',
      trackSummary: 'Rata {track}: {faction}',
      activeBoxSummary: 'Laatikko: {box}',
      difficultySummary: 'Vaikeustaso: {difficulty}',
      selectedTrackSummary: 'Valittu rata: {track}',
      progressLabel: 'Edistyminen',
      progressSummary: 'Kysymykset: {answered} / {total}',
      aboutEyebrow: 'Tietoa pelistä',
      aboutTitle: 'Muoviotusten maailmanvalloitus',
      aboutLead: 'Pedagoginen jättilautapeli ja yhteisötaideteos, jossa muoviotukset syntyvät kierrätysmuovista.',
      aboutNavStory: 'Tarina',
      aboutNavWhat: 'Mistä on kyse?',
      aboutNavPlay: 'Peliohjeet',
      aboutNavVote: 'Äänestä',
      aboutNavCreators: 'Tekijät',
      aboutStoryTitle: 'Tarina',
      aboutStoryBody: [
        'On vuosi 2442. Tyynenmeren jätepyörre on kasvanut valtavaksi muovimantereeksi. Jokin sen syvyyksissä alkaa väreillä ja myllertää. Pinta kohoilee ja kuplii. Kaaoksesta alkaa hahmottua järjestys muovinkappaleiden tarrautuessa toisiinsa, aivan kuin ne olisivat elossa. Muovin ja mikro-organismien vuorovaikutus on alkanut synnyttää uudenlaista elämää: muoviotuksia!',
        'Näyttelykauden lopuksi selviää, mikä lahkoista on kasvanut hallitsevaksi lajiksi, ja yleisö äänestää nerokkaimman otuksen. Nerokkain ei ole suurin tai kaunein, vaan se, joka selviytyy niukimmilla resursseilla. Sama pätee luonnossa kaikkiin lajeihin, myös ihmiseen.',
        'Tule mukaan kilpailemaan siitä, kehittyykö juuri sinun luomuksesi muovimantereen nerokkaimmaksi otukseksi!'
      ],
      aboutWhatTitle: 'Mistä on kyse?',
      aboutWhatBody: [
        'Muoviotusten maailmanvalloitus on pedagoginen jättilautapeli ja yhteisötaideteos, joka yhdistää tieteellisen ajattelun, taiteellisen työskentelyn, ympäristökasvatuksen ja yhdessä tekemisen.',
        'Pelissä kuljetaan lattiaan merkittyjä ratoja pitkin, heitetään jättinoppaa, ratkaistaan kysymyksiä ja rakennetaan oma muoviotus kierrätysmuovista.',
        'Pelin aikana otus kehittyy vaihe vaiheelta. Ryhmät keräävät erilaisia ruumiinosia ja rakentavat niistä oman lajinsa edustajan.',
        'Valmiit muoviotukset valokuvataan verkkogalleriaan ja jätetään osaksi jatkuvasti kasvavaa installaatiota.'
      ],
      aboutPlayTitle: 'Peliohjeet',
      aboutPlayBody: [
        'Peliä pelataan 2-5 hengen ryhmissä, ja jokaisella ryhmällä tulee olla käytössä älypuhelin. Muoviamolla on neljä puhelinta lainattavissa. Koululuokat voivat halutessaan muodostaa ryhmät jo ennen paikalle saapumista.',
        'Pelin aikana tarvitaan monenlaisia tehtäviä: ohjeiden ja tarinatekstien lukemista ääneen, nopan heittämistä, pelinappulan siirtämistä, korin kantamista, osien keräämistä ja otuksen rakentamista. Tehtäviä voi vaihtaa pelin aikana, jotta jokainen pääsee osallistumaan eri tavoin.'
      ],
      aboutFlowTitle: 'Pelin kulku',
      aboutFlowSteps: [
        'Jakaannutaan ryhmiin, valitaan pelinappula ja otetaan kori.',
        'Heitetään noppaa ja arvotaan pelirata.',
        'Siirrytään radalle ja aloitetaan peli.',
        'Kerätään osia ja rakennetaan oma muoviotus.',
        'Siirrytään valokuvauspisteelle ja otetaan otuksesta kuva.',
        'Otus tuodaan lopuksi ohjaajalle ripustettavaksi installaatioon.'
      ],
      aboutVoteTitle: 'Äänestä suosikkia!',
      aboutVoteBody: [
        'Puhelimella voi myös äänestää omaa suosikkimuoviotusta verkkogalleriassa.'
      ],
      aboutCreatorsTitle: 'Tekijät',
      aboutCreatorTitle: 'Tekijä',
      aboutCreatorName: 'Maaria Klemetti',
      aboutPartnersTitle: 'Yhteistyökumppanit',
      aboutPartnersCopy: 'Tiedettä kaikille, Kulttuuriaitta ja Suomen Kulttuurirahaston Keski-Suomen rahasto.',
      aboutFundingBody: [
        'Hankkeen on rahoittanut Keski-Suomen kulttuurirahasto, Muoviamo ry ja Raylab Oy.'
      ],
    },
    en: {
      navScan: 'Scan',
      navAbout: 'About',
      navGallery: 'Gallery',
      trackLabel: 'Track',
      activeBoxLabel: 'Box',
      partsLabel: 'Parts',
      tipsLabel: 'Tips',
      resumeTitle: 'Current status',
      continueScanning: 'Continue scanning',
      restart: 'Start over',
      stepLanguage: 'Choose language',
      stepAge: 'How old are you?',
      ageOver: 'Over 9 years',
      ageUnder: 'Under 9 years',
      stepRoll: 'Roll the dice',
      stepRollPrompt: 'What number did you get?',
      stepTrack: 'Choose any track',
      trackConfirmEyebrow: 'You got track {track}.',
      trackConfirmTitle: 'Is the track free?',
      trackConfirmYes: 'YES',
      trackConfirmNo: 'NO',
      trackIntroTitle: 'Go to\ntrack {track}',
      trackIntroBelongs: 'It belongs to\nfaction',
      trackIntroContinue: 'CONTINUE',
      back: 'Back',
      easy: 'Easy',
      hard: 'Hard',
      openGallery: 'Open gallery',
      scannerEyebrow: 'In-app scanner',
      scannerTitle: 'Scan the next QR',
      scannerLead: 'Question, mutation, and finish QR codes are scanned inside this web app. Only same-origin gameplay links are accepted.',
      scannerIdle: 'Tap "Scan" to open the camera.',
      scannerStart: 'Scan',
      scannerIntro1: 'Roll the die and move to the next tile.',
      scannerIntro2: 'If the tile has a QR code, scan it.',
      scannerWaiting: 'Waiting for camera access…',
      scannerReady: 'Point the camera at a QR code.',
      scannerNativeWaiting: 'Scan the QR code in the reader that opens.',
      scannerRetry: 'Retry camera',
      scannerInvalid: 'That QR code is not part of this game.',
      scannerNoCamera: 'The camera could not be started. Check the browser permission settings.',
      questionEyebrow: 'Question set',
      questionLead: 'Answer the question to see whether your creature unlocks the next body part.',
      alreadyPassedTitle: 'This question was already passed',
      alreadyPassedBody: 'This tile was already answered.',
      useTip: 'Use tip',
      tipUsed: 'Tip used',
      tipsRemaining: 'You have used {used} tip, you have {remaining} tips left',
      tipTitle: 'Tip',
      answer: 'Answer',
      textAnswerLabel: 'Type your answer',
      correct: 'Correct!',
      wrong: 'Wrong!',
      nextScan: 'Scan the next QR',
      continueAction: 'Continue',
      correctAnswer: 'Correct answer',
      explanation: 'Explanation',
      missedPart: 'You permanently missed this body part',
      noSession: 'Start the game from the home page first.',
      mutationEyebrow: 'Mutation',
      mutationTitle: 'Mutation activated',
      mutationLead: 'You receive the next two creature parts, and the box changes immediately.',
      mutationProceed: 'Proceed',
      noMutationParts: 'All creature parts are already unlocked.',
      mutationAlreadyAwarded: 'This mutation has already been activated. It does not give new parts again, but the box rule remains active.',
      finishTitle: 'Amazing evolution!',
      finishContinueBuild: 'Continue to building',
      finishBuildTitle: 'It’s time to build!',
      finishBuildIntro: [
        'In evolution, not all parts always remain; some parts change or disappear.',
        'Take your creature to the building station and assemble it from the parts you choose.'
      ],
      finishBuildInstructions: [
        'Choose parts from the ones you received during the game.',
        'Build the creature using rubber bands, cable ties, and tape.',
        'Use as little material as possible.',
        'Leave the remaining parts in the box on the table.'
      ],
      finishReadyNote: 'When your creature is ready, click the button below.',
      finishCreatureReady: 'Creature is ready',
      creatureName: 'Creature name',
      specialAbility: 'What special ability does your creature have? Make it up!!',
      teamName: 'Your team name / class',
      partsCountLabel: 'How many parts did you use? Enter a number.',
      materialsTitle: 'Building materials',
      materialsLabel: 'How much fastening material did you use? Enter the amount.',
      rubberBands: 'Rubber bands',
      cableTies: 'Cable ties',
      tapeCm: 'Tape (cm)',
      photo: 'Take your creature to the photo area and take a photo',
      photoTake: 'Take photo',
      photoRetake: 'Retake photo',
      submitCreature: 'Submit',
      submissionSuccess: 'The creature was submitted successfully.',
      submissionFailed: 'Submission failed.',
      requiredFields: 'Fill in all fields and add a photo. Parts 0-99, rubber bands and cable ties 0-999, tape 0-9999 cm.',
      continueHome: 'Back to start',
      difficultyEasy: 'Easy',
      difficultyHard: 'Hard',
      difficultyLabel: 'Difficulty',
      partsCount: '{count} / {total}',
      tipsCount: '{used} / {max}',
      trackSummary: 'Track {track}: {faction}',
      activeBoxSummary: 'Box: {box}',
      difficultySummary: 'Difficulty: {difficulty}',
      selectedTrackSummary: 'Selected track: {track}',
      progressLabel: 'Progress',
      progressSummary: 'Questions: {answered} / {total}',
      aboutEyebrow: 'About the game',
      aboutTitle: 'The Rise of Plastic Creatures',
      aboutLead: 'A pedagogical giant board game and community artwork where plastic creatures evolve from recycled plastic.',
      aboutNavStory: 'Story',
      aboutNavWhat: 'What is it about?',
      aboutNavPlay: 'How to play',
      aboutNavVote: 'Vote',
      aboutNavCreators: 'Creators',
      aboutStoryTitle: 'Story',
      aboutStoryBody: [
        'It is the year 2442. The Great Pacific Garbage Patch has grown into a vast plastic continent. Something stirs deep within its depths, churning and pulsing. The surface heaves and bubbles. Out of the chaos, order begins to emerge as pieces of plastic cling to one another, as if alive. The interaction between plastic and microorganisms has begun to generate a new form of life: plastic creatures!',
        'At the end of the exhibition season, it will be revealed which group has grown into the dominant species, and the audience votes for the most ingenious creature. The most ingenious is not the largest or the most beautiful, but the one that survives on the fewest resources. The same applies in nature to all species, including humans.',
        'Come and compete to see whether your very own creation will evolve into the most ingenious creature on the plastic continent!'
      ],
      aboutWhatTitle: 'What is it about?',
      aboutWhatBody: [
        'The Rise of Plastic Creatures is a pedagogical giant board game and community artwork that combines scientific thinking, artistic practice, environmental education, and collaborative making.',
        'Players follow routes marked on the floor, roll a giant die, solve questions, and build their own plastic creature from recycled plastic.',
        'The creature evolves step by step as groups collect different body parts and assemble their own species representative.',
        'Finished plastic creatures are photographed into an online gallery and become part of a continuously growing installation.'
      ],
      aboutPlayTitle: 'How to play',
      aboutPlayBody: [
        'The game is played in groups of 2-5 people, and each group needs access to a smartphone. Four phones are available to borrow at the Muoviamo. School classes may form their groups before arriving if they wish.',
        'During the game, various tasks are needed: reading instructions and story texts aloud, rolling the die, moving the game piece, carrying the basket, collecting parts, and building the creature. Tasks can be swapped during the game so that everyone gets to participate in different ways.'
      ],
      aboutFlowTitle: 'How the game proceeds',
      aboutFlowSteps: [
        'Split into groups, choose a game piece, and take a basket.',
        'Roll the die to determine your route.',
        'Move to the route and start the game.',
        'Collect parts and build your own plastic creature.',
        'Move to the photo point and take a picture of your creature.',
        'Finally, bring your creature to the guide to be hung in the installation.'
      ],
      aboutVoteTitle: 'Vote for your favourite!',
      aboutVoteBody: [
        'You can also use your phone to vote for your favourite plastic creature in the online gallery.'
      ],
      aboutCreatorsTitle: 'Creators',
      aboutCreatorTitle: 'Creator',
      aboutCreatorName: 'Maaria Klemetti',
      aboutPartnersTitle: 'Collaboration partners',
      aboutPartnersCopy: 'Tiedettä kaikille, Kulttuuriaitta, and the Central Finland Regional Fund of the Finnish Cultural Foundation.',
      aboutFundingBody: [
        'Funded by the Central Finland Cultural Foundation, Muoviamo ry and Raylab Oy.'
      ],
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
      document.body.classList.add('game-active', 'resume-active');
      resumePanel.hidden = false;
      startFlow.hidden = true;
      setText('resume-title', t.resumeTitle);
      setText('resume-scan-button', t.continueScanning);
      setText('restart-button', t.restart);
      const track = getTrack(state.trackId);
      const answeredCount = Object.keys(state.answeredSets || {}).length;
      resumeSummary.innerHTML = [
        renderResumeStatusCard('/assets/icons/track_icon.svg', t.trackLabel, track ? `${state.trackId}: ${track.faction[lang]}` : '-'),
        renderResumeStatusCard('/assets/icons/box.svg', t.activeBoxLabel, activeBoxLabel(state, lang)),
        renderResumeStatusCard('/assets/icons/creature_part_icon.svg', t.partsLabel, format(t.partsCount, {count: state.unlockedPartIds.length, total: app.parts.length})),
        renderResumeStatusCard('/assets/icons/bulb.svg', t.tipsLabel, format(t.tipsCount, {used: state.usedTips, max: MAX_TIPS})),
        renderResumeStatusCard('', t.difficultyLabel, state.difficulty === 'hard' ? t.difficultyHard : t.difficultyEasy),
        renderResumeStatusCard('', t.progressLabel, format(t.progressSummary, {answered: answeredCount, total: app.parts.length})),
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
    document.body.classList.remove('game-active', 'resume-active');
    resumePanel.hidden = true;
    startFlow.hidden = false;

    const choices = {language: 'fi', difficulty: null, roll: null, trackId: null};
    const order = ['language', 'age', 'roll', 'track', 'confirm', 'intro'];
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
        heroEl.hidden = (name === 'roll' || name === 'confirm' || name === 'intro');
      }
      startFlow.classList.toggle('start-flow--roll', name === 'roll');
      startFlow.classList.toggle('start-flow--confirm', name === 'confirm');
      startFlow.classList.toggle('start-flow--intro', name === 'intro');
      applyStartCopy();
      if(name === 'intro'){
        renderTrackIntro();
      }
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
      setText('track-confirm-title', t.trackConfirmTitle);
      setText('track-confirm-yes', t.trackConfirmYes);
      setText('track-confirm-no', t.trackConfirmNo);
      setText('track-intro-continue-label', t.trackIntroContinue);
      setText('age-back', t.back);
      setText('roll-back', t.back);
      setText('track-back', t.back);
      renderTrackConfirmationNumber();
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
        showStep('confirm');
      });
    });

    function renderTrackConfirmationNumber(){
      const t = ui(choices.language);
      setText('track-confirm-eyebrow', format(t.trackConfirmEyebrow, {track: choices.trackId ? String(choices.trackId) : ''}));
      setText('track-confirm-number', choices.trackId ? String(choices.trackId) : '');
    }

    function renderTrackIntro(){
      const lang = choices.language;
      const t = ui(lang);
      const track = getTrack(choices.trackId);

      if(!track){
        return;
      }

      const faction = capitalizeFirst(localized(track.faction, lang));
      const introDescription = track.introDescription || {};
      const selectedDescription = introDescription[choices.difficulty] || introDescription;
      const description = localized(selectedDescription, lang);
      const descriptionBody = stripLeadingLabel(description, faction);
      const image = document.getElementById('track-intro-image');
      const descriptionEl = document.getElementById('track-intro-description');

      setText('track-intro-title', format(t.trackIntroTitle, {track: track.id}));
      setText('track-intro-belongs', t.trackIntroBelongs);
      setText('track-intro-faction', faction);

      if(image){
        image.src = track.introImage || '';
        image.alt = faction;
      }

      if(descriptionEl){
        descriptionEl.innerHTML = `<strong>${escapeHtml(faction)}</strong> ${escapeHtml(descriptionBody)}`;
      }
    }

    function renderTrackButtons(){
      const lang = choices.language;
      const container = document.getElementById('track-buttons');
      container.innerHTML = (app.tracks || []).map(function(track){
        return '<button class="big-button" type="button" data-track="'+track.id+'">'
          +'<span class="big-button__title">'+escapeHtml(track.id+' '+track.faction[lang])+'</span>'
          +'<span class="big-button__sub">'+escapeHtml(track.mainBox[lang])+'</span>'
          +'</button>';
      }).join('');
      container.querySelectorAll('[data-track]').forEach(function(button){
        button.addEventListener('click', function(){
          choices.trackId = Number(button.getAttribute('data-track'));
          showStep('confirm');
        });
      });
    }

    startFlow.querySelectorAll('[data-back]').forEach(function(button){
      button.addEventListener('click', function(){
        showStep(button.getAttribute('data-back'));
      });
    });

    const confirmYes = document.getElementById('track-confirm-yes');
    const confirmNo = document.getElementById('track-confirm-no');

    if(confirmYes){
      confirmYes.addEventListener('click', function(){
        showStep('intro');
      });
    }

    if(confirmNo){
      confirmNo.addEventListener('click', function(){
        choices.roll = null;
        choices.trackId = null;
        showStep('roll');
      });
    }

    const introContinue = document.getElementById('track-intro-continue');

    if(introContinue){
      introContinue.addEventListener('click', function(){
        finishStart();
      });
    }

    function finishStart(){
      saveState(newSession(choices.language, choices.difficulty || 'easy', choices.trackId));
      window.location.assign('/scan');
    }

    showStep('language');
  }

  function renderResumeStatusCard(icon, label, value, isActive){
    const iconMarkup = icon ? `<img class="resume-status-card__icon" src="${escapeHtml(icon)}" alt="">` : '<span class="resume-status-card__icon resume-status-card__icon--dot" aria-hidden="true"></span>';
    const activeClass = isActive ? ' resume-status-card--active' : '';

    return `
      <div class="resume-status-card${activeClass}">
        ${iconMarkup}
        <div class="resume-status-card__body">
          <span class="resume-status-card__label">${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      </div>
    `;
  }

  function initScanPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    setText('scan-eyebrow', t.scannerEyebrow);
    setText('scan-title', t.scannerTitle);
    setText('scan-lead', t.scannerLead);
    setText('scanner-status', t.scannerIdle);
    setText('scanner-start-label', t.scannerStart);
    setText('scanner-retry', t.scannerRetry);
    setText('scan-intro-line1', t.scannerIntro1);
    setText('scan-intro-line2', t.scannerIntro2);

    const panel = document.querySelector('[data-scanner-state]');
    const frame = document.getElementById('scanner-frame');
    const video = document.getElementById('scanner-video');
    const status = document.getElementById('scanner-status');
    const startButton = document.getElementById('scanner-start');
    const retry = document.getElementById('scanner-retry');

    if(!state){
      setText('scanner-status', t.noSession);
      setState('idle');
      if(startButton){
        startButton.hidden = true;
      }
      const intro = document.getElementById('scanner-intro');
      if(intro){ intro.hidden = true; }
      return;
    }

    let stream = null;
    let frameTimer = null;
    let detecting = false;
    const fullyScanner = window.fully && typeof window.fully.scanQrCode === 'function'
      ? window.fully
      : null;
    if(fullyScanner && retry){
      retry.textContent = t.scannerStart;
    }
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', {willReadFrequently: true});
    const detector = typeof window.BarcodeDetector === 'function'
      ? new window.BarcodeDetector({formats: ['qr_code']})
      : null;

    function setState(next){
      if(panel){
        panel.dataset.scannerState = next;
      }

      if(next === 'idle'){
        if(frame){ frame.hidden = true; }
        if(startButton){ startButton.hidden = false; }
        if(retry){ retry.hidden = true; }
        status.textContent = t.scannerIdle;
      }
      else if(next === 'requesting'){
        if(frame){ frame.hidden = false; }
        if(startButton){ startButton.hidden = true; }
        if(retry){ retry.hidden = true; }
        status.textContent = t.scannerWaiting;
      }
      else if(next === 'native'){
        if(frame){ frame.hidden = true; }
        if(startButton){ startButton.hidden = true; }
        if(retry){ retry.hidden = false; }
        status.textContent = t.scannerNativeWaiting;
      }
      else if(next === 'active'){
        if(frame){ frame.hidden = false; }
        if(startButton){ startButton.hidden = true; }
        if(retry){ retry.hidden = true; }
        status.textContent = t.scannerReady;
      }
      else if(next === 'error'){
        if(frame){ frame.hidden = true; }
        if(startButton){ startButton.hidden = true; }
        if(retry){ retry.hidden = false; }
        status.textContent = t.scannerNoCamera;
      }
    }

    function readFullyScanResult(){
      const hash = window.location.hash || '';
      const marker = '#code=';

      if(!hash.startsWith(marker)){
        return null;
      }

      try{
        return decodeURIComponent(hash.slice(marker.length));
      }
      catch(error){
        return hash.slice(marker.length);
      }
    }

    function clearFullyScanResult(){
      if(window.location.hash.startsWith('#code=')){
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
      }
    }

    function handleScannedValue(rawValue){
      const nextUrl = validateQr(rawValue);

      if(nextUrl){
        stop();
        window.location.assign(nextUrl);
        return true;
      }

      status.textContent = t.scannerInvalid;
      return false;
    }

    function startFullyScanner(){
      setState('native');

      try{
        const prompt = t.scannerNativeWaiting;
        const targetUrl = `${window.location.origin}/scan#code=$code`;
        fullyScanner.scanQrCode(prompt, targetUrl, -1, 60, true, true);
      }
      catch(error){
        setState('error');
      }
    }

    async function start(){
      stop();

      if(fullyScanner){
        startFullyScanner();
        return;
      }

      if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        setState('error');
        return;
      }

      setState('requesting');

      try{
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: {ideal: 'environment'},
          },
          audio: false,
        });

        video.srcObject = stream;
        await video.play();
        setState('active');

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
              if(handleScannedValue(rawValue)){
                return;
              }
            }
          }
          catch(error){
            setState('error');
            stop();
          }
          finally{
            detecting = false;
          }
        }, 350);
      }
      catch(error){
        setState('error');
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

      if(video){
        video.srcObject = null;
      }
    }

    if(startButton){
      startButton.addEventListener('click', function(){
        start();
      });
    }

    if(retry){
      retry.addEventListener('click', function(){
        start();
      });
    }

    window.addEventListener('pagehide', stop);

    const fullyScanResult = readFullyScanResult();
    if(fullyScanResult){
      clearFullyScanResult();
      if(handleScannedValue(fullyScanResult)){
        return;
      }
      setState('idle');
      status.textContent = t.scannerInvalid;
      return;
    }

    setState('idle');
  }

  function initAboutPage(state){
    let lang = currentLanguage(state);
    const languageButtons = document.querySelectorAll('[data-about-language]');
    const tabButtons = document.querySelectorAll('[data-about-tab]');
    const tabPanels = document.querySelectorAll('[data-about-panel]');
    let activeTab = 'story';

    function showAboutTab(tabId){
      activeTab = tabId || 'story';
      tabButtons.forEach(function(button){
        const isCurrent = button.getAttribute('data-about-tab') === activeTab;
        button.classList.toggle('is-active', isCurrent);
        button.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        button.setAttribute('tabindex', isCurrent ? '0' : '-1');
      });
      tabPanels.forEach(function(panel){
        panel.hidden = panel.getAttribute('data-about-panel') !== activeTab;
      });
    }

    function renderAbout(){
      const t = ui(lang);
      document.documentElement.lang = lang;
      applyGlobalCopy({language: lang});
      if(state){
        renderSessionStrip(Object.assign({}, state, {language: lang}));
      }
      setText('about-eyebrow', t.aboutEyebrow);
      setText('about-title', t.aboutTitle);
      setText('about-lead', t.aboutLead);
      setText('about-nav-story', t.aboutNavStory);
      setText('about-nav-what', t.aboutNavWhat);
      setText('about-nav-play', t.aboutNavPlay);
      setText('about-nav-vote', t.aboutNavVote);
      setText('about-nav-creators', t.aboutNavCreators);
      setText('about-story-title', t.aboutStoryTitle);
      setText('about-what-title', t.aboutWhatTitle);
      setText('about-play-title', t.aboutPlayTitle);
      setText('about-flow-title', t.aboutFlowTitle);
      setText('about-vote-title', t.aboutVoteTitle);
      setText('about-creators-title', t.aboutCreatorsTitle);
      setText('about-gallery-button', t.navGallery);
      renderAboutCards('about-story-body', t.aboutStoryBody, {boldFirst: true});
      renderAboutCards('about-what-body', t.aboutWhatBody);
      renderAboutCards('about-play-body', t.aboutPlayBody);
      renderAboutCards('about-vote-body', t.aboutVoteBody);
      renderAboutCards('about-funding-body', t.aboutFundingBody);
      renderAboutSteps('about-flow-list', t.aboutFlowSteps);
      languageButtons.forEach(function(button){
        const isCurrent = button.getAttribute('data-about-language') === lang;
        button.classList.toggle('is-active', isCurrent);
        button.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      });
      showAboutTab(activeTab);
    }

    languageButtons.forEach(function(button){
      button.addEventListener('click', function(){
        lang = button.getAttribute('data-about-language') === 'en' ? 'en' : 'fi';
        renderAbout();
      });
    });

    tabButtons.forEach(function(button){
      button.addEventListener('click', function(){
        showAboutTab(button.getAttribute('data-about-tab'));
      });
    });

    renderAbout();
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
      panel.innerHTML = `
        <div class="card stack">
          <h2>${escapeHtml(t.alreadyPassedBody)}</h2>
        </div>
        <div class="button-row">
          <a class="button button-primary" href="/scan">${escapeHtml(t.continueAction)}</a>
        </div>
      `;
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
        tipButton.textContent = format(t.tipsRemaining, {used: state.usedTips, remaining: Math.max(0, MAX_TIPS - state.usedTips)});
      });
    }

    form.addEventListener('submit', function(event){
      event.preventDefault();
      const result = evaluateQuestion(question, form, lang);
      const awardCount = questionPartAdvanceCount(questionSet, result);
      const parts = nextAvailableParts(state, awardCount);

      state.answeredSets[setKey] = {
        questionId: question.id,
        correct: result.correct,
        partId: parts[0] ? parts[0].id : null,
        partIds: parts.map(function(part){
          return part.id;
        }),
      };

      if(result.correct){
        parts.forEach(function(part){
          state.unlockedPartIds.push(part.id);
        });
      }

      state.currentPartIndex = nextPartIndex(state);
      saveState(state);
      renderSessionStrip(state);

      panel.innerHTML = renderQuestionResult(question, result, parts, state, lang);
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

    const mutationAward = applyMutationAward(state, mutation);
    state.mutation = mutation.slug;
    saveState(state);
    renderSessionStrip(state);

    const resultTitle = localized(mutation.resultTitle, lang) || localized(mutation.name, lang);
    const description = mutationDescription(mutation, mutationAward, state, lang);

    panel.innerHTML = `
      <div class="feedback feedback-success">
        <h2>${escapeHtml(resultTitle)}</h2>
        <p class="muted">${description}</p>
      </div>
      <div class="button-row">
        <a class="button button-primary" href="/scan">${escapeHtml(t.mutationProceed)}</a>
      </div>
    `;
  }

  function initFinishPage(state){
    const lang = currentLanguage(state);
    const t = ui(lang);
    const stepAchievement = document.getElementById('finish-step-achievement');
    const stepBuild = document.getElementById('finish-step-build');
    const stepForm = document.getElementById('finish-step-form');
    const form = document.getElementById('finish-form');
    const message = document.getElementById('finish-message');
    const continueBuildButton = document.getElementById('finish-continue-build');
    const creatureReadyButton = document.getElementById('finish-creature-ready');

    setText('finish-title', t.finishTitle);
    setText('finish-continue-build', t.finishContinueBuild);
    setText('finish-build-title', t.finishBuildTitle);
    renderTextParagraphs('finish-build-intro', t.finishBuildIntro);
    renderTextList('finish-build-instructions', t.finishBuildInstructions);
    setText('finish-ready-note', t.finishReadyNote);
    setText('finish-creature-ready', t.finishCreatureReady);
    setText('creature-name-label', t.creatureName);
    setText('ability-label', t.specialAbility);
    setText('team-name-label', t.teamName);
    setText('parts-count-label', t.partsCountLabel);
    setText('materials-title', t.materialsTitle);
    setText('materials-label', t.materialsLabel);
    setText('rubber-bands-label', t.rubberBands);
    setText('cable-ties-label', t.cableTies);
    setText('tape-cm-label', t.tapeCm);
    setText('photo-label', t.photo);
    setText('photo-trigger-label', t.photoTake);
    setText('finish-submit', t.submitCreature);
    setText('finish-success-title', t.submissionSuccess);
    setText('finish-success-home', t.continueHome);
    setText('finish-success-gallery', t.openGallery);

    if(!state){
      if(stepAchievement){
        stepAchievement.innerHTML = renderNotice('feedback feedback-error', t.noSession, `<a class="button button-primary" href="/">${escapeHtml(t.continueHome)}</a>`);
      }
      return;
    }

    const partCount = (state.unlockedPartIds || []).length;
    setText('finish-achievement-text', achievementText(partCount, lang));

    const partsCountInput = document.getElementById('parts_count');
    if(partsCountInput && partsCountInput.value === ''){
      partsCountInput.value = String(partCount);
    }

    if(continueBuildButton && stepBuild){
      continueBuildButton.addEventListener('click', function(){
        stepBuild.hidden = false;
        if(stepAchievement){ stepAchievement.hidden = true; }
        stepBuild.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    }

    if(creatureReadyButton && stepForm){
      creatureReadyButton.addEventListener('click', function(){
        stepForm.hidden = false;
        if(stepBuild){ stepBuild.hidden = true; }
        stepForm.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    }

    const photoInput = document.getElementById('photo');
    const photoPreview = document.getElementById('photo-preview');
    const photoPreviewImg = document.getElementById('photo-preview-img');
    const photoPreviewName = document.getElementById('photo-preview-name');
    const photoTriggerLabel = document.getElementById('photo-trigger-label');

    if(photoInput){
      photoInput.addEventListener('change', function(){
        const file = photoInput.files && photoInput.files[0];
        if(!file){
          if(photoPreview){ photoPreview.hidden = true; }
          if(photoTriggerLabel){ photoTriggerLabel.textContent = t.photoTake; }
          return;
        }
        if(photoPreviewName){ photoPreviewName.textContent = file.name; }
        if(photoPreviewImg){
          const url = URL.createObjectURL(file);
          photoPreviewImg.src = url;
          photoPreviewImg.onload = function(){ URL.revokeObjectURL(url); };
        }
        if(photoPreview){ photoPreview.hidden = false; }
        if(photoTriggerLabel){ photoTriggerLabel.textContent = t.photoRetake; }
      });
    }

    if(!form){
      return;
    }

    form.addEventListener('submit', async function(event){
      event.preventDefault();

      if(!(form instanceof HTMLFormElement)){
        return;
      }

      const formData = new FormData(form);
      const photo = formData.get('photo');
      const integerFields = {
        parts_count: 99,
        rubber_bands: 999,
        cable_ties: 999,
        tape_cm: 9999,
      };

      const missingText = !formData.get('creature_name') || !formData.get('special_ability') || !formData.get('team_name');
      const missingPhoto = !(photo instanceof File) || photo.size === 0;
      const invalidNumbers = Object.entries(integerFields).some(function(entry){
        const field = entry[0];
        const max = entry[1];
        const raw = formData.get(field);
        if(raw === null || String(raw).trim() === ''){
          return true;
        }
        const num = Number(raw);
        return !Number.isFinite(num) || num < 0 || num > max || !Number.isInteger(num);
      });

      if(missingText || missingPhoto || invalidNumbers){
        message.innerHTML = renderNotice('feedback feedback-error', t.submissionFailed, `<p>${escapeHtml(t.requiredFields)}</p>`);
        return;
      }

      Object.keys(integerFields).forEach(function(field){
        formData.set(field, String(parseInt(String(formData.get(field)), 10)));
      });
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

        clearState();
        renderSessionStrip(null);

        const stepSuccess = document.getElementById('finish-step-success');
        if(stepForm){ stepForm.hidden = true; }
        if(stepSuccess){
          stepSuccess.hidden = false;
          stepSuccess.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      }
      catch(error){
        message.innerHTML = renderNotice('feedback feedback-error', t.submissionFailed, `<p>${escapeHtml(error.message || t.submissionFailed)}</p>`);
      }
    });
  }

  function achievementText(partCount, lang){
    const map = (app && app.achievementByPartCount) || {};
    const entry = map[partCount] || map[String(partCount)] || map[0] || map['0'];
    return entry ? localized(entry, lang) : '';
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
      : `<div class="question-options">${question.options.map(function(option, index){
          return `<label class="option-button"><input type="radio" name="option" value="${escapeHtml(option.id)}" required><span class="option-number">${String.fromCharCode(65 + index)}</span><span class="option-text">${escapeHtml(localized(option.text, lang))}</span></label>`;
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
          <div class="tip-block stack">
            <div id="tip-container" class="tip-card" ${state.tipUsage[setKey] ? '' : 'hidden'}>
              <p class="tip-card__title">${escapeHtml(t.tipTitle)}</p>
              <p class="tip-card__body">${escapeHtml(localized(question.tip, lang))}</p>
            </div>
            <button class="button button-secondary tip-button" id="tip-button" type="button" ${tipAvailable ? '' : 'disabled'}>${escapeHtml(tipAvailable ? t.useTip : format(t.tipsRemaining, {used: state.usedTips, remaining: Math.max(0, MAX_TIPS - state.usedTips)}))}</button>
          </div>
        ` : ''}
        <div class="button-row">
          <button class="button button-primary" type="submit">${escapeHtml(t.answer)}</button>
        </div>
      </form>
    `;
  }

  function renderQuestionResult(question, result, parts, state, lang){
    const t = ui(lang);
    parts = parts || [];
    const isText = question.type === 'text';
    let correctLetter = '';
    let correctText = '';

    if(isText){
      correctText = localized(question.answerSummary, lang);
    }
    else{
      const idx = (question.options || []).findIndex(function(option){
        return option.id === question.correctOptionId;
      });
      if(idx >= 0){
        correctLetter = String.fromCharCode(65 + idx);
        correctText = localized(question.options[idx].text, lang);
      }
      else{
        correctText = localized(question.answerSummary, lang);
      }
    }

    const outcomeTitle = result.correct ? t.correct : t.wrong;
    const resultModifier = result.correct ? 'result--correct' : 'result--wrong';
    const cardModifier = result.correct ? 'is-correct' : 'is-wrong';

    const partLine = (parts.length && result.correct)
      ? `<div class="result-subtitle">
          ${parts.map(function(part){
            return `<p>${renderInlineMarkdown(partUnlockText(part, state, lang))}</p>`;
          }).join('')}
        </div>`
      : '';

    const answerBlock = !result.correct
      ? `<div class="result-section">
          <h3 class="result-section__title">${escapeHtml(t.correctAnswer)}:${correctLetter ? ` <span class="result-letter">${escapeHtml(correctLetter)}</span>` : ''}</h3>
          <p class="result-section__body">${escapeHtml(correctText)}</p>
        </div>
        <hr class="result-divider">`
      : '';

    return `
      <div class="result ${resultModifier}">
        <h2 class="result-title">${escapeHtml(outcomeTitle)}</h2>
      </div>
      <div class="result-card ${cardModifier}">
        ${answerBlock}
        <div class="result-section">
          <h3 class="result-section__title result-section__title--accent">${escapeHtml(t.explanation)}:</h3>
          <p class="result-section__body">${escapeHtml(localized(question.explanation, lang))}</p>
        </div>
      </div>
      ${partLine}
      <div class="button-row">
        <a class="button button-primary" href="/scan">${escapeHtml(t.continueAction)}</a>
      </div>
    `;
  }

  function partUnlockText(part, state, lang){
    const fallback = localized(part.name, lang);
    const template = localized(part.unlockText, lang) || fallback;

    return format(template, {
      BoxName: activeBoxLabel(state, lang),
    });
  }

  function questionPartAdvanceCount(questionSet, result){
    if(!result.correct){
      return 1;
    }

    const imageQuestionSetIds = (settings.imageQuestionSetIds || []).map(Number);
    return imageQuestionSetIds.includes(Number(questionSet.setId)) ? 2 : 1;
  }

  function applyMutationAward(state, mutation){
    state.mutationAwards = state.mutationAwards && typeof state.mutationAwards === 'object' ? state.mutationAwards : {};

    if(state.mutationAwards[mutation.slug]){
      return {
        alreadyAwarded: true,
        parts: partsByIds(state.mutationAwards[mutation.slug].partIds || []),
      };
    }

    const parts = nextAvailableParts(state, 2);
    const partIds = parts.map(function(part){
      return part.id;
    });

    parts.forEach(function(part){
      if(!state.unlockedPartIds.includes(part.id)){
        state.unlockedPartIds.push(part.id);
      }
    });

    state.mutationAwards[mutation.slug] = {
      partIds: partIds,
      awardedAt: new Date().toISOString(),
    };
    state.currentPartIndex = nextPartIndex(state);

    return {
      alreadyAwarded: false,
      parts: parts,
    };
  }

  function mutationDescription(mutation, award, state, lang){
    const t = ui(lang);
    const parts = award.parts || [];

    if(award.alreadyAwarded){
      return escapeHtml(t.mutationAlreadyAwarded);
    }

    const first = mutationPartLabel(parts[0], lang);
    const second = mutationPartLabel(parts[1], lang);

    if(!first){
      return escapeHtml(t.noMutationParts);
    }

    const template = second
      ? localized(mutation.description, lang)
      : localized(mutation.descriptionOnePart, lang);
    return renderInlineMarkdown(format(template, {
      NextPart1: first,
      NextPart2: second,
      BoxName: activeBoxLabel(state, lang),
    }));
  }

  function mutationPartLabel(part, lang){
    if(!part){
      return '';
    }

    return localized(part.shortName, lang) || localized(part.name, lang);
  }

  function partsByIds(partIds){
    return partIds.map(function(partId){
      return findPart(partId);
    }).filter(Boolean);
  }

  function nextAvailableParts(state, count){
    const consumedIds = consumedPartIds(state);

    return (app.parts || []).filter(function(part){
      return !consumedIds.has(part.id);
    }).slice(0, count);
  }

  function nextPartIndex(state){
    const consumedIds = consumedPartIds(state);
    const firstAvailableIndex = (app.parts || []).findIndex(function(part){
      return !consumedIds.has(part.id);
    });

    return firstAvailableIndex >= 0 ? firstAvailableIndex : (app.parts || []).length;
  }

  function consumedPartIds(state){
    const ids = new Set();

    addPartIds(ids, state.unlockedPartIds);

    Object.keys(state.answeredSets || {}).forEach(function(setKey){
      const answer = state.answeredSets[setKey];
      addPartIds(ids, answer && answer.partIds);
      addPartIds(ids, answer && answer.partId);
    });

    Object.keys(state.mutationAwards || {}).forEach(function(slug){
      const award = state.mutationAwards[slug];
      addPartIds(ids, award && award.partIds);
    });

    return ids;
  }

  function addPartIds(ids, value){
    if(Array.isArray(value)){
      value.forEach(function(item){
        addPartIds(ids, item);
      });
      return;
    }

    if(typeof value === 'string' && findPart(value)){
      ids.add(value);
    }
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
    setText('status-track', track ? String(track.id) : '-');
    const boxBase = activeBoxLabel(state, lang);
    const boxDisplay = (!state.mutation && track)
      ? `${(track.faction[lang] || '').toUpperCase()} (${boxBase})`
      : boxBase;
    setText('status-box', boxDisplay);
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
      usedTips: state.usedTips,
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
      mutationAwards: {},
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
      if(typeof state !== 'object' || !state){
        return null;
      }
      state.unlockedPartIds = Array.isArray(state.unlockedPartIds) ? state.unlockedPartIds : [];
      state.mutationAwards = state.mutationAwards && typeof state.mutationAwards === 'object' ? state.mutationAwards : {};
      return state;
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

  function capitalizeFirst(value){
    const text = String(value || '');
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
  }

  function stripLeadingLabel(value, label){
    const text = String(value || '').trim();
    const labelText = String(label || '').trim();

    if(!text || !labelText){
      return text;
    }

    if(text.toLocaleLowerCase().startsWith(labelText.toLocaleLowerCase())){
      return text.slice(labelText.length).trim();
    }

    return text;
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

  function renderTextList(id, items){
    const element = document.getElementById(id);
    if(!element){
      return;
    }

    const lines = Array.isArray(items) ? items : [items];
    element.innerHTML = lines.map(function(item){
      return `<li>${escapeHtml(item)}</li>`;
    }).join('');
  }

  function renderTextParagraphs(id, items){
    const element = document.getElementById(id);
    if(!element){
      return;
    }

    const lines = Array.isArray(items) ? items : [items];
    element.innerHTML = lines.map(function(item){
      return `<p>${escapeHtml(item)}</p>`;
    }).join('');
  }

  function renderAboutCards(id, items, options){
    const element = document.getElementById(id);
    if(!element){
      return;
    }

    const settings = options || {};
    const lines = Array.isArray(items) ? items : [items];
    element.innerHTML = lines.map(function(item, index){
      const classes = ['about-text-card'];
      if(settings.boldFirst && index === 0){
        classes.push('about-text-card--strong');
      }
      return `<p class="${classes.join(' ')}">${escapeHtml(item)}</p>`;
    }).join('');
  }

  function renderAboutSteps(id, items){
    const element = document.getElementById(id);
    if(!element){
      return;
    }

    const lines = Array.isArray(items) ? items : [items];
    element.innerHTML = lines.map(function(item){
      return `<li><span>${escapeHtml(item)}</span></li>`;
    }).join('');
  }

  function renderBoldTemplate(template, params){
    const formatted = format(template, params);
    return renderInlineMarkdown(formatted);
  }

  function renderInlineMarkdown(value){
    return escapeHtml(value)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<strong>$1</strong>');
  }

  function format(template, params){
    return Object.keys(params).reduce(function(output, key){
      return output.split(`{${key}}`).join(params[key]);
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
