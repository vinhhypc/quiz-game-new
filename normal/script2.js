timeTag = document.querySelector(".time b");
const cards = document.querySelectorAll(".card");
let matchedCard = 0;
let cardOne, cardTwo, timer;
let disableDeck = false;
let maxTime = 40;
let timeLeft = maxTime;
let isPlaying = false;

// Hàm hạn chế thời gian //
function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}
// <----------Hàm lật thẻ------------>//
function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);

        timeout = setTimeout(() => {
            alert("Time out !You lose the game !!!");
            resetCard();
            return;
        }, maxTime*1000);
    }
    if(cardOne !== clickedCard && !disableDeck && timeLeft > 0) {
        clickedCard.classList.add("flip"); // thêm class flip vao các thẻ click//
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

// <-----------Sự kiện khi lật thẻ ------------> //
function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        // nếu nối hết 8 cặp thẻ thì hiện lên thông bao win game trong 0.5s va sau 5s thực thi hàm tráo thẻ //
        if( matchedCard == 8 && timeLeft > 0) { 
            setTimeout(() => {
                alert("You won the game !!!");
            }, 300);
            setTimeout(() => {
                return shuffleCard();
            }, 5000);
            // return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
 
}

 // Hàm tráo thẻ khi bắt đầu game mới //
function shuffleCard() {
    timeLeft = maxTime;
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    matched = 0;
    disableDeck = isPlaying = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `img/${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

// Funtion refresh Page //
function refreshPage(){
    window.location.reload();
}

// Funtion back to choose difficulty //
function mainMenu(){
    window.location.href='/index.html';
}


// show alert how to play //
function showAlert() {
    alert("Open two same cards to show it. Complete all cards to win the game. You only have 40s to complete !!!")
}

// reset card //
function resetCard() {
    clearInterval(timer); 
        setTimeout(() => {
            timeLeft = maxTime;
            shuffleCard();
            clearTimeout(timeout)
        }, 4000);
}