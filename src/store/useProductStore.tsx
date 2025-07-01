"use client"
import {create} from "zustand"
import { Product } from "@/types";
interface useProductType{
    productModal: boolean;
    productID: string;
    product: Product;
    showProductModal: () => void
    setProductID: (id: string) => void
    setProduct: (product: Product) => void

}

export const useProductStore = create<useProductType>()((set) => ({
    productModal: false,
    productID: "heloo",
    product: {
    productName: "",
    desc: "",
    price: 0,
    originalPrice: 0,
    wishListed: false,
    addedToCart: false,
    sizesAvailable: [],
  }, 
   setProduct: ({productName,desc, price, originalPrice, wishListed, addedToCart, sizesAvailable} : Product) => set({
    product: {
    productName,
    desc: desc,
    price: price,
    originalPrice,
    wishListed,
    addedToCart,
    sizesAvailable,
  }
   }),
    setProductID: (id: string) => set({productID: id}),
    showProductModal: () => set((state) => ({
        productModal: !state.productModal

    }))

})) 

