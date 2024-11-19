// <!-- JavaScript -->
		let strictMode = false;
		let powerOn = false;
		const sequence = [];
		let userSequence = [];
		let level = 1;

		const levelCount = document.querySelector('.level-count');

		function startGame() {
			sequence.length = 0;
			userSequence.length = 0;
			level = 1;
			levelCount.textContent = level;
			nextRound();
			document.getElementById("start-btn").disabled = true;
			document.getElementById("power-btn").disabled = false;
		}

		function nextRound() {
			addToSequence();
			playSequence();
		}

		function addToSequence() {
			const randomColor = Math.floor(Math.random() * 4) + 1;
			sequence.push(randomColor);
		}

		function playSequence() {
			let i = 0;
			const intervalId = setInterval(() => {
				highlightButton(sequence[i]);
				i++;
				if (i >= sequence.length) {
					clearInterval(intervalId);
					enableButtons();
				}
			}, 1000);
		}

		function handleClick(button) {
			if (powerOn) {
				const userColor = button.getAttribute("data-color");
				userSequence.push(Number(userColor));
				highlightButton(userColor);
				if (!checkSequence()) {
					if (strictMode) {
						alert(`Game over! Press Start to retry 
						from level 1.\nFINAL SCORE: ${level}`);
						togglePower();
						startGame();
					} else {
						alert(`Wrong sequence! Press Start to try again
						from current level.\nFINAL SCORE: ${level}`);
						userSequence = [];
						document.getElementById('power-btn')
						.addEventListener('click', () => {
							playSequence();
						})
					}
				} else if (userSequence.length === sequence.length) {
					userSequence = [];
					level++;
					levelCount.textContent = level;
					/*Can change level as per convenience or if we want the game to 
					continue indefinitely, can omit if-else condition */
					if (level <= 20) {
						setTimeout(() => nextRound(), 1000);
					} else {
						alert("Congratulations! You won!");
						startGame();
					}
				}
			}
		}

		function checkSequence() {
			for (let i = 0; i < userSequence.length; i++) {
				if (userSequence[i] !== sequence[i]) {
					return false;
				}
			}
			return true;
		}

		function highlightButton(color) {
			const button = document
			.querySelector(`[data-color="${color}"]`);
			if (Number(color) == 1) {
				button.style.backgroundColor = 'lightgreen'
			}
			else if (Number(color) == 2) {
				button.style.backgroundColor = 'tomato'
			}
			else if (Number(color) == 3) {
				button.style.backgroundColor = 'yellow'
			}
			else if (Number(color) == 4) {
				button.style.backgroundColor = 'lightskyblue'
			}
			setTimeout(() => {
				button.attributes.removeNamedItem('style');
			}, 300);
		}

		function enableButtons() {
			const buttons = document
			.querySelectorAll('.simon-btn');
			buttons.forEach(button => 
			button.removeAttribute('disabled'));
		}

		function disableButtons() {
			const buttons = document
			.querySelectorAll('.simon-btn');
			buttons.forEach(button => 
			button.setAttribute('disabled', 'true'));
		}

		function toggleStrictMode() {
			strictMode = !strictMode;
		}

		function togglePower() {
			powerOn = !powerOn;
			if (powerOn) {
				startGame();
				enableButtons();
				document.getElementById("start-btn")
				.disabled = false;
			} else {
				userSequence = [];
				disableButtons();
				document.getElementById("start-btn")
				.disabled = true;
			}
		}
	
    // Define sounds for each button
const sounds = {
  1: new Audio('sounds/green.mp3'),
  2: new Audio('sounds/red.mp3'),
  3: new Audio('sounds/yellow.mp3'),
  4: new Audio('sounds/blue.mp3'),
};

function highlightButton(color) {
  const button = document.querySelector(`[data-color="${color}"]`);
  
  // Change button background color
  if (Number(color) == 1) {
      button.style.backgroundColor = 'lightgreen';
  } else if (Number(color) == 2) {
      button.style.backgroundColor = 'tomato';
  } else if (Number(color) == 3) {
      button.style.backgroundColor = 'yellow';
  } else if (Number(color) == 4) {
      button.style.backgroundColor = 'lightskyblue';
  }

  // Play corresponding sound
  sounds[color].currentTime = 0; // Reset sound to start
  sounds[color].play();

  // Remove the highlight effect after 300ms
  setTimeout(() => {
      button.attributes.removeNamedItem('style');
  }, 300);
}
