let currentDisplay = '0';
let justCalculated = false; // Prevents appending to a finished result

// Updates the screen with the current input
function updateDisplay() {
    document.getElementById('display').innerText = currentDisplay;
}

// Handles clicking a number
function appendNumber(number) {
    if (currentDisplay === '0' || justCalculated) {
        currentDisplay = number;
        justCalculated = false;
    } else {
        currentDisplay += number;
    }
    updateDisplay();
}

// Handles clicking +, -, *, /
function appendOperator(operator) {
    // Prevent adding multiple operators in a row
    const lastChar = currentDisplay.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentDisplay = currentDisplay.slice(0, -1) + operator;
    } else {
        currentDisplay += operator;
    }
    justCalculated = false;
    updateDisplay();
}

// Clears everything (C button)
function clearDisplay() {
    currentDisplay = '0';
    updateDisplay();
}

// Deletes the last character (DEL button)
function deleteLast() {
    if (currentDisplay.length === 1 || currentDisplay === 'Error' || justCalculated) {
        currentDisplay = '0';
    } else {
        currentDisplay = currentDisplay.slice(0, -1);
    }
    updateDisplay();
}

// Calculates the math
function calculateResult() {
    try {
        // eval() evaluates the math expression represented as a string
        let result = eval(currentDisplay);
        
        // Handle dividing by zero
        if (!isFinite(result)) {
            currentDisplay = "Error";
        } else {
            // Round to avoid long decimals (e.g., 0.1 + 0.2)
            currentDisplay = String(Math.round(result * 100000000) / 100000000);
        }
    } catch (error) {
        // Catches syntax errors (e.g., "5++5")
        currentDisplay = "Error";
    }
    justCalculated = true;
    updateDisplay();
}