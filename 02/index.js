const util = require('util');
const fs = require('fs');

const getFile = util.promisify(fs.readFile);

const {ADD, MULT, EOF} = {
  ADD: 1,
  MULT: 2,
  EOF: 99,
};

const performOp = (char, pointer, memory) => {
  const a = memory[memory[pointer + 1]];
  const b = memory[memory[pointer + 2]];
  const result = memory[pointer + 3];

  switch (char) {
    case ADD:
      memory[result] = a + b;
      break;
    case MULT:
      memory[result] = a * b;
      break;
  }
};

const interpreter = originalInstructions => {
  let pointer = 0;

  let instructions = [...originalInstructions];

  while (pointer < instructions.length) {
    // Default jump in characters
    let pointerJump = 4;

    const char = instructions[pointer];
    if (char === EOF) {
      break;
    }

    performOp(char, pointer, instructions);

    pointer += pointerJump;
  }

  // Memory at current point in time
  return instructions;
};

const bruteForce = (value, instructions) => {
  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      let newMemory = [...instructions];
      newMemory[1] = i;
      newMemory[2] = j;

      const [result] = interpreter(newMemory);
      if (result === value) {
        return {
          noun: i,
          verb: j,
          value: result,
          result: 100 * i + j,
        };
      }
    }
  }
};

(async () => {
  // Part 1
  const input = await getFile('./input', 'utf8');
  let instructions = input.split(',').map(i => parseInt(i));

  const result1 = interpreter(instructions);
  console.log(result1[0]);

  // Part 2
  const {result: result2} = bruteForce(19690720, instructions);
  console.log(result2);
})();
