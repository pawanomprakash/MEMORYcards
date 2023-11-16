const cards=document.querySelectorAll('.card');
const overlays=document.querySelectorAll('.overlaytext');
let isflipped=false;
let lockboard=false;
let firstcard,secondcard;
let flips=0;
let matchedcards=0;
let countdown;

function flipcard(){
    if(lockboard) return;
    if(this===firstcard) return;

    this.classList.add('visible');

    if(!isflipped){
        isflipped=true;
        firstcard=this;
        return;
    }
    secondcard=this;
    checkForMatch();
    flips++;
    document.getElementById('flips').textContent=flips;

    if(matchedcards===cards.length/2){
        clearInterval(countdown);
        displayvictory();
    }
}
function checkForMatch(){
    let ismatch=firstcard.querySelector('.cardvalue').src===secondcard.querySelector('.cardvalue').src;

    if(ismatch){
        disablecards();
        matchedcards+=1;
    } else{
        lockboard=true;
        setTimeout(()=>{
            firstcard.classList.remove('visible');
            secondcard.classList.remove('visible');
            resetboard();
        },1000);
    }
}

function disablecards(){
    firstcard.removeEventListener('click',flipcard);
    secondcard.removeEventListener('click',flipcard);
    firstcard.classList.add('matched');
    secondcard.classList.add('matched');
    resetboard();
}
function resetboard(){
    [isflipped,lockboard]=[false,false];
    [firstcard,secondcard]=[null,null];
}

function startgame(){
    countdown=setInterval(() => {
        let timeremaining=parseInt(document.getElementById('time-remaining').textContent);
        if(timeremaining>0){
            timeremaining--;
            document.getElementById('time-remaining').textContent=timeremaining;
        } else{
            clearInterval(countdown);
            displaygameover();
        }
    }, 1000);
}
function displayvictory(){
    document.getElementById('victorytext').classList.add('visible');
}
function displaygameover(){
    document.getElementById('gameovertext').classList.add('visible');
    cards.forEach(card=>{
        card.removeEventListener('click',flipcard);
    });
}
function restartgame(){
    overlays.forEach(overlay=>{
        overlay.classList.remove('visible');
    });
    flips=0;
    matchedcards=0;
    document.getElementById('flips').textContent=flips;
    document.getElementById('time-remaining').textContent='100';
    clearInterval(countdown);
    cards.forEach(card=>{
        card.classList.remove('visible','matched');
        card.addEventListener('click',flipcard);
    });
    shufflecards();
    startgame();
}
function shufflecards(){
    cards.forEach(card=>{
        let randompos=Math.floor(Math.random()*12);
        card.style.order=randompos;
    });
}
cards.forEach(card=>{
    card.addEventListener('click',flipcard);
});
overlays.forEach(overlay=>{
    overlay.addEventListener('click',restartgame);
});