var container = document.createElement("div");
container.className = "div-text";

var body = document.body;
body.appendChild(container);

var counter = 0;
class domanda {
    id
    testo
    correctAnswer
    risposte
    section
    buttons
    isMultipla
    label
}

var list = null;
const file = fetch("js/domandeCyberSec.json")
    .then(response => response.json())
    .then(data => 
{
    list = data;

    for (let i = 0; i < list.length; i++) {
        let section = document.createElement("section");
        section.className = "question-sec";
        section.id = "section-" + (i+1);
        list[i].section = section;
        
        let domandaText = document.createElement("h1");
        let text = list[i].id + ". " + list[i].testo;

        if(list[i].isMultipla)
            text += " (Scegli " + list[i].correctAnswer.length + " risposte)";

        domandaText.innerText = text;
        
        let form = document.createElement("form");
        form.className = "input-form";

        let innerDiv = document.createElement("div");
        innerDiv.className = "div-input";
    
        section.appendChild(domandaText);
        section.appendChild(innerDiv);
        innerDiv.appendChild(form);
        container.appendChild(section);
        
        list[i].risposte.forEach((item) => {
            let label = document.createElement("label");
            label.htmlFor = "answer-" + counter;
            label.className = "quest-label";
            label.innerText = item;
            list[i].label.push(label);
            
            let input = document.createElement("input");
            let type = "radio"
            if(list[i].isMultipla)
            type = "checkbox"
            
            input.type = type;
            input.name = "quest-" + i;
            input.id = "answer-" + counter;
            list[i].buttons.push(input);
            // input.onclick = buttonClicked.bind(input, list[i], input);
            counter++;
            
            label.appendChild(input);
            form.appendChild(label);
            form.appendChild(document.createElement("br"));
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
    list.forEach((item) => {
        // item.buttons.forEach((btn) => {
        //     console.log(btn + " | " + btn.getAttribute("flag") + " | " + btn.checked);
        // }
        item.section.style.background = "white";
        let bool = false;
        item.buttons.forEach((btn) => {
            if(btn.checked)
                bool = true;
        });
        if(!bool)
            nonRisposte.push(item);
    });

    if (nonRisposte.length > 0) {
        window.alert("Non hai risposto a tutte le domande");

        nonRisposte[0].section.scrollIntoView({
            behavior: "smooth"
        });

        nonRisposte.forEach((item) => {
            item.section.style.background = "yellow";

            // setInterval(function() {item.section.style.background = "white";}, 1000);
        });
    } else {
        correggiTest();
    }
}

function correggiTest() {
    let giuste = [];
    let sbagliate = [];
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if(item.correctAnswer.length == 1) {
            if(item.buttons[item.correctAnswer[0] - 1])
                giuste.push(item.label[item.correctAnswer[0] - 1]);
            else
                sbagliate.push(item.label[item.correctAnswer[0] - 1]);
        } else {
            for (let j = 0; j < item.correctAnswer.length; j++) {
                const element = array[j];
                
            }
        }
    }
}

function visualizzaCorrezione() {

}