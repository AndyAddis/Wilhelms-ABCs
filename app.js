const splash = document.querySelector('#splash');
const board = document.querySelector('#board');
const grid = document.querySelector('#letter-grid');
const skip = document.querySelector('#skip');
const letterScreen = document.querySelector('#letter-screen');
const selectedLetter = document.querySelector('#selected-letter');
const letterQuote = document.querySelector('#letter-quote');
const backButton = document.querySelector('#back-button');
const wilhelm = document.querySelector('#wilhelm');
const audioButton = document.querySelector('#audio-button');
const audioLabel = document.querySelector('#audio-label');
const apaVoice = new Audio();
apaVoice.preload = 'auto';
const abcButton = document.querySelector('#abc-button');
const songScreen = document.querySelector('#song-screen');
const songBackButton = document.querySelector('#song-back-button');
const songGrid = document.querySelector('#song-grid');
const songAudioButton = document.querySelector('#song-audio-button');
const songAudioLabel = document.querySelector('#song-audio-label');
const alphabetSong = new Audio('audio/WholeAlphabet.mp3');
alphabetSong.preload = 'auto';

const letters = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const colors = ['red', 'blue', 'yellow'];
const audioFiles = {
  A: 'A-awesome.mp3',
  B: 'B-beautiful.mp3',
  C: 'C-Crazy.mp3',
  D: 'D-dad.mp3',
  E: 'E-energy.mp3',
  F: 'F-funny.mp3',
  G: 'G-growing.mp3',
  H: 'H-happy.mp3',
  I: 'I-incredible.mp3',
  J: 'J-joy.mp3',
  K: 'K-kind.mp3',
  L: 'L-love.mp3',
  M: 'M-mon.mp3',
  N: 'N-new.mp3',
  O: 'O-omaandopa.mp3',
  P: 'P-playing.mp3',
  Q: 'Q-quiet.mp3',
  R: 'R-rockets.mp3',
  S: 'S-smart.mp3',
  T: 'T-truck.mp3',
  U: 'U-unbelieveable.mp3',
  V: 'V-vikings.mp3',
  W: 'W-wilhelm.mp3',
  X: 'X-xmen.mp3',
  Y: 'Y-you.mp3',
  Z: 'Z-zillions.mp3',
};
const letterData = {
  A: { before: 'A is for ', word: 'AWESOME', after: '—and that’s you buddy!' },
  B: { before: 'B is for ', word: 'BEAUTIFUL', after: ', just like your Ama.' },
  C: { before: 'C is for ', word: 'CRAZY', after: ' like your uncle NaNee.' },
  D: { before: 'D is for ', word: 'DAD', after: ', the strongest man.' },
  E: { before: 'E is for all Wilhelm’s ', word: 'ENERGY', after: '!' },
  F: { before: 'F is for ', word: 'FUNNY', after: '—you make Apa laugh.' },
  G: { before: 'G is for ', word: 'GROWING', after: ' bigger every day.' },
  H: { before: 'H is for a ', word: 'HAPPY', after: ' when I see you.' },
  I: { before: 'I is for ', word: 'INCREDIBLE', after: ' artist like Aunt LeLe.' },
  J: { before: 'J is for ', word: 'Joy', after: ' just like mommy' },
  K: { before: 'K is for ', word: 'KIND', after: ' which you are to everyone.' },
  L: { before: 'L is for ', word: 'LOVE', after: ' you.' },
  M: { before: 'M is for ', word: 'MOM', after: ' who loves you so much.' },
  N: { before: 'N is for ', word: 'NEW', after: ' adventures.' },
  O: { before: 'O is for ', word: 'Oma and Opa', after: ', they’re the best.' },
  P: { before: 'P is for ', word: 'PLAYING', after: ' at grand land.' },
  Q: { before: 'Q is for ', word: 'QUIET', after: ' times with the Bible.' },
  R: { before: 'R is for ', word: 'rockets', after: ' that go blast off' },
  S: { before: 'S is for super ', word: 'SMART', after: ' Wilhelm' },
  T: { before: 'T is for Apa’s ', word: 'TRUCK', after: '.' },
  U: { before: 'U is for the ', word: 'UNBELIEVABLE', after: ' love of Jesus.' },
  V: { before: 'V is for very brave ', word: 'VIKINGS', after: '.' },
  W: { before: 'W is for ', word: 'wonderful Wilhelm', after: '!' },
  X: { before: 'X is for ', word: 'X-MEN', after: '… it’s all I got Boy!' },
  Y: { before: 'Y is for ', word: 'YOU', after: ' make Apa smile.' },
  Z: { before: 'Z is for ', word: 'ZILLIONS', after: ' of reasons Apa loves you!' },
};

function renderQuote(letter) {
  const phrase = letterData[letter];
  const emphasis = document.createElement('strong');
  emphasis.textContent = phrase.word;
  letterQuote.replaceChildren(
    document.createTextNode(phrase.before),
    emphasis,
    document.createTextNode(phrase.after),
  );
}

function stopAudio() {
  apaVoice.pause();
  apaVoice.currentTime = 0;
  audioButton.classList.remove('is-playing');
}

function playAudio() {
  if (!apaVoice.src) return;
  apaVoice.currentTime = 0;
  apaVoice.play().catch(() => {
    audioLabel.textContent = 'Tap to hear Apa';
  });
}

