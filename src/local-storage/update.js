export default function updateLocalStorage(id) {
  const currentBasket = JSON.parse(localStorage.getItem('basket'));
  currentBasket.map((localItem) => {
    if (localItem._id === id) {
      localItem.quantity += 1;
    }
  });
  localStorage.setItem('basket', JSON.stringify(currentBasket));
}
