// app.js in /public directory

function askQuestion() {
  const question = document.getElementById("questionInput").value;
  const responseElement = document.getElementById("response");
  responseElement.innerHTML = '<span class="loading">Loading...</span>';

  fetch("/.netlify/functions/askQuestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  })
    .then((response) => response.json())
    .then((data) => {
      responseElement.innerText = data.answer; // Adjust based on your response structure
    })
    .catch((error) => {
      console.error("Error:", error);
      responseElement.innerText = "Error fetching response.";
    });
}

document
  .getElementById("questionInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      askQuestion();
    }
  });