function loadLetterAudio(letter, autoplay = true) {
  stopAudio();
  const filename = audioFiles[letter];
  if (!filename) {
    apaVoice.removeAttribute('src');
    audioButton.disabled = true;
    audioLabel.textContent = 'Apa’s recording coming soon';
    return;
  }
  apaVoice.src = `audio/${filename}`;
  audioButton.disabled = false;
  audioLabel.textContent = 'Hear Apa say it';
  if (autoplay) playAudio();
}

apaVoice.addEventListener('play', () => {
  audioButton.classList.add('is-playing');
  audioLabel.textContent = 'Apa is speaking…';
});
apaVoice.addEventListener('ended', () => {
  audioButton.classList.remove('is-playing');
  audioLabel.textContent = 'Hear Apa again';
});
audioButton.addEventListener('click', playAudio);

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildBoard() {
  const palette = shuffle(letters.map((_, index) => colors[index % colors.length]));
  letters.forEach((letter, index) => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = `letter-tile ${palette[index]}`;
    tile.textContent = letter;
    tile.setAttribute('aria-label', `Letter ${letter}`);
    tile.style.setProperty('--tilt', `${(Math.random() * 5 - 2.5).toFixed(1)}deg`);
    tile.style.animationDelay = `${index * 22}ms`;
    tile.addEventListener('click', () => openLetter(letter, palette[index]));
    grid.appendChild(tile);
  });
}

function buildSongBoard() {
  letters.forEach((letter, index) => {
    const tile = document.createElement('div');
    tile.className = `song-letter ${colors[index % colors.length]}`;
    tile.textContent = letter;
    // The recording begins after about half a second and reaches Z near 25 seconds.
    tile.style.setProperty('--song-delay', `${500 + (index * 950)}ms`);
    songGrid.appendChild(tile);
  });
}

let started = false;
let boardTimer;
function showBoard() {
  if (started) return;
  started = true;
  window.clearTimeout(boardTimer);
  splash.classList.add('is-leaving');
  board.hidden = false;
  requestAnimationFrame(() => board.classList.add('is-visible'));
  window.setTimeout(() => splash.remove(), 700);
}

buildBoard();
buildSongBoard();
skip.addEventListener('click', showBoard);

let welcomeStarted = false;
let settleTimer;
function startWelcome() {
  if (welcomeStarted || started) return;
  welcomeStarted = true;
  splash.classList.add('character-ready');
  // Ensure the final position appears even if a browser drops the animation.
  settleTimer = window.setTimeout(() => splash.classList.add('character-settled'), 2050);
  // 0.25-second dramatic beat + 1.8-second slide + a full 3-second hold.
  boardTimer = window.setTimeout(showBoard, 5050);
}

if (wilhelm.complete && wilhelm.naturalWidth > 0) {
  requestAnimationFrame(startWelcome);
} else {
  wilhelm.addEventListener('load', startWelcome, { once: true });
  wilhelm.addEventListener('error', startWelcome, { once: true });
}

// A defensive fallback for unusually slow or interrupted image events.
window.setTimeout(startWelcome, 8000);

function openLetter(letter, color) {
  board.hidden = true;
  board.classList.remove('is-visible');
  selectedLetter.textContent = letter;
  selectedLetter.className = `big-letter ${color}`;
  renderQuote(letter);
  loadLetterAudio(letter);
  letterScreen.hidden = false;
  letterScreen.classList.add('is-visible');
  history.pushState({ letter }, '', `#${letter}`);
  backButton.focus({ preventScroll: true });
}

function closeLetter(updateHistory = true) {
  stopAudio();
  letterScreen.hidden = true;
  letterScreen.classList.remove('is-visible');
  board.hidden = false;
  requestAnimationFrame(() => board.classList.add('is-visible'));
  if (updateHistory) history.pushState({}, '', location.pathname);
}

function openSong() {
  stopAudio();
  board.hidden = true;
  board.classList.remove('is-visible');
  songScreen.hidden = false;
  history.pushState({ song: true }, '', '#ABCs');
  songBackButton.focus({ preventScroll: true });
  playAlphabetSong();
}

function closeSong(updateHistory = true) {
  alphabetSong.pause();
  alphabetSong.currentTime = 0;
  songAudioButton.classList.remove('is-playing');
  songAudioLabel.textContent = 'Play the ABC song';
  songScreen.hidden = true;
  songScreen.classList.remove('is-visible');
  board.hidden = false;
  requestAnimationFrame(() => board.classList.add('is-visible'));
  if (updateHistory) history.pushState({}, '', location.pathname);
}

function restartSongTiles() {
  songScreen.classList.remove('is-visible');
  void songScreen.offsetWidth;
  songScreen.classList.add('is-visible');
}

function playAlphabetSong() {
  alphabetSong.currentTime = 0;
  restartSongTiles();
  alphabetSong.play().catch(() => {
    songAudioLabel.textContent = 'Tap to play the ABC song';
  });
}

alphabetSong.addEventListener('play', () => {
  songAudioButton.classList.add('is-playing');
  songAudioLabel.textContent = 'Singing the ABCs…';
});
alphabetSong.addEventListener('ended', () => {
  songAudioButton.classList.remove('is-playing');
  songAudioLabel.textContent = 'Sing it again!';
});

backButton.addEventListener('click', () => closeLetter());
abcButton.addEventListener('click', openSong);
songBackButton.addEventListener('click', () => closeSong());
songAudioButton.addEventListener('click', playAlphabetSong);
window.addEventListener('popstate', () => {
  if (!letterScreen.hidden) closeLetter(false);
  if (!songScreen.hidden) closeSong(false);
});
