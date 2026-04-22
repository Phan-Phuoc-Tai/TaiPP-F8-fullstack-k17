//input: const words = ["javascript", "php", "css", "html", "python", "java"];

//output:
// - newArr = ["javascript", "python"]

const words = ["javascript", "php", "css", "html", "python", "java"];
let newArr1 = [];
for (let word of words) {
  let length = word.length;
  if (length >= 5) {
    newArr1[newArr1.length] = word;
  }
}
console.log(newArr1);

// - newArr = words.toUpperCase
let newArr2 = [];
for (let word of words) {
  newArr2[newArr2.length] = word.toUpperCase();
}
console.log(newArr2);

// - newArr = [ "tpircsavaj", "avaj"...]
let newArr3 = [];
for (let word of words) {
  let reverseWord = "";
  for (let i = 0; i < word.length; i++) {
    reverseWord = word.charAt(i) + reverseWord;
  }
  newArr3[newArr3.length] = reverseWord;
}
console.log(newArr3);
