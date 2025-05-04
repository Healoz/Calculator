const operations = ['÷', 'x', '-', '+'];

// helper functions
function getCurrentNumber(answerText) {
    
    for (let i = answerText.length - 1; i >= 0; i--) {
        if (operations.includes(answerText[i])) {
            return answerText.substring(i + 1);
        }
    }
    return answerText; // if no operation found, just return the whole answer
}

function handlePercentage(expression) {
    // This is a simplified example - you might need more sophisticated parsing
    // Converts percentages to decimal form (e.g., "50%" becomes "0.5")
    return expression.replace(/(\d+)%/g, function(match, number) {
    return number / 100;
  });
}

function handleDecimals(answer) {
    const answerString = answer.toString();
    if (answerString.includes('.') && answerString.split('.')[1].length > 3) {
        return parseFloat(answer.toFixed(3));
    }
    return answer; // return original number if it doesnt need formatting
}

function lastSelectedWasOperation(answerText) {
    const lastChar = answerText[answerText.length - 1];
    return isOperation(lastChar); // checking if the last selected button was an operation
}

function lastSelectedWasPercent(answerText) {
    const lastChar = answerText[answerText.length - 1];
    return isPercent(lastChar); // checking if the last selected button was a percent
}

function isNumber(btnValue) {
    for (let i = 0; i < btnValue.length; i++) {
        if (isNaN(parseInt(btnValue[i]))) {
            return false;
        }
    }
    return true;
}

// Conditional checkers
function answerBlank(answerText) { // checks if answer is empty
    return answerText === "0";
}

function isOperation(btnValue) {
   return operations.includes(btnValue);
}

function isClear(btnValue) {
    return btnValue === 'C';
}

function isDelete(btnValue) {
    return btnValue === 'DEL';
}

function isEquals(btnValue) {
    return btnValue === '=';
}

function isDecimal(btnValue) {
    return btnValue === '.';
}

function isPercent(btnValue) {
    return btnValue === '%';
}

module.exports = {
    isNumber,
    isOperation,
    isClear,
    isDelete,
    isEquals,
    isDecimal,
    isPercent,
    getCurrentNumber,
    handlePercentage,
    handleDecimals,
    lastSelectedWasOperation,
    lastSelectedWasPercent
  };