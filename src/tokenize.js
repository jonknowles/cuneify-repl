const TOKEN_TYPES = {
  CRUFT: 0,
  TOKEN: 1
};

// The tokenizer separates the input string into tokens and non-tokens, preserving both
const tokenize = (str = '') => {
  const pattern = new RegExp(/([^-. \n]+)/ig);

  const tokens = [];
  let result;
  let lastToken;

  while(result !== null) {
    result = pattern.exec(str);

    if (result) {
      const { [0]: value, index } = result;

      const lastEnd = lastToken
        ? lastToken.end
        : 0;

      const cruft = str.substring(lastEnd, index);

      if (cruft.length > 0) {
        tokens.push({
          type: TOKEN_TYPES.CRUFT,
          value: cruft,
          start: lastEnd,
          end: index
        });
      }

      const nextToken ={
        type: TOKEN_TYPES.TOKEN,
        value,
        start: index,
        end: index + value.length
      };

      tokens.push(nextToken);
      lastToken = nextToken;
    }
  }

  return tokens;
};

module.exports = {
  tokenize,
  TOKEN_TYPES
};