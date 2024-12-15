// Handle the form submission
document.getElementById("santa-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    
    // Fetch the pairings data from the external JSON file
    fetch('pairs.json')
        .then(response => response.json())  // Parse the JSON data
        .then(pairingsData => {
            const pairing = getPairing(name, pairingsData);
            
            // Display the pairing or error message
            if (pairing) {
                document.getElementById("pairing").textContent = `${name}, you are paired with entrant ${pairing.pair} as your Secret Santa.`;
                document.getElementById("error").textContent = "";

                // Add the Secret Santa image
                const img = document.createElement('img');
                img.src = 'santa.png';
                img.alt = 'Secret Santa Image';
                img.style.width = '300px'; // Adjust size if needed
                img.style.display = 'block';
                img.style.marginTop = '20px';
                
                // Append the image to the pairing div
                document.getElementById("pairing").appendChild(img);

                // Optionally, add snowman and Christmas tree images
                addDecorations();
            } else {
                document.getElementById("pairing").textContent = "";
                document.getElementById("error").textContent = "Invalid entrant number. Please enter a valid entrant number.";
            }
        })
        .catch(error => {
            console.error("Error loading pairings data:", error);
            document.getElementById("error").textContent = "There was an error fetching the Secret Santa data.";
        });
});

// Function to get the pairing for the given name
function getPairing(name, pairingsData) {
    // Find the pairing where the entrant number matches
    return pairingsData.find(person => person.entrant === name);
}

// Function to add snowman and Christmas tree images as decorations
function addDecorations() {
    const snowman = document.createElement('img');
    snowman.src = 'snowman.png'; // Path to snowman image
    snowman.alt = 'Snowman';
    snowman.style.width = '100px'; // Adjust size
    snowman.style.position = 'absolute';
    snowman.style.bottom = '5%';
    snowman.style.left = '10%';
    snowman.style.zIndex = '10';

    const christmasTree = document.createElement('img');
    christmasTree.src = 'ct.png'; // Path to Christmas tree image
    christmasTree.alt = 'Christmas Tree';
    christmasTree.style.width = '120px'; // Adjust size
    christmasTree.style.position = 'absolute';
    christmasTree.style.bottom = '5%';
    christmasTree.style.right = '10%';
    christmasTree.style.zIndex = '10';

  
}
