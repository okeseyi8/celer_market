import api from "../api";

export const getProducts = async (id: any, k: any) => {
  const res = await api.get("/products", {
    params:{
        user_id: id,
        k: k,
    }
  });
  return res.data;
};
export const getNewProducts = async (id: any, k: any) => {
  const res = await api.get("/new-recommended-products", {
    params:{
        user_id: id,
        k: k,
    }
  });
  return res.data;
};
export const purchasedProducts = async (user_id: string, item_id: string) => {
  const res = await api.post(
    `/purchase-products?user_id=${encodeURIComponent(user_id)}&item_id=${encodeURIComponent(item_id)}`
  );
  return res.data;
};