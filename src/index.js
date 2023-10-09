function displayCharacterDetails(character) {
    const nameElement = document.getElementById('name');
    const imageElement = document.getElementById('image');
    const voteCountElement = document.getElementById('vote-count');
    const votesForm = document.getElementById('votes-form');
  
    nameElement.textContent = character.name;
    imageElement.src = character.image; // Set the 'src' attribute to the image URL
    voteCountElement.textContent = `Character's Votes: ${character.votes}`;
  
    // Handle the form submission to add votes
    votesForm.addEventListener('submit', event => {
      event.preventDefault();
      const voteInput = document.getElementById('votes');
      const voteCount = parseInt(voteInput.value, 10);
  
      if (!isNaN(voteCount) && voteCount >= 1) {
        // Update the UI with the new vote count (no server persistence)
        character.votes += voteCount;
        voteCountElement.textContent = `Character's Votes: ${character.votes}`;
        voteInput.value = ''; // Clear the input field
      } else {
        alert('Please enter a valid vote count.');
      }
    });
  
    // Bonus: Handle the Reset Votes button click (uncomment the HTML element)
    const resetButton = document.getElementById('reset-btn');
    resetButton.addEventListener('click', () => {
      character.votes = 0; // Reset votes
      voteCountElement.textContent = `Character's Votes: ${character.votes}`;
    });
  }
  
  // Fetch character data from the server and populate the character bar
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(characters => {
      const characterBar = document.getElementById('character-bar');
  
      characters.forEach(character => {
        const characterName = document.createElement('span');
        characterName.textContent = character.name;
  
        // Add a click event listener to display character details
        characterName.addEventListener('click', () => {
          displayCharacterDetails(character);
        });
  
        characterBar.appendChild(characterName);
      });
    })
    .catch(error => {
      console.error('Error fetching character data:', error);
    });
  

