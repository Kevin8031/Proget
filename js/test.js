const domandeCyberSec = [
    "Cos'è la Cybersecurity?",
    "Come ci si può proteggere dagli attacchi informatici?",
    "Cosa accade in un test di sicurezza?",
    "Chi è un hacker?",
    "Definizione di Criptolocker: ",
    "Seleziona i tipi di musire preventive per la sicurezza informatica",
    "Quali sono le 5 fasi di un penetration test?"
]

const risposteCyberSec = [
    [
        "L'insieme delle attività per la prevenzione e la protezione dei dati",
        "Tutto l'insieme delle protezioni fisiche di una rete",
        "Le difese fisiche e logiche di un computer",
        [1],
        false
    ],

    [
        "Non usando nessun dispositivo",
        "Attuando pratiche quali protezione delle reti, backup dei dati ed utilizzo di password forti",
        "Verificando che l'HHD/SSD sia funzionante",
        [2],
        false
    ],

    [
        "Il tester si appropria dei dati di chi ha commissionato il test",
        "Il tester verifica il funzionamento della rete senza consenso",
        "Il tester verifica l'integrità dei dati della rete su richiesta",
        [3],
        false
    ],

    [
        "Una persona che irrompe nelle reti e si appropria di dati altrui per vari scopi",
        "Una persona che vende dati di terzi",
        "Una persona che cambia nome e password di altri account",
        [1],
        false
    ],

    [
        "Software che registra i movimenti di tastiera e mouse di un soggetto",
        "Malware che cancella i dati e file di qualcuno",
        "Ransomware che rende inaccessibili ed illegibili file e dati dei proprietari",
        [3],
        false
    ],

    [
        "Archiviare più backup su dischi esterni",
        "Usare una password forte ovunque",
        "Diffondere informazioni personali a terzi",
        "Segmentare la rete in maniera fisica e logica",
        "Usare password complesse e lunghe",
        "Scaricare applicazioni da siti terzi",
        [1, 4, 5],
        true
    ],

    [
        "Accordo, Esecuzione Test, Analisi, Riconoscimento, Pagamento",
        "Pianificazione, Scansione, Sfruttamento Vulnerabilità, Mantenimento Accesso, Analisi e Report",
        "Preparazione, Verifica Rete, Attuazione danni ai dati, Rimozione danni, Analisi",
        [2],
        false
    ]
]

var domandeLinux = [
    "Cos'è Linux",
    "Chi creo Linux",
    "Cosa mancava al Progetto GNU per esser completato",
    "Cos'è un Desktop Environment",
    "Quali tra queste *non* è una distro",
    "Quali vantaggi ha Linux",
    "Perchè non è molto diffuso come PC o Desktop"
]

/*
    Domande corso Cybersecurity

    Cos'è la Cybersecurity?
        - L'insieme delle attività per la prevenzione e la protezione dei dati
        - Tutto l'insieme delle protezioni fisiche di una rete
        - Le difese fisiche e logiche di un computer
    Come ci si può proteggere dagli attacchi informatici?
        - Non usando nessun dispositivo
        - Attuando pratiche quali protezione delle reti, backup dei dati ed utilizzo di password forti
        - Verificando che l'HHD/SSD sia funzionante
    Cosa accade in un test di sicurezza?
        - Il tester si appropria dei dati di chi ha commissionato il test
        - Il tester verifica il funzionamento della rete senza consenso
        - Il tester verifica l'integrità dei dati della rete su richiesta
    Chi è un hacker?
        - Una persona che irrompe nelle reti e si appropria di dati altrui per vari scopi
        - Una persona che vende dati di terzi
        - Una persona che cambia nome e password di altri account 
    Definizione di Criptolocker:
        - Software che registra i movimenti di tastiera e mouse di un soggetto
        - Malware che cancella i dati e file di qualcuno
        - Ransomware che rende inaccessibili ed illegibili file e dati dei proprietari
    Seleziona i tipi di musire preventive per la sicurezza informatica (3 scelte giuste)
        1) Archiviare più backup su dischi esterni
        2) Usare una password forte ovunque
        3) Diffondere informazioni personali a terzi
        4) Segmentare la rete in maniera fisica e logica
        5) Usare password complesse e lunghe
        6) Scaricare applicazioni da siti terzi
    Quali sono le 5 fasi di un penetration test
        - Accordo, Esecuzione Test, Analisi, Riconoscimento, Pagamento
        - Pianificazione, Scansione, Sfruttamento Vulnerabilità, Mantenimento Accesso, Analisi e Report
        - Preparazione, Verifica Rete, Attuazione danni ai dati, Rimozione danni, Analisi
*/

/*
    Domande corso Linux

    Cos'è Linux?
        - Un sistema operativo nato negli anni '80 per competere a quello di UNIX
        - Un kernel open-source
        - Un semi sistema operativo senza Desktop Environment
    Chi creo Linux?
        - Linus Torvalds
        - Richard Stallman
        - Linux Torvalds
    Cosa mancava al Progetto GNU per esser completato?
        - Un Desktop Environment
        - Un prompt comandi
        - Un Kernel
    Cos'è un Desktop Environment?
        - Un sistema di GUI e CLI
        - L'insieme di GUI di sistema
        - Un desktop user-friendly
    Quali tra queste *non* è una distro?
        - Ubuntu
        - KDE
        - Arch
        - Android
        - Kali
    Quali vantaggi ha Linux?
        - É veloce, sicuro, ma a pagamento
        - É veloce, sicuro, open-source
        - É open-source ma, per questo, poco sicuro
    Perchè non viene commercializzato nei computer desktop?
        - Non è installabile sui computer prefabbricati
        - Non è user-friendly
        - Non è adatto ai programmatori
*/
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

var list = new quiz();
list.id = 0;
list.titolo = "CyberSecurity";
list.domande = [];
for (let i = 0; i < domandeCyberSec.length; i++) {
    list.domande.push(new domanda((i + 1), domandeCyberSec[i], risposteCyberSec[i], risposteCyberSec[i].pop(), risposteCyberSec[i].pop()));
}
var file = require("fs");

file.writeFileSync("domandeCyberSec.json", JSON.stringify(list));

const read = file.readFileSync("domandeCyberSec.json", "utf-8");