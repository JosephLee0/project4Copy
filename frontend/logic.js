let danceability = d3.select("#input1");
let submit = d3.select("#predict");
let chartDisplay = d3.select("#chart-display");
let overlay = d3.select("#overlay");
let modal = d3.select("#modal");
let mainPage = d3.select("#mainPage");
let formPage = d3.select("#form-page");
let givenName = d3.select("#givenName");
let userInput = document.getElementById("user-info-div");

let userName;

function saveName() {
  userName = d3.select("#name").property("value");
  modal.html(`<div class="disclaimer">
  <h1 style="color: red">DISCLAIMER</h1>
  <br />
  <p style="width: 80%; color: black">
    Welcome <span style="font-weight: bold">${userName}</span>, Please note that this is just a predictive
    model with 72.5% accuracy. This model does not guaranteed the
    performance of your track in real word. By clicking continue you
    agreed with the T&C of this model.
  </p>
  <br />
  <button onclick="swapMainPage(mainPage, overlay)">Continue</button>
</div>`);
}

function swapMainPage(on, off) {
  givenName.html(`<h1>You are alomost there ${
    userName ? userName.split(" ")[0] : "!!"
  }</h1>
  <h2>Fill the form to make prediction</h2>`);
  off.classed("hidden", true);
  on.classed("hidden", false);
}

function whichChart(genreName) {
  swapMainPage(chartDisplay, formPage);
  chartDisplay.html(`<div id="text-div">
    <div>
      <h1>
        Here is a chart of a typical popular and unpopular ${genreName}
        Music.
      </h1>
    </div>
  </div>
  <div id="genre-pics" class="user-info-div">
    <div>
      <img src="chart Images/${genreName.toLowerCase()}-1.png" alt="chart-image" />
    </div>
    <div>
      <img src="chart Images/${genreName.toLowerCase()}-2.png" alt="second Image" />
    </div>
  </div>

  <div id="back" class="predict">
    <button id="close-chart" onclick="swapMainPage(formPage, chartDisplay)">Go Back to Predict</button>
  </div>`);
}

function displayResult(user, result) {
  swapMainPage(overlay, mainPage);
  let html;
  if (result == 1) {
    html = `<div class="result">
  <h1>Cogratulations ${user}</h1>
  <br />
  <h2>Your track is likely to be populare</h2>
  <br /><br />`;
  } else {
    html = `<div class="result">
  <h1>ooops ${user}</h1>
  <br />
  <h2>Your track is not likely to be populare</h2>
  <br /><br />`;
  }
  modal.html(`${html}
  <p>We had recomend you put more effort on</p>
  <ul>
    <li><h3>Loudness</h3></li>
    <li><h3>Energy</h3></li>
    <li><h3>Tempo</h3></li>
    <li><h3>Duration</h3></li>
    <li><h3>danceability</h3></li>
  </ul>
  <p>
    As they are the top 5 most importand factors 
    that determine the popularity of a song.
  </p><br /><br /><br />
  <button onclick="swapMainPage(mainPage, overlay)">Go Back</button>
</div>`);
}

submit.on("click", function () {
  let allInput = userInput.querySelectorAll("input");
  let genre = d3.select("#selDataset").property("value");
  let input = [];
  allInput.forEach((ele) => {
    input.push(ele.value);
  });

  if (input.includes("")) {
    alert("please fill all fields");
    return;
  }
  input.push(genre);
  send(input, userName);
});

function dummy(dataArr) {
  let genre = dataArr[dataArr.length - 1].toLowerCase();
  let data;
  switch (genre) {
    case "edm":
      data = "100000";
      break;
    case "latin":
      data = "010000";
      break;
    case "pop":
      data = "001000";
      break;
    case "r&b":
      data = "000100";
      break;
    case "rap":
      data = "000010";
      break;
    case "rock":
      data = "000001";
      break;
    default:
      data = "000000";
  }
  dataArr.splice(-1);
  newArr = dataArr.concat(data.split(""));
  dataArr = newArr.map((ele) => +ele);
  return dataArr;
}

function send(inputValue, user) {
  let allDataUrl = "http://127.0.0.1:5000/input";
  let usedD = [];
  inputValue = dummy(inputValue);
  usedD.push(inputValue);
  // sending data
  d3.json(allDataUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usedD),
  }).then(function (response) {
    displayResult(user, response[0].value);
  });
}
