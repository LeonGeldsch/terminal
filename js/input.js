const COMMAND_INPUT = document.querySelector('#command-input');

const MAIN_DIV = document.querySelector('.main');

var allInputCharacterElements = document.querySelectorAll('.input-character');

var currentIndex = allInputCharacterElements.length-1;

var animationIndex = 0;



window.addEventListener('keydown', (e) => {
    console.log(e);
    switch (e.key) {
        case "Backspace":
            removeCharacter();
            break;
        case "ArrowLeft":
            decrementIndex();
            break;
        case "ArrowRight":
            incrementIndex();
            break;
        case " ":
            addCharacter("&nbsp");
            break;
        case "Escape":
            break;
        case "Tab":
            break;
        case "CapsLock":
            break;
        case "Shift":
            break;
        case "Control":
            break;
        case "OS":
            break;
        case "Alt":
            break;
        case "ControlAltGraph":
            break;
        case "ContextMenu":
            break;
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
        case "Delete":
            break;
        case "Insert":
            break;
        case "Home":
            break;
        case "End":
            break;
        case "PageDown":
            break;
        case "PageUp":
            break;
        case "ScrollLock":
            break;
        case "Pause":
            break;
        case "F1":
            break;
        case "F2":
            break;
        case "F3":
            break;
        case "F4":
            break;
        case "F5":
            break;
        case "F6":
            break;
        case "F7":
            break;
        case "F8":
            break;
        case "F9":
            break;
        case "F10":
            break;
        case "F11":
            break;
        case "F12":
            break;
        case "NumLock":
            break;
        case "Dead":
            break;
        case "Enter":
            submitCommand();
            break;
        default:
            addCharacter(e.key);
            break;
    }
});


function addCharacter (character) {
    let newChar = document.createElement('p');
    newChar.classList.add('input-character');
    newChar.innerHTML = character;
    COMMAND_INPUT.insertBefore(newChar, COMMAND_INPUT.children[currentIndex]);
    updateInputCharacterElements();
    incrementIndex();
}

function removeCharacter () {
    if (currentIndex > 0) {
        COMMAND_INPUT.removeChild(allInputCharacterElements[currentIndex-1]);
        decrementIndex();
        updateInputCharacterElements();
    }
}

function incrementIndex () {
    if (currentIndex < allInputCharacterElements.length-1) currentIndex++;
    updateIndex();
}

function decrementIndex () {
    if (currentIndex > 0) currentIndex--;
    updateIndex();
}

function setIndex (index) {
    if (index >= 0 && index < allInputCharacterElements.length) currentIndex = index;
    updateIndex();
}

function updateIndex () {
    updateInputCharacterElements();
    document.querySelector('.selected-character').classList.remove('selected-character');
    allInputCharacterElements[currentIndex].classList.add('selected-character');
}

function updateInputCharacterElements () {
    allInputCharacterElements = document.querySelectorAll('.input-character');
}

function submitCommand () {
    let command = getCommand();
    switch (command) {
        case "help":
            createNewLine("you typed in help but there is no help");
            break;
        default:
            break;
    }
}

function createNewLine (content) {
    let newLine = document.createElement('div');
    newLine.innerHTML = content;
    MAIN_DIV.appendChild(newLine);
}

function getCommand () {
    let command = "";
    for (let i = 0; i < allInputCharacterElements.length-1; i++) {
        command += allInputCharacterElements[i].innerHTML;
    }
    return command;
}


updateIndex();