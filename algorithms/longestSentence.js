// Soal Algorithms 2
const sentence = "Saya sangat senang mengerjakan soal algoritma";

function longest(sentence) {
  const words = sentence.split(" ");
  const longestSentence = words.reduce((longest, current) =>
    longest.length >= current.length ? longest : current
  );

  return `${longestSentence} : ${longestSentence.length} character`;
}

console.log(longest(sentence));
