




//live
//play-wrapper
 
checkIsLoadedPlayer();    
function checkIsLoadedPlayer() {
    if (!document.body.getElementsByClassName('live')[0]) {
        setTimeout(() => {
            checkIsLoadedPlayer();
        }, 500);
    } else {
        setTimeout(() => {
            addButton();
            addPlayerClickEvent();
        }, 500);
    }
}



function addPlayerClickEvent() {
    if (document.querySelectorAll('.player-poster.clickable')[0]) {
        let playButton = document.querySelectorAll('.player-poster.clickable')[0];
        playButton.addEventListener('click', function () {
            if(!document.body.getElementsByClassName('player-button theatre-button')[0]) {
                addButton();
            } else {
                return 0;
            }

        })
        


    } else {
        return 0;
    }
}


let isTheaterMode = false;


    function addButton() {

    
    
    const div = document.createElement('div');
    div.className = 'buttons-wrapper';
    const button = document.createElement('button');
    button.className = 'player-button theatre-button';
    button.type = 'button';
    
    // Создаем тултип
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip tooltip-up tooltip-align-right';
    tooltip.textContent = 'Театральный режим';
    
    // Создаем SVG элемент (если нужно)
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Создаем path для SVG
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
    path.setAttribute('d', 'M2 15V5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2zm2 0V5h7v10H4zm9 0h3V5h-3v10z');
    path.setAttribute('fill', '#fff');
    
    // Добавляем path в SVG
    svg.appendChild(path);
    
    
    // Добавляем тултип и SVG в кнопку
    button.appendChild(tooltip);
    button.appendChild(svg);
    
    //Добавляем кнопку в div
    
    div.appendChild(button);
    
    // Добавляем div в контейнер
    const buttonsWrapper = document.querySelector('.buttons-right');
    buttonsWrapper.appendChild(div);

    button.addEventListener("click", function() {

        if (!isTheaterMode) {

        isTheaterMode = !isTheaterMode;
        document.body.getElementsByTagName('app-load-more')[0].hidden = !document.body.getElementsByTagName('app-load-more')[0].hidden;
        document.body.getElementsByTagName('app-header')[0].hidden = !document.body.getElementsByTagName('app-header')[0].hidden;
        document.body.getElementsByTagName('app-content-feed-block')[0].hidden = 
        !document.body.getElementsByTagName('app-content-feed-block')[0].hidden;
        document.body.getElementsByTagName('app-watcher-player-bottom-panel')[0].hidden = 
        !document.body.getElementsByTagName('app-watcher-player-bottom-panel')[0].hidden;
        document.querySelector("body > app-root > app-watcher-layout > div > main").style.margin = 0
        document.querySelector("[appwatchersidebardisplay]").style.padding = 0;
        document.body.getElementsByClassName('player-area__player-wrapper')[0].style.height = "100vh";
        document.body.getElementsByTagName('app-watcher-feed')[0].style.margin = 0;
        document.body.getElementsByTagName('app-watcher-feed')[0].style.padding = 0;

        } else {

        isTheaterMode = !isTheaterMode;
        document.body.getElementsByTagName('app-load-more')[0].hidden = !document.body.getElementsByTagName('app-load-more')[0].hidden;
        document.body.getElementsByTagName('app-header')[0].hidden = !document.body.getElementsByTagName('app-header')[0].hidden;
        document.body.getElementsByTagName('app-content-feed-block')[0].hidden = 
        !document.body.getElementsByTagName('app-content-feed-block')[0].hidden;
        document.body.getElementsByTagName('app-watcher-player-bottom-panel')[0].hidden = 
        !document.body.getElementsByTagName('app-watcher-player-bottom-panel')[0].hidden;
        document.querySelector("body > app-root > app-watcher-layout > div > main").removeAttribute("style");
        document.querySelector("[appwatchersidebardisplay]").removeAttribute("style");
        document.body.getElementsByClassName('player-area__player-wrapper')[0].removeAttribute("style");
        document.body.getElementsByTagName('app-watcher-feed')[0].removeAttribute("style");

        }
        
    });
    
    }
