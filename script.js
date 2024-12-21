document.getElementById("santa-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value.trim();
    
    fetch('pairs.json')
        .then(response => response.json())  
        .then(pairingsData => {
            const pairing = getPairing(name, pairingsData);
            
            if (pairing) {
                // Update count for the entered name
                fetch('/update-counts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ entrant: name, count: 1 })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Updated counts:', data);
                })
                .catch(error => console.error('Error updating counts:', error));

                document.getElementById("pairing").innerHTML = `${name}, you are ${pairing.pair}'s Secret Santa.<br>Go deliver your message.`;
                document.getElementById("error").textContent = "";

                const img = document.createElement('img');
                img.src = 'santa.png';  
                img.alt = 'Secret Santa Image';
                img.style.width = '300px'; 
                img.style.display = 'block';
                img.style.marginTop = '20px';
                
                document.getElementById("pairing").appendChild(img);
                document.getElementById("find-again").style.display = 'inline-block';
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

function getPairing(name, pairingsData) {
    return pairingsData.find(person => person.entrant === name);
}

document.getElementById("find-again").addEventListener("click", function() {
    document.getElementById("name").value = "";
    document.getElementById("pairing").textContent = "";
    document.getElementById("error").textContent = "";
    document.getElementById("find-again").style.display = 'none';
});
