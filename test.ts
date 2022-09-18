const ar = [
  'Farinha de Trigo Integral ',
  ' Aveia Instantânea (Aveia) ',
  ' Azeite Extra Virgem ',
  ' Sal ',
  ' Alho em Pó'
];

const checker = (arr: string[], target: string[]) => target.every((v) => arr.includes(v));

const aa = [
  {
    nome: "um",
    array: [
      'Farinha de Trigo Integral ',
      ' Aveia Instantânea (Aveia) ',
      ' Azeite Extra Virgem ',
      ' Sal ',
      ' Alho em Pó'
    ],
  },
  {
    nome: "dois",
    array: ["doce", "salgado"],
  },
  {
    nome: "tres",
    array: ["salgado"],
  },
];

const b = aa.filter(({ array }) => checker(array, ar))
console.log(b)