import {
  getFavorite,
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "./favorites.js";

import { addCar, deleteCar, getCar } from "./dataShopCart.js";

const URL_API = "http://localhost:3000";
let products = [];

// Capturar el contenedor donde se aloja la info de c/producto
const productsCards = document.getElementById("productsCards");

// Petición GET
const getProducts = async (url) => {
  try {
    const endpoint = "/products";
    const resp = await fetch(`${URL_API}${endpoint}`);
    const response = await resp.json();

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getProduct = async (id) => {
  try {
    const endpoint = "/products/" + id;
    const resp = await fetch(`${URL_API}${endpoint}`);
    const response = await resp.json();

    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};

let printProducts = async (products, productsCards) => {
  // recibe la lista de propductos y el contenedor donde se adjuntara c/u de los productos
  productsCards.innerHTML += "";
  await products.forEach((product) => {
    productsCards.innerHTML += `
    <article class = 'card'>
      <figure class = 'cardFigure'>
      <img src=${product.image} alt=${product.nomProducto}>
      <section class ='cardBody'>
        <span class ='cardType'>${product.tipoProducto}</span>
        <span class ='cardNom'>${product.nomProducto}</span>      
        <span class ='cardCant'>${product.cant} ${product.unid_cant}</span>
        <span class ='cardPrice'>$${Number(
          product.costoCOP
        ).toLocaleString()}</span>
      </figure>
      <span class="material-symbols-outlined" id='favorites${product.id}'>
favorite
</span>
     
      <div class='addProducts'>         
        <span class ='quantity' id ="quantity${product.id}">0</span>
        <button  class = 'btnSpr' id = "btnSpr${product.id}">-</button>
        <button class = 'btnAdd' id = "btnAdd${
          product.id
        }" type="button">+</button>
      </div>
      </section>
    </article>`;
  });
};

// Ejecutar la función creada en la línea 3, mediante una invocación
document.addEventListener("DOMContentLoaded", async (e) => {
  products = await getProducts(URL_API);
  // console.log(products);
  await printProducts(products, productsCards);
  products.forEach(async (product) => {
    const btnAdd = document.getElementById(`btnAdd${product.id}`);
    const numberQuantity = document.getElementById(`quantity${product.id}`);
    const car = await getCar(product.id);
    numberQuantity.innerHTML = car.cantidad;
    const btnSpr = document.getElementById(`btnSpr${product.id}`);
    btnAdd.addEventListener("click", async (e) => {
      e.preventDefault();
      await addCar(product.id);
      return false;
    });
    btnSpr.addEventListener("click", async (e) => {
      e.preventDefault();
      await deleteCar(product.id);
      return false;
    });
    const favoriteElement = document.getElementById(`favorites${product.id}`);
    favoriteElement;
    favoriteElement.addEventListener("click", async (e) => {
      e.preventDefault();
      const favorite = await getFavorite(product.id);
      if ("id" in favorite) {
        deleteFavorite(product.id);
      } else {
        addFavorite(product);
      }
    });
  });

  const countLike = document.getElementById(`countLike`);
  const favorites = await getFavorites();
  countLike.innerHTML = favorites.length;
});
// const FULL_DASH_ARRAY = 283;
// const WARNING_THRESHOLD = 10;
// const ALERT_THRESHOLD = 5;

// const COLOR_CODES = {
//   info: {
//     color: "green",
//   },
//   warning: {
//     color: "orange",
//     threshold: WARNING_THRESHOLD,
//   },
//   alert: {
//     color: "red",
//     threshold: ALERT_THRESHOLD,
//   },
// };

// const TIME_LIMIT = 259200;
// let timePassed = 0;
// let timeLeft = TIME_LIMIT;
// let timerInterval = null;
// let remainingPathColor = COLOR_CODES.info.color;

// document.getElementById("temporal").innerHTML = `
// <div class="base-timer">
//   <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//     <g class="base-timer__rectangle">
//       <rectangle class="base-timer__path-elapsed" cx="50" cy="10" r="90"></rectangle>
//       <path
//         id="base-timer-path-remaining"
//         stroke-dasharray="283"
//         class="base-timer__path-remaining ${remainingPathColor}"
//         d="
//           M 50, 50
//           m -45, 0
//           a 45,45 0 1,0 90,0
//           a 45,45 0 1,0 -90,0
//         "
//       ></path>
//     </g>
//   </svg>
//   <span id="base-timer-label" class="base-timer__label">${formatTime(
//     timeLeft
//   )}</span>
// </div>
// `;

// startTimer();

// function onTimesUp() {
//   clearInterval(timerInterval);
// }

// function startTimer() {
//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1;
//     timeLeft = TIME_LIMIT - timePassed;
//     document.getElementById("base-timer-label").innerHTML =
//       formatTime(timeLeft);
//     setrectangleDasharray();
//     setRemainingPathColor(timeLeft);

//     if (timeLeft === 0) {
//       onTimesUp();
//     }
//   }, 1000);
// }

// function formatTime(time) {
//   const days = Math.floor(time / 24);
//   const hours = Math.floor(time / 3600);
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;

//   if (seconds < 10) {
//     seconds = `0${seconds}`;
//   }
//   // return `${minutes}:${seconds}`;
//   return `${days}:${hours}:${minutes}:${seconds}`;
// }

// function calculateTimeFraction() {
//   const rawTimeFraction = timeLeft / TIME_LIMIT;
//   return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
// }

// function setrectangleDasharray() {
//   const rectangleDasharray = `${(
//     calculateTimeFraction() * FULL_DASH_ARRAY
//   ).toFixed(0)} 283`;
//   document
//     .getElementById("base-timer-path-remaining")
//     .setAttribute("stroke-dasharray", rectangleDasharray);
// }
