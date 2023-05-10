const API_KEY = "BlTQnbqdr3mjHb0gOvKxYDUlEPzrqUaOTeqOZInr"; //Not secure yet
const isFoodGood = (food) => {
  // Check if the food item is low in added sugars and unhealthy fats
  if (food['fat_saturated_g'] > 5 || food['sugar_g'] / food['serving_size_g'] > 0.2) {
      return false;
  }

  // Check if the food item is safe and free from contaminants
  if (food['sodium_mg'] > 2300 || food['cholesterol_mg'] > 300) {
      return false;
  }

  // If all False food is healthy

  return true;
}
const fruit = async () => {
  const fruitValue = window.getSelection().toString();
  // Fetch the data from the Api
  const response = await fetch(
    `https://api.api-ninjas.com/v1/nutrition?query=${fruitValue}`,
    {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  // If error occurs return Error
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }


  const data = await response.json();
   // Get the first food item from the data
   const food = data[0];

   // Check if the food is healthy or not
   const isHealthy = isFoodGood(food);

   // Set the emoji to display based on the healthiness of the food
   const emoji = isHealthy ? '😊' : '🥶';
  // Manage the data and return a new div with the data
  if (data.length > 0) {
    const fruitData =`<div class="fruit-data">
    <p>Name: ${data[0].name} </p>
    <p>Gramme: ${data[0].serving_size_g}</p>
     <p>Sugar: ${data[0].sugar_g}</p>
     <p>Calories: ${data[0].calories}</p>
     <p>Protein: ${data[0].protein_g}</p>
     <p>Fibre: ${data[0].fiber_g}</p>  
     <p>isThisGood: ${emoji}</p>           
     </div>`;
    // Check if a div element with class fruit_data already exists
    const existingfruit_data = document.querySelector(".fruit-data");
    if (!existingfruit_data) {
      const selection = window.getSelection();

      if (!selection.isCollapsed) {
        const range = selection.getRangeAt(0);

        const newNode = document.createElement("span");
        newNode.innerHTML = fruitData;

        // calculate the position of the selection relative to the document
        // This line gets the position of a selected text range 
        const rect = range.getBoundingClientRect();
        // The first line uses window.pageYOffset to get the vertical scroll position,
        // while the second line uses window.pageXOffset to get the horizontal scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        // hese lines calculate the absolute position of the selected text range by 
        //adding its top and left coordinates (relative to the viewport) to the current scroll position.
        const top = rect.top + scrollTop;
        const left = rect.left + scrollLeft;

        // position the new div element next to the selected word
        //The second and third lines set the top and left CSS properties of
        //  the <div> element to the calculated values, positioning it next to the 
        //  selected text range. The + "px" part converts the position values 
        //  to strings with "px" appended, which is the required format for CSS.
        newNode.style.position = "absolute";
        newNode.style.top = top + "px";
        newNode.style.left = left + "px";

        document.body.appendChild(newNode);

        newNode.addEventListener("mouseleave", () => {
          newNode.remove();
        });
      }}
  }
};

// When i mouseup a word get the new div from the function above
document.addEventListener("mouseup", async () => {
  const fruitValue = window.getSelection().toString();
  if (fruitValue) {
    await fruit();
  }
});
