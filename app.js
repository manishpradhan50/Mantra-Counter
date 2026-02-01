
// DOM model elements
let display = document.getElementById("display");
let targetInput = document.querySelector(".target input");
let countBox = document.getElementById("countBox");

// Global AudioContext for sound functionality (AI Functionality)
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
async function playBeep() {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800; // Frequency in Hz
  oscillator.type = "sine"; // Wave type

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}
async function playClickSound() {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 1200; // Higher frequency for click sound
  oscillator.type = "square"; // Square wave for sharper click

  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.05,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.05);
}

//Handel Count Function
let count = 0;
let target = null;

targetInput.addEventListener("input", (e) => {
  target = parseInt(e.target.value) || null;
});

// handel count incriment Functionality
async function incriment() {
  await playClickSound();
  if (target && count >= target) {
    await playBeep();
    return;
  }
  count++;
  display.innerText = count;
}


//navbar Buttons Handel
//handel reset Functionality
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
   navLinks.classList.remove("active");
  alert(" The count is Reset to 0 ");
  count = 0;
  display.innerText = count;
});

//handel Hamburger Menu
let hamburger = document.getElementById("hamburger");
let navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

let home = document.getElementById("home");
home.addEventListener("click", () => { 
  window.location.reload();
});

let aboutUs = document.getElementById("aboutUs");
aboutUs.addEventListener("click", () => {
   countBox.style.display = "none";
   historySection.style.display = "none";
   settingSection.style.display = "none";
   navLinks.classList.remove("active");
    let aboutUsSection = document.getElementById("aboutUsSection");
    aboutUsSection.style.display = "block";

});

let history = document.getElementById("history");
history.addEventListener("click", () => {
   countBox.style.display = "none";
   aboutUsSection.style.display = "none";
   settingSection.style.display = "none";
   navLinks.classList.remove("active");
    let historySection = document.getElementById("historySection");
    historySection.style.display = "block";
    
});

let setting = document.getElementById("setting");
setting.addEventListener("click", () => {
   countBox.style.display = "none";
   aboutUsSection.style.display = "none";
   historySection.style.display = "none";
   navLinks.classList.remove("active");
    let settingSection = document.getElementById("settingSection");
    settingSection.style.display = "block";

});

// Add keyboard functionality for space bar to increment count
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    incriment();
    event.preventDefault();
  }
});
