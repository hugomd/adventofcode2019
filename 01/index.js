const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

const calculateFuelRequirement = mass => Math.floor(mass / 3) - 2;

const recursiveFuel = massWithFuel => {
  const fuelRequired = calculateFuelRequirement(massWithFuel);

  if (fuelRequired <= 0) {
    return massWithFuel;
  }

  return massWithFuel + recursiveFuel(fuelRequired);
};

(async () => {
  // Part One
  const file = await readFile('./input', 'utf8');

  const masses = file
    .split('\n')
    .filter(i => i !== '')
    .map(i => parseInt(i));

  // Calculate fuel requirements for each module
  const fuelRequirements = masses.map(mass => calculateFuelRequirement(mass));

  // Take the sum of fuel requirements for each module
  const totalFuelRequirements = fuelRequirements.reduce(
    (acc, value) => acc + value,
    0,
  );

  console.log(totalFuelRequirements);

  // Part Two

  // For each fuel module's fuel requirement, recursively calculate the fuel
  // required for that fuel

  const totalFuelWithFuel = fuelRequirements
    .map(massWithFuel => recursiveFuel(massWithFuel))
    .reduce((acc, value) => acc + value, 0);
  console.log(totalFuelWithFuel);
})();
