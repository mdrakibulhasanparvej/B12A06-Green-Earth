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
  manageloading(true);
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
      manageloading(false);
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
                <h2 id="${gridCard.id}" onclick="loadPlantDetails(${gridCard.id})" class="card-title lg:text-sm">${gridCard.name}</h2>
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

// // card function start

const cart = [];

document.getElementById("plant-container").addEventListener("click", (e) => {
  if (e.target.innerText === "Add to Cart") {
    cartHandler(e);
  }
});

const cartHandler = (e) => {
  const title = e.target.parentNode.children[0].innerText;
  const id = e.target.parentNode.children[0].id;
  const price = parseFloat(
    e.target.parentNode.children[2].children[1].innerText
  );

  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }

  showCart();
  showToast(`${title} added to cart`);
};

const showCart = () => {
  const cartContainer = document.getElementById("cartConatiner");
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const newElement = document.createElement("div");

    newElement.innerHTML = `
      <div class="flex justify-between items-center p-3 rounded-xl bg-[#15803c22] mb-3">
        <div class="space-y-2">
          <h2 class="lg:text-sm">${item.title} </h2>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${
            item.price * item.quantity
          } <span class="text-sm text-gray-500">x${item.quantity}</span></p>
        </div>
        <i class="fa-solid fa-xmark cursor-pointer" onclick="removeItem(${index})"></i>
      </div>
    `;
    cartContainer.append(newElement);
  });

  updateTotal();
};

const removeItem = (index) => {
  const item = cart[index];
  if (item.quantity > 1) {
    item.quantity -= 1;
    showToast(`${item.title} removed`);
  } else {
    cart.splice(index, 1);
    showToast(`${item.title} removed completely`);
  }
  showCart();
};

const updateTotal = () => {
  const totalSection = document.getElementById("total");
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalSection.innerHTML = `
  <h2 class="font-bold py-5 p-3 ">Total: <span>৳${totalPrice}</span></h2>
  `;
};

const clearCart = () => {
  cart.length = 0;
  showCart();
  showToast("Cart cleared!");
};

const showToast = (message) => {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.className =
    "fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1000);
};

// // card function end
