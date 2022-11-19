const decodeForm = document.getElementById("decode-form");
const decodedTextOutput = document.getElementById("decoded-text");
const decodeAlphabetShiftInput = document.getElementById("decode-alphabet-shift");

//charCodes for "A" - 65 "Z" - 90, for "a" - 97, "z" - 122

const UPPERCASE_CHAR_CODE_MIN = 65;
const UPPERCASE_CHAR_CODE_MAX = 90;
const LOWERCASE_CHAR_CODE_MIN = 97;
const LOWERCASE_CHAR_CODE_MAX = 122;

const isUpperCase = (char) => /[A-Z]/.test(char);
const isLowerCase = (char) => /[a-z]/.test(char);

const hasUnderflowedCharRange = (min, testValue) => testValue < min;
const hasOverflowedCharRange = (max, testValue) => testValue > max;

/* DECODE */

const decodeCaesarsCipher = (encodedText, alphabetShift = 0) => {
  const decodedText = encodedText
    .split("")
    .map((encodedChar) => {
      const encodedCharCode = encodedChar.charCodeAt(0);
      let newCharCode = encodedCharCode;

      if (isUpperCase(encodedChar)) {
        // operates in range of 65 - 90
        newCharCode = encodedCharCode - alphabetShift;
        if (hasUnderflowedCharRange(UPPERCASE_CHAR_CODE_MIN, newCharCode)) {
          const underflownBy = UPPERCASE_CHAR_CODE_MIN - newCharCode;

          newCharCode = UPPERCASE_CHAR_CODE_MAX - underflownBy + 1;
        }
      }

      if (isLowerCase(encodedChar)) {
        // operates in range of 97 - 122
        newCharCode = encodedCharCode - alphabetShift;
        if (hasUnderflowedCharRange(LOWERCASE_CHAR_CODE_MIN, newCharCode)) {
          const underflownBy = LOWERCASE_CHAR_CODE_MIN - newCharCode;

          newCharCode = LOWERCASE_CHAR_CODE_MAX - underflownBy + 1;
        }
      }

      return String.fromCharCode(newCharCode);
    })
    .join("");

  return decodedText;
};

decodeForm.onsubmit = (formEvent) => {
  formEvent.preventDefault();
  const textToDecode = formEvent.srcElement.querySelector("#decode-input").value;
  const alphabetShift =
    Number(formEvent.srcElement.querySelector("#decode-alphabet-shift").value) || 0;

  const decodedText = decodeCaesarsCipher(textToDecode, alphabetShift);
  decodedTextOutput.textContent = decodedText || "";
};

/* ENCODE */

const encodeForm = document.getElementById("encode-form");
const encodedTextOutput = document.getElementById("encoded-text");
const encodeAlphabetShiftInput = document.getElementById("encode-alphabet-shift");

const encodeToCaesarsCipher = (textToEncode, alphabetShift = 0) => {
  const decodedText = textToEncode
    .split("")
    .map((charToEncode) => {
      const charCode = charToEncode.charCodeAt(0);
      let encodedCharCode = charCode;

      if (isUpperCase(charToEncode)) {
        // operates in range of 65 - 90
        encodedCharCode = charCode + alphabetShift;
        if (hasOverflowedCharRange(UPPERCASE_CHAR_CODE_MAX, encodedCharCode)) {
          const overflownBy = UPPERCASE_CHAR_CODE_MAX - encodedCharCode;

          encodedCharCode = UPPERCASE_CHAR_CODE_MIN + overflownBy - 1;
        }
      }

      if (isLowerCase(charToEncode)) {
        // operates in range of 97 - 122
        encodedCharCode = charCode + alphabetShift;
        if (hasOverflowedCharRange(LOWERCASE_CHAR_CODE_MAX, encodedCharCode)) {
          const overflownBy = LOWERCASE_CHAR_CODE_MAX - encodedCharCode;

          encodedCharCode = LOWERCASE_CHAR_CODE_MAX + overflownBy - 1;
        }
      }

      return String.fromCharCode(encodedCharCode);
    })
    .join("");

  return decodedText;
};

encodeForm.onsubmit = (formEvent) => {
  formEvent.preventDefault();
  const textToEncode = formEvent.srcElement.querySelector("#encode-input").value;
  const alphabetShift =
    Number(formEvent.srcElement.querySelector("#encode-alphabet-shift").value) || 0;

  const encodedText = encodeToCaesarsCipher(textToEncode, alphabetShift);

  encodedTextOutput.textContent = encodedText || "";
};
