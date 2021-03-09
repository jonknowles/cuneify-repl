const {
  not,
  and,
  identity,
} = require('./utils.js');
const {
  tokenize,
  TOKEN_TYPES,
} = require('./tokenize.js');

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

// {f}KURUN.NA szu-a-ti u2-ka-an-nu-szi-ma a-na me#-e i-na#-[ad-du]-u2-szi
// 𒈾𒋗𒀀𒋾𒌑𒅗𒀭𒉡𒅆𒈠𒀀𒈾𒈨𒂊𒄿[𒀜𒁺]𒌑𒅆

const transliterate = (inputStr = '') => {
  const tokens = tokenize(inputStr);
  const transliterated = tokens
    .map(token => {
      // If we have a valid token, transform it into cuneiform
      // throw everything else away except the newline chars
      const { type, value = '' } = token;
      if (type === TOKEN_TYPES.TOKEN) {
        return toCuneiform(value);
      }
      const newLines = value.match(/\n/g) || [];
      return newLines.join('');
    })
    .filter(identity)
    .join('');

  return transliterated;
};

module.exports = {
  transliterate
};