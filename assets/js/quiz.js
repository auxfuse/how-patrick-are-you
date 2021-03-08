import startFirebase from "./firebase.js";
import add_score_to_leaderboard from "./leaderboard.js";

let quizFormElement = document.getElementById("quiz-form");
const modalImage = document.getElementById("modal-image");
const notify = document.getElementById("ask-patrick");
const answerTitle = document.getElementById("answer-title");
const scoreComment = document.getElementById("score-comment");
const scoreContainer = document.getElementById("score-container");
let eagna = [];
let questionNum = 0;
let usersTotalScore = 0;

/**
 * Gets and returns Quiz data
 *
 * @returns {promise} result - Promise for the question object from Firebase
 */
async function get_data() {
  startFirebase();

  const db = firebase.firestore();
  let result = { questions: [] };
  const reference = await db.collection("questions-and-answers").get();

  // Construct an object of the questions from response
  reference.docs.forEach((doc) => {
    let data = doc.data();
    result.questions.push({
      question: doc.id,
      answers: data.answers,
      correctIndex: data.correctIndex,
      explained: data.explained,
    });
  });

  return result;
}

/**
 * **Builds the current question and possible answers into an output array.**
 * * Output gets inserted into the template
 * * Calls the ***checkUsersAnswers()*** function
 *
 * @param {object} question - The questions object
 * @param {integer} questionNumber - Defines current question number
 */
function questionBuilder(question, questionNumber) {
  const currentQuestion = question[questionNumber];
  const possibleAnswers = [];
  const output = [];

  // Here we setup the answers to the current question
  currentQuestion.answers.forEach((answer, answerNumber) => {
    possibleAnswers.push(
      `<li>
        <input type="radio" id="${answerNumber}" name="question${questionNumber}Answers" value="${answerNumber}">
        <label for="${answerNumber}">${answer}</label>
      </li>`
    );
  });

  // Setup the output that gets pushed to the template
  output.push(
    `<p class="questions is-size-4"> Q${questionNumber + 1} / 10: <p>
    <p class="questions mb-4 is-size-5">${currentQuestion.question}</p>
    <ul class="answers">${possibleAnswers.join("")} </ul>
    <div class="columns mt-4">
      <button class="column is-half is-offset-one-quarter button is-primary is large mb-4 is-size-4 has-text-weight-bold">Submit</button>
    </div>`
  );
  quizFormElement.innerHTML = output.join("");

  // Now we get the submitted answer
  checkUsersAnswer(currentQuestion, questionNumber);
}

/**
 * **Checks the users answer and compares it to the correct answer**.
 *
 * * Calls the ***updateScores()*** function with the score.
 * * Or calls the ***quizManager*** function to build the next question.
 *
 * @param {Object} currentQuestion
 * @param {Integer} questionNumber
 */
function checkUsersAnswer(currentQuestion, questionNumber) {
  const correctAnswer = currentQuestion.correctIndex;

  let selectedAnswer;

  document.addEventListener("submit", function (event) {
    event.preventDefault();
    notify.innerHTML = ``

    let options = document.getElementsByName(
      `question${questionNumber}Answers`
    );

    // loop over answers and see what has been selected
    if (options) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
          selectedAnswer = options[i].value;

          // Check if selection matches correct answer and call correct function
          if (selectedAnswer == correctAnswer) {
            updateScore(10);
          } else {
            questionNum += 1;
            quizManager(questionNum);
          }
        }
      }
    }
  });
}

/**
 * **Updates the users score**.
 *
 * * Increments questionNum.
 * * Calls the ***quizManager()*** function for the next question
 *
 * @param {*} score
 * @param {*} status
 */
function updateScore(score) {
  usersTotalScore += score;

  // call next Question
  questionNum += 1;
  quizManager(questionNum);
}

/**
 * Handles displaying the results of the quiz inside a Modal
 * * Handles the submitting of user name and score to Firebase
 */
function callResults() {
  document.querySelector(".modal").classList.toggle("is-active");
  quizFormElement.innerHTML = `<a href="quiz.html" class="button is-primary mb-4">Would you like to try again?</a>`;

  if (usersTotalScore < 30) {
    modalImage.src = `assets/images/sad.png`;
    answerTitle.innerHTML = `Well.. you might want to look away`;
    scoreContainer.innerHTML = `You are ${usersTotalScore}% St. Patrick`;
    scoreComment.innerHTML = `<h1>Terrible! St. Patrick?? You are like an Anti-Pat</h1>`;
  } else if (usersTotalScore >= 30 && usersTotalScore < 60) {
    modalImage.src = `assets/images/unimpressed.png`;
    answerTitle.innerHTML = `Not bad but not good either...`;
    scoreContainer.innerHTML = `You are ${usersTotalScore}% St. Patrick`;
    scoreComment.innerHTML = `<h1>You compare to St. Patrick in the same way I compare to Brad Pitt!</h1>`;
  } else if (usersTotalScore >= 60 && usersTotalScore < 100) {
    modalImage.src = `assets/images/happy.png`;
    answerTitle.innerHTML = `Congratulations!`;
    scoreContainer.innerHTML = `You are ${usersTotalScore}% St. Patrick`;
    scoreComment.innerHTML = `<h1>You compare to St. Patrick in the same way I compare to Brad Pitt!</h1>`;
  } else {
    modalImage.src = `assets/images/amazed.png`;
    answerTitle.innerHTML = `Wow!`;
    scoreContainer.innerHTML = `You are ${usersTotalScore}% St. Patrick`;
    scoreComment.innerHTML = `<h1>Heeelllo Saint Patrick! Alive and well you are looking!!</h1>`;
  }

  // Placeholder JS that adds click event to disbale modal
  document.querySelector(".delete").addEventListener("click", () => {
    document.querySelector(".modal").classList.toggle("is-active");
  });

  // If User enters name and clicks 'Submit' - submit that score to the leaderboard
  document.querySelector(".submit-score").addEventListener("click", (e) => {
    let name = document.querySelector(".leaderboard-name");
    add_score_to_leaderboard(name.value, usersTotalScore);
    // submitted feedback for User & prevent further submissions
    name.value = `Submitted`;
    name.disabled = true;
    e.target.style.display = "none";
  });
}

/**
 * Some important validation
 * This is very important
 */
 function validation(){
   document.body.addEventListener('keydown', function(event) {
     const key = event.key;
     let status = eagna.length;
     get_data().then((data) => {
       let dataCheck = data.questions[0].explained;
       let details = data.questions[questionNum].explained;
       let validation = dataCheck.trim().split(" ");
       let success = validation[validation.length - 1].toLowerCase();
     
      if (key){
        if (status < 6){
          eagna.push(key)
        }
        else {
          eagna.shift();
          eagna.push(key)
        }
      }
      if (eagna.join("") === success){
        notify.innerHTML = `<p class="column is-half is-offset-one-quarter is-size-4 mt-5"> ${details}: <p></p>`
      }
      });
   });
 }

/**
 * Gets the quiz object and calls the quiz builder.
 * * The questionNum is compared against the length of the object
 *
 * * Calls the ***questionBuilder()*** function with the next question.
 * * Or calls the ***getResults()*** function.
 *
 * @param {Integer} questionNum - the global question index
 */
function quizManager(questionNum) {
  get_data().then((data) => {
    // get the length of the object
    let limit = Object.keys(data.questions).length;
    // if question num is still in range - build next question
    if (questionNum < limit) {
      questionBuilder(data.questions, questionNum);
    } else {
      callResults();
    }
  });
}


window.addEventListener("DOMContentLoaded", function() {
  quizManager(questionNum);
  validation();
}, false);
