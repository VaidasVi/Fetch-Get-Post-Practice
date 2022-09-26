const baseURL = "https://robust-safe-crafter.glitch.me";

const generateMsg = (msg) => {
  const statusMessages = document.getElementById("statusMessages");

  const message = document.createElement("h3");
  message.innerText = msg.msg;

  const goBack = document.createElement("a");
  goBack.classList.add("button3");
  goBack.setAttribute("href", "index.html");
  goBack.innerText = "Go Back To List";

  statusMessages.append(message);
  statusMessages.append(goBack);
};

addPropertyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.dir(addPropertyForm);

  const newPropertie = {
    image: addPropertyForm.image.value,
    city: addPropertyForm.city.value,
    price: addPropertyForm.price.value,
    description: addPropertyForm.description.value,
  };

  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPropertie),
    });
    const message = await response.json();
    console.log(message);
    generateMsg(message);
  } catch (error) {
    console.log(error);
  }
});
