// import libraries, packages etc...
import startFirebase from "./firebase.js";

// Instantiate db object to interact with firestore
startFirebase();
const db = firebase.firestore();

// retrieves all fields in the leaderboard collection
async function get_leaderboard_data() {
  const leaderboard_reference = db.collection("leaderboard").doc("scores");
  let result = [];
  let obj = {};

  const response = await leaderboard_reference.get();
  for (let person in response.data()) {
    obj[person] = response.data()[person];
    result.push({ name: person, score: response.data()[person] });
  }
  return [result, obj];
}

// sorts leaderboard array using 'score'
function sort_leaderboard_data(arr) {
  let sorted_array = arr.sort((a, b) => (a.score < b.score ? 1 : -1));
  return sorted_array;
}

// updates DOM elements with the top 10 scores in the leaderboards collection
async function populate_leaderboard() {
  const leaderboard_data = await get_leaderboard_data();
  const sorted_leaderboard_data = sort_leaderboard_data(leaderboard_data[0]);
  const list_items = Array.from(document.querySelectorAll("li"));

  for (const [index, list_item] of list_items.entries()) {
    if (sorted_leaderboard_data[index]) {
      list_item.innerHTML = `
      <p>${index + 1}.<p>
        <h4>${sorted_leaderboard_data[index].name}</h4>
        <p>Score: ${sorted_leaderboard_data[index].score}<p>`;
      list_item.classList.add("leaderboard-item");
    } else {
      break;
    }
  }
}

// when a user completes the quiz, add their name and score to the collection
async function add_score_to_leaderboard(name, score) {
  const leaderboard_reference = db.collection("leaderboard").doc("scores");
  const leaderboard_data = await get_leaderboard_data();
  leaderboard_data[1][name] = score;
  leaderboard_reference.set(leaderboard_data[1]);
}

populate_leaderboard();
