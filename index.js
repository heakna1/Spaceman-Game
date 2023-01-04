const startGameButton = document.getElementById("#start-game")
const alphabetList = document.getElementsByClassName(".alphabet-list")
const gameOverButton = document.getElementById("#game-over")
const landingContainer = document.getElementsByClassName(".landing-container")
const mainGameContainer = document.getElementsByClassName(".main-game-container")
const gameOverContainer = document.getElementsByClassName(".game-over-container")
const outcomeMessage = document.getElementById("#outcome-message")

class Characters {
    constructor(name, health) {
        this.name = name
        this.health = health
    }
// Returns the character health after they have taken damage
    takeDamage(incomingDamage) {
        this.health = this.health - incomingDamage
        return this.health
    }
// Checks if the characters are still alive
    isAlive() {
        return this.health > 0
    }

}

let gameStep = 1
let word = ""
//Steps for the cycle of the game
const gamePlayLoop = () => {
    if(gameStep === 1) {
    // User presses start game button
        word = pickedWord(words)
        gameStep += 1
    } else if(gameStep === 2) {
    // User presses a letter button
        checkLetter(pickedLetter)
            if(checkIfDead(lonk, gamon)) {
                gameOver(lonk, gamon)
                gameStep += 1
            }
    } else {
    // User presses play again
        reset()
        gameStep = 1
    }

    if(!gamon.isAlive() && lonk) {
        outcomeMessage.innerText = "You are victorious!"
    }

    if(gamon.isAlive() && !lonk) {
        outcomeMessage.innerText = "You have been defeated!"
    }
}

const lonk = new Characters("Lonk", 100)

const gamon = new Characters("Gamon", 150)

const words = ["power", "wisdom", "courage", "triforce", "ocarina", "twilight", "hyrule", "skyward", "korok"]


// Randomizes word that is chosen for the user to guess
const pickedWord = (wordsArray) => {
    const randomIndex = 
    Math.floor(Math.random() * wordsArray.length)
    const returnWord = wordsArray[randomIndex]
    console.log(randomIndex, returnWord)
    return returnWord
}

const checkLetter = (letterChoice) => {

}

const generateList = () => {
    alphabetList.innerHTML = ""
}
// Replaces letters with span containing underscores
let displayLetter = letterChoice.replace(/./g, `<span class="dashes">_</span>`)



// Only shows the start screen and hides the other two screens
startGameButton.addEventListener("click", () => {
    landingContainer.classList.add("hide")
    mainGameContainer.classList.remove("hide")
    gameOverContainer.classList.remove("hide")
})

// Only shows game over screen and hides the other two screens
gameOverButton.addEventListener("click", () => {
    gameOverContainer.classList.add("hide")
    landingContainer.classList.remove("hide")
    mainGameContainer.classList.remove("hide")
})
