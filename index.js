const startGameButton = document.getElementById("start-game")
const restartButton = document.getElementById("restart-button")
const landingContainer = document.getElementsByClassName("landing-container")[0]
const mainGameContainer = document.getElementsByClassName("main-game-container")[0]
const gameOverContainer = document.getElementsByClassName("game-over-container")[0]
const outcomeMessage = document.getElementById("outcome-message")
const wordDashes = document.getElementsByClassName("dashes")[0]
const guessesLeft = document.getElementsByClassName("guesses-left-container")[0]
const lonkHealth = document.getElementById("lonk-heart")
const gamonHealth = document.getElementById("gamon-heart")
const alphabetList = document.getElementsByClassName("alphabet-list")[0]

class Characters { // should be singular 
    constructor(name, totalHealth) {
        this.name = name
        this.totalHealth = totalHealth
        this.health = totalHealth
    }
    // Returns the character health after they have taken damage // good comment! love that you list what the return is, 
    takeDamage(incomingDamage) {
        this.health = this.health - incomingDamage
        return this.health
    }
    // Checks if the characters are still alive
    isAlive() {
        return Math.floor(this.health) > 0
    }
    resetHealth() {
        this.health = this.totalHealth
    }
}
// global variables should be grouped together at top of file
let gameStep = 1 // creative solution to handling your app states
let word = ""
let currentChoices = 0
// Steps for the cycle of the game
const gamePlayLoop = (pickedLetter) => { // we should consider breaking the function up here up to follow the functional programming paradigm : 'a function should do 1 thing and do it well'
    if (gameStep === 1) {// following the idea of 37 - initializeGame ? setGame ? etc
        // User presses start game button
        word = pickedWord(words)
        generateList()
        generateWord(word)
        if (currentChoices < word.length) {
            currentChoices = Math.ceil(word.length * 1.5)
            guessesLeft.innerHTML = `Wrong Guesses Left: ${currentChoices}`
        }
        gameStep += 1
    } else if (gameStep === 2) {
        // User presses a letter button
        checkLetter(pickedLetter)
        if (checkIfDead(lonk, gamon)) {
            gameOverScreen()
            currentChoices = 0
            gameStep = 1
            word = ""
        }
    }
}
// see 32
const lonk = new Characters("Lonk", 100)

const gamon = new Characters("Gamon", 150)
// 'magic array' like magic number variables can be allcaps : WORDS
const words = ["power", "wisdom", "courage", "triforce", "ocarina", "twilight", "hyrule", "skyward", "korok"]

// Randomizes word that is chosen for the user to guess
const pickedWord = (wordsArray) => { // past tense makes it seem like this variable should hold the word value, not the function that picks it ( remember that functions should have present tense verbs in the name )
    const randomIndex =
        Math.floor(Math.random() * wordsArray.length)
    const returnWord = wordsArray[randomIndex]
    console.log(randomIndex, returnWord)
    return returnWord
}

// Checking the letter the user has selected to see if it is in the word that they are guessing. If the letter guessed is correct, Gamon takes damage, if the letter guessed is wrong, Lonk takes damage. Also shows how many guesses the player has left.
const checkLetter = (letterChoice) => {
    const grayLetter = document.querySelector(`#${letterChoice}`)
    const currentWord = word.toUpperCase()
    if (currentWord.includes(letterChoice)) {
        const pressedLetter = Array.from(wordDashes.getElementsByClassName(letterChoice.toLowerCase())) // nice use of Array constructor
        for (let i = 0; i < pressedLetter.length; i++) {
            const replaceDashes = document.createElement("span")
            replaceDashes.innerHTML = letterChoice
            wordDashes.replaceChild(replaceDashes, pressedLetter[i])
            const damageTaken = gamon.totalHealth / currentWord.length
            gamon.takeDamage(damageTaken)
            heartDiv(gamon, gamonHealth)
        }

    } else {
        const damageTaken = lonk.totalHealth / Math.ceil(currentWord.length * 1.5)
        lonk.takeDamage(damageTaken)
        guessesLeft.innerHTML = `Wrong Guesses Left: ${currentChoices}`
        heartDiv(lonk, lonkHealth)
        grayLetter.classList.add("wrongLetter")
        grayLetter.disabled = true
        currentChoices--
    }
}

// Creating buttons for each letter that interact with game step 2
const generateList = () => { // generate what list ? 
    alphabetList.innerHTML = ""
    const generateLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // see 63 // generate is a verb -> makes me think this is a function not 'magic' array 
    const letterArray = generateLetter.split("") // nice use of split // great name
    for (i = 0; i < letterArray.length; i++) {
        const letterButton = document.createElement("button")
        letterButton.setAttribute("value", letterArray[i])
        letterButton.setAttribute("id", letterArray[i])
        letterButton.innerHTML = letterArray[i]
        letterButton.classList.add("alphabet")
        letterButton.addEventListener("click", (e) => {
            gamePlayLoop(e.target.value)
        })
        alphabetList.appendChild(letterButton)
    }
}

// Creating underscores for each letter in word array
const generateWord = (selectedWord) => { // game step 1 // name is ambiguous , generateWordBlanks ? 
    wordDashes.innerHTML = ""
    const wordArray = selectedWord.split("")
    for (i = 0; i < wordArray.length; i++) {
        const generateDashes = document.createElement("span")
        generateDashes.classList.add(wordArray[i])
        generateDashes.innerHTML = "_"
        wordDashes.appendChild(generateDashes)
    }
}

// Function to change heart images when character takes damage
const heartDiv = (charHealthObj, charHealthImg) => {// function name reads as a cached Dom element not a function - consider renderHeartDiv, draw, display, update, etc. ( include a verb, like in 67 )
    const healthPercent = charHealthObj.health / charHealthObj.totalHealth
    if (healthPercent <= 0.75 && healthPercent > 0.50) {
        charHealthImg.src = "./Images/3-quarter-heart.png"
    } else if (healthPercent <= 0.50 && healthPercent > 0.25) {
        charHealthImg.src = "./Images/half-heart.png"
    } else if (healthPercent <= 0.25 && healthPercent > 0) {
        charHealthImg.src = "./Images/quarter-heart.png"
    } else {
        charHealthImg.src = "./Images/full-heart.png"
    }
}

// Message that appears on the game over screen, letting you know if you won or lost
const checkIfDead = (goodGuy, badGuy) => {
    if (!badGuy.isAlive()) {
        outcomeMessage.innerText = "You are victorious!"
        return true
    } else if (!goodGuy.isAlive()) {
        outcomeMessage.innerText = "You have been defeated!"
        return true
    } else {
        return false
    }
}

// Function to switch between screens
const gameOverScreen = () => {// see 132 + 67
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