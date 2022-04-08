var container = document.createElement("div");
container.className = "div-text";

var body = document.body;
body.appendChild(container);

var counter = 0;
class domanda {
    num
    testo
    rispostaCorretta
    risposte
    isMultipla

    constructor(num, testo, risposte, isMultipla, rispostaCorretta) {
        this.num = num;
        this.testo = testo;
        this.risposte = risposte;
        this.isMultipla = isMultipla;
        this.rispostaCorretta = rispostaCorretta;
    }
}

class quiz {
    id
    titolo
    domande
}

class Quiz {
    quiz
    label
    buttons
    section

    constructor(quiz) {
        this.quiz = quiz;
        this.section = [];
    }
}

var list = null;
var ActualQuiz = null;
const file = fetch("js/domandeCyberSec.json")
    .then(response => response.json())
    .then(data => 
{
    list = data;
    ActualQuiz = new Quiz(list);
    document.title = "Quiz - " + ActualQuiz.quiz.titolo;
    var index = [];
    while(index.length < list.domande.length) {
        let n = Math.floor(Math.random() * list.domande.length);
        let bool = true;

        index.forEach((item) => {
            if(n == item)
                bool = false;
        })

        if(bool)
            index.push(n);
    }

    for (let i = 0; i < index.length; i++) {
        let section = document.createElement("section");
        section.className = "question-sec";
        section.id = "section-" + (index[i]+1);
        
        let domandaText = document.createElement("h1");
        let text = i+1 + ". " + list.domande[index[i]].testo;

        if(list.domande[index[i]].isMultipla)
            text += " (Scegli " + list.domande[index[i]].rispostaCorretta.length + " risposte)";

        domandaText.innerText = text;
        
        let form = document.createElement("form");
        form.className = "input-form";

        let innerDiv = document.createElement("div");
        innerDiv.className = "div-input";
    
        section.appendChild(domandaText);
        section.appendChild(innerDiv);
        innerDiv.appendChild(form);
        container.appendChild(section);
        ActualQuiz.section.push([section]);
        
        list.domande[index[i]].risposte.forEach((item) => {
            let label = document.createElement("label");
            label.htmlFor = "field-" + counter;
            label.className = "quest-label";
            label.innerText = item;
            ActualQuiz.section[i];

            section.getElementsByTagName
            
            let input = document.createElement("input");
            let type = "radio"
            if(list.domande[index[i]].isMultipla)
                type = "checkbox"
            
            input.type = type;
            input.name = "quest-" + (index[i] + 1);
            input.id = "field-" + counter;
            input.onclick = function() { console.log("id: " + input.name); };
            ActualQuiz.section[i].push(input);
            counter++;
            
            label.appendChild(input);
            form.appendChild(label);
            // form.appendChild(document.createElement("br"));
        });
    }
    
    let btnConferma = document.createElement("button");
    btnConferma.innerText = "Conferma";
    btnConferma.className = "btn-conferma";
    btnConferma.onclick = conferma;
    container.appendChild(btnConferma);
})
.catch(error => {
    window.alert("Impossibile leggere le domande:\n" + error)
});

function conferma() {
    console.log("controllo il test");
    let nonRisposte = [];

    for (let i = 0; i < ActualQuiz.section.length; i++) {
        const section = ActualQuiz.section[i];

        section[0].getElementsByTagName("h1")[0].style.background = "white";

        let bool = false;
        for (let j = 1; j < section.length; j++) {
            const btn = section[j];
            if(btn.checked)
                bool = true;
        }

        if(!bool)
            nonRisposte.push(section);
    }

    if (nonRisposte.length > 0) {
        window.alert("Non hai risposto a tutte le domande");


        nonRisposte[0][0].scrollIntoView({
            behavior: "smooth"
        });

        nonRisposte.forEach((item) => {
            item[0].getElementsByTagName("h1")[0].style.background = "yellow";

            // setInterval(function() {item.section.style.background = "white";}, 1000);
        });
    } else {
        correggiTest();
    }
}

function correggiTest() {
    let giuste = [];
    let sbagliate = [];
    for (let i = 0; i < list.domande.length; i++) {
        const item = list.domande[i];
        if(item.rispostaCorretta.length == 1) {
            if(item.buttons[item.rispostaCorretta[0] - 1])
                giuste.push(item.label[item.rispostaCorretta[0] - 1]);
            else
                sbagliate.push(item.label[item.rispostaCorretta[0] - 1]);
        } else {
            for (let j = 0; j < item.rispostaCorretta.length; j++) {
                const element = array[j];
                
            }
        }
    }
}

function visualizzaCorrezione() {

}