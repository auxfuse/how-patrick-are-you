# How Patrick are you?

---

## Table of Contents:

- [What does it do and what does it need to fulfill?](#what-does-it-do-and-what-does-it-need-to-fulfill)
- [Functionality of Project](#functionality-of-project)
- [User Experience](#user-experience)
  - [User Stories](#user-stories)
  - [Design](#design)
    - [1. Font](#1-font)
    - [2. Color Scheme](#2-color-scheme)
    - [3. Logo](#3-logo)
    - [4. Geometry](#4-geometry)
    - [5. Wireframing & Proposed/Implemented Functionality per Page](#5-wireframing--proposedimplemented-functionality-per-page)
- [Technology Used](#technology-used)
- [Database](#database)
- [Features](#features)
  - [Future Features](#future-features)
  - [Defensive Design](#defensive-design)
- [Testing](#testing)
  - [Found Bugs & Fixes](#found-bugs--fixes)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Special Thanks & Acknowledgements](#special-thanks--acknowledgements)

---

## Welcome to our Hackathon Project: How Patrick are you?

<p align="center">
    <img src="/assets/images/logo-200x200.png" alt="logo">
</p>

---

## What does it do and what does it need to fulfill?

### Functionality of Project

[Back to top](#table-of-contents)

## User Experience:

#### User Stories:

_Generic (Guest/Public) User:_

_Registers (Logged in) User:_

_Application Owner/Administrator User:_

_Developer:_

#### Design

##### 1. Font

- Headings - Luckiest Guy
- Body - Poppins

##### 2. Color Scheme

- ![#2a3719](https://placehold.it/15/2a3719/000000?text=+) `#2a3719` - Primary color
- ![#5f6c39](https://placehold.it/15/5f6c39/000000?text=+) `#5f6c39` - Secondary color
- ![#ddd5ba](https://placehold.it/15/ddd5ba/000000?text=+) `#ddd5ba` - Tertiary color
- ![#e04b32](https://placehold.it/15/e04b32/000000?text=+) `#e04b32` - Supplementary color
- ![#cd8741](https://placehold.it/15/cd8741/000000?text=+) `#cd8741` - Supplementary color 2

##### 3. Logo

<img src="/assets/images/logo-200x200.png" alt="logo">

##### 4. Geometry

##### 5. Wireframing & Proposed/Implemented Functionality per Page

<img src="/assets/images/wireframes/desktop_landing.png" alt="desktop landing page">
<img src="/assets/images/wireframes/mobile_home.png" alt="mobile landing page">
<img src="/assets/images/wireframes/quiz_.png" alt="quiz landing page">
<img src="/assets/images/wireframes/results.png" alt="results page">

[Back to Top](#table-of-contents)

## Technology Used

#### Languages, Frameworks, Editors & Version Control:

- Detail tech/languages

#### Tools Used:

- Detail tools here with links to relevant

## Database

<img src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png" height="100"/>

Google's Firebase was used as a backend-as-a-service. Specifically, Cloud Firestore was used as a Cloud Database. It is a NoSQL, document-oriented database.

It was used for two collections of data `leaderboard` and `questions-and-answers`.

#### Data Model:

As mentioned before, two collections of data were stored on Cloud Firestore. Firestore uses JSON model (under the hood) to store it's data and is as follows:

`collection` --> `document` --> `fields`

##### Leaderboard

For the leaderboard, it only had one Document - Scores. This document contained all user names and their subsequent scores.

Here is how its modelled:

```
 leaderboard { // collection
     scores: { // document
        "John Smith": 80, // field
        "Jane Doe": 80, // field
        ..
        ..
        ..
    }
}
```

As scores are added to the document over time, it must be sorted for the leaderboard - this is handled client side in [leadboard.js](https://github.com/auxfuse/how-patrick-are-you/blob/main/assets/js/leaderboard.js) on `line: 22`.

##### Questions and Answers

It was important to have a backend such as Cloud Firestore to store the Answers as to prevent people from using Dev Tools to find the correct answers. The Questions were stored alongside them for convenience. It had a Document per Question (10 in total).

Here is how its modelled:

```
questions-and-answers { // collection
    questionOne: { // document
        answers: [ // field
            choiceOne,
            choiceTwo,
            choiceThree,
            choiceFour,
        ],
        correctIndex: 2, // field
        explained: "explanation text", // field
    },
    ..
    ..
    ..
    questionTen: { // document
        answers: [ // field
            choiceOne,
            choiceTwo,
            choiceThree,
            choiceFour,
        ],
        correctIndex: 0, // field
        explained: "explanation text", // field
    },
}
```

## Features

[Back to Top](#table-of-contents)

#### Future Features:

Future Features as of right now are:

#### Defensive Design

## Testing

#### Found Bugs & Fixes:

[Back to Top](#table-of-contents)

## Deployment

## Credits

- reference material/help etc

[Back to Top](#table-of-contents)

#### Special Thanks & Acknowledgements:

###### <i>Disclaimer: This project was created for educational use only as part of the Code Institute 2021 March Hackathon!</i>

[Back to Top](#table-of-contents)

<p align="center">
    <img src="" alt="logo">
</p>
