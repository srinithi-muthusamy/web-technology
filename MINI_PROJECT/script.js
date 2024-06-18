function showDescription(index) {
    // Hide all descriptions
    let descriptions = document.querySelectorAll('.description');
    descriptions.forEach(description => {
        description.classList.remove('active');
    });

    // Remove active class from all dots
    let dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show the selected description
    let selectedDescription = document.getElementById(`description-${index}`);
    selectedDescription.classList.add('active');

    // Add active class to the clicked dot
    dots[index - 1].classList.add('active');
}

// Initialize the first description to be active initially
document.addEventListener("DOMContentLoaded", function() {
    let firstDescription = document.getElementById('description-1');
    firstDescription.classList.add('active');
    document.querySelector('.dot').classList.add('active');
});
