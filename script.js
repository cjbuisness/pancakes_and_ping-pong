const scrollToTopButton = document.getElementById('scrollToTop');

// Show button when scrolling down 20px from the top
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.opacity = 1; // Make button visible
    } else {
        scrollToTopButton.style.opacity = 0; // Hide button
    }
};

scrollToTopButton.onclick = function() {
    // Temporarily disable hover effect by removing the hover class
    scrollToTopButton.classList.remove('hover:bg-yellow-700');
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Re-enable hover effect after scrolling is complete
    setTimeout(function() {
        scrollToTopButton.classList.add('hover:bg-yellow-700');
    }, 500); // Adjust the delay to match the scrolling duration if necessary
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
    }, 1500); // Change the time as needed
}

// Initialize everything after the page is loaded
window.onload = function () {
    handleThanksgivingAnimation(); // Start the Thanksgiving animation
    startCountdown();
    initMap(); // Initialize the map when the page loads
    
};
// Function to handle the RSVP and show confirmation message
function handleRSVP(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    const name = event.target.name.value; // Get the name value from the form

    // Show the confirmation message
    const confirmationMessage = document.getElementById("confirmationMessage");
    confirmationMessage.style.display = "block"; // Display confirmation message

    // Hide the form after submission
    const form = document.getElementById("rsvpForm");
    form.style.display = "none"; // Hide the form immediately

    // Submit the form as soon as the confirmation message appears
    setTimeout(() => {
        form.submit(); // Submit the form directly to FormSubmit
    }, 500); // Optional delay to simulate processing (500ms)
}

// Toggle RSVP section visibility
document.getElementById('rsvp-button').addEventListener('click', function () {
    const rsvpSection = document.getElementById('rsvp');
    rsvpSection.classList.toggle('hidden'); // Show/hide the RSVP section
});

// Handle dropdown menu toggle
document.getElementById('dropdownButton').addEventListener('click', function () {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('hidden'); // Show/hide the dropdown menu
});

// Close dropdown if clicked outside
window.addEventListener('click', function (event) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownButton = document.getElementById('dropdownButton');
    if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.classList.add('hidden'); // Hide the dropdown if clicking outside
    }
});
