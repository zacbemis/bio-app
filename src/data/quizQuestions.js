// Each question: { question: string, options: string[], correctIndex: number }
export const QUIZ_BY_SECTION = {
  bohr: [
    { question: 'Where are protons located in a Bohr model?', options: ['In the shells', 'In the nucleus', 'Orbiting the nucleus', 'Outside the atom'], correctIndex: 1 },
    { question: 'How many electrons go in the first shell for elements 1–20?', options: ['8', '2', '18', '4'], correctIndex: 1 },
    { question: 'Carbon (6 electrons) has how many electrons in its second shell?', options: ['2', '4', '6', '8'], correctIndex: 1 },
  ],
  stability: [
    { question: 'An element has Noble-Gas Stability (NGS) when it has how many electrons?', options: ['Any number', '2, 10, or 18', '8 or 18', '2 or 8 only'], correctIndex: 1 },
    { question: 'If an atom has more electrons than protons, its charge is:', options: ['Positive', 'Negative', 'Zero', 'Unknown'], correctIndex: 1 },
    { question: 'Neutral-Charge Stability (NCS) means:', options: ['Same as a noble gas', 'Protons equal electrons', 'No neutrons', 'Full outer shell'], correctIndex: 1 },
  ],
  lewisDiagram: [
    { question: 'A Lewis diagram shows:', options: ['All electrons', 'Only valence electrons', 'Only the nucleus', 'Protons and neutrons'], correctIndex: 1 },
    { question: 'Valence electrons are in the:', options: ['Innermost shell', 'Outermost shell', 'Nucleus', 'First shell only'], correctIndex: 1 },
    { question: 'Carbon has how many valence electrons?', options: ['2', '4', '6', '8'], correctIndex: 1 },
  ],
  covalent: [
    { question: 'In a covalent bond, electrons are:', options: ['Transferred', 'Shared', 'Lost', 'Only on one atom'], correctIndex: 1 },
    { question: 'H₂ has how many shared electrons between the two H atoms?', options: ['1', '2', '0', '4'], correctIndex: 1 },
    { question: 'A double bond (e.g. O₂) involves how many shared electrons?', options: ['2', '4', '6', '8'], correctIndex: 1 },
  ],
  ionic: [
    { question: 'In an ionic compound, the overall charge is:', options: ['Positive', 'Negative', 'Zero', 'Depends on the compound'], correctIndex: 2 },
    { question: 'NaCl forms from:', options: ['Na and Cl sharing electrons', 'Na⁺ and Cl⁻ attracting', 'Two neutral atoms', 'Covalent bonding'], correctIndex: 1 },
    { question: 'To balance Al³⁺ and O²⁻ you need:', options: ['1 Al and 1 O', '2 Al and 3 O', '3 Al and 2 O', 'Equal numbers'], correctIndex: 1 },
  ],
  measurement: [
    { question: 'When reading a ruler to the tenths place, the uncertain digit is in the:', options: ['Ones place', 'Tenths place', 'Hundredths place', 'Tens place'], correctIndex: 1 },
    { question: 'When measuring liquid in a graduated cylinder, you read at the:', options: ['Top of the meniscus', 'Bottom of the meniscus', 'Middle of the liquid', 'Edge of the glass'], correctIndex: 1 },
    { question: 'A measurement of 4.57 cm is read to the:', options: ['Tenths place', 'Hundredths place', 'Ones place', 'Thousands place'], correctIndex: 1 },
  ],
};
