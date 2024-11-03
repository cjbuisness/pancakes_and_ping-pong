const scrollToTopButton = document.getElementById('scrollToTop');

window.onscroll = function() {
    // Show button when scrolling down 20px from the top
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.opacity = 1; // Make button visible
    } else {
        scrollToTopButton.style.opacity = 0; // Hide button
    }
};

scrollToTopButton.onclick = function() {
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Initialize Leaflet map
function initMap() {
    const eventLocation = [33.621944, -111.975833]; // Lat/long for 4966 E. Fellars Dr, Scottsdale, AZ
    const map = L.map('map').setView(eventLocation, 14); // Set zoom to 14

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker
    L.marker(eventLocation).addTo(map)
        .bindPopup('4966 E. Fellars Dr, Scottsdale, AZ')
        .openPopup();

    // Invalidate map size after a delay to ensure it's rendered properly on mobile
    setTimeout(function() {
        map.invalidateSize();
    }, 500); // Adjust the delay if necessary
}

// Countdown Timer Functionality
function startCountdown() {
    const eventDate = new Date('November 28, 2024 09:00:00').getTime();
    const countdownElement = document.getElementById('countdown');

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Event starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown is finished, display a message
        if (timeLeft < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "The event has started!";
        }
    }, 1000);
}

// Function to handle the animation of the Thanksgiving message
function handleThanksgivingAnimation() {
    const thanksgivingElement = document.getElementById('thanksgiving-animation');
    // Fade out the message after 3 seconds
    setTimeout(() => {
        thanksgivingElement.style.opacity = 0; // Start fading out
        // Remove the element after fade-out
        setTimeout(() => {
            thanksgivingElement.style.display = 'none'; // Remove from the DOM
        }, 500); // Wait for the fade-out to complete
    }, 3000); // Change the time as needed
}

// Initialize everything after the page is loaded
window.onload = function () {
    startCountdown();
    initMap(); // Initialize the map when the page loads
    handleThanksgivingAnimation(); // Start the Thanksgiving animation
};

function handleRSVP(event) {
    event.preventDefault(); // Prevent default form submission behavior
    const name = event.target[0].value;
    const email = event.target[1].value;

    // Simulate sending RSVP to server (you can replace with actual logic)
    alert(`Thank you, ${name}! Your RSVP has been received, and we look forward to seeing you!`);
    event.target.reset(); // Reset the form
}

document.getElementById('rsvp-button').addEventListener('click', function() {
    const rsvpSection = document.getElementById('rsvp');
    rsvpSection.classList.toggle('hidden'); // Show/hide the RSVP section
});

// Attach the RSVP handler to the form
document.querySelector('form').addEventListener('submit', handleRSVP); // Make sure this targets the right form
