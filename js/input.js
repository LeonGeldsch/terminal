var commandInput = document.querySelector('#command-input');

const MAIN_DIV = document.querySelector('.main');

var allInputCharacterElements = document.querySelectorAll('#command-input .input-character');

var currentIndex = 0;

const noSuchCommandText = "no such command";

const inputLineText = '<div class="command-input-wrapper"><p>C:\\Users\\Leon></p><div class="command-input" id="command-input"><p class="input-character selected-character" id="input-character"></p></div></div>';

const helpText = "you typed in help but there is no help";

const nickText = "Nick ist ein cooler dude";

const friederText = "Frieder ist auch ein dude";

const ostdeutschlandText = "<a href='https://youtu.be/LQm4I_KZmog' target='_blank'>https://youtu.be/LQm4I_KZmog</a>";

const moText = "Pshhhh... Mo is studying. Don't disturb her.";

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
    newChar.id = 'input-character';
    newChar.innerHTML = character;
    commandInput.insertBefore(newChar, commandInput.children[currentIndex]);
    updateInputCharacterElements();
    currentIndex++
    updateIndex();
}

function removeCharacter () {
    if (currentIndex > 0) {
        commandInput.removeChild(allInputCharacterElements[currentIndex-1]);
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
    allInputCharacterElements = document.querySelectorAll('#input-character');
}

function submitCommand () {
    let command = getCommand();
    switch (command) {
        case "help":
            createNewLine(helpText);
            break;
        case "nick":
            createNewLine(nickText);
            break;
        case "frieder":
            createNewLine(friederText);
            break;
        case "ostdeutschland":
            createNewLine(ostdeutschlandText);
            break;
        case "mo":
            createNewLine(moText);
            break;    
        default:
            createNewLine(noSuchCommandText);
            break;
    }
    commandInput.id = "";
    for (let i = 0; i < allInputCharacterElements.length; i++) {
        allInputCharacterElements[i].id = "";
    }
    createNewLine(inputLineText);
    updateInputCharacterElements();
    commandInput = document.querySelector('#command-input');
    currentIndex = 0;
    updateIndex();
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