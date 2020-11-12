const body = document.querySelector('body');
const time = document.getElementById('time');
const alert = document.getElementById('alert');
let message = document.getElementById('message');
let mood = document.getElementById('mood');
let timer;
const FPS = 120;

// dark/light mode
const lightMode = document.getElementById('light');
const darkMode = document.getElementById('dark');
let sun = document.querySelector('#sun');
let moon = document.querySelector('#moon');
let mode = "light";

light = () => {
    if (mode == "dark"){
        body.className = "";
        mode = "light";
    }
    sun.style.animationName = "click";
    sun.style.animationDuration = "500ms";

    setTimeout(() => {
        sun.style.animationName = "";
    }, 1000);
}
dark = () => {
    if (mode == "light") {
        body.className = "darkMode";
        mode = "dark";
   }
   moon.style.animationName = "click";
   moon.style.animationDuration = "500ms";
 
    setTimeout(() => {
        moon.style.animationName = "";
    }, 1000);   
}

lightMode.addEventListener('click', light);
darkMode.addEventListener('click', dark);


// buttons
const startStopButton = document.getElementById('startStop');
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const changeButton = document.getElementById('change');
const endButton = document.getElementById('end');

// App

class Pomodoro {
    pomodoroTime = 25;
    breakTime = 5;
    pomodoroMin = 25;
    seconds = this.pomodoroMin*60 // sec
    min = this.seconds / 60;
    sec = 0;
    makedPomodoro = 0;
    isRunning = false;
    isOnBreak = false;
    canEnd = false;
    canChangeTime = this.canEnd;

    // increase-decrease
    pomodoroMaximum = 40;
    pomodoroMinimum = 15;

    breakMaximum = 10;
    breakMinimum = 5;

    reset = () => {
        this.pomodoroTime = 25;
        this.breakTime = 5;
        this.pomodoroMin = this.pomodoroTime;
        this.seconds = this.pomodoroTime*60 // sec
        this.min = this.seconds / 60;
        this.isRunning = false;
        this.isOnBreak = false;

        time.innerHTML = `${this.addExtraZero(this.pomodoroMin)}:${this.addExtraZero(this.checkSecond(this.sec = 0))}`;
    }

    addExtraZero = (x) => {
        return x < 10 ? "0" + x : x;
    }
    checkSecond = (sec) => {
        return sec == 60 ? sec = 0 : sec;
    }

    onRunning = () => {
        if (this.seconds >= 60 && this.sec == 0) {
            this.sec = 60;
        }
        if (this.isRunning == true) {
        if (this.sec > 0) {
            this.sec--;
        }
        if (this.seconds > 0) { 
            this.seconds--;
        }
    }
        this.pomodoroMin = this.seconds / 60;
        time.innerHTML = `${this.addExtraZero(Math.floor(this.pomodoroMin))}:${this.addExtraZero(this.checkSecond(this.sec))}`;

        
    }

    startStop = () => {
        this.isRunning == false ? this.isRunning = true : this.isRunning = false; 
        
        if (this.isRunning == true) {
            timer = setInterval(this.onRunning, 1000); // start timer

            startStopButton.innerHTML = `Stop`;

        } else if(this.isRunning == false) {
            clearInterval(timer); // stop timer
            startStopButton.innerHTML = `Start`;
        }
    }

    getBreak = () => {
        this.isRunning = false;
        this.isOnBreak == false ? this.isOnBreak = true : this.isOnBreak = false;
        clearInterval(timer);
        if (this.isOnBreak == true) {
            this.seconds = this.breakTime * 60;
            this.pomodoroMin = this.breakTime;
            time.innerHTML = `${this.addExtraZero(this.pomodoroMin)}:${this.addExtraZero(this.checkSecond(this.sec = 0))}`;
        }
        if (this.isOnBreak == false) {
            this.reset();
        }
    }

