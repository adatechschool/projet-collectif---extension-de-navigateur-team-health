const ApiKey = "BlTQnbqdr3mjHb0gOvKxYDUlEPzrqUaOTeqOZInr"; // enlever

const fruit = async () => {
  const fruitvalue = document.getElementById("placeholder").value;

  const response = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${fruitvalue}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": ApiKey,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const FruitData = 
      `<h1>Nom: ${data[0].name}</h1>
        <p>Sugar:${data[0].sugar_g}</p>
      `

        document.getElementById("Fruit").innerHTML += FruitData;
    });
};


//   .then(data => console.log(data));
// const ApiKey = "BlTQnbqdr3mjHb0gOvKxYDUlEPzrqUaOTeqOZInr"; // enlever

// const fruit = async () => {
//   const fruitvalue = document.getElementById("placeholder").value;

//   const response = await fetch(
//     `https://api.api-ninjas.com/v1/nutrition?query=${fruitvalue}`,
//     {
//       method: "GET",
//       headers: {
//         "X-Api-Key": ApiKey,
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);

//       const FruitData = 
//       `<h1>${data[0].name}</h1>`
//         document.getElementById("Fruit").innerHTML += JSON.stringify(data[0]);
//     });
// };


// //   .then(data => console.log(data));
