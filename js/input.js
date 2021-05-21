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

var previousCommandsArray = [];
var previousCommandsIndex = 0;

var scrollHeight;
var scrollTop;
var clientHeight;


var filesObject = {
    "Devs": {
        "title": "Devs",
        "type": "folder",
        "content": {
            "Leon": {
                "title": "Leon",
                "type": "folder",
                "content": {
                    "Contact": {
                        "title": "Contact",
                        "type": "folder",
                        "content": {
                            "email.txt": {
                                "title": "email.txt",
                                "type": "file",
                                "content": "leon.geldschlaeger@gmail.com"
                            },
                            "name.txt": {
                                "title": "name.txt",
                                "type": "file",
                                "content": "Leon Geldschläger"
                            },
                            "GitHub.txt": {
                                "title": "GitHub.txt",
                                "type": "file",
                                "content": "<a href='https://github.com/LeonGeldsch' target='_blank'>https://github.com/LeonGeldsch</a>"
                            }
                        }
                    },
                    "Projects": {
                        "title": "Projects",
                        "type": "folder",
                        "content": {
                            "snake_game.txt": {
                                "title": "snake_game.txt",
                                "type": "file",
                                "content": "https://leongeldsch.github.io/snake/"
                            },
                            "discord_clone.txt": {
                                "title": "discord_clone.txt",
                                "type": "file",
                                "content": "https://leongeldsch.github.io/discord-clone/"
                            }
                        }
                    }
                }
            },
            "Ruby": {
                "title": "Ruby",
                "type": "folder",
                "content": {

                }
            }
        }
    }
}

var currentPath = ["Devs", "Leon"];


const noSuchCommandText = "no such command";

const pathDoesntExistText = "couldn't find that path";

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

const cdText = "the change directory command";

const nameText = "Leon Geldschläger";

class Command {
    constructor(command, description) {
        this.command = command;
        this.description = description;
    }
}

var commandsArray = [
    new Command ("help", "the help command"),
    new Command ("cd", "change directory (go to directory relative to current one by default or start directory with drive name for global directory change"),
    new Command ("cd..", "go up one directory"),
    new Command ("cd/", "go to root directory"),
    new Command ("dir", "lists all files and folders in the current directory"),
    new Command ("GitHub", "My GitHub Profile"),
    new Command ("Name", "My Name"),
    new Command ("Email", "My Email"),
    new Command ("College", "The college I go to"),
    new Command ("commands", "a (slightly incomplete) list of all commands"),
];



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
        case "ArrowDown":
            decrementPreviousCommandIndex();
            break;
        case "ArrowUp":
            incrementPreviousCommandIndex();
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


function decrementPreviousCommandIndex () {
    if (previousCommandsIndex > 0) previousCommandsIndex--;
    emptyInput();
    updatePreviousCommandsIndex();
}


function incrementPreviousCommandIndex () {
    if (previousCommandsIndex < previousCommandsArray.length) previousCommandsIndex++;
    emptyInput();
    updatePreviousCommandsIndex();
}

function updatePreviousCommandsIndex () {
    if (previousCommandsIndex > 0) {
        previousCommandsArray[previousCommandsIndex-1].split("").forEach(char => addCharacter(char));
    } else {
        emptyInput();
    }
}


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
    if (document.querySelector('.selected-character')) document.querySelector('.selected-character').classList.remove('selected-character');
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
    console.log(command.toUpperCase());
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
        case "NAME":
            createNewLine(nameText);
            break;
        case "COMMANDS":
            createNewLine(listAllCommands());
            break;    
        case "CD..":
            goToParentPath();
            break;
        case "CD&NBSP;..":
            goToParentPath();
            break;
        case "CD/":
            goToRootDir();
            break;
        case "CD\\":
            goToRootDir();
            break;
        case "CD&NBSP;/":
            goToRootDir();
            break;
        case "CD&NBSP;\\":
            goToRootDir();
            break;
        case "DIR":
            listDirectory();
            break;
        default:
            if (command.toUpperCase().split(";")[0] === "CD&NBSP") {
                goToPath(command.split("&nbsp;")[1]);
                break;
            }
            if (matchAllFilesInCurrentDir(command)) {
                createNewLine(matchAllFilesInCurrentDir(command));
                break;
            }
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
    // scroll chat to bottom if already scrolled to bottom
    if (scrollHeight - scrollTop - clientHeight < 1) {
        MAIN_DIV.scrollTop = scrollHeight * 2;
    }
    previousCommandsArray.unshift(command);
    previousCommandsIndex = 0;
}


function emptyInput () {
    commandInput.innerHTML = '<p class="input-character selected-character" id="input-character"></p>';
    currentIndex = 0;
}


function goToRootDir () {
    currentPath = [];
    updateInputLineText();
}


function goToPath (path) {
    let newPath = currentPath;

    // split path string at slashes and backslashes
    let regex = new RegExp(/[\/|\\]/g);
    newPath = newPath.concat(path.split(regex));

    // test if path exists
    if (testPath(newPath) === true) {
        currentPath = newPath;
    } else {
        createNewLine(pathDoesntExistText);
    }
    updateInputLineText();
}


function matchAllFilesInCurrentDir (string) {
    // check if command matches file name
    let allFilesInCurrentDir = getAllFilesInCurrentDirectory();
    for (let i = 0; i < allFilesInCurrentDir.length; i++) {
        if (allFilesInCurrentDir[i].title.toUpperCase() === string.toUpperCase()) {
            return allFilesInCurrentDir[i].content;
        }
    }
    return false;
}


function testPath (path) {
    let testFilesObject = filesObject;
    for (let i = 0; i < path.length; i++) {
        // match command to path even with wrong casing
        Object.values(testFilesObject).forEach(value => {
            if (value.title.toUpperCase() === path[i].toUpperCase()) {
                path[i] = value.title;
            }
        });
        if (typeof testFilesObject[path[i]] !== "undefined") {
            if (testFilesObject[path[i]].type === "folder") {
                testFilesObject = testFilesObject[path[i]].content;
            } else {
                return false;
            }
        } else {
            //console.log("path doesn't exist");
            return false;
        }
    }
    //console.log("path exists");
    return true;
}


function getAllFilesInCurrentDirectory () {
    let allFiles = [];
    let path = filesObject;
    for (let i = 0; i < currentPath.length; i++) {
        path = path[currentPath[i]].content;
    }
    Object.values(path).forEach(value => {
        if (value.type === "file") {
            allFiles.push(value);
        }
    });
    console.log(allFiles);
    return allFiles;
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
        path = path[currentPath[i]].content;
    }
    Object.keys(path).forEach(key => {
        console.log(key);
        createNewLine(key);
    });
}


function listAllCommands () {
    let text = "";
    commandsArray.forEach(command => {
        text += `<div class="d-flex"><div class="terminal-list-left">${command.command}</div>`;
        text += `<div class="terminal-list-right">${command.description}</div></div>`;
    });
    return text;
}


/*
fetch('http://ip-api.com/json')
.then(response => {
    console.log(response);
    return response.json();
})
*/

updateIndex();