const answerText = document.querySelector(".answer-text");
const calculationText = document.querySelector(".calculation");
const buttons = document.querySelectorAll(".button");
const operations = ['÷', 'x', '-', '+'];

// <---------- Calculator Logic -------------------->

function onStart() {
    answerText.textContent = '0';
    calculationText.textContent = null;

    buttons.forEach(button => {
        button.addEventListener('mousedown', () => buttonSelected(button));
    });
}

function buttonSelected(button) {
    const buttonVal = button.textContent;
 
    // if user selects a number
    if (isNumber(buttonVal)) {
        // if blank, replace the answer with the number selected
        if (answerBlank()) {
            answerText.textContent = buttonVal;
        }
        else {
            answerText.textContent = answerText.textContent + buttonVal;
        }
    }

    // if user selects an operation
    if (isOperation(buttonVal)) {
        // if blank, move the current answer to the calculation text
        if (answerBlank()) {
            calculationText.textContent = "Ans = 0";
        }

        if (lastSelectedWasOperation()) { // replace the last operation with the new operation selected
            answerText.textContent = answerText.textContent.slice(0, -1) + buttonVal;
        }
        else {
            // if not preceeded by an operation, just add the operation to the end of the answer text
            answerText.textContent += buttonVal;
        }
    }
    
}

// Conditional checkers

function answerBlank() { // checks if answer is empty
    return answerText.textContent === "0";
}

function isNumber(btnValue) {
    return !isNaN(parseInt(btnValue));
}

function isOperation(btnValue) {
   return operations.includes(btnValue);
}

function lastSelectedWasOperation() {
    const lastChar = answerText.textContent[answerText.textContent.length - 1];
    return isOperation(lastChar); // checking if the last selected button was an operation
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





// <---------- Creating GSAP Animations -------------------->
function createAnimations() {

    const timeline = gsap.timeline({defaults: {duration: 0.5}, ease: 'back.out(1)'});

    timeline
        .from('.calculator', {y: '100%', x: '-50%', rotate: '10%', opacity: 0})
        .from('.button', {y: '100%', rotate: '5%', opacity: 0, stagger: 0.05})
        .from('.answer-text', {y: '100%', opacity: 0}, '<0.5')

        // btn hover effects
    gsap.utils.toArray('.button').forEach(button => {
        const hoverIn = gsap.to(button, {
            scale: 1.03,
            paused: true,
            textShadow: '2px 2px 0px #2eeaa8',
            duration: 0.3
    });

        // Click animation
        const clickDown = gsap.to(button, {
            scale: 0.95, // Scale down on click
            duration: 0.1,
            paused: true
        });

        // Add event listeners
        button.addEventListener('mouseenter', () => hoverIn.play());
        button.addEventListener('mouseleave', () => hoverIn.reverse());
        
        // Click events
        button.addEventListener('mousedown', () => clickDown.play());
        button.addEventListener('mouseup', () => clickDown.reverse());
        button.addEventListener('mouseleave', () => clickDown.reverse()); // In case mouse leaves while button is pressed
    });
}

onStart();
createAnimations();

