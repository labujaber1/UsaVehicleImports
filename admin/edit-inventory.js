// PROOF OF CONCEPT NOT PRODUCTION SETUP

// using json file
//var carData = [];
var cars = [];
// DATA DISPLAYED WHEN PAGE ONLOAD ##
// display all vehicles in cards in index position id vehicle-list
// clear vehicle-list and reload when new one added, edited, deleted etc


/*document.addEventListener("DOMContentLoaded", function() {
  const dbFile = "/admin/vehicle-db.json";
  alert("addEventListener start: " + JSON.stringify(carData));
  fetch(dbFile)
    // set as json file
    .then(response => response.json())
    // set data to be processed to global var
    .then(data => {
      carData = data;
      
      alert("fetch carData: " + JSON.stringify(carData));
      drawHomeGallery(carData);
      renderAdminCarList(carData);
      alert("after drawHomeGallery in fetch carData: " + JSON.stringify(carData));
    })
    .catch(error => {
      console.log("Error fetching ", error);
      alert("Error fetching json data", error);
    });
    alert("addEventListener end: " + carData.tostring());
});*/
 
/*document.addEventListener("DOMContentLoaded", async function() {
//async function getData() {
  alert("start async"+ JSON.stringify(carData));
  const dbFile = "/admin/vehicle-db.json";
  
  const response = await fetch(dbFile);
  if (!response.ok) {
    throw new Error(`Failed to fetch data (HTTP ${response.status})`);
  }
  
  const data = await response.json();
  
  carData = data;
  alert("home"+ JSON.stringify(carData));
  //drawHomeGallery(carData);
  alert("admin"+ JSON.stringify(carData));
  renderAdminCarList(carData);
  alert("end async"+ JSON.stringify(carData));
});*/

