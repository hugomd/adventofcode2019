const util = require('util');
const fs = require('fs');

const getFile = util.promisify(fs.readFile);

const xM = {
  'R': +1,
  'L': -1,
};

const yM = {
  'D': -1,
  'U': +1,
};

const generatePoints = wire => {
  const moves = wire.split(',');

  const points = new Map();

  let currentX = 0;
  let currentY = 0;
  let length = 0;

  moves.forEach(moveAndDistance => {
    const move = moveAndDistance[0];
    const distance = moveAndDistance.slice(1);

    for (let i = 0; i < distance; i++) {
      currentX += xM[move] || 0
      currentY += yM[move] || 0
      points.set(`${currentX},${currentY}`, length += 1);
    }
  })

  return points;
};

(async () => {
  const input = await getFile('./input', 'utf8');
  const [wire1, wire2] = input.split('\n');

  const wire1Points = generatePoints(wire1);
  const wire2Points = [...generatePoints(wire2).entries()];


  const result1 = wire2Points
    .filter(([point]) => wire1Points.has(point))
    .map(([point]) => point.split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b)[0];

  console.log(result1);

  const result2 = wire2Points
    .filter(([point]) => wire1Points.has(point))
    .map(([point, steps]) => wire1Points.get(point) + steps)
    .sort((a, b) => a - b)[0];

  console.log(result2);

})();
