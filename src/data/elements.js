export const ELEMENTS_1_20 = [
  { z: 1, symbol: 'H', name: 'Hydrogen' },
  { z: 2, symbol: 'He', name: 'Helium' },
  { z: 3, symbol: 'Li', name: 'Lithium' },
  { z: 4, symbol: 'Be', name: 'Beryllium' },
  { z: 5, symbol: 'B', name: 'Boron' },
  { z: 6, symbol: 'C', name: 'Carbon' },
  { z: 7, symbol: 'N', name: 'Nitrogen' },
  { z: 8, symbol: 'O', name: 'Oxygen' },
  { z: 9, symbol: 'F', name: 'Fluorine' },
  { z: 10, symbol: 'Ne', name: 'Neon' },
  { z: 11, symbol: 'Na', name: 'Sodium' },
  { z: 12, symbol: 'Mg', name: 'Magnesium' },
  { z: 13, symbol: 'Al', name: 'Aluminum' },
  { z: 14, symbol: 'Si', name: 'Silicon' },
  { z: 15, symbol: 'P', name: 'Phosphorus' },
  { z: 16, symbol: 'S', name: 'Sulfur' },
  { z: 17, symbol: 'Cl', name: 'Chlorine' },
  { z: 18, symbol: 'Ar', name: 'Argon' },
  { z: 19, symbol: 'K', name: 'Potassium' },
  { z: 20, symbol: 'Ca', name: 'Calcium' },
];

export const SHELL_CAPACITIES = [2, 8, 8, 2];

export function getElectronDistribution(totalElectrons) {
  const shells = [];
  let remaining = totalElectrons;
  const caps = [...SHELL_CAPACITIES];
  for (let i = 0; i < caps.length && remaining > 0; i++) {
    const fill = Math.min(caps[i], remaining);
    shells.push(fill);
    remaining -= fill;
  }
  while (remaining > 0) {
    shells.push(Math.min(8, remaining));
    remaining -= 8;
  }
  return shells;
}

export function getValenceElectrons(totalElectrons) {
  const dist = getElectronDistribution(totalElectrons);
  return dist[dist.length - 1] ?? 0;
}

export function hasNobleGasStability(electrons) {
  return [2, 10, 18].includes(electrons);
}

export const COVALENT_COMPOUNDS = [
  { formula: 'H₂', name: 'Dihydrogen', atoms: ['H', 'H'] },
  { formula: 'O₂', name: 'Dioxygen', atoms: ['O', 'O'] },
  { formula: 'N₂', name: 'Dinitrogen', atoms: ['N', 'N'] },
  { formula: 'HF', name: 'Hydrogen Fluoride', atoms: ['H', 'F'] },
  { formula: 'H₂O', name: 'Water', atoms: ['H', 'O', 'H'] },
  { formula: 'CO₂', name: 'Carbon Dioxide', atoms: ['C', 'O', 'O'] },
  { formula: 'NH₃', name: 'Ammonia', atoms: ['N', 'H', 'H', 'H'] },
  { formula: 'CH₄', name: 'Methane', atoms: ['C', 'H', 'H', 'H', 'H'] },
];
