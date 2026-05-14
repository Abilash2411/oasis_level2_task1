// Select the display element and all buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

// Add an eventListener to every button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const number = button.getAttribute('data-number');

        // IF a number button is clicked
        if (number !== null) {
            if (currentInput === '0') currentInput = ''; // Prevent leading zeros
            currentInput += number;
            display.textContent = currentInput;
        }

        // IF an operator button is clicked
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            let operatorSymbol = '+';
            if (action === 'subtract') operatorSymbol = '-';
            if (action === 'multiply') operatorSymbol = '*';
            if (action === 'divide') operatorSymbol = '/';

            currentInput += operatorSymbol;
            display.textContent = currentInput;
        }

        // IF the clear button is clicked
        if (action === 'clear') {
            currentInput = '0';
            display.textContent = currentInput;
            currentInput = ''; 
        }

        // IF the equals button is clicked
        if (action === 'calculate') {
            try {
                // eval() processes the mathematical string (e.g., "7+5*2")
                let result = eval(currentInput);
                
                // Prevent displaying undefined or Infinity issues
                if (!isFinite(result)) {
                    throw new Error("Math Error");
                }
                
                currentInput = result.toString();
                display.textContent = currentInput;
            } catch (error) {
                display.textContent = 'Error';
                currentInput = '';
            }
        }
    });
});