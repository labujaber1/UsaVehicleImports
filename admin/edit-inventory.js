// PROOF OF CONCEPT NOT PRODUCTION SETUP
'use strict'

// using nodejs
const sqlite3 = require('sqlite3');
Database.verbose();
let dbPath = "./car_data.db";

// generate cards for home page on load
function generateCarCards() {
  
  alert("start generate car cards");
  // open single db conn pool
  let db = new sqlite3.Database(dbPath);
  //const vehicleList = document.getElementById('vehicle-list');
  //vehicleList.innerHTML = '';

  db.serialize(() => {
    // select all data and store in temp row array
    db.all('SELECT * FROM carImages', (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }

      // read array and create cards
      const carsHtml = rows.map((car) => {
        const images = car.images.split(',');
        const carouselItems = images.map((imageUrl, index) => {
          return `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${imageUrl}" class="d-block w-100" alt="${car.name}">
            </div>
          `;
        }).join('');

        return `
          <div class="card">
            <div id="carousel-${car.name}" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                ${carouselItems}
              </div>
              <a class="carousel-control-prev" href="#carousel-${car.name}" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carousel-${car.name}" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
            <div class="card-body">
              <h5 class="card-title">${car.name}</h5>
              <p class="card-text">${car.description}</p>
              <p class="card-text">Price: ${car.price}</p>
              <p class="card-text">Availability: ${car.availability}</p>
              <p class="card-text">Number of Images: ${images.length}</p>
            </div>
          </div>
        `;
      }).join('');

      const appendCarsToDOM = () => {
        const carsContainer = document.getElementById('vehicle-list');
        if (carsContainer) {
          carsContainer.innerHTML = carsHtml;
        }
      };

      appendCarsToDOM();
      // close connection
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
      });
    });
  });
}

// Listen for the DOMContentLoaded event and call the function
document.addEventListener('DOMContentLoaded', generateCarCards);




// DATA DISPLAYED WHEN PAGE ONLOAD ##
// display all vehicles in cards in index position id vehicle-list
// clear vehicle-list and reload when new one added, edited, deleted etc

// draw gallery cards on home page dynamically using global db with base data 
// and changed data without changing original json file


