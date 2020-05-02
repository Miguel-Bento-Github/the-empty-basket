export default function useLocalStorage(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
}