// draw gallery cards on home page dynamically using global db with base data 
// and changed data without changing original json file
document.addEventListener("DOMContentLoaded", function() {
//function drawHomeGallery(cars) {
  alert("drawHomeGallery start: " + JSON.stringify(carData));

  const dbFile = "/admin/vehicle-db.json";
  const vehicleList = document.getElementById('vehicle-list');
  vehicleList.innerHTML = '';

  alert("addEventListener start: " + JSON.stringify(carData));
  fetch(dbFile)
    // set as json file
    .then(response => response.json())
    // set data to be processed to global var
    .then(cars => {
      //carData = data;
      //cars = data;
      //alert("fetch carData: " + JSON.stringify(carData));
      //drawHomeGallery(carData);
      //renderAdminCarList(carData);
      alert("after drawHomeGallery in fetch carData: " + JSON.stringify(carData));
    
  
  
  
    // process data
    cars.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("col");
      
      const images = item.images.map((imageSrc, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <img src="${imageSrc}" class="d-block w-100 " alt="${item.name}">
        </div>
      `).join("");

      const indicators = item.images.map((_, index) => `
          <button
            type="button"
            data-bs-target="#carousel-${item.id}"
            data-bs-slide-to="${index}"
            class="${index === 0 ? 'active' : ''}"
            aria-current="${index === 0 ? 'true' : 'false'}"
            aria-label="Slide ${index + 1}"
          ></button>
        `).join("");


      card.innerHTML = `
      <div class="card shadow h-100">
        <div class="card-img-top">
          <div id="carousel-${item.id}" class="carousel slide carousel-fade" 
            data-bs-ride="carousel">
            <div class="carousel-inner">           
                ${images}                   
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${item.id}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${item.id}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
          
            <div class="carousel-indicators">
              ${indicators}
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">Price: $${item.price.toFixed(2)}</p>
          <p class="card-text">Availability: ${item.availability}</p>
          <p class="card-text">${item.description}</p>
        </div>
      </div>
    `; 
      vehicleList.appendChild(card);
      
    });
  })
  .catch(error => {
    console.log("Error fetching ", error);
    alert("Error fetching json data", error);
  });
    alert("drawHomeGallery end: " + JSON.stringify(carData));
});


// ADMIN PAGE LOGIC ##

// edit and delete vehicle details
 // Display car data from json file to cards dynamically
 document.addEventListener("DOMContentLoaded", function() { 
//function renderAdminCarList(cars) {
  alert("renderAdminCarList start: " + carData.tostring());

  const dbFile = "/admin/vehicle-db.json";
  const carList = document.getElementById('carList');
  alert("addEventListener start: " + JSON.stringify(carData));
  fetch(dbFile)
    // set as json file
    .then(response => response.json())
    // set data to be processed to global var
    .then(data => {
      //carData = data;
      cars = data;
      //alert("fetch carData: " + JSON.stringify(carData));
      //drawHomeGallery(carData);
      //renderAdminCarList(carData);
      alert("after drawHomeGallery in fetch carData: " + JSON.stringify(carData));
    

  
  alert("1");
  cars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.classList.add('col-md-6', 'mb-4');
    alert("2");
    const image = document.createElement('img');
    image.src = car.images[0];
    image.classList.add('img-fluid');
    alert("3");
    const id = document.createElement('h4');
    id.textContent =`Car Id number: ${car.id.toFixed(0)}`;
    alert("4");
    const name = document.createElement('h2');
    name.textContent = car.name;
    alert("5");
    const price = document.createElement('p');
    price.textContent = `Price: $${car.price.toFixed(2)}`;
    alert("6");
    const availability = document.createElement('p');
    availability.textContent = `Availability: ${car.availability}`;
    alert("7");
    const description = document.createElement('p');
    description.textContent = car.description;
    alert("8");
    // Add Edit and Delete buttons
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('d-flex', 'justify-content-end', 'mt-2');
    alert("9");
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary', 'me-2');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editCar(car.id));
    alert("10");
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteCar(car.id));
    alert("11");
    carCard.appendChild(image);
    carCard.appendChild(id);
    carCard.appendChild(name);
    carCard.appendChild(price);
    carCard.appendChild(availability);
    carCard.appendChild(description);
    alert("12");
    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);
    carCard.appendChild(buttonGroup);
    alert("13");
    carList.appendChild(carCard);
    alert("renderAdminCarList end: " + JSON.stringify(carData));
  });    
})
.catch(error => {
  console.log("Error fetching ", error);
  alert("Error fetching json data", error);
});
});

  

// edit and delete button logic
function editCar(carId) {
  alert("Edit button pressed");
  const carToEdit = carData.find(car => car.id === carId);
  if (carToEdit) {
    const updatedName = prompt('Enter updated car name:', carToEdit.name);
    if (updatedName !== null) {
      carToEdit.name = updatedName;
      renderAdminCarList(carData);
    }
  }
}

function deleteCar(carId) {
  alert("Delete button pressed");
  const carToDeleteIndex = carData.findIndex(car => car.id === carId);
  if (carToDeleteIndex !== -1) {
    if (confirm('Are you sure you want to delete this car?')) {
      carData.splice(carToDeleteIndex, 1);
      renderAdminCarList(carData);
    }
  }
}

// add new vehicle
function addCar() {
  alert("Add car button pressed");
  // stops form submitting automatically.
  //event.preventDefault();
  
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const availability = document.getElementById('availability').value;
  const description = document.getElementById('description').value;
  const images = document.getElementById('images').value.split(',');
  
  alert("2nd car add alert");
  var newCar = [];
  // create object to add to file
  newCar = {
    id: carData.length + 1, // Assign a unique ID
    name: name,
    price: price,
    availability: availability,
    description: description,
    images: images.map(image => image.trim()), // Trim URLs
  };
  
  //confirms new data taken from form
  alert("3rd alert-> "+JSON.stringify(newCar));
  // add new data to original data read from json file to carData array
  carData.push(newCar);
  // confirms new data added to original data
  alert("4th alert Updated carData: " + JSON.stringify(carData));
  // update carData to json file


  
  renderAdminCarList(carData);
  document.getElementById('addCarForm').reset();
}

