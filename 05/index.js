const util = require('util');
const fs = require('fs');

const getFile = util.promisify(fs.readFile);

const {
  ADD,
  MULT,
  INPUT,
  OUTPUT,
  JUMPIFTRUE,
  JUMPIFFALSE,
  LESSTHAN,
  EQUALS,
  EOF,
} = {
  ADD: 1,
  MULT: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMPIFTRUE: 5,
  JUMPIFFALSE: 6,
  LESSTHAN: 7,
  EQUALS: 8,
  EOF: 99,
};

const getChar = (mode, position, memory) => {
  switch (mode) {
    case '0': // position mode
      return memory[memory[position]];
    case '1': // immediate mode
      return memory[position];
  }
};

const performOp = (input, modes, pointer, memory) => {
  const [m3, m2, m1] = modes.slice(0, 3);
  const char = parseInt(modes.slice(3));
  let a, b, result;

  switch (char) {
    case ADD:
      a = getChar(m1, pointer + 1, memory);
      b = getChar(m2, pointer + 2, memory);
      result = memory[pointer + 3];
      memory[result] = a + b;
      console.log(`Storing ${a} + ${b} at ${result}`);
      return pointer + 4;
      break;
    case MULT:
      a = getChar(m1, pointer + 1, memory);
      b = getChar(m2, pointer + 2, memory);
      result = memory[pointer + 3];
      memory[result] = a * b;
      console.log(`Storing ${a} * ${b} at ${result}`);
      return pointer + 4;
      break;
    case INPUT:
      a = memory[pointer + 1];
      memory[a] = input;
      return pointer + 2
      break;
    case OUTPUT:
      a = getChar(m1, pointer + 1, memory);
      console.log('OUTPUT: ', a);
      return pointer + 2;
      break;
    case JUMPIFTRUE:
      a = getChar(m1, pointer + 1, memory);
      b = getChar(m2, pointer + 2, memory);
      console.log(`JUMPIFTRUE: a is ${a}, b is ${b}`);
      if (a !== 0) {
        return b;
      }
      return pointer + 3;
      break;
    case JUMPIFFALSE:
      a = getChar(m1, pointer + 1, memory);
      b = getChar(m2, pointer + 2, memory);
      console.log(`JUMPIFFALSE: a is ${a}, b is ${b}`);
      if (a === 0) {
        return b;
      }
      return pointer + 3
      break;
    case LESSTHAN:
      a = getChar(m1, pointer + 1, memory);
      b = getChar(m2, pointer + 2, memory);
      result = memory[pointer + 3];
      if (a < b) {
        memory[result] = 1;
      } else {
        memory[result] = 0;
      }
      return pointer + 4;
      break;
    case EQUALS:
      a = getChar(m1, pointer + 1, memory);
      b = getChar(m2, pointer + 2, memory);
      result = memory[pointer + 3];
      if (a === b) {
        memory[result] = 1;
      } else {
        memory[result] = 0;
      }
      return pointer + 4;
      break;
  }
};

const getModes = chars => {
  const modes = '00000' + chars;
  return modes.substring(chars.length, modes.length);
};

const interpreter = (input, originalInstructions) => {
  let pointer = 0;

  let instructions = [...originalInstructions];

  while (pointer < instructions.length) {
    const char = instructions[pointer];
    if (char === EOF) {
      break;
    }

    const jump = performOp(input, getModes(char.toString()), pointer, instructions);

    pointer = jump;
  }

  // Memory at current point in time
  return instructions;
};

(async () => {
  // Part 1
  const input = await getFile('./input', 'utf8');
  let instructions = input.split(',').map(i => parseInt(i));

  interpreter(1, instructions);

  // Part 2
  interpreter(5, instructions);
})();
