var domande = [
    "Cos'è la Cybersecurity?",
    "Come ci si può proteggere dagli attacchi informatici?",
    "Cosa accade in un test di sicurezza?",
    "Chi è un hacker?",
    "Definizione di Criptolocker: ",
    "Seleziona i tipi di musire preventive per la sicurezza informatica",
    "Quali sono le 5 fasi di un penetration test?"
]

var buttons = [];

var risposte = ["1", "2", "3", "4"]

var container = document.getElementById("div-text");
var counter = 0;

class domanda {
    id
    testo
    flag

    domanda(testo, flag) {
        this.testo = testo;
        this.flag = flag;
    }
}

for (let i = 0; i < domande.length; i++) {
    let section = document.createElement("section");
    section.className = "question-sec";
    container.appendChild(section);

    let domandaCount = document.createElement("p");
    domandaCount.innerText = "Domanda " + (i + 1);
    section.appendChild(domandaCount);

    let domandaText = document.createElement("p");
    domandaText.innerText = domande[i];
    section.appendChild(domandaText);

    let form = document.createElement("form");
    form.className = "input-form";
    section.appendChild(form);

    let innerDiv = document.createElement("div");
    innerDiv.className = "div-input";
    form.appendChild(innerDiv);
    risposte.forEach((item) => {
        let label = document.createElement("label");
        label.htmlFor = "answer-" + counter;
        label.className = "quest-label";
        label.innerText = item;

        let input = document.createElement("input");
        input.type = "radio";
        input.name = "quest-" + i;
        input.id = "answer-" + counter;
        input.setAttribute("flag", "false");
        buttons.push(input);
        input.onclick = buttonClicked.bind(input, input);
        counter++;

        label.appendChild(input);
        form.appendChild(label);
    });
}

let btnConferma = document.createElement("button");
btnConferma.innerText = "Conferma";
btnConferma.className = "btn-conferma";
btnConferma.onclick = conferma;
container.appendChild(btnConferma);

function buttonClicked(input) {
    console.log("tasto premuto " + input.id);
}

function conferma() {
    console.log("controllo il test");
    buttons.forEach((item) => {
        console.log(item.id + " | flag: " + item.getElementById("flag"));
    });
}