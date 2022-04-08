// let storage = window.localStorage;

// const value = storage.getItem("non-mostrare");

// if (value == 0 || value == null) {
    var body = document.body;
    
    var container = document.createElement("div");
    container.className = "cookie";
    
    let text = document.createElement("p");
    text.innerText = "Questo sito non usa cookies. Questo messaggio è inutile ed è fatto solo per distrarti. Buona continuazione.";
    let btn = document.createElement("button");
    btn.innerText = "Ho Capito...";
    btn.onclick = delBanner;
    container.appendChild(text);
    container.appendChild(btn);
    body.appendChild(container);
// }

function delBanner() {
    body.removeChild(container);
    // storage.setItem("non-mostrare", 1);
}