export default function updateLocalStorage(id) {
  const currentBasket = JSON.parse(localStorage.basket);
  currentBasket.map((localItem) => {
    if (localItem._id === id) {
      localItem.quantity += 1;
    }
  });
  localStorage.basket = JSON.stringify(currentBasket);
}
