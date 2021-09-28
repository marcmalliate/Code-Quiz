// Query Selectors for all the necessary IDs

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What does CSS mean?',
        choice1: 'Color style sheet',
        choice2: 'Cascading style sheet',
        choice3: 'Cool styling sheet',
        choice4: 'Code style sheet',
        answer: 2,
    },

    {
        question: 'What does HTML stand for?',
        choice1: 'How The Map Links',
        choice2: 'Home Type Main Language',
        choice3: 'Hypertext Markup Language',
        choice4: 'Hyper Text Main Language',
        answer: 3,
    },

    {
        question: 'What does JS stand for?',
        choice1: 'Jumping Skipping',
        choice2: 'Julu Script',
        choice3: 'Java Script',
        choice4: 'Java Scroll',
        answer: 3,
    },

    {
        question: 'In CSS, what does REM stand for?',
        choice1: 'Rapid eye movement',
        choice2: 'Read element mode',
        choice3: 'Root element mode',
        choice4: 'Root element',
        answer: 4,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


//Start Game

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}


getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}



choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)



    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()
