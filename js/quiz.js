var container = document.createElement("div");
container.className = "div-text";

var body = document.body;
body.appendChild(container);

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
    
    var counter = 0;
    for (let i = 0; i < list.domande.length; i++) {
        let section = document.createElement("section");
        section.className = "question-sec";
        section.id = "section-" + (i+1);
        
        let domandaText = document.createElement("h1");
        let text = ". " + list.domande[i].testo;
        
        if(list.domande[i].isMultipla)
            text += " (Scegli " + list.domande[i].rispostaCorretta.length + " risposte)";
        
        domandaText.innerText = text;
        
        let form = document.createElement("form");
        form.className = "input-form";
        
        let innerDiv = document.createElement("div");
        innerDiv.className = "div-input";
        
        innerDiv.appendChild(form);
        section.appendChild(domandaText);
        section.appendChild(innerDiv);
        ActualQuiz.section.push([section]);
        
        // per ogni domanda crea un input field
        list.domande[i].risposte.forEach((text) => {            
            // genera il bottone
            let input = document.createElement("input");
            let type = "radio"
            if(list.domande[i].isMultipla)
                type = "checkbox"
            
            input.type = type;
            input.name = "quest-" + (i + 1);
            input.id = "field-" + counter;
            input.innerText = text;
            input.onclick = function() { console.log("id: " + input.name); };
            ActualQuiz.section[i].push(input);
            counter++;

            // form.appendChild(document.createElement("br"));
        });
    }
    
    // genera dei numeri a caso che verrano
    // usati come indice per rendere le
    // domande del quiz casuali
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
    
    let n = 1;
    index.forEach((i) => {
        const group = ActualQuiz.section[i];
        const section = group[0];
        let h1 = section.querySelector("h1");
        h1.innerText = n + h1.innerText;
        n++;
        container.appendChild(section);
        
        const form = section.querySelector("form");

        for (let index = 1; index < group.length; index++) {
            const input = group[index];

            // genera il label con il testo
            let text = input.innerText;
            input.innerText = null;
            let label = document.createElement("label");
            label.id = "label-" + input.id;
            label.htmlFor = input.id;
            label.className = "quest-label";
            label.appendChild(input);
            label.innerHTML = label.innerHTML + text;
            form.appendChild(label);
        }
    })
    
    
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
            const btn = document.getElementById(section[j].id);
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
    for (let i = 0; i < ActualQuiz.quiz.domande.length; i++) {
        const domanda = ActualQuiz.quiz.domande[i];
        
        const buttons = [];
        for (let j = 1; j < ActualQuiz.section[i].length; j++)
            buttons.push(document.getElementById(ActualQuiz.section[i][j].id));

        const section = document.getElementById(ActualQuiz.section[i][0].id);
        if(domanda.rispostaCorretta.length == 1) {
            if(buttons[domanda.rispostaCorretta[0] - 1].checked)
                giuste.push([section, [buttons[domanda.rispostaCorretta[0] - 1].id, "green"]]);
            else
                sbagliate.push([section, [buttons[domanda.rispostaCorretta[0] - 1].id, "green"]]);
        } else {
            // let n = 0;
            // let corrette = 0;
            // buttons.forEach((btn) => {
            //     if(btn.checked)
            //         n++;
            // });

            // for (let j = 0; j < domanda.rispostaCorretta.length; j++) {
            //     if(buttons[domanda.rispostaCorretta[j] - 1].checked) {
            //         giuste.push([section, [buttons[domanda.rispostaCorretta[j] - 1].id, "green"]]);
            //         corrette++;
            //     }
            //     else
            //         sbagliate.push([section, [buttons[domanda.rispostaCorretta[j] - 1].id, "green"]]);
            // }

            // if(n > corrette) {
            //     for (let j = domanda.rispostaCorretta[domanda.rispostaCorretta.length - 1]; j < buttons.length; j++) {
            //         const btn = buttons[j];
            //         if(btn.checked)
            //             sbagliate.push([section, [btn.id, "red"]]);
            //     }
            // }

            for (let j = 0; j < buttons.length; j++) {
                const btn = buttons[j];
                domanda.rispostaCorretta.forEach((n) => {
                    if(btn.checked)
                        if(n - 1 == j)
                            giuste.push([section, [buttons[domanda.rispostaCorretta[j] - 1].id, "green"]]);
                        else
                            sbagliate.push([section, [buttons[domanda.rispostaCorretta[j] - 1].id, "yellow"]]);
                });
            }
        }
    }

    visualizzaCorrezione(giuste, sbagliate);
}

function visualizzaCorrezione(giuste, sbagliate) {
    container.scrollIntoView({
        behavior: "smooth"
    });

    giuste.forEach((item) => {
        item[0].querySelector("h1").style.background = "green";
        for (let i = 1; i < item.length; i++) {
            const element = item[i];
            document.getElementById("label-" + element[0]).style.background = element[1];
        }
    })
    
    sbagliate.forEach((item) => {
        item[0].querySelector("h1").style.background = "red";
        for (let i = 1; i < item.length; i++) {
            const element = item[i];
            document.getElementById("label-" + element[0]).style.background = element[1];
        }
    })

}

// "#92EDA5" verde chiaro per le giuste
// "#ED2000" rosso per le sbagliate