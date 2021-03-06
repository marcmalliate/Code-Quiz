// This save the players score and allows them to save their name

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
    if($(username).value().length !=0)
    $(saveScoreBtn).attr('disabled', false);
    else
    $(saveScoreBtn).attr('disabled', true);
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

highScores.splice(5)

localStorage.setItem('highScores', JSON.stringify(highScores))
window.location.assign('highscore.html')

}