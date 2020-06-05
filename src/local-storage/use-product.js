export default function useLocalStorage(basket) {
  localStorage.basket = JSON.stringify(basket);
}
