let Fruits = ["Apple", "Mango", "grape"];

const getFruits = () => {
  Fruits.forEach((e) => {
    console.log(e);
  });
};

const postFruits = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Fruits.push(value);
      let err = false;
      if (!err) {
        resolve();
      } else {
        reject("Something Went Wrong");
      }
    }, 2000);
  });
};

const inti = async () => {
  try {
    await postFruits("KIWI");
    getFruits();
  } catch (err) {
    console.log(err);
  }
};

inti();
