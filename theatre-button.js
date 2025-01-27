const openedButtonSvg = "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h7V3H4zM16 3h-3v14h3a2 2 0 002-2V5a2 2 0 00-2-2z";
const notOpenedButtonSvg = "M2 15V5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2zm2 0V5h7v10H4zm9 0h3V5h-3v10z";
let isTheaterMode = false;
let fullscreenButtonHandled = false;
let isPlayerHandled = false; 
let isButtonAdded = false;

const checkIsLoadedPlayer = () => {
    console.log('Checking for video element...');
    const videoElement = document.body.getElementsByTagName('video')[0];
    
    if (!videoElement) {
        setTimeout(checkIsLoadedPlayer, 100);
    } else if (!isPlayerHandled) {
        videoElement.addEventListener('play', function onPlay() {
            isButtonAdded = false;
            if (!isButtonAdded && !document.body.getElementsByClassName('player-button theatre-button')[0]) {
                setTimeout(() => {
                    addButton(); 
                    isButtonAdded = true; 
                    setTimeout(checkButton, 5000);
                }, 500);
            }
        });

        isPlayerHandled = true; 
    }
};

const toggleTheaterMode = () => {
    const elementsToToggle = [
        'app-header',
        'app-load-more',
        'app-content-feed-block',
        'app-watcher-player-bottom-panel',
        'app-watcher-feed',
        'canvas'
    ];

    elementsToToggle.forEach(tag => {
        const element = document.body.getElementsByTagName(tag);
        if (element.length > 1) {
            for (let i = 0; i < element.length; i++) {
                element[i].hidden = !element[i].hidden;
            }
        } else if (element.length == 0) {
            return 0;
        } else {
            element[0].hidden = !element[0].hidden;
        }
    });

    const mainElement = document.querySelector("body > app-root > app-watcher-layout > div > main");
    const sidebarElement = document.querySelector("[appwatchersidebardisplay]");
    const playerWrapper = document.body.getElementsByClassName('player-area__player-wrapper')[0];
    const feedElement = document.body.getElementsByTagName('app-watcher-feed')[0];

    if (!isTheaterMode) {
        mainElement.style.margin = 0;
        sidebarElement.style.padding = 0;
        playerWrapper.style.height = "100vh";
        feedElement.style.margin = 0;
        feedElement.style.padding = 0;
        document.body.getElementsByClassName('player-button theatre-button')[0].children[0].textContent = "В нормальный режим";
        document.body.getElementsByClassName('player-button theatre-button')[0].children[1].children[0].setAttribute('d', openedButtonSvg);
    } else {
        mainElement.removeAttribute("style");
        sidebarElement.removeAttribute("style");
        playerWrapper.removeAttribute("style");
        feedElement.removeAttribute("style");
        document.body.getElementsByClassName('player-button theatre-button')[0].children[0].textContent = "Театральный режим";
        document.body.getElementsByClassName('player-button theatre-button')[0].children[1].children[0].setAttribute('d', notOpenedButtonSvg);
    }

    isTheaterMode = !isTheaterMode;
};

const addButton = () => {
    if (!document.body.getElementsByClassName('player-button theatre-button')[0]) {
        let fullscreenButton = document.querySelectorAll('.player-button.fullscreen-button')[0];
        if (!fullscreenButtonHandled) {
            fullscreenButton.addEventListener('click', () => {
                document.body.getElementsByClassName('player-button theatre-button')[0].parentElement.classList.toggle('hidden');
            });
            fullscreenButtonHandled = true;
        }
        const div = document.createElement('div');
        div.className = 'buttons-wrapper';
    
        const button = document.createElement('button');
        button.className = 'player-button theatre-button';
        button.type = 'button';
    
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip tooltip-up tooltip-align-right';
        tooltip.textContent = 'Театральный режим';
    
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 20 20');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('clip-rule', 'evenodd');
        path.setAttribute('d', notOpenedButtonSvg);
        path.setAttribute('fill', '#fff');
    
        svg.appendChild(path);
        button.appendChild(tooltip);
        button.appendChild(svg);
        div.appendChild(button);
    
        const buttonsWrapper = document.querySelector('.buttons-right');
        const beforeElement = document.querySelector('.player-button.fullscreen-button').parentElement;
        if (buttonsWrapper) {
            buttonsWrapper.insertBefore(div, beforeElement);
        }
    
        button.addEventListener("click", toggleTheaterMode);
    }
};

function checkButton() {
    if (!document.body.getElementsByClassName('player-button theatre-button')[0]) {
        addButton();
    }
}

checkIsLoadedPlayer();

