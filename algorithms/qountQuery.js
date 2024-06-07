// Soal Algorithms 3
const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

function countQuery() {
  return query.map((query) => input.filter((item) => item === query).length);
}

console.log(countQuery());
