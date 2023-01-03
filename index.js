const startGameButton = document.getElementById("#start-game")
const alphabetList = document.getElementsByClassName(".alphabet-list")
const gameOverButton = document.getElementById("#game-over")
const landingContainer = document.getElementsByClassName(".landing-container")
const mainGameContainer = document.getElementsByClassName(".main-game-container")
const gameOverContainer = document.getElementsByClassName(".game-over-container")

class Characters {
    constructor(name, health, icon) {
        this.name = name
        this.health = health
        this.icon = icon
    }

    takeDamage(incomingDamage) {
        this.health = this.health - incomingDamage
        return this.health
    }

    isAlive() {
        return this.health > 0
    }

}

const shuffleWords = (words) => {
    for(let i = words.length - 1; i > 0; i++) {

    }
}


const lonk = new Characters("Lonk", 100,)

const gamon = new Characters("Gamon", 150,)

const words = ["power, wisdom, courage"]

const gamePlayLoop = () => {
    let gameStep = 1
    let word = words
    if(gameStep === 1) {
        word = pickWord()
        gameStep += 1
    } else if(gameStep === 2) {
        compareUserChoiceToWords(userChoice)
            if(checkIfDead(lonk, gamon)) {
                gameOver(lonk, gamon)
                gameStep += 1
            }
    } else {
        reset()
        gameStep = 1
    }
}

const generateList = (res) => {
    alphabetList.innerHTML = ""
}

startGameButton.addEventListener("click", () => {
    landingContainer.classList.add("hide")
    mainGameContainer.classList.remove("hide")
    gameOverContainer.classList.remove("hide")
})

alphabetList.addEventListener("click", () => {
    mainGameContainer.classList.add("hide")
    landingContainer.classList.remove("hide")
    gameOverContainer.classList.remove("hide")
})
