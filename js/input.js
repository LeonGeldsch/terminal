var commandInput = document.querySelector('#command-input');

const MAIN_DIV = document.querySelector('.main');

const HIDDEN_INPUT = document.querySelector('.hidden-input');

const HELP_BUTTON = document.querySelector('#help-button');

const CLIPPY = document.querySelector('#clippy');

const FULLSCREEN_BUTTON = document.querySelector('#fullscreen-icon');

const WINDOWED_BUTTON = document.querySelector('#windowed-icon');

const CLIPPY_SPEECH_BUBBLE = document.querySelector('#clippy-speech-bubble')

var allInputCharacterElements = document.querySelectorAll('#command-input .input-character');

var currentIndex = 0;

var helpTimeout;

var scrollHeight;
var scrollTop;
var clientHeight;

var filesObject = {
    "Devs": {
        "Leon": {
            "Contact": {
                "Email": "leon.geldschlaeger@gmail.com",
                "Name": "Leon Geldschläger"
            },
            "Projects": {
                "Snake Game": "https://leongeldsch.github.io/snake/",
                "Discord Clone": "https://leongeldsch.github.io/discord-clone/"
            }
        },
        "Ruby": {

        }
    }
}

var currentPath = ["Devs", "Leon"];


const noSuchCommandText = "no such command";

var inputLineText = `<div class="command-input-wrapper"><p>C:\\${currentPath.join('\\')}></p><div class="command-input" id="command-input"><p class="input-character selected-character" id="input-character"></p></div></div>`;

const helpText = '<p>Welcome to my terminal! Type "start" for a walkthrough or "commands" for a (slightly incomplete) list of commands</p>';

const nickText = "Nick ist ein cooler dude";

const commandsText = "";

const friederText = "Frieder ist auch ein dude";

const ostdeutschlandText = "<a href='https://youtu.be/LQm4I_KZmog' target='_blank'>https://youtu.be/LQm4I_KZmog</a>";

const moText = "Pshhhh... Mo is studying. Don't disturb her.";

const rubyText = "RubyHeart in chat <img height='16' src='./img/RubyHeart.png'>";

const githubText = "<a href='https://github.com/LeonGeldsch' target='_blank'>https://github.com/LeonGeldsch</a>";

const emailText = "leon.geldschlaeger@gmail.com";

const collegeText = "Currently studying Webdesign & Development at SAE Institute Hamburg."



document.addEventListener('keydown', (e) => {
    switch (e.key || e.inputType) {
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
        case "Enter":
            submitCommand();
            break;
        default:
            if (e.key === "Unidentified") {
                HIDDEN_INPUT.addEventListener('input', getHiddenInputValue);
            }
            if (e.key.length > 1) break;
            addCharacter(e.key);
            break;
    }
});


function getHiddenInputValue () {
    addCharacter(HIDDEN_INPUT.value);
    HIDDEN_INPUT.value = "";
    HIDDEN_INPUT.removeEventListener('input', getHiddenInputValue);
}


document.addEventListener('click', () => {
    HIDDEN_INPUT.focus();
});

HELP_BUTTON.addEventListener('click', () => {
    CLIPPY.classList.toggle('active');
    clearTimeout(helpTimeout);
    helpTimeout = setTimeout(() => {
        CLIPPY.classList.remove('active');
    }, 2000);
});

FULLSCREEN_BUTTON.addEventListener('click', () => {
    FULLSCREEN_BUTTON.classList.toggle('disabled');
    WINDOWED_BUTTON.classList.toggle('disabled');
    document.body.requestFullscreen();
});

WINDOWED_BUTTON.addEventListener('click', () => {
    FULLSCREEN_BUTTON.classList.toggle('disabled');
    WINDOWED_BUTTON.classList.toggle('disabled');
    document.exitFullscreen();
});


function addCharacter (character) {
    let newChar = document.createElement('p');
    newChar.classList.add('input-character');
    newChar.id = 'input-character';
    newChar.innerHTML = character;
    // jump to character on click
    newChar.addEventListener('click', () => {
        setIndex(Array.from(allInputCharacterElements).findIndex((element) => element === newChar));
    });
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
    // get scroll position data before adding new line
    scrollHeight = MAIN_DIV.scrollHeight;
    scrollTop = MAIN_DIV.scrollTop;
    clientHeight = MAIN_DIV.clientHeight;
    let command = getCommand();
    switch (command.toUpperCase()) {
        case "HELP":
            createNewLine(helpText);
            break;
        case "GITHUB":
            createNewLine(githubText);
            break;
        case "EMAIL":
            createNewLine(emailText);
            break;
        case "COLLEGE":
            createNewLine(collegeText);
            break;
        case "NICK":
            createNewLine(nickText);
            break;
        case "FRIEDER":
            createNewLine(friederText);
            break;
        case "OSTDEUTSCHLAND":
            createNewLine(ostdeutschlandText);
            break;
        case "MO":
            createNewLine(moText);
            break;
        case "RUBY":
            createNewLine(rubyText);
            break;
        case "CD..":
            goToParentPath();
            break;
        case "CD&NBSP;..":
            goToParentPath();
            break;
        case "DIR":
            listDirectory();
            break;
        default:
            if (command.toUpperCase().split("&NBSP;")[0] === "CD") {
                goToPath(command.split("&nbsp;")[1]);
            } else {
                createNewLine(noSuchCommandText);
            }
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
    // scroll chat to bottom if already scrolled to bottom
    if (scrollHeight - scrollTop - clientHeight < 1) {
        MAIN_DIV.scrollTop = scrollHeight * 2;
    }
}


function goToPath (path) {
    let testPath = currentPath;
    let testFilesObject = filesObject;
    testPath = testPath.concat(path.split("\\"));
    console.log(testPath, testFilesObject);
    // test if path exists
    for (let i = 0; i < testPath.length; i++) {
        console.log(testFilesObject);
        if (testFilesObject[testPath[i]]) {
            testFilesObject = testFilesObject[testPath[i]];
            console.log("path exists");
        } else {
            console.log("path doesn't exist");
            return;
        }
    }
    currentPath = testPath;
    updateInputLineText();
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


function goToParentPath () {
    if (currentPath.length >= 1) {
        currentPath.pop();
    }
    updateInputLineText();
}


function updateInputLineText () {
    inputLineText = `<div class="command-input-wrapper"><p>C:\\${currentPath.join('\\')}></p><div class="command-input" id="command-input"><p class="input-character selected-character" id="input-character"></p></div></div>`;
}


function listDirectory () {
    let path = filesObject;
    for (let i = 0; i < currentPath.length; i++) {
        path = path[currentPath[i]];
    }
    Object.keys(path).forEach(key => {
        console.log(key);
        createNewLine(key);
    });
}


updateIndex();