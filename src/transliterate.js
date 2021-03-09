const {
  not,
  and,
} = require('./utils.js');

const cuneiformMap = require('../cuneify/cuneiformMap.json');

const START_CHARS = [ '[' ];
const END_CHARS = [ '!', '?', ']' ];
const PASS_THROUGH_TOKENS = [ 'x', '?', '!', '[', ']' ];

const isStartChar = char => START_CHARS.includes(char);
const isEndChar = char => END_CHARS.includes(char);

const isMeaningfulChar = and(not(isStartChar), not(isEndChar));

const isPassThroughToken = (token) => PASS_THROUGH_TOKENS.includes(token.toLocaleLowerCase());

const toDecodedSymbol = (code = '') => {
  return cuneiformMap[code] || '';
};

const toCuneiform = (token = '', includeExtraChars = true) => {
  if (isPassThroughToken(token)) return token;

  const chars = Array.from(token);

  const charsAtStart = chars.filter(isStartChar).join('');
  const charsAtEnd = chars.filter(isEndChar).join('');

  const meaningfulChars = chars.filter(isMeaningfulChar).join('');

  const cuneiformSymbol = toDecodedSymbol(meaningfulChars);

  if (includeExtraChars) {
    return `${charsAtStart}${cuneiformSymbol}${charsAtEnd}`;
  }

  return cuneiformSymbol;
};


const TOKEN_REGEX = /-| |\./;

const transliterate = (inputStr = '') => {
  const tokens = inputStr.trim().split(TOKEN_REGEX);

  const transliterated = tokens.map(toCuneiform).join('');

  return transliterated;
};

module.exports = {
  transliterate
};