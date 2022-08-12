const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// <----------Hàm lật thẻ------------>//
function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
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
        matched++;
        // nếu nối hết 8 cặp thẻ thì hiện lên thông bao win game trong 0.5s va sau 5s thực thi hàm tráo thẻ //
        if(matched == 8) { 
            setTimeout(() => {
                alert("You won the game !!!");
            }, 300);
            setTimeout(() => {
                return shuffleCard();
            }, 5000);
        }
        // xóa event listener click với funtion flipCard cho các phần tử cardOne, cardTwo//
        cardOne.removeEventListener("click", flipCard); 
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    // dat thoi gian cho css shake // 
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 350);

    // dat thoi gian hien thi 2 hinh khong trung nhau //
    // xoa bo shake va flip doi voi 2 doi tuong do //
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1000);
}

 // Hàm tráo thẻ khi bắt đầu game mới //
function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `img/${arr[i]}.png`;
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
    alert("Open two same cards to show it. Complete all cards to win the game !!!")
}