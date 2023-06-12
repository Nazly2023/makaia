// // Invocar el evento
// const formShopCart = document.getElementById("formShopCart");
// const formInfoClient = document.getElementById("formInfoClient");

// // Funciones de los eventos
// const saveShopping = (e) => {
//   e.preventDefault();
// };
// const saveClient = (e) => {
//   e.preventDefault();
//   const nomClient = document.getElementById("nom");
//   const addressClient = document.getElementById("address");
//   const phoneClient = document.getElementById("phone");
// };

// // Escuchar el evento
// formShopCart.addEventListener("submit", (event) => {
//   saveShopping(event);
// });

// formInfoClient.addEventListener("submit", (event) => {
//   saveClient(event);
// });
const URL_API = "http://localhost:3000";

export const getCart = async () => {
  try {
    const endpoint = "/car";
    const resp = await fetch(`${URL_API}${endpoint}`);
    const response = await resp.json();
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCar = async (id) => {
  try {
    const endpoint = "/car/" + id;
    const resp = await fetch(`${URL_API}${endpoint}`);

    if (resp.ok) {
      const response = await resp.json();
      return response;
    } else {
      return { id, cantidad: 0 };
    }
  } catch (error) {
    console.log(error);
    return { error: "No encontrado", status: resp.status };
  }
};

export const addCar = async (id) => {
  let endpoint = "/car/" + id;
  const resp = await fetch(`${URL_API}${endpoint}`);
  if (resp.ok) {
    const prod_car = await resp.json();
    prod_car.cantidad = Number(prod_car.cantidad) + 1;
    await fetch(`${URL_API}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ cantidad: prod_car.cantidad }),
    });
    return prod_car.cantidad;
  } else {
    try {
      endpoint = "/car/";
      await fetch(`${URL_API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ id, cantidad: 1 }),
      });
      return 1;
    } catch (error) {
      console.error(error);
    }
  }
};

export const deleteCar = async (id) => {
  const endpoint = "/car/" + id;
  const resp = await fetch(`${URL_API}${endpoint}`);
  if (resp.ok) {
    const car = await resp.json();
    if (car.cantidad === 1) {
      await fetch(`${URL_API}${endpoint}`, { method: "DELETE" });
    } else {
      car.cantidad = Number(car.cantidad) - 1;
      await fetch(`${URL_API}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ cantidad: car.cantidad }),
      });
    }
  }
};
