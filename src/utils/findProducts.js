import Axios from 'axios';
export default async function findProducts(payload) {
  this.filter = payload;
  this.loading = true;
  const url = `${process.env.VUE_APP_API}api/items`;
  if (payload) {
    let res;
    if (typeof payload === 'number') {
      if (Number.isInteger(payload)) {
        res = await Axios.post(url, { amount: payload });
      } else {
        res = await Axios.post(url, { price: payload });
      }
      this.products = res.data;
    } else {
      res = await Axios.post(url, { query: payload });
      this.products = res.data;
    }
    this.loading = false;
  } else {
    const { data } = await Axios.post(url);
    this.products = data;
    this.loading = false;
  }
}
