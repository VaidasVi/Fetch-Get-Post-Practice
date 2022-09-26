const state = {};

const displayProperties = (properties) => {
  const propertiesContainer = document.getElementById("properties-container");
  propertiesContainer.innerHTML = "";

  properties.forEach((propertie) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.setAttribute("src", propertie.image);

    const container = document.createElement("div");
    container.classList.add("container");

    const price = document.createElement("h2");
    price.classList.add("price");
    price.innerText = propertie.price;

    const city = document.createElement("p");
    city.innerText = propertie.city;

    const describtion = document.createElement("p");
    describtion.innerText = propertie.description;

    container.append(price, city, describtion);
    card.append(img, container);

    propertiesContainer.append(card);
  });
};

const generateFilterButtons = (buttons) => {
  const filterContainer = document.getElementById("filters-container");
  console.log(buttons);
  // const uniqueValues = buttons.reduce((a, v) => {
  //   let i = a.findIndex((el) => el.city === v.city);
  //   if (i !== -1) {
  //     a.splice(i, 1);
  //     return a;
  //   }
  //   a.push(v);
  //   return a;
  // }, []);

  const uniqueValues = [...new Set(buttons.map((item) => item.city))]; // [ 'A', 'B']

  console.log(uniqueValues);

  uniqueValues.forEach((button) => {
    const filterButton = document.createElement("button");

    filterButton.classList.add("filter-button");
    filterButton.setAttribute("id", "filter");
    filterButton.setAttribute("value", button);
    filterButton.innerText = button;

    filterButton.addEventListener("click", (event) => {
      document.querySelectorAll("#filter").forEach((a) => {
        a.classList.remove("filter-button-selected");
      });
      event.target.classList.add("filter-button-selected");
      displayProperties(
        state.properties.filter((city) =>
          city.city.includes(event.target.value)
        )
      );
    });

    filterContainer.append(filterButton);
  });
};

// const only = document
//   .querySelector("#filter")
//   .addEventListener("click", (event) => {
//     event.target.classList.add("filter-button-selected");
//     displayProperties(
//       state.properties.filter((city) => city.city.includes(event.target.value))
//     );
//   });

const getPropertyList = async () => {
  try {
    const response = await fetch("https://robust-safe-crafter.glitch.me");
    state.properties = await response.json();
    generateFilterButtons(state.properties);
    displayProperties(state.properties);
  } catch (error) {
    console.log(error);
  }
};

getPropertyList();
