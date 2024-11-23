const keys = document.querySelectorAll('.key');
const output = document.getElementById('output');

// Add event listener for each key in the keyboard
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.dataset.key;
        output.textContent = `You pressed: ${keyValue}`;
        highlightKey(keyValue, true);
    });
});

// Add event listeners for keyboard keydown and keyup
document.addEventListener('keydown', (e) => {
    const key = document.querySelector(`.key[data-key=${e.code}]`);
    if (key) {
        output.textContent = `You pressed: ${e.key}`;
        highlightKey(e.code, true);
    }
});

document.addEventListener('keyup', (e) => {
    const key = document.querySelector(`.key[data-key=${e.code}]`);
    if (key) {
        highlightKey(e.code, false);
    }
});

// Function to highlight the key on keydown and remove highlight on keyup
function highlightKey(keyCode, isPressed) {
    const key = document.querySelector(`.key[data-key=${keyCode}]`);
    if (key) {
        if (isPressed) {
            key.classList.add('pressed');
        } else {
            key.classList.remove('pressed');
        }
    }
}
