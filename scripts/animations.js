// <---------- Creating GSAP Animations -------------------->
function createAnimations() {
  const timeline = gsap.timeline({
    defaults: { duration: 0.5 },
    ease: "back.out(1)",
  });

  timeline
    .from(".calculator", { y: "100%", x: "-50%", rotate: "10%", opacity: 0 })
    .from(".button", { y: "100%", rotate: "5%", opacity: 0, stagger: 0.05 })
    .from(".answer-text", { y: "100%", opacity: 0 }, "<0.5");

  // btn hover effects
  gsap.utils.toArray(".button").forEach((button) => {
    const hoverIn = gsap.to(button, {
      scale: 1.03,
      paused: true,
      textShadow: "2px 2px 0px #2eeaa8",
      duration: 0.3,
    });

    // Click animation
    const clickDown = gsap.to(button, {
      scale: 0.95, // Scale down on click
      duration: 0.1,
      paused: true,
    });

    // Add event listeners
    button.addEventListener("mouseenter", () => hoverIn.play());
    button.addEventListener("mouseleave", () => hoverIn.reverse());

    // Click events
    button.addEventListener("mousedown", () => clickDown.play());
    button.addEventListener("mouseup", () => clickDown.reverse());
    button.addEventListener("mouseleave", () => clickDown.reverse()); // In case mouse leaves while button is pressed
  });
}

function setTextWithAnimation(element, newText) {
  const prevText = element.textContent; // the text before the change
  if (prevText === newText || prevText === null || newText === null) {
    return; // if text is the same or null, dont animate
  }

  // creating timeline
  const timeline = gsap.timeline({
    defaults: { duration: 0.3 },
    ease: "back.out(1)",
  });

  // getting reference to container that new item will be child of
  const answerContainer = document.querySelector(".answer-text-container");

  // Check what kind of change happened
  if (prevText.length > newText.length) {
    // If previous text is longer, characters were removed
    charsRemoved(prevText, newText, answerContainer, timeline, element);
  } else {
    // If new text is longer, characters were added
    charsAdded(prevText, newText, answerContainer, timeline, element);
  }

  //   element.textContent = newText;
}

function charsAdded(prevText, newText, answerContainer, timeline, element) {
  const addedChars = newText.substring(prevText.length); // get the new char(s)

  // create a new h2 element at the end
  const newHeading = document.createElement("h2");
  newHeading.textContent = addedChars;
  newHeading.classList.add("new-answer-text", "answer-text");

  // append heading to the container
  answerContainer.appendChild(newHeading);

  //   perform animation
  timeline.from(".new-answer-text", {
    y: "100%",
    rotate: "10%",
    opacity: 0,
    onComplete: () => {
      // on animation finish, remove the new element and add it to the main answer
      newHeading.remove();
      element.textContent = newText;
    },
  });
}

function charsRemoved(prevText, newText, answerContainer, timeline, element) {
  const charsDifference = prevText.length - newText.length;
  if (charsDifference > 1) {
    console.log("multiple values removed:", charsDifference, "characters");
  } else {
    console.log("single value removed");
  }
}

createAnimations();
