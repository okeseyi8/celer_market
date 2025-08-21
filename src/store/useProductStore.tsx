"use client";
import { create } from "zustand";

import { getNewProducts, getProducts, purchasedProducts } from "@/lib/apiServices/prodServices";
import toast from "react-hot-toast";

interface recProductType {
  item_id: string;
  user_id: string;
  k: string;
  title: string;

  image_url: string;
}
interface useProductType {
  productModal: boolean;
  productID: string;
  product: recProductType;
  cartModal: boolean;
  showCartModal: () => void;
  showProductModal: () => void;
  setProductID: (id: string) => void;
  setProduct: (product: recProductType) => void;
  recProducts: recProductType[];
  newRecProducts: recProductType[];
  recProductsLoading: boolean;
  getRecProducts: (id: any, k: any) => void;
  getNewRecProducts: (id: any, k: any) => void;
  purchaseLoading:boolean;
  makePurchase: (user_id:string, item_id:string) => void;
}

export const useProductStore = create<useProductType>()((set) => ({
  productModal: false,
  purchaseLoading: false, 
  productID: "",
  cartModal: false,

  product: {
    user_id: "",
    k: "",
    item_id: "",
    title: "",
    image_url: "",
  },
  setProduct: ({
    user_id,
    k,
    item_id,
    title,
    image_url,
  }: recProductType) =>
    set({
      product: {
        user_id,
        k,
        title,
        item_id,
        image_url,
      },
    }),
  setProductID: (id: string) => set({ productID: id }),
  showProductModal: () =>
    set((state) => ({
      productModal: !state.productModal,
    })),
  showCartModal: () =>
    set((state) => ({
      cartModal: !state.cartModal,
    })),
  recProductsLoading: false,
  recProducts: [
    {
      user_id: "",
      k: "",
      item_id: "",
      title: "",
      image_url: "",
    },
  ],
  getRecProducts: async (id: any, k: any) => {
    set({ recProductsLoading: true });
    try {
      const data = await getProducts(id, k);
      console.log("RecProducts:", data);
      localStorage.setItem("recProducts", JSON.stringify(data));
      set({ recProducts: data });
    } catch (err) {
      console.error(err);
    }
  },
  newRecProducts: [
    {
      user_id: "",
      k: "",
      item_id: "",
      title: "",
      image_url: "",
    },
  ],
  getNewRecProducts: async (id: any, k: any) => {
    set({ recProductsLoading: true });
    try {
      const data = await getNewProducts(id, k);
      const last20 = data.slice(-20)
      console.log("NewRecProducts:", data);
      localStorage.setItem("newRecProducts", JSON.stringify(last20));

      set({ newRecProducts: last20 });
    } catch (err) {
      console.error(err);
    }
  },
  makePurchase: async(user_id:string, item_id:string) => {
    set({purchaseLoading: true})
    try{
      const data = await purchasedProducts(user_id, item_id)
      localStorage.setItem("purchased", JSON.stringify(data))
      toast.success("Purchased made successfully!")
    
    }catch(err){
      console.error(err)
       toast.error("Purchased Unsuccesful")
    
    }finally{
      set({purchaseLoading: false})
    }
  }

}));
