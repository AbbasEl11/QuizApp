// Arrays

let questions = [
  {
    question: "Wer hat HTML erfunden?",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners-Lee",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was ist HTML?",
    answer_1: "Hypertext Markup Language",
    answer_2: "High-Level Text Markup Language",
    answer_3: "Hyperlink and Text Markup Language",
    answer_4: "Hyper Transfer Markup Language",
    right_answer: 1,
  },
  {
    question: " Welche Funktion hat CSS?",
    answer_1: "Strukturierung von Webseiten",
    answer_2: "Programmierung von Webseiten",
    answer_3: "Gestaltung von Webseiten",
    answer_4: "Datenbankverwaltung",
    right_answer: 3,
  },
  {
    question: "Was bedeutet Responsive Design?",
    answer_1: "Webseiten, die schnell laden",
    answer_2: "Webseiten, die sich an verschiedene Bildschirmgrößen anpassen",
    answer_3: "Webseiten, die nur auf Smartphones funktionieren",
    answer_4: "Webseiten, die keine Bilder enthalten",
    right_answer: 2,
  },
  {
    question: "Was ist ein CMS?",
    answer_1: "Content Management System",
    answer_2: "Computer Management System",
    answer_3: "Client Management Software",
    answer_4: "Cloud Management Service",
    right_answer: 1,
  },
  {
    question:
      "Welches dieser Formate wird verwendet, um Bilder im Web darzustellen?",
    answer_1: ".txt",
    answer_2: ".html",
    answer_3: ".jpg",
    answer_4: ".css",
    right_answer: 3,
  },
  {
    question: "Was ist JavaScript?",
    answer_1: "Eine Programmiersprache für serverseitige Anwendungen",
    answer_2: "Ein Datenbankmanagement-System",
    answer_3: "Eine Stylesheet-Sprache",
    answer_4: "Eine Programmiersprache für interaktive Webseiten",
    right_answer: 4,
  },
];

let rightQuestions = 0;

// we set the currentquestion on 0 , this is the start point of our arrays

let currentQuestion = 0;

// Audio imports
let AUDIO_SUCCESS = new Audio("assets/audio/success.mp3");
let AUDIO_WRONG = new Audio("assets/audio/wrong.mp3");
// function init is the initiator , this function starts when the website load

function init() {
  document.getElementById("all-questions").innerHTML = questions.length;
  showQuestion();
}

// this function shows the question and answers

function showQuestion() {
  // here we say, if the currentquestion is length like questions then , display none or display endscreen
  if (gameIsOver()) {
    showEndScreen();
  } else {
    updateProgressBar();
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndScreen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("question-body").style = "display:none";
  // here we say, show how many questions right from questions length
  document.getElementById("from_questions").innerHTML = questions.length;
  document.getElementById("right_questions").innerHTML = rightQuestions;
  document.getElementById("header-image").src = "assets/img/trophy.png";
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);

  document.getElementById("progress_bar").innerHTML = `${percent}%`;
  document.getElementById("progress_bar").style = `width:${percent}%;`;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  // this is for the numbers , question 1 from 7..
  document.getElementById("question-number").innerHTML = currentQuestion + 1;

  document.getElementById("question-text").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

//This function is designed to display whether the selected answer is correct or incorrect. And add the class to make it green or red

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);

  let idOfRightAnswer = `answer_${question["right_answer"]}`;

  if (selectedQuestionNumber == question["right_answer"]) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    rightQuestions++;
    AUDIO_SUCCESS.play();
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_WRONG.play();
  }
  // here we enable the button if the answer is clicked

  document.getElementById("next-button").disabled = false;
}

// this is the button function for the next question

function nextQuestion() {
  currentQuestion++;
  document.getElementById("next-button").disabled = true;
  resetAnswerButtons();
  showQuestion();
}

//This function is for reset the classes for the green or red background color

function resetAnswerButtons() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
  document.getElementById("header-image").src = "assets/img/quizimg.jpg";
  document.getElementById("question-body").style = "";
  document.getElementById("endScreen").style = "display:none";
  currentQuestion = 0;
  rightQuestions = 0;
  init();
}
