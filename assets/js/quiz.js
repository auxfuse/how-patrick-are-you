// Some required global variables
const quizContainer = document.getElementById('quizContainerNameHere');
let quizFormElement = document.getElementById("quiz-form");
const resultsContainer = document.getElementById('resultsContainerNameHere');
let questionNum = 0; // a global question number
let usersTotalScore = 0;


/**
 * Gets the quiz object and calls the quiz builder.
 * * The questionNum is compared against the length of the object
 * 
 * * Calls the ***questionBuilder()*** function with the next question.
  * * Or calls the ***getResults()*** function.
 * 
 * @param {Integer} questionNum - the global question index
 */
function getQuestions(questionNum){
    fetch('https://how-patrick-are-you-default-rtdb.europe-west1.firebasedatabase.app/questions.json')
    .then(response => response.json())
    .then(data => {
      console.log("heeelp"+data)
      // get the length of the object
      let limit = (Object.keys(data.questions).length);
      // if question num is still in range - build next question
      if (questionNum < limit){
        questionBuilder(data.questions, questionNum)
      }
      else{
        callResults()
      } 
    }).catch(function (error) {
      console.log("ERROR !" + error.message);
  });
}

/** 
 * **Builds the current question and possible answers into an output array.**
 * * Output gets inserted into the template
 * * Calls the ***checkUsersAnswers()*** function
 * 
 * @param {object} question - The questions object
 * @param {integer} questionNumber - Defines current question number
 */
function questionBuilder(question, questionNumber){

  const currentQuestion = question[questionNumber];
  const possibleAnswers = [];
  const output = [];


  // Here we setup the answers to the current question
  currentQuestion.answers.forEach((answer, answerNumber) => {
    possibleAnswers.push(
      `<label>
      <input type="radio" name="question${questionNumber}Answers" value="${answerNumber}">
      ${answerNumber} :
      ${answer}
      </label>`)
  });


  console.log(currentQuestion.question, possibleAnswers)
  
  // Setup the output that gets pushed to the template
  output.push(
    `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${possibleAnswers.join('')} </div>
    <button id="submitAnswer">Submit</button>`
  );
  output.push(`<h2>Please select an answer and click submit</h2>`)
  quizFormElement.innerHTML = output.join('');

  // Now we get the submitted answer
  checkUsersAnswer(currentQuestion, questionNumber);
  
}

/**
 * **Checks the users answer and compares it to the correct answer**.
 * 
 * * Calls the ***updateScores()*** function with the score.
 * * Or calls the ***getQuestions*** function to build the next question.
 * 
 * @param {Object} currentQuestion 
 * @param {Integer} questionNumber 
 */
function checkUsersAnswer(currentQuestion, questionNumber){

  const correctAnswer = currentQuestion.correctIndex;
  
  let selectedAnswer;

  document.addEventListener("submit", function(event){
    event.preventDefault();

    let options = document.getElementsByName(`question${questionNumber}Answers`);
    
    // loop over answers and see what has been selected
    if (options){
      for (let i=0; i<options.length; i++) {
        if (options[i].checked) {
          selectedAnswer = options[i].value;

          // Check if selection matches correct answer and call correct function
          if (selectedAnswer == correctAnswer){
            console.log("Thats a match!")
            updateScore(10);
          }
          else{
            console.log("Thats not a match!")
            questionNum += 1;
            getQuestions(questionNum);
          }
        }
      }
    }
  })
}

/** 
 * **Updates the users score**.
 * 
 * * Increments questionNum.
 * * Calls the ***getQuestions()*** function for the next question
 * 
 * @param {*} score 
 * @param {*} status 
 */
function updateScore(score){
  usersTotalScore += score;

  // call next Question
  questionNum +=1;
  getQuestions(questionNum);
}

/**
 * Handles displaying the results of the quiz.
 */
function callResults(){
  if (usersTotalScore < 30){
    quizFormElement.innerHTML = `<h1>Terrible! St. Patrick?? more like St. Polar opposite! - your score is ${usersTotalScore}</h1>`;
  }
  else if (usersTotalScore >= 30 && usersTotalScore < 60){
    quizFormElement.innerHTML = `<h1>Congratulations!! You compare to St. Patrick in the same way I compare to Brad Pitt! - your score is ${usersTotalScore}</h1>`;
  }
  else {
    quizFormElement.innerHTML = `<h1>Heeelllo Saint Patrick! Alive and well you are looking!! Your score is ${usersTotalScore}</h1>`;
  }
  
}