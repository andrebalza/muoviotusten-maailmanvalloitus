## Edit Notes

- Let’s add a possibility to get a tip.

- After the answer, right or wrong, there will be an explanation that
  will open the topic a bit more.

- A teacher should be able to start multiple simultaneous sessions
  (max 5) with her phone, unless we get new phones. Note: we got extra phones, so this is not needed.

# Muoviotusten maailmanvalloitus – Developer Specification 10.04.2026 (1st release)

## 1. Project Overview

Muoviotusten maailmanvalloitus is a hybrid physical + web-based game
experience.

Players:

- Move on a physical board

- Scan QR codes with mobile devices

- Answer questions

- Build a physical creature from recycled plastic

- Save their creature into a digital gallery

The web app supports gameplay, tracks progress, and manages the final
gallery and voting.

## 2. Core Concept

The game is set in the year 2442. A massive plastic continent has formed
in the Pacific Ocean, and new lifeforms (“muoviotukset”) emerge from
plastic and microorganisms.

Players evolve their creature step-by-step by answering questions.

## 3. Game Structure

- 5 parallel tracks (physical)

- 28 tiles on each track

- 4 tile types:

  - STORY (story is written on the game tile, user reads it physically;
    no QR code needed)

  - QUESTION (user scans a QR code and answers a question)

  - MUTATION (user scans a QR code and the active material box changes
    immediately)

  - FINISH (user scans a separate finish QR code)

## 4. Question System

### Structure

- 13 question moments per normal run

- 13 sets (SET 1–13)

- Each set has:

  - EASY version

  - HARD version

  - one or more questions per set

- All tracks use the same question content and question order in version
  1

### Logic

When landing on a QUESTION tile:

1.  Identify set (1–13)

2.  Identify difficulty

3.  If the set contains multiple questions, randomly select one
    question for that session

4.  Persist that selected question so refresh does not change it

### QR Code and Track Handling

QR codes should not contain track-specific information.

All tracks can use identical physical QR codes that point to the same
URL pattern, for example: /game?set=5

The player's track (trackId) is determined at the start of the game from
the dice result and must be stored in the game state.

This makes it possible to:

- reuse the same physical QR codes on all tracks

- later add different questions behind the same QR code for different
  tracks if needed

- keep the physical installation unchanged if content logic changes
  later

Question selection in version 1 should therefore use:

- setId

- difficulty

- optional randomization among multiple questions

TrackId may still be stored for state and future use, but it does not
change question content in version 1.

### Data Model Example

```json
{
  "set_id": 1,
  "difficulty": "easy",
  "track_id": 3,
  "questions": [
    {
      "question": "...",
      "tip": "...",
      "explanation": "...",
      "options": {
        "a": "...",
        "b": "...",
        "c": "...",
        "d": "..."
      },
      "correct": "c"
    }
  ]
}
```

## 5. Game State (Critical)

The browser must store the game state locally.

### Required Data

- currentScannedTile

- currentPartIndex

- unlockedParts

- answeredSets

- selectedQuestionBySet

- mutationState

- activeBox

- difficulty

- trackId

- faction

- usedTips

### Storage

Use localStorage.

### Example

```json
{
  "currentScannedTile": 10,
  "currentPartIndex": 5,
  "unlockedParts": [
    "sensory cells",
    "sensory hairs",
    "sensory scales",
    "head",
    "mouth"
  ],
  "mutation": "hypervintti",
  "answeredSets": [1, 2, 3],
  "selectedQuestionBySet": {
    "1": "easy-1-q1"
  },
  "activeBox": "Hypervintti",
  "difficulty": "easy",
  "trackId": 4,
  "faction": "styrintit",
  "usedTips": 2
}
```

### Requirements

- Must persist after refresh

- Must update after every action

- One device = one group/session

- Story tiles do not need to be stored because they have no QR code

## 6. Creature Evolution System

Players gain parts in fixed order:

1.  sensory cells

2.  sensory hairs

3.  sensory scales

4.  head

5.  mouth

6.  fin

7.  tail

8.  grasping appendage

9.  eyes

10. ears

11. brain

12. limbs

13. wings

### Logic

- Correct answer → next part unlocked

- Wrong answer → no part, and that missed part is skipped permanently

- Player still progresses on board

- A group can finish the game with missing parts

- The creature is built physically only at the end of the game

## 7. Mutations

### Hypervintti (Tile 14)

Player uses the separate Hypervintti box containing plastics marked
“7 - other”.

### Mysteeriö (Tile 17)

Player uses the Mysteeriö box containing unmarked plastics.

### Mutation Rules

- Only one mutation can be active at a time

- A new mutation replaces the previous one (e.g., Mysteeriö overrides
  Hypervintti)

- Mutation activates immediately when its QR code is scanned

- Mutation state must be stored in game state (e.g., "mutation":
  "hypervintti" or "mysteeriö")

- The currently active box must always be visible in the UI

- At the start of the game, the active box is the main box for the
  assigned track

- Mutation affects only future material choices

- The app only needs to store the currently active mutation / active
  box, not detailed material selections

- Track 5 uses the main “Other 7” box, which is separate from the
  Hypervintti box

## 8. End Flow

At the start of the game, the player must:

- scan the begin-game QR code

- throw the die in the physical space

- enter the rolled dice number

- select difficulty level

- if the die shows 1–5, use the matching track

- if the die shows 6, choose any free track (handled physically by the
  teacher / groups, no app logic needed)

At the end of the game, the player:

- may reach the final tile even if some creature parts are missing

- scans a separate finish QR code

- sees the list of unlocked creature parts

- receives instructions for physically building the creature (content to
  be added later)

- builds the creature physically at the end

- enters creature name

- writes special ability

- takes a photo

## 9. Gallery System

After submission:

- Data is automatically saved

- Creature appears instantly in gallery

### Stored Data

- name

- faction

- ability

- image

- timestamp

- votes (initial 0)

### Example

```json
{
  "name": "PlastoRex",
  "faction": "petpetit",
  "ability": "Eats microplastics",
  "image": "url",
  "votes": 0
}
```

## 10. Voting

- Users can vote creatures

- Each creature has a vote counter

- A device can cast up to 3 votes total across the gallery

- A device can vote only once per creature

- Voting should be accessible through a separate QR code

- The voting QR code should lead directly to the gallery / voting view

## 11. UX Requirements

- Very simple UI

- Works on mobile

- Fast interactions

- No login required

- Each group uses its own phone

### Question Result Flow

After answering a question:

- Always highlight the correct answer

- Always show the explanation

- Always invite the player to roll the die again

- If correct: show success feedback, unlock the next creature part, and
  tell the player which body part they may pick later

- If incorrect: show feedback in this format:

  - Show the highlighted correct answer, show the explanation, and tell
    the player to roll the die again

- After incorrect answer, no part is unlocked and that missed part
  cannot be recovered later

- Tips are available, with a maximum of 5 used tips per game

## 12. Scalability

System must support:

- more difficulty levels

- more questions per set

- more mutations

- more tracks

## 13. Key Principles

- Game never blocks permanently on wrong answer

- Wrong answers do not unlock a part

- Progress is uneven between players

- Story is linear, evolution is not

- Physical + digital integration is core

- All tracks may share the same physical QR codes, while content logic
  can still differ by track in software

## 14. Summary

A hybrid game where:

- players answer questions

- evolve a creature

- build it physically

- save it digitally

- compete through voting