    end = () => {
        if (this.canEnd == true){
            alert.style.display = "block";
            alert.style.backgroundColor = "#38ee7e";
            message.style.color = "white";
            message.textContent = 'Congratulations!';
            this.makedPomodoro += 1;
            this.getBreak;
            setTimeout( () => {
                alert.style.display = "none"
            },2500
            );
            this.reset();
        } else if (this.canEnd == false) {
            alert.style.display = "block";
            alert.style.backgroundColor = "red";
            message.style.color = "black";
            message.textContent = "You can't end pomodoro now!";
            setTimeout( () => {
                alert.style.display = "none"
            },2500
            );
        }

    }
    decrease = () => {
        if (mood.textContent == "WORK" && this.pomodoroMin > this.pomodoroMinimum && this.isRunning == false) {
            this.pomodoroMin -= 1;
            this.seconds = this.pomodoroMin*60;
            this.pomodoroTime = this.pomodoroMin;
            time.innerHTML = `${this.addExtraZero(Math.floor(this.pomodoroMin))}:${this.addExtraZero(this.checkSecond(this.sec))}`;
        }
        if (mood.textContent == "BREAK" && this.breakTime > this.breakMinimum && this.isRunning == false && this.canChangeTime == true) {
            this.breakTime -= 1;
            this.pomodoroTime = this.breakTime;
            this.seconds = this.breakTime*60;
            this.pomodoroMin = this.breakTime;
            time.innerHTML = `${this.addExtraZero(Math.floor(this.pomodoroMin))}:${this.addExtraZero(this.checkSecond(this.sec))}`;
 
        }
    }
    increase = () => {
        if (mood.textContent == "WORK" && this.pomodoroMaximum > this.pomodoroMin && this.isRunning == false) {
            this.pomodoroMin += 1;
            this.pomodoroTime = this.pomodoroMin;
            this.seconds = this.pomodoroMin*60;
            time.innerHTML = `${this.addExtraZero(Math.floor(this.pomodoroMin))}:${this.addExtraZero(this.checkSecond(this.sec))}`;
        }
        if (mood.textContent == "BREAK" && this.breakMaximum > this.breakTime && this.isRunning == false) {
            this.breakTime += 1;
            this.pomodoroTime = this.breakTime;
            this.seconds = this.breakTime*60;
            this.pomodoroMin = this.breakTime;
            time.innerHTML = `${this.addExtraZero(Math.floor(this.pomodoroMin))}:${this.addExtraZero(this.checkSecond(this.sec))}`;
 
        }
    }

    app = () => {
        if (this.seconds == 0) {
            pomodoro.isRunning = false;
            setTimeout(() => {
                pomodoro.seconds = this.pomodoroMin*60;
                this.makedPomodoro += 1;
            }, 5000);
        }
        time.innerHTML = `${this.addExtraZero(Math.floor(this.pomodoroMin))}:${this.addExtraZero(this.checkSecond(this.sec))}`;
        if (this.isRunning == true) {
            startStopButton.innerHTML = `Stop`;

        } else if(this.isRunning == false) {
            startStopButton.innerHTML = `Start`;
        }
        if (this.isOnBreak == true) {
            changeButton.innerHTML = `Get back work`;

        } else if(this.isOnBreak == false) {
            changeButton.innerHTML = `Take a break`;
        }
        if (this.seconds == (this.pomodoroTime * 60 || this.breakTime * 60) || this.isRunning == true) {
           this.canEnd = false;
        } else if (this.seconds !== (this.pomodoroTime * 60 || this.breakTime * 60) && this.isRunning == false && this.isOnBreak !== true){
            this.canEnd = true;
        }
        this.pomodoroMin > this.breakTime ? mood.textContent = "WORK" : mood.textContent = "BREAK";
        endButton.style.color = "#f8333c";
    }

}
const pomodoro = new Pomodoro();
time.innerHTML = `${pomodoro.pomodoroMin}:${pomodoro.addExtraZero(pomodoro.sec)}`;
setInterval(pomodoro.app, 1000 / FPS); // check
// eventListeners
startStopButton.addEventListener('click', pomodoro.startStop);
changeButton.addEventListener('click', pomodoro.getBreak);
endButton.addEventListener('click', pomodoro.end);
decreaseButton.addEventListener('click', pomodoro.decrease);
increaseButton.addEventListener('click', pomodoro.increase);
