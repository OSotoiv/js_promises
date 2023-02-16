const number_form = document.querySelector('#number_form');
const number_input = document.querySelector('#number_input');
const response_list = document.getElementById("response_list");
const BASE = 'http://numbersapi.com/'

number_form.addEventListener('submit', handleRequest);

// This function gets the number from the users input and builds the url from the input.
function handleRequest(event) {
    event.preventDefault();
    clearFacts()
    num = number_input.value;
    if (!num) num = 0;
    urls = [`${BASE}${num}`, `${BASE}${num}`, `${BASE}${num}`, `${BASE}${num}`]
    requests = urls.map(url => fetchFact(url))
    Promise.all(requests)
        .then(response => addToPage(response))
        .then(clearInput)
        .catch(error => {
            console.error(error);
            alert('something went wrong :(')
        });
}
// This function sends the http request to the numbers API
function fetchFact(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                    data: xhr.response,
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
        xhr.open('GET', `${url}`);
        xhr.send();
    });
}

function addToPage(response) {
    response.forEach(res => {
        const li = document.createElement("li");
        li.textContent = res.data;
        li.classList.add("list-group-item")
        response_list.appendChild(li)
    });
}

function clearInput() {
    // clear the input on the page
    number_input.value = ""
}

function clearFacts() {
    response_list.innerHTML = ""
}

