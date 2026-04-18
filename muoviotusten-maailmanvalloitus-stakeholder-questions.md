# Muoviotusten maailmanvalloitus – Stakeholder Notes

This document records stakeholder answers gathered while clarifying the
gameplay rules. The current consolidated source of truth is
`muoviotusten-maailmanvalloitus-game-rules.md`.

## What We Understand So Far

The intended game loop appears to be:

1. A group starts on a phone by entering the rolled dice number and selecting a difficulty (`easy` or `hard`).
2. The group moves physically from one question tile to another by throwing a big inflatable dice.
3. The question tiles are physical stickers attached to the floor.
4. The group scans QR codes on `QUESTION`, `MUTATION`, and `FINISH` tiles with the phone. `STORY` tiles do not have QR codes.
5. Each question belongs to a question set and uses the selected difficulty to decide which content to show. Track is stored for faction and box logic.
6. A correct answer unlocks the next creature part in a fixed evolution order (in other words, the app tells you ‘now you can take an eye').
7. A wrong answer does not unlock a part, but the group still continues moving on the physical board.
8. Mutation tiles change which physical plastics are allowed for creature building. The currently active box should always be visible in the UI.
9. At the end, the group scans a finish QR code, enters final creature details, takes a photo, and saves the creature to a gallery.
10. Visitors can later access the gallery through a separate QR code and vote for creatures.

## Highest-Priority Questions

These should be answered first because they affect the core game rules and the app structure.

1. What does "28 tiles total" mean exactly: 28 tiles on each of the 5 tracks, or 28 tiles across the whole installation?
There are 28 tiles on each of the 5 tracks
2. Can you provide the exact tile map for one full run: which tiles are `STORY`, `QUESTION`, `MUTATION`, and `FINISH`, and which question set is attached to each `QUESTION` tile?
It is in the shared Google Sheet:
https://docs.google.com/spreadsheets/d/1vst0i_fzylp4462cTh9v1eJpSopa4SBLTDa7aKeCabs/edit?usp=sharing
3. Is the selected track fixed for the whole game, and how do players know which physical track corresponds to track IDs `1–5`?
The selected track is fixed for the whole game. There are no colors chosen yet.

Track mapping:

| Track | Box | Creature faction | Dice number |
| --- | --- | --- | --- |
| Track 1 | `PET` | `petpetit` | `1` |
| Track 2 | `HDPE / LDPE` | `petenkeetit` | `2` |
| Track 3 | `PP5` | `propellukset` | `3` |
| Track 4 | `PS6` | `styrintit` | `4` |
| Track 5 | `Other 7` | `zekazotkuzet` | `5` |
4. Does the number rolled on the inflatable die equal the number of floor tiles the group moves forward?
yes
5. What should happen if the die roll would move the group past the next relevant tile or past the end of the track?
If I get past the end bc dice roll is higher, I just go to the end 
6. Are `STORY` and `MUTATION` also floor tiles the group can land on, or are only question tiles on the floor?
yes. Story tiles you just read them
7. Since `STORY` tiles have no QR codes, is it acceptable that the app only updates state when a `QUESTION`, `MUTATION`, or `FINISH` QR code is scanned?
Yes, acceptable.
8. If a group answers a question wrong and keeps moving, can they ever retry that missed body part later?
No, if they are wrong they just skip the body part
9. Can a group finish the game with missing body parts, or must all 13 parts be unlocked before the finish flow is allowed?
You can finish with missing body parts
10. Which session model is correct:
   one device per group, or up to 5 simultaneous sessions on one teacher phone?
One device per group


## Questions About Questions

Note: you scan the qr code and you see a random question from a set. A set is in the sheet a column an the first of the column is the set (e.g. easy 1, hard 12)

1. Are there exactly 13 question moments in a normal run, or can some question sets repeat?
exactly 13 question moments in a normal run
2. If a set later contains multiple questions, should one group ever see the same question twice?
Each set can contain multiple questions. The app should pick one at random for the session and keep that same question if the page is refreshed.
3. Are questions different by track already, or is `trackId` only being stored for future use?
All tracks use the same question content and order. Only `easy` vs `hard` changes the questions.
4. The edit notes mention tips. Should every question support an optional tip before the player answers?
Yes. There is a maximum of 5 tips available during a game, it’s the user's choice when to use them. The system has to keep track of how many tips were already used and show that to the user somewhere.
5. The edit notes also mention explanations after answering. Should every question have an explanation shown after both correct and incorrect answers?
Yes
6. What should the correct-answer feedback say exactly?
They are question specific, plus:
-if you got it right, you get the right answer highlighted,  explanation , congratulations, now you can pick up part x of the body (CREATURE PARTS ORDER from the sheet) and then the invitation to roll the dice
- if you answer incorrectly, you get the right answer highlighted, the  explanation and then the invitation to roll the dice
8. On wrong answers, should the UI always show the full correct answer text plus the explanation?
Yes
9. Do you already have the actual question content ready:
   question text, answer options, correct answer, tip, explanation, difficulty, and any track-specific variants?
Yes in the excel sheet. Ask me for explanation if you dont get it:
https://docs.google.com/spreadsheets/d/1vst0i_fzylp4462cTh9v1eJpSopa4SBLTDa7aKeCabs/edit?usp=sharing
## Questions About Creature Progression

1. Are the 13 creature parts always unlocked in the exact fixed order listed in the spec?
Yes
2. Are players only unlocking the next part name, or do they also choose between multiple possible variants for that part?
The app only needs to unlock the next part in order.
3. If players choose variants, what data must be stored for each chosen part?
The app does not need to store chosen variants. It only needs to store how many body parts were unlocked so this can be shown at the end of the game before the group builds the creature.
4. When do players physically build the creature:
   gradually during play, or only after scanning the finish QR code?
At the end of the game. They collect the parts inside baskets 
5. On the end screen, should the app show only the number of unlocked parts or the exact list of unlocked part names?
The end screen should show the list of unlocked parts.
6. If a group reaches the finish tile before unlocking all parts, what should the app do?
It’s not relevant, as it just means that not all body parts have been collected because wrong answers, but they can build the creature anyway.


To be noted, (parts that you allowed to pick depends on the amout of right questions)

## Questions About Mutations and Materials

1. Besides `Hypervintti` and `Mysteeriö`, are any more mutations planned for the first version?
no. if you take Mysteeriö you get the plastic from the Mysteeriö box (which is unmarked plastics) (we have 7 boxes where we take plastic from)
There is also Hypervintti box which is plastic ‘7 - other’ of the plastic recycling codes
3. When a new mutation replaces the previous one, does it affect only future material choices or also previously chosen parts?
Only future material choices.
4. Does the app need to store actual material selections, or only the currently active mutation rule?
only the currently active mutation rule
5. Do `STORY` and `MUTATION` tiles also have QR codes or app pages, or only `QUESTION` and `FINISH`?
`MUTATION` tiles have QR codes. `STORY` tiles do not.
6. What exact player-facing wording should explain the allowed materials for each mutation?
There should always be visible to user: the currently active box  
7. Should the currently active box always be visible, even before a mutation has been scanned?
Yes. A group might get a mutation or not depending on the dice roll.
8. Are the mutation names final, or should we expect renamed or translated versions later?
Final
9. Should the mutation become active immediately when the player scans the mutation QR code?
Yes, immediately.

## Questions About End Flow and Submission

1. What are the available faction choices?
Faction is not chosen manually. It is determined by the assigned track:

| Track | Box | Creature faction | Dice number |
| --- | --- | --- | --- |
| Track 1 | `PET` | `petpetit` | `1` |
| Track 2 | `HDPE / LDPE` | `petenkeetit` | `2` |
| Track 3 | `PP5` | `propellukset` | `3` |
| Track 4 | `PS6` | `styrintit` | `4` |
| Track 5 | `Other 7` | `zekazotkuzet` | `5` |
   
3. Does faction change gameplay in any way, or is it only metadata for the saved creature?
Faction is fully determined by the assigned track. It is also the main box the group will take the plastic body parts from.
5. Are there any rules for creature names:
   maximum length, uniqueness, forbidden content, or character restrictions?
   No
6. Are there any rules for the special ability text:
   maximum length, moderation needs, or suggested format?
No
8. Should the photo be required or optional?
Required
10. Can the photo include people, or should it only show the creature?
Only the creature
12. What should happen if the photo upload fails or the device is offline during submission?
Submission is only possible while online.
14. Are the "instructions for physically building the creature" already written, or are they still to be provided?
To be provided

## Questions About Gallery and Voting

1. Should the gallery show all submitted creatures immediately with no moderation step?
Yes.
2. What does "basic duplicate vote prevention" mean in practice:
   one vote per creature per device, one total vote per device, or something else?
Up to 3 votes total per device across the gallery, and only 1 vote per creature from that device.
3. Can a visitor vote for their own creature?
yes
5. Can the same visitor vote for multiple different creatures?
3 votes max
7. Should vote counts be visible to everyone in real time?
yes
8. Does the gallery need sorting or filtering, for example by newest, most voted, or faction?
Yes
10. Will voting ever need to close at a specific time or after an event ends?
No closing

For gallery and voting we will use Piwigo as starting point https://github.com/Piwigo/Piwigo
It already covers all three of your must-haves either natively or with very small custom work: API-key-based uploads, an author field, and a voting system with a built-in “Best rated” view that is basically your first leaderboard. 

## Content and Language Questions

1. Is the first release Finnish-only, English-only, or bilingual?
Bilingual. As a developer I want to work with the English version, but most of the materials are written in Finnish. Do you suggest language files? Two languages on the same file close to each other so it’s easier to understand the context?
2. Are the story texts for all `STORY` tiles already written?
Yes, but they do not need to exist in the app. Story content is only physical and is there for ambience and context.
3. Are the finish instructions, faction names, and mutation descriptions final content or still placeholder content?
They might change still
5. Who owns future content updates:
   teachers, museum staff, or developers?
Developers do, but changing should be quite easy
## Outcome

The gameplay questions above were resolved well enough to create the
consolidated rules file `muoviotusten-maailmanvalloitus-game-rules.md`.

The exact tile layout and question content continue to live in the
shared Google Sheet:
https://docs.google.com/spreadsheets/d/1vst0i_fzylp4462cTh9v1eJpSopa4SBLTDa7aKeCabs/edit?usp=sharing

## beginning of the game
You scan the ‘begin game’ qr code and the intro page opens that instructs you to  throw a dice, and this number selects your track. If you get 6, you can choose any track which is free. 
In the same page you enter the rolled dice number / chosen track and your level (`easy` or `hard`).
The track you’re assigned selects the faction, which is also the main box you will take the plastic body parts from. The same box that contains the same kind of plastic (plastic recycling codes). 
(e.g. track 1 - PET box, track 2 - HDPE / LDPE shared box)

Track availability after rolling a `6` is managed physically by the teacher or groups. No app logic is needed for this.
