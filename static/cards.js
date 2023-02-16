const baseURL = 'https://deckofcardsapi.com/api/deck';
const cardPile = document.querySelector('#card-pile');
function getNewDeck(base) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                    data: JSON.parse(xhr.response),
                    status: xhr.status,
                    request: xhr
                });
            } else {
                reject({
                    message: `Request failed.  Returned status of ${xhr.status}`,
                    status: xhr.status,
                    request: xhr
                });
            }
        };
        xhr.onerror = function handleError() {
            reject("NETWORK ERROR!")
        }
        xhr.open('GET', `${base}/new/shuffle`);
        xhr.send();
    })
}
function getNextCard(base) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                    data: JSON.parse(xhr.response),
                    status: xhr.status,
                    request: xhr
                });
            } else {
                reject({
                    message: `Request failed.  Returned status of ${xhr.status}`,
                    status: xhr.status,
                    request: xhr
                });
            }
        };
        xhr.onerror = function handleError() {
            reject("NETWORK ERROR!")
        }
        xhr.open('GET', `${base}/${deck.deck_id}/draw`);
        xhr.send();
    })
}
let deck;
getNewDeck(baseURL)
    .then(res => { deck = res.data })
    .catch(error => {
        console.error(error);
        alert('something went wrong :(')
    });
const cardBTN = document.getElementById('card-button')
cardBTN.addEventListener('click', requestCard);

function requestCard(event) {
    event.preventDefault();
    getNextCard(baseURL)
        .then(res => updatePage(res.data))
        .catch(error => {
            console.error(error);
            alert('something went wrong :(')
        });
}

function updatePage(data) {
    isLastCard(data.remaining)
    // create the image element
    const newImage = document.createElement('img');
    // set the source and alt attributes
    newImage.src = data.cards[0].image;
    newImage.alt = `${data.cards[0].value} of ${data.cards[0].suit}`;
    // set a random rotation angle
    const rotation = Math.floor(Math.random() * 360) + 1;
    // apply the rotation transform
    newImage.style.transform = `rotate(-${rotation}deg)`;
    // append the image to a parent element
    cardPile.appendChild(newImage);
}

function isLastCard(cardNum) {
    if (cardNum === 0) {
        // remove card button
        cardBTN.remove()
    }
}