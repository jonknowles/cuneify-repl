const { transliterate } = require('./transliterate.js');

const inputTextarea = document.getElementById('input-textarea');
const outputTextarea = document.getElementById('output-textarea');
// const goBtn = document.getElementById('go-btn');
const fontSelect = document.getElementById('font-select');
const permalink = document.getElementById('permalink');

const FONTS = [
  { value: 'santakku', label: 'Cursive Old Babylonian (Santakku)' },
  { value: 'cuneiformob', label: 'Monumental Old Babylonian (CuneiformOB)' },
  { value: 'santakkum', label: 'Monumental Old Babylonian (SantakkuM)' },
  { value: 'ullikummia', label: 'Hittite (UllikummiA)' },
  { value: 'ullikummib', label: 'Hittite (UllikummiB)' },
  { value: 'ullikummic', label: 'Hittite (UllikummiC)' },
  { value: 'assurbanipal', label: 'Neo-Assyrian (Assurbanipal)' },
  { value: 'cuneiformna', label: 'Neo-Assyrian (CuneiformNA)' },
];

const toQueryParamSyntax = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('syntax');
};

// Todo: add font query param
const toPermalink = (syntax) => {
  const { origin } = window.location;
  const encodedSyntax = encodeURIComponent(syntax);
  return `${origin}/index.html?syntax=${encodedSyntax}`;
};

const processInput = () => {
  const input = inputTextarea.value;
  const output = transliterate(input);

  outputTextarea.value = output;

  permalink.innerText = toPermalink(input);
};

const createApp = () => {

  const seedSyntax = toQueryParamSyntax();
  if (seedSyntax) {
    inputTextarea.value = seedSyntax;
  }
  outputTextarea.value = '';

  FONTS.forEach(({value, label} = {}) => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = label;
    fontSelect.appendChild(option);
  });

  // goBtn.addEventListener('click', processInput);
  inputTextarea.addEventListener('keyup', processInput);
  fontSelect.addEventListener('change', (event) => {
    const { value } = event.target;
    outputTextarea.className = value;
  });

  if (inputTextarea.value) {
    processInput();
  }
};

window.onload = createApp;