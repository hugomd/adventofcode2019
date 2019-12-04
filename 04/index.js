const LOWER = 136760;
const UPPER = 595730;

const twoAdjacentDigits = num => {
  let n = num.toString();
  let i = 0;

  const numMap = {};

  for (let i = 0; i < n.length; i++) {
    if (!numMap[n[i]]) {
      numMap[n[i]] = [];
    }

    numMap[n[i]].push(n[i]);
  }

  const results = Object.values(numMap)
    .map(i => i.length)
    .filter(i => i !== 1 && i <= 2)
    .map(i => i % 2 === 0)

  if (results.length === 0) {
    return false;
  }

  return results
    .reduce((acc, val) => acc && val, true);
};

const neverDecreases = num => {
  let n = num.toString();

  let i = 0;

  for (let j = 1; j < n.length; j++) {
    if (n[i] > n[j]) {
      return false;
    }
    i += 1;
  }

  return true;
};

let count = 0;
for (let i = LOWER; i <= UPPER; i++) {
  // Inherently 6 digits and within the given range
  if (twoAdjacentDigits(i) && neverDecreases(i)) {
    count++;
  }
}

console.log(count);
