// fetch("/api/donutshop")
//   .then((response) => response.json())
//   .then((data) => console.log(JSON.stringify(data)));

// fetch("/api/customers")
//   .then((response) => response.json())
//   .then((data) => {
//     document.write(JSON.stringify(data));
//   });
  
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();

const userInput = (document
    .querySelector(`[name="donut"]`)
    .value).toLowerCase();
const newDonut = {
  "donut": userInput
}
  console.log(newDonut);
  fetch("/api/donutshop", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDonut),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log("Error"));
});

document.getElementById("find").addEventListener("click", (e) => {
  fetch("/api/donutshop")
    .then((data) => data.json(data))
    .then((data) => console.log(JSON.stringify(data)));
});
