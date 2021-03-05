const startFirebase = () => {
  var firebaseConfig = {
    apiKey: "AIzaSyBg_makVjGeP-eIdy_FgBPWxOy9Rs5MZFM",
    authDomain: "how-patrick-are-you.firebaseapp.com",
    projectId: "how-patrick-are-you",
    storageBucket: "how-patrick-are-you.appspot.com",
    messagingSenderId: "376121652675",
    appId: "1:376121652675:web:816232d840f0ba8bab7976",
    measurementId: "G-CYH1NCJ65C",
  };

  firebase.initializeApp(firebaseConfig);
};

export default startFirebase;
