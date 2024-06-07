// Soal Algorithms 1
const word = "NEGIE1";

function reverseWord(wordInput) {
  const word = wordInput.slice(0, -1);
  const digit = wordInput.slice(-1);
  const reverseWord = word.split("").reverse().join("");

  return reverseWord + digit;
}

console.log(reverseWord(word));
