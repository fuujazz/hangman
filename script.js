const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrong_letters = document.getElementById("wrong-letters");
const hangers = document.querySelectorAll(".hanger");
const play_again = document.getElementById("play-again");
const message_entered = document.getElementById("message")


const correct_letters = [];
const wl_array = [];
let selectedWord = getRandomWord();

function getRandomWord() {

    let words = ["seda", "kagan", "kerim", "atakan", "furkan", "mehmet"];
    return words[Math.floor(Math.random() * words.length)]
}

function displayWord() {

    word_el.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correct_letters.includes(letter) ? letter : ""}
            </div>
        `).join("")}
    `;

    let w = word_el.innerText.replace(/\n/g, "");
    if (w === selectedWord) {
        popup.style.display = "flex";
        message_el.innerText = "Tebrikler Kazandınız."
    }
}

window.addEventListener("keydown", function (event) {
    message_entered.classList.remove("show");
    if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode == 222) {

        let letter = event.key;
        if (selectedWord.includes(letter)) {
            if (!correct_letters.includes(letter)) {
                correct_letters.push(letter);
                displayWord();
            } else {
                message_entered.classList.add("show");
            }
        } else {
            if (!wl_array.includes(letter)) {
                wl_array.push(letter);

                updateWrongLetters();

            } else {
                message_entered.classList.add("show");
            }
        }
    }

});

function updateWrongLetters() {
    wrong_letters.innerHTML = `
        ${wl_array.length > 0 ? "<h3>Hatalı Harfler</h3>" : ""}
        ${wl_array.map(letter => `<span>${letter}</span>`)}
    `;

    hangers.forEach((hanger, index) => {
        let errorCount = wl_array.length;

        if (index < errorCount) {
            hanger.style.display = "block";
        } else {
            hanger.style.display = "none";
        }
    });

    if (wl_array.length === hangers.length) {
        popup.style.display = "flex";
        message_el.innerText = "Maalesef Kaybettiniz";
    }
}

play_again.addEventListener("click", function (event) {
    correct_letters.splice(0);
    wl_array.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = "none";
});

displayWord();
console.log(selectedWord);