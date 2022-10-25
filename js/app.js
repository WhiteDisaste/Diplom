// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Create a question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Вопрос ${currentQuestionNumber} из ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
    `
    <h1>Вы завершили тест</h1>
    <h2 id='score'> Ваш счет: ${quiz.score} из ${quiz.questions.length}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Пройти снова</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "Для создания каким документов используется язык HTML:", 
        ["для создания Web-страниц", "для создания программ",
        "для создания текстового документа", "для создания Excel"], "для создания Web-страниц"
    ),
    new Question(
        "Допустимое число заголовков первого уровня в HTML-документе составляет:", 
        ["1", "2","6", "5"], "1"
        ),
    new Question(
        "Название web-страницы записывается в теге:", 
        ["head", "title","html", "body"], "title"
        ),
    new Question(
        "Какое расширение имеют web-страницы:", 
        ["docx", "usb", "html", "jpg"], "html"
        ),
    new Question(
        "С помощью какого тега можно вставить рисунок:", 
        ["body", "title","br", "img"], "img"
        )
];

// INITIALIZE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `Время: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();
