'use strict';

const addCarForm = document.querySelector('#addCar');
const searchCarForm = document.querySelector('#searchForm');
const cars = [];

class Car {
  constructor(licence, maker, model, owner, price, color) {
    this.licence = licence;
    this.maker = maker;
    this.model = model;
    this.owner = owner;
    this.price = parseFloat(price).toFixed(2); // Ensure price is always a float
    this.color = color;
  }
}

const displayTable = () => {
  const tbody = document.querySelector('#carsTable tbody');
  tbody.innerHTML = '';

  cars.forEach((car) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${car.licence}</td>
      <td>${car.maker}</td>
      <td>${car.model}</td>
      <td>${car.owner}</td>
      <td>${car.price} €</td>
      <td><div style="width: 20px; height: 20px; background-color: ${car.color};"></div></td>
    `;
    tbody.appendChild(row);
  });
};

const addCar = (e) => {
  e.preventDefault();

  const licence = document.querySelector('#licence').value.trim();
  const maker = document.querySelector('#maker').value.trim();
  const model = document.querySelector('#model').value.trim();
  const owner = document.querySelector('#owner').value.trim();
  const price = document.querySelector('#price').value.trim();
  const color = document.querySelector('#color').value;

  if (!licence || !maker || !model || !owner || !price) {
    alert('All fields are required!');
    return;
  }

  cars.push(new Car(licence, maker, model, owner, price, color));
  displayTable();
  addCarForm.reset();
};

const searchCar = (e) => {
  e.preventDefault();
  const searchValue = document.querySelector('#search').value.trim().toLowerCase();
  const display = document.querySelector('#searchResult');

  if (!searchValue) {
    display.textContent = 'Please enter a licence plate to search.';
    return;
  }

  const foundCar = cars.find((car) => car.licence.toLowerCase() === searchValue);

  if (foundCar) {
    display.innerHTML = `Löytyi: <span style="color: black;">${foundCar.maker}, ${foundCar.model}, Owner: ${foundCar.owner}, Price: ${foundCar.price}</span>`;
  } else {
    display.textContent = 'Tälläistä rekisterinumeroa ei ole';
    display.style.color = 'black';
  }
};

addCarForm.addEventListener('submit', addCar);
searchCarForm.addEventListener('submit', searchCar);