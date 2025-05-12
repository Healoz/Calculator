// References to DOM
const answerText = document.querySelector(".answer-text");
const newAnswerTextClass = ".new-answer-text";
const calculationText = document.querySelector(".calculation");
const newCalculationTextClass = ".new-calculation";
const buttons = document.querySelectorAll(".button");
const answerContainer = document.querySelector(".answer-text-container");
const calculationContainer = document.querySelector(".calculation-container");

let answerJustSubmitted = false;

// <---------- Calculator Logic -------------------->

function onStart() {
  // setTextWithAnimation(answerText, "0", answerContainer, newAnswerTextClass);
  answerText.textContent = "0";
  // set text without animation

  // setTextWithAnimation(
  //   calculationText,
  //   "",
  //   calculationContainer,
  //   newCalculationTextClass
  // );

  calculationText.textContent = "";

  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => buttonSelected(button));
  });
}

function buttonSelected(button) {
  const buttonVal = button.textContent;
  // if user selects a number
  if (isNumber(buttonVal)) {
    numberSelected(buttonVal);
  }

  // if user selects an operation
  if (isOperation(buttonVal)) {
    operandSelected(buttonVal);
  }

  // if clear selected
  if (isClear(buttonVal)) {
    clearSelected();
  }

  // if delete button selected
  if (isDelete(buttonVal)) {
    deleteSelected();
  }

  if (isDecimal(buttonVal)) {
    decimalSelected(buttonVal);
  }

  if (isPercent(buttonVal)) {
    percentSelected(buttonVal);
  }

  if (isEquals(buttonVal)) {
    equalsSelected();
  } else {
    // once a user presses any button, change answerJustSubmitted to false
    answerJustSubmitted = false;
  }
}

// value selected
function numberSelected(buttonVal) {
  // if blank or answer just submitted, replace the answer with the number selected
  if (answerBlank(answerText.textContent) || answerJustSubmitted) {
    setTextWithAnimation("answer", buttonVal);
  } else if (lastSelectedWasPercent(answerText.textContent)) {
    // if last value was a percent, add a multiply then the number
    setTextWithAnimation("answer", answerText.textContent + "x" + buttonVal);
  } else {
    setTextWithAnimation("answer", answerText.textContent + buttonVal);
  }
}

function operandSelected(buttonVal) {
  // if blank, move the current answer to the calculation text
  if (answerBlank(answerText.textContent)) {
    setTextWithAnimation(calculationText, "Ans = 0");
  }

  if (lastSelectedWasOperation(answerText.textContent)) {
    // replace the last operation with the new operation selected
    setTextWithAnimation(
      answerText,
      answerText.textContent.slice(0, -1) + buttonVal
    );
  } else {
    // if not preceeded by an operation, just add the operation to the end of the answer text
    // answerText.textContent += buttonVal;
    setTextWithAnimation(answerText, answerText.textContent + buttonVal);
  }
}

function clearSelected() {
  setTextWithAnimation(answerText, "0"); // set answer screen to 0
}

function deleteSelected() {
  if (answerText.textContent.length === 1) {
    setTextWithAnimation(answerText, "0"); // if only 1 in length, make zero
  } else {
    setTextWithAnimation(answerText, answerText.textContent.slice(0, -1));
  }
}

function decimalSelected(buttonVal) {
  // if decimal already exists in current number
  const currentNumber = getCurrentNumber(answerText.textContent);

  if (currentNumber.includes(".")) {
    // if the current number already has a decimal, do nothing
    return;
  }
  // answerText.textContent += buttonVal;
  setTextWithAnimation(answerText, (answerText.textContent += buttonVal)); // add decimal to end of answerText
}

function percentSelected(buttonVal) {
  // if last val was operation, replace operation
  if (
    lastSelectedWasOperation(answerText.textContent) ||
    lastSelectedWasPercent(answerText.textContent)
  ) {
    setTextWithAnimation(
      answerText,
      answerText.textContent.slice(0, -1) + buttonVal
    ); // FIXME: Fix bug where last operation was number and it creates 2 percents in a row
  } else {
    setTextWithAnimation(answerText, answerText.textContent + buttonVal); // otherwise, simply add percent at the end
  }
}

function equalsSelected() {
  // Replace 'x' with '*' for multiplication since JavaScript uses '*'
  // Replace '÷' with '/' for division since JavaScript uses '/'
  const rawExpression = answerText.textContent;
  const expression = handlePercentage(rawExpression); // more complex functionality for percent
  const jsExpression = expression.replace(/x/g, "*").replace(/÷/g, "/");
  console.log(jsExpression);
  let answer;

  try {
    answer = eval(jsExpression);
    answer = handleDecimals(answer); // round to 3 decimal places if needed
    // if answer was successful
    if (answer !== undefined) {
      setTextWithAnimation(answerText, answer); // put the answer in the answer text
      setTextWithAnimation(calculationText, rawExpression + " ="); // put expression at the top
      answerJustSubmitted = true; // if user next inputs any numbers, overwrite
    }
  } catch (error) {
    console.error("Invalid expression:", error);
  }
}

onStart();
