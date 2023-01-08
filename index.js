const startGameButton = document.getElementById("start-game")
const restartButton = document.getElementById("restart-button")
const landingContainer = document.getElementsByClassName("landing-container") [0]
const mainGameContainer = document.getElementsByClassName("main-game-container") [0]
const gameOverContainer = document.getElementsByClassName("game-over-container") [0]
const outcomeMessage = document.getElementById("outcome-message")
const wordDashes = document.getElementsByClassName("dashes") [0]
const guessesLeft = document.getElementsByClassName("guesses-left-container") [0]
const lonkHealth = document.getElementById("lonk-heart")
const gamonHealth = document.getElementById("gamon-heart")
const alphabetList = document.getElementsByClassName("alphabet-list") [0]

class Characters {
    constructor(name, totalHealth) {
        this.name = name
        this.totalHealth = totalHealth
        this.health = totalHealth
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
    resetHealth() {
        this.health = this.totalHealth
    }
}

let gameStep = 1
let word = ""
let currentChoices = 0
//Steps for the cycle of the game
const gamePlayLoop = (pickedLetter) => {
    if(gameStep === 1) {
    // User presses start game button
        word = pickedWord(words)
        generateList()
        generateWord(word)
        if(currentChoices < word.length) {
            currentChoices = Math.ceil(word.length * 1.0)
            guessesLeft.innerHTML = `Wrong Guesses Left: ${currentChoices}`
        }
        gameStep += 1
    } else if(gameStep === 2) {
    // User presses a letter button
        checkLetter(pickedLetter)
            if(checkIfDead(lonk, gamon)) {
                gameOverScreen()
                gameStep += 1
            }
    } else {
    // User presses play again
        currentChoices = 0
        gameStep = 1
        word = ""
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


// Checking the letter the user has selected to see if it is in the word that they are guessing. If the letter guessed is correct, Gamon takes damage, if the letter guessed is wrong, Lonk takes damage. Also shows how guesses the player has left
const checkLetter = (letterChoice) => {
    const currentWord = word.toUpperCase()
    if(currentWord.includes(letterChoice)) {
        const pressedLetter = Array.from(wordDashes.getElementsByClassName(letterChoice.toLowerCase()))
      for(let i=0; i < pressedLetter.length; i++) {
        const replaceDashes = document.createElement("span")
        replaceDashes.innerHTML = letterChoice
        wordDashes.replaceChild(replaceDashes, pressedLetter[i])
        const damageTaken = Math.ceil(gamon.totalHealth/currentWord.length)
        gamon.takeDamage(damageTaken)
        heartDiv(gamon, gamonHealth)
      }
    } else {
        const damageTaken = lonk.totalHealth/Math.ceil(currentWord.length * 1.0)
        lonk.takeDamage(damageTaken)
        guessesLeft.innerHTML = `Wrong Guesses Left: ${currentChoices}`
        heartDiv(lonk, lonkHealth)
        currentChoices--
    }
}


// Creating buttons for each letter that interact with game step 2
const generateList = () => {
    alphabetList.innerHTML = ""
    const generateLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const letterArray = generateLetter.split("")
    for(i = 0; i < letterArray.length; i++) {
        const letterButton = document.createElement("button")
        letterButton.setAttribute("value", letterArray[i])
        letterButton.innerHTML = letterArray[i]
        letterButton.classList.add("alphabet")
        letterButton.addEventListener("click", (e) => {
            gamePlayLoop(e.target.value)
        })
        alphabetList.appendChild(letterButton)
    }
}

// Creating underscores for each letter in word array
const generateWord = (selectedWord) => { // game step 1
    wordDashes.innerHTML = ""
    const wordArray = selectedWord.split("")
    for(i = 0; i < wordArray.length; i++) {
        const generateDashes = document.createElement("span")
        generateDashes.classList.add(wordArray[i])
        generateDashes.innerHTML = "_"
        wordDashes.appendChild(generateDashes)
    }
}

//Function to changes heart images when character takes damage
const heartDiv = (charHealthObj, charHealthImg) => {
    const healthPercent = charHealthObj.health / charHealthObj.totalHealth
    if(healthPercent <= 0.75 && healthPercent > 0.50) {
        charHealthImg.src="./Images/3-quarter-heart.png"
    } else if(healthPercent <= 0.50 && healthPercent > 0.25) {
        charHealthImg.src="./Images/half-heart.png"
    } else if(healthPercent <= 0.25 && healthPercent > 0) {
        charHealthImg.src="./Images/quarter-heart.png"
    } else {
        charHealthImg.src="./Images/full-heart.png"
    }
        
}

  // Message that appears on the game over screen, letting you know if you won or not
    const checkIfDead = (goodGuy, badGuy) => {
if(!badGuy.isAlive()) {
    outcomeMessage.innerText = "You are victorious!"
    return true
} else if(!goodGuy.isAlive()) {
    outcomeMessage.innerText = "You have been defeated!"
    return true
} else {
    return false
}
    }

//Function to switch between screens
const gameOverScreen = () => {
    gameOverContainer.classList.remove("hide")
    mainGameContainer.classList.add("hide")
}
// Only shows the start screen and hides the game over screen
restartButton.addEventListener("click", () => {
    gameOverContainer.classList.add("hide")
    landingContainer.classList.remove("hide")
    lonk.resetHealth()
    gamon.resetHealth()
    heartDiv(lonk, lonkHealth)
    heartDiv(gamon, gamonHealth)
    gamePlayLoop()
})

// Only shows the main game screen and hides the start screen
startGameButton.addEventListener("click", () => {
    landingContainer.classList.add("hide")
    mainGameContainer.classList.remove("hide")
})

gamePlayLoop()