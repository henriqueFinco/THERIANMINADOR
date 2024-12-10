const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        vidas: document.querySelector("#vidas"),
    },
    values: {
        timerID: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 600,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        vidasRestantes: 3,
    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerID);
        playSound("braw");
        alert("GAME OVER! resultado: "+state.values.result);
    }
    if(state.values.vidasRestantes <= 0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerID);
        playSound("braw");
        alert("GAME OVER! resultado: "+state.values.result);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerID = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("anime-ahh");
            }else{
                state.values.vidasRestantes--;
                state.view.vidas.textContent = state.values.vidasRestantes;
                state.values.hitPosition = null;
                playSound("erro");
            }
        })
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
}

init();