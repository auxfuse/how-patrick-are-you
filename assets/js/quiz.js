import startFirebase from "./firebase.js";

let quizFormElement = document.getElementById("quiz-form");
const resultsContainer = document.getElementById("resultsContainerNameHere");
let questionNum = 0; // a global question number
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
      `<p><label class="radio">
      <input type="radio" name="question${questionNumber}Answers" value="${answerNumber}">
      ${
        answerNumber + 1
      } :
      ${answer}
      </label></p>`
    );
  });

  // Setup the output that gets pushed to the template
  output.push(
    `<p class="questions"> Q${questionNumber+1} / 10: <p>
    <p class="questions mb-4">${currentQuestion.question}</p>
    <div class="answers mb-4"> ${possibleAnswers.join("")} </div>
    <button class="button is-primary mb-4">Submit</button>
    <p class="answers">Please select an answer and click submit</p>
    `
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
            console.log("Thats a match!");
            updateScore(10);
          } else {
            console.log("Thats not a match!");
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
 * Handles displaying the results of the quiz.
 */
function callResults() {
  if (usersTotalScore < 30) {
    quizFormElement.innerHTML = `<h1>Terrible! St. Patrick?? You are like an Anti-Patrick - your score is ${usersTotalScore}% GoodBye</h1>`;
  } else if (usersTotalScore >= 30 && usersTotalScore < 60) {
    quizFormElement.innerHTML = `<h1>Congratulations!! You compare to St. Patrick in the same way I compare to Brad Pitt! - your score is ${usersTotalScore}%</h1>`;
  } else {
    quizFormElement.innerHTML = `<h1>Heeelllo Saint Patrick! Alive and well you are looking!! Your score is ${usersTotalScore}%</h1>`;
  }
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
    console.log(typeof(data.questions));
    // get the length of the object
    let limit = Object.keys(data.questions).length;
    // if question num is still in range - build next question
    if (questionNum < limit) {
      questionBuilder(data.questions, questionNum);
    } else {
      callResults();
    }
  })
}

quizManager(questionNum);
