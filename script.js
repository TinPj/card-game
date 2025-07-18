new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,

    // Pagination bullets
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");

        // First card clicked
        if(!cardOne) {
            return cardOne = clickedCard;
        }

        // Second card clicked
        cardTwo = clickedCard;

        disableDeck = true;

        // Get images to compare
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;

        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {  // All pairs matched
            setTimeout(() => {
                return shuffleCard();  // Shuffle cards after completion
            }, 1000);
        }

        // Remove event listener for matched cards
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        
        // Reset the cards for next turn
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    // If cards don't match, shake them
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // Reset after a short delay
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    // Array of card numbers
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Shuffle the array to randomize the order of images
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Assign shuffled images to each card
    cards.forEach((card, i) => {
        card.classList.remove("flip");  // Reset flipped cards
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;  // Update image based on shuffle
        card.addEventListener("click", flipCard);  // Add event listener for each card
    });
}

// Start the game by shuffling the cards initially
shuffleCard();

// Add event listener to all cards for flipping
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

