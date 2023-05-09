const ApiKey = "BlTQnbqdr3mjHb0gOvKxYDUlEPzrqUaOTeqOZInr"; // enlever

const fruit = async () => {
  const fruitvalue = window.getSelection().toString();
  // Fetch the data from the Api
  const response = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${fruitvalue}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": ApiKey,
        "Content-Type": "application/json",
      },
    }
  );
  // If error occurs return Error
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // Manage the data and return a new div with the data
  if (data.length > 0) {
    const FruitData = `<div class="FruitData">
                      <p>Gramme: ${data[0].serving_size_g}</p>
                       <p>Sugar: ${data[0].sugar_g}</p>
                       <p>Calories: ${data[0].calories}</p>
                       <p>Protein: ${data[0].protein_g}</p>
                       <p>Fibre: ${data[0].fiber_g}</p>             
                       </div>`;
    // Check if a div element with class FruitData already exists
    const existingFruitData = document.querySelector(".FruitData");
    if (!existingFruitData) {
      const selection = window.getSelection();
      // checks if it is not an empty string using the !selection.isCollapsed statement.
      // it creates a new div element using the document.createElement("div")
      if (!selection.isCollapsed) {
        // the code obtains the selected range using selection.getRangeAt(0)
        const range = selection.getRangeAt(0);
        // and inserts the new div element into the document using the
        // range.insertNode(newNode)
        const newNode = document.createElement("div");
        newNode.innerHTML = FruitData;
        range.insertNode(newNode);

        // Add a mouseout event listener to the inserted element
        newNode.addEventListener("mouseleave", () => {
          newNode.remove();
        });
      }
    }
  }
};
// When i mouseup a word get the new div from the function above
document.addEventListener("mouseup", async () => {
  const fruitvalue = window.getSelection().toString();
  if (fruitvalue) {
    await fruit();
  }
});
