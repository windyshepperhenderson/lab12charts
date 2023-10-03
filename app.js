// DOM Nodes by using CSS querySelector
let toyContainer = document.querySelector("section");

//HTML document ID
const image1 = document.getElementById("img1");
const image2 = document.getElementById("img2");
const image3 = document.getElementById("img3");

// make sure the user only has 25 clicks
let userVotes = 0;
const maxVotes = 25;

// keep each toy in an object - this uses are allToys container below
function Toy(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

// make the toys
const allToys = [
  new Toy("bag", "./images/bag.jpg"),
  new Toy("banana", "./images/banana.jpg"),
  new Toy("bathroom", "./images/bathroom.jpg"),
  new Toy("boots", "./images/boots.jpg"),
  new Toy("breakfast", "./images/breakfast.jpg"),
  new Toy("bubblegum", "./images/bubblegum.jpg"),
  new Toy("chair", "./images/chair.jpg"),
  new Toy("cthulhu", "./images/cthulhu.jpg"),
  new Toy("dog-duck", "./images/dog-duck.jpg"),
  new Toy("dragon", "./images/dragon.jpg"),
  new Toy("pen", "./images/pen.jpg"),
  new Toy("pet-sweep", "./images/pet-sweep.jpg"),
  new Toy("scissors", "./images/scissors.jpg"),
  new Toy("shark", "./images/shark.jpg"),
  new Toy("sweep", "./images/sweep.png"),
  new Toy("tauntaun", "./images/tauntaun.jpg"),
  new Toy("unicorn", "./images/unicorn.jpg"),
  new Toy("water-can", "./images/water-can.jpg"),
  new Toy("wine-glass", "./images/wine-glass.jpg"),
];

// function to choose a random toy
function getRandomIndex() {
  return Math.floor(Math.random() * allToys.length);
}

// function to render 3 random toys on the page (using the 3 img tags)
function renderToys() {
  // get 3 random indexes from our toy array
  let toy1Index = getRandomIndex();
  let toy2Index = getRandomIndex();
  let toy3Index = getRandomIndex();

  // prevent the 3 images being the same toy
  while (
    toy1Index === toy2Index ||
    toy1Index === toy3Index ||
    toy2Index === toy3Index
  ) {
    toy2Index = getRandomIndex();
    toy3Index = getRandomIndex();
  }

  // change the src and alt attributes of our img tags
  image1.src = allToys[toy1Index].src;
  image2.src = allToys[toy2Index].src;
  image3.src = allToys[toy3Index].src;
  image1.alt = allToys[toy1Index].name;
  image2.alt = allToys[toy2Index].name;
  image3.alt = allToys[toy3Index].name;

  // increase the toy views
  allToys[toy1Index].views++;
  allToys[toy2Index].views++;
  allToys[toy3Index].views++;
}

// handle what happens when the toy is being clicked
// the "clicks" property of the image I click to go up by one

function handleToyClick(event) {
  // check if the user has run out of clicks
  if (userVotes >= maxVotes) {
    //or - (userVotes === maxVotes)
    alert("See below for results.");
    renderChart();
    return; // Exit the function if the user has reached the limit
  }

  // get the name of the toy we just clicked
  let clickedToy = event.target.alt;

  // increase the clicks of the toy
  // loop through allToys
  for (let i = 0; i < allToys.length; i++) {
    // check if the name of the toy in the array, matches the alt tag of our image
    if (clickedToy === allToys[i].name) {
      // increase the number of clicks
      allToys[i].clicks++;
      // increment userVotes
      userVotes++;
      // stop the for loop because we found the goat

      break;
    }
  }

  renderToys();
}

renderToys();

// render the results
// when the user clicks the view results button
// render a ul full of lis that tell the user how many tiems each goat has been clicked

image1.addEventListener("click", handleToyClick);
image2.addEventListener("click", handleToyClick);
image3.addEventListener("click", handleToyClick);

// a button to view the results
// function showResults() {
//   // put a bunch of lis into a ul
//   const results = document.getElementById("results");

//   // loop through our products and make an li for each one
//   for (let i = 0; i < allToys.length; i++) {
//     const li = document.createElement("li");
//     const toy = allToys[i];
//     li.textContent = `${toy.name} was viewed ${toy.views} times, and clicked ${toy.clicks} times`;
//     results.appendChild(li);
//   }
// }

renderToys();

const labels = [];
const views = [];
const clicks = [];

// craete a function that make a chart
function renderChart() {
  // get where we are going to put the chart
  const ctx = document.getElementById("myChart"); // context of the chart
  for (let i = 0; i < allToys.length; i++) {
    labels.push(allToys[i].name);
    views.push(allToys[i].views);
    clicks.push(allToys[i].clicks);
  }

  // populate the arrays with data
  // TODO: ^

  // run the Chart function (that does the chart making)
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          borderWidth: 1,
        },
        {
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });

  renderChart();
}
