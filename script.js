const numberButtons = document.querySelectorAll("[data-number]")
const operatorButons = document.querySelectorAll("[data-operator]")
const equalsButton = document.querySelector("#equalsButton")
const clearButton = document.querySelector("#clearButton")
const deleteButton = document.querySelector("#deleteButton")
const pointButton = document.querySelector("#pointButton")
let lastScrn = document.querySelector("#lastOpScreen")
let currentScrn = document.querySelector("#currentOpScreen")
let currentOperation = null
let firstOperand = ''
let secondOperand = ''
let shouldResetScreen = false


clearButton.addEventListener('click', clearScreens)
deleteButton.addEventListener('click', delNumber)
pointButton.addEventListener('click', appendPoint)
equalsButton.addEventListener('click', evaluate)
window.addEventListener('keydown', handleKeyboardInput)

operatorButons.forEach((button) => button.addEventListener('click',() => setOperation(button.textContent)))

function beginScreen() {
    currentScrn.textContent = "0"
}

beginScreen();

function appendNumber(number) {
    if (currentScrn.textContent == "0" || shouldResetScreen) {
        resetScreen()
    }
    currentScrn.textContent += number
}

function resetScreen()
{
    currentScrn.textContent = " "
    shouldResetScreen = false
}

numberButtons.forEach((button) => 
button.addEventListener('click', () => appendNumber(button.textContent)))

function clearScreens() {
    currentScrn.textContent = "0"
    lastScrn.textContent = " "
}

function delNumber() {
    currentScrn.textContent = currentScrn.textContent.toString().slice(0, -1)
}

function appendPoint() {
    if (currentScrn.textContent.includes(".")) {
        return currentScrn.textContent 
    }
    else if (currentScrn.textContent === " ") {
        currentScrn.textContent = "" }
    else {
        currentScrn.textContent += "."
    } /* doesn't add a 0 before "." if currentScrn.textContent = ""*/
}

function setOperation(operator) {
    if (currentOperation !== null) {
        evaluate()
    }
    firstOperand = currentScrn.textContent
    currentOperation = operator
    lastScrn.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) {
        return
    }
    /*if (currentOperation === "÷" && currentScrn.textContent === "O") {
        alert("You can't divide by zero!")
        console.log("You can't divide by zero!")
        return
    } not working! */
    secondOperand = currentScrn.textContent
    currentScrn.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
    lastScrn.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) {
        appendNumber(e.key)
    }
    if (e.key === ".") {
        appendPoint()
    }
    if (e.key === "Backspace") {
        delNumber()
    }
    if (e.key === "=" || e.key === "Enter") {
        evaluate()
    }
    if (e.key === "Escape") clearScreens()
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        setOperation(convertOperator(e.key))
    }
}
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') {return '÷'}
    if (keyboardOperator === '*') {return '×'}
    if (keyboardOperator === '-') {return '−'}
    if (keyboardOperator === '+') {return '+'}
}

function add(a, b) {
    return a + b
}
function subtract(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b 
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)

    if(operator == '+') {
        return add(a, b)
    }
    else if(operator == '-') {
        return subtract(a, b)
    }
    else if(operator == '÷') {
        if(b === 0) {
            return null
        }
        return divide(a, b)
    }
    else {
        return multiply(a, b)
    }
}