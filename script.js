// Paramètres personnalisables
let workTime = 50 * 60; // Durée d'une session de travail (en secondes)
let breakTime = 10 * 60; // Durée d'une pause courte (en secondes)
let longBreakTime = 30 * 60; // Durée d'une pause longue (en secondes)
let totalSessions = 3; // Nombre total de sessions avant une pause longue
let longBreakAfter = 3; // Nombre de sessions avant une pause longue

// Variables de suivi
let isWorkTime = true; // Indique si c'est le temps de travail ou de pause
let completedSessions = 0; // Nombre de sessions terminées
let timer; // Intervalle du minuteur

// Fonction pour jouer le son d'alarme
function playAlarm() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play();
}

// Fonction pour mettre à jour l'affichage de la minuterie
function updateTimerDisplay(minutes, seconds) {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Fonction pour mettre à jour la barre de progression des sessions
function updateSessionProgress() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${(completedSessions / totalSessions) * 100}%`;
    progressBar.textContent = `${completedSessions}/${totalSessions}`;
}

// Fonction pour terminer le Pomodoro
function endPomodoro() {
    clearInterval(timer);
    document.getElementById('status').textContent = "Pomodoro Complete!";
    document.getElementById('minutes').textContent = "00";
    document.getElementById('seconds').textContent = "00";
}

// Fonction pour changer de phase (travail, pause courte ou pause longue)
function switchPhase() {
    playAlarm(); // Jouer le son d'alarme

    if (!isWorkTime) {
        completedSessions++; // Incrémente les sessions terminées après une pause
        updateSessionProgress();
    }

    if (completedSessions >= totalSessions) {
        endPomodoro(); // Fin si toutes les sessions sont complétées
        return;
    }

    if (isWorkTime) {
        document.getElementById('status').textContent = `Work Time (Session ${completedSessions + 1}/${totalSessions})`;
        startTimer(workTime);
    } else {
        if (completedSessions % longBreakAfter === 0) {
            document.getElementById('status').textContent = "Long Break Time";
            startTimer(longBreakTime); // Pause longue après un certain nombre de sessions
        } else {
            document.getElementById('status').textContent = "Short Break Time";
            startTimer(breakTime); // Pause courte
        }
    }

    isWorkTime = !isWorkTime; // Alterner entre travail et pause
}

// Fonction pour démarrer le minuteur
function startTimer(duration) {
    clearInterval(timer); // Réinitialise tout minuteur en cours
    let timeRemaining = duration;

    timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        updateTimerDisplay(minutes, seconds);

        if (timeRemaining <= 0) {
            clearInterval(timer);
            switchPhase();
        }

        timeRemaining--;
    }, 1000);
}

// Initialisation
document.getElementById('status').textContent = `Work Time (Session 1/${totalSessions})`;
updateSessionProgress(); // Mettre à jour la barre de progression au démarrage
startTimer(workTime);
