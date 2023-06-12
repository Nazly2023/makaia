// import { products } from "./dataProducts.js";
const URL_API = "http://localhost:3000";
let favorites = [];

// Capturar el contenedor donde se aloja la info de c/producto
const productsFavorites = document.getElementById("productFavo");

const getFavorites = async () => {
  try {
    const endpoint = "/favorites";
    const resp = await fetch(`${URL_API}${endpoint}`);
    const response = await resp.json();
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getFavorite = async (id) => {
  try {
    const endpoint = "/favorites/" + id;
    const resp = await fetch(`${URL_API}${endpoint}`);

    if (resp.ok) {
      const response = await resp.json();
      return response;
    } else {
      return { error: "No encontrado", status: resp.status };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addFavorite = async (body) => {
  const endpoint = "/favorites/";
  console.log(JSON.stringify(body));
  const resp = await fetch(`${URL_API}${endpoint}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  if (resp.ok) {
    alert("Producto Agregado");
  } else {
    alert("Producto no Agregado");
  }
};

const deleteFavorite = async (id) => {
  const endpoint = "/favorites/" + id;
  const resp = await fetch(`${URL_API}${endpoint}`, {
    method: "DELETE",
  });
  if (resp.ok) {
    alert("Producto eliminado");
  } else {
    alert("Producto no eliminado");
  }
};

let printFavorites = (products, productsFavorites) => {
  // recibe la lista de propductos y el contenedor donde se adjuntara c/u de los productos
  productsFavorites.innerHTML += "";
  products.forEach((product) => {
    productsFavorites.innerHTML += `
        <article class = 'cardFavorites'>
        <figure class = 'cardFigureFavo'>
        <img src=${product.image} alt=${product.nomProducto}>
        <section class ='cardBodyFavorite'>
            <span class ='cardNomFavorite'>${product.nomProducto}</span>
            <span class ='cardPriceFavorite'>$${Number(
              product.costoCOP
            ).toLocaleString()}</span>
        </figure>
        <div class='addProducts'>
            <button class = 'btnAddCart' id = "btnAddCart${
              product.id
            }">Agregar</button>
            <button class = 'btnSprCart' id = "btnSprCart${
              product.id
            }">x</button>
        </div>
        </section>
        </article>`;
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  favorites = await getFavorites();
  printFavorites(favorites, productsFavorites);
});

export { getFavorite, getFavorites, deleteFavorite, addFavorite };
