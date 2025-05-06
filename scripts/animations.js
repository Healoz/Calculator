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

function setTextWithAnimation(element, newText) {
    const prevText = element.textContent; // the text before the change
    if (prevText === newText || prevText === null || newText === null) {
        return; // if text is the same or null, dont animate
    }

    // creating timeline
    const timeline = gsap.timeline({defaults: {duration: 0.5}, ease: 'back.out(1)'});

    // Check what kind of change happened
    if (prevText.length > newText.length) {
        // If previous text is longer, characters were removed
        const charsDifference = prevText.length - newText.length;
        if (charsDifference > 1) {
            console.log("multiple values removed:", charsDifference, "characters");
        } else {
            console.log("single value removed");
        }
    } else {
        // If new text is longer, characters were added
        const charsDifference = newText.length - prevText.length;
        if (charsDifference > 1) {
            console.log("multiple values added:", charsDifference, "characters");
        } else {
            console.log("single value added");
            // create a new h2 element at the end
            const newHeading = document.createElement("h2");
            const headingContent = document.createTextNode("3");
            newHeading.classList.add('new-answer-text', 'answer-text');
            // animate it in using timeline
            // on animation finish, remove the new element and add it to the main answer
        }
    }

    
    element.textContent = newText;
}

createAnimations();