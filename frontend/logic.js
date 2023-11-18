let data = [
  [
    0.04144209, 0.6360988, -1.21014334, 0.9760291, 0.87313081, -0.18183135,
    -0.35326395, -0.37863569, 0.16349912, 1.00147735, 0.29284937, 0.99963356,
    -0.47820093, -0.43184835, -0.44521995, -0.44593596, -0.46452621, 2.4001287,
  ],
];

function send(data1) {
  let allDataUrl = "http://127.0.0.1:5000/input";

  // sending data
  d3.json(allDataUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(function (response) {
    // let data = response;
    console.log(response);
  });
}
