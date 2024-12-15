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
                document.getElementById("pairing").textContent = `${name}, you are ${pairing.santa}'s Secret Santa.`;
                document.getElementById("error").textContent = "";

                // Add the Secret Santa image
                const img = document.createElement('img');
                img.src = 'https://img.freepik.com/premium-vector/group-young-people-characters-holding-wine-glasses_1016-5599.jpg?semt=ais_hybrid';
                img.alt = 'Secret Santa Image';
                img.style.width = '300px'; // Adjust size if needed
                img.style.display = 'block';
                img.style.marginTop = '20px';
                
                // Append the image to the pairing div
                document.getElementById("pairing").appendChild(img);
            } else {
                document.getElementById("pairing").textContent = "";
                document.getElementById("error").textContent = "Invalid name. Please enter a valid name.";
            }
        })
        .catch(error => {
            console.error("Error loading pairings data:", error);
            document.getElementById("error").textContent = "There was an error fetching the Secret Santa data.";
        });
});

// Function to get the pairing for the given name
function getPairing(name, pairingsData) {
    // Find the pairing where the person's name matches
    return pairingsData.find(person => person.name.toLowerCase() === name.toLowerCase());
}
