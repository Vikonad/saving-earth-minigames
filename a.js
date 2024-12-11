const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2,
    },
    {
        question: "Which programming language is known as the language of the web?",
        answers: ["Python", "JavaScript", "C++", "Java"],
        correct: 1,
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 2,
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Jane Austen"],
        correct: 0,
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-button");
const scoreDisplay = document.getElementById("score-display");

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = answer;
        button.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answersContainer.innerHTML = "";
    scoreDisplay.textContent = "";
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll(".answer-button");

    buttons.forEach((button, index) => {
        if (index === currentQuestion.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedIndex === currentQuestion.correct) {
        score++;
    }

    nextButton.style.display = "block";
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionText.textContent = "Quiz Completed!";
    scoreDisplay.textContent = `Your score: ${score} / ${questions.length}`;
    nextButton.style.display = "none";
}

// Event Listeners
nextButton.addEventListener("click", showNextQuestion);

// Start the game
showQuestion();