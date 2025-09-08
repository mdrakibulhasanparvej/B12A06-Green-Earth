const loader = document.getElementById("loader");
const manageloading = (status) => {
  status
    ? [
        loader.classList.add("flex"),
        loader.classList.remove("hidden"),
        document.getElementById("plant-container").classList.add("hidden"),
      ]
    : [
        loader.classList.add("hidden"),
        loader.classList.remove("flex"),
        document.getElementById("plant-container").classList.remove("hidden"),
      ];
};

const loadAllTree = () => {
  manageloading(true);
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dsplplantLoadbyCatagry(data.plants);
    })
    .finally(() => {
      manageloading(false);
    });
};

loadAllTree();

const loadCatagory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayLoadCatagory(data.categories));
};

const activeBtnRemoveAlltree = () => {
  const activeBtnsalltree = document.getElementById("all-tree-btn");
  console.log(activeBtnsalltree);
  activeBtns.forEach((btn) => btn.classList.remove("active"));
};
const activeBtnRemove = () => {
  const activeBtns = document.querySelectorAll(".catagory-btns");
  activeBtns.forEach((btn) => btn.classList.remove("active"));
};

const plantLoadbyCatagry = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  console.log(url);
  fetch(url)
    .then((tree) => tree.json())
    .then((json) => {
      activeBtnRemove();
      const clickActive = document.getElementById(`catagory-btn-${id}`);
      //   console.log(clickActive);
      clickActive.classList.add("active");
      dsplplantLoadbyCatagry(json.plants);
    });
};

const loadPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  dsplyloadPlantDetails(details.plants);
};

const dsplyloadPlantDetails = (word) => {
  const plantDetail = document.getElementById("plant-details-container");
  plantDetail.innerHTML = `
        <div>
            <div class="card bg-base-100 w-full h-full shadow-sm">
                <div class="card-body p-3 pt-0">
                    <h2 onclick="loadPlantDetails(${word.id})" class="card-title pt-3 ">${word.name}</h2> 
                </div> 
                <div class="p-3 rounded-xl">
                    <img
                    class="rounded-xl w-[100%] h-[150px] object-cover object-center"
                    src="${word.image}"
                    alt=""
                    />
                </div>
                <div class="card-body p-3 pt-0">
                    <h2 class=" pt-3 text-sm"><span class="font-bold">Category:</span> ${word.category}</h2> 
                </div> 
                <div class="card-body p-3 pt-0">
                    <h2 class=" text-sm"><span class="font-bold">Price:</span> <i class="fa-solid fa-bangladeshi-taka-sign"></i>${word.price}</h2> 
                </div>
                <div class="card-body p-3 pt-0">
                    <p class="lg:text-[10px] text-gray-600"><span class="font-bold">Description:</span> ${word.description}</p>
                </div>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
        </div>
  `;

  document.getElementById("my_modal").showModal();
};

const dsplplantLoadbyCatagry = (loadCard) => {
  // manageloading(true);
  // 1.get the container & empty
  const ldedPlantContainer = document.getElementById("plant-container");
  ldedPlantContainer.innerHTML = "";
  //2.get into every Plant into grid
  for (let gridCard of loadCard) {
    // 3.create card into gird
    const cardCreate = document.createElement("div");
    cardCreate.innerHTML = `
            <div class="card bg-base-100 w-full h-full lg:w-50 shadow-sm">
              <div class="p-3 rounded-xl">
                <img class="rounded-xl w-[100%] h-[150px] object-cover object-center" src="${gridCard.image}" alt="" />
              </div>
              <div class="card-body p-3 pt-0">
                <h2 onclick="loadPlantDetails(${gridCard.id})" class="card-title lg:text-sm">${gridCard.name}</h2>
                <p class="lg:text-[10px] text-gray-600">
                  ${gridCard.description}
                </p>
                <div class="card-actions flex flex-row justify-between">
                  <div
                    class="badge badge-outline text-[#15803D] lg:text-[10px]"
                  >
                    ${gridCard.category}
                  </div>
                  <div class="badge"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${gridCard.price}</div>
                </div>
                <a class="btn bg-[#15803d] text-white rounded-full"
                  >Add to Cart</a
                >
              </div>
            </div>
        `;
    ldedPlantContainer.append(cardCreate);
  }
  // manageloading(false);
};

const displayLoadCatagory = (catagry) => {
  // 1.get the container & empty
  const loadCatagory = document.getElementById("catagory-container");
  loadCatagory.innerHTML = " ";
  //2.get into every Catagory
  for (let catagorys of catagry) {
    // 3.create element
    const ctgryBtn = document.createElement("div");
    ctgryBtn.innerHTML = `
        <button id="catagory-btn-${catagorys.id}" onclick="plantLoadbyCatagry(${catagorys.id})"
        class="btn btn-ghost hover:bg-[#15803D] hover:text-white justify-start catagory-btns w-full"> ${catagorys.category_name} 
        </button>
    `;
    loadCatagory.append(ctgryBtn);
  }
};
loadCatagory();

// card function start

const cart = [];

const ldedPlantContainer = document
  .getElementById("plant-container")
  .addEventListener("click", (e) => {
    if (e.target.innerText === "Add to Cart") {
      cartHandler(e);
    }
  });
const cartHandler = (e) => {
  console.log("card button clicked");
};

// card function end
