let alphabets = ["A", "B", "C"];

const getAlpha = () => {
  alphabets.forEach((e) => {
    console.log(e);
  });
};

const postFruits = (value, getAlpha) => {
  setTimeout(() => {
    alphabets.push(value);
    getAlpha();
  }, 2000);
};

postFruits("D", getAlpha);