// DOM model elements
let display = document.getElementById("display");
let targetInput = document.querySelector(".target input");

// Global AudioContext for sound functionality
let audioContext = new (window.AudioContext || window.webkitAudioContext)();

//Handel Count Function
let count = 0;
let target = null;

targetInput.addEventListener("input", (e) => {
  target = parseInt(e.target.value) || null;
});

// AI FUNCTIONALYTY
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

async function incriment() {
  await playClickSound();
  if (target && count >= target) {
    await playBeep();
    return;
  }
  count++;
  display.innerText = count;
}

//handel reset Functionality
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
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
