function totalPrice(state) {
  let result = 0;
  state.basket.map(({ price, quantity }) => {
    if (quantity > 1) {
      price = price * quantity;
    }
    result += +price;
  });
  return result.toFixed(2);
}

function totalWeight(state) {
  let result = 0;
  const unitType = (who, from, to) =>
    who
      .toLowerCase()
      .slice(from, to)
      .split(' ')
      .join('');

  state.basket.map((product) => {
    const weight = (item) => Number(item.replace(/[^0-9.]+/g, ''));
    if (
      unitType(product.unit, -2) === 'g' ||
      unitType(product.unit, -2) === 'ml'
    ) {
      if (unitType(product.unit, 2, 4) === 'x') {
        const units = product.unit.split('x');
        const factor = units[0];
        const grams = weight(units[1]);

        result += ((factor * grams) / 1000) * product.quantity;
        return;
      } else {
        result += (weight(product.unit) * product.quantity) / 1000;
      }
    } else if (
      unitType(product.unit, -2) === 'kg' ||
      unitType(product.unit, -2) === 'l'
    ) {
      result += weight(product.unit) * product.quantity;
    }
  });

  return Math.round(result * 10) / 10 + ' Kg';
}

const getters = {
  totalPrice,
  totalWeight,
};
export default getters;
