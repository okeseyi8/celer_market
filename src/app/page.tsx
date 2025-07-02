"use client";
import ProductCard from "@/components/productcard/ProductCard";
import React, { useEffect } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { Product } from "@/types";

import { useProductStore } from "@/store/useProductStore";
import { useShallow } from "zustand/shallow";
import ProductModal from "@/components/modals/ProductModal";
import CartModal from "@/components/modals/CartModal";
const Page = () => {
  const {
    productModal,
    showCartModal,
    productID,
    cartModal,
    setProduct,
  } = useProductStore(
    useShallow((s) => ({
      productModal: s.productModal,
      showCartModal: s.showCartModal,
      cartModal: s.cartModal,
      productID: s.productID,

      setProduct: s.setProduct,
    }))
  );

  const Products: Product[] = [
    {
      productName: '"SCORPION" Jersey RED-VENOM',
      desc: "Comfortable layered shorts with modern design",
      price: 40,
      originalPrice: 50,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"ENDSARS" BLOOD OF A NATION',
      desc: "Comfortable layered shorts with modern design",
      price: 57,
      originalPrice: 90,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"CRISIS" CAP',
      desc: "Bold statement cap in vibrant red",
      price: 95,
      originalPrice: 0,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"TEAM" STINGINC MEMBAH SHIRT',
      desc: "Oversized layered longsleeve for urban style",
      price: 260,
      originalPrice: 0,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"URBAN" CIVILIAN": A WAY TO LIVE',
      desc: "Functional cargo pants with multiple pockets",
      price: 260,
      originalPrice: 0,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"MANNIMAL" HOODIE NOCTURNAL ANIM.',
      desc: "Clean minimal hoodie in premium fabric",
      price: 145,
      originalPrice: 0,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"STREET" SNEAKERS',
      desc: "High-end street sneakers with unique design",
      price: 320,
      originalPrice: 400,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
    {
      productName: '"CLASSIC" DENIM JACKET',
      desc: "Timeless denim jacket with modern fit",
      price: 195,
      originalPrice: 0,
      wishListed: false,
      addedToCart: false,
      sizesAvailable: ["XS", "S", "M", "L"],
    },
  ];
  useEffect(() => {
    console.log("Clicked:", cartModal);
  }, [cartModal]);

  return (
    <div className="w-full  flex flex-col font-geist justify-center items-center py-[32px] lg:px-[200px]">
      {productModal && <ProductModal />}
      {cartModal && <CartModal />}

      <div className="w-full flex items-center justify-between text-center mb-[32px] px-4 lg:px-0">
        <div></div>
        <div>
          <h1 className="text-2xl  font-bold text-[30px] ">
            STING STORE COLLECTION
          </h1>

          <p className="text-[16px] text-[#4b5563]">
            Discover our latest products
          </p>
        </div>

        <div>
          <button onClick={() => showCartModal()} className="flex  text-[14px] font-semibold items-center  border-[1px] border-[#e1e1e4] px-[13px] py-[8px] rounded-md gap-3">
            <RiShoppingBag3Line className="font-bold text-[17px]" />
           <span className="hidden lg:flex"> Cart</span>
          </button>
        </div>
      </div>
      <div className="w-fit flex justify-center mx-2 lg:m-0 ">
        <div className="flex flex-wrap justify-center md:gap-6 gap-3 bg-white p-0 w-fit">
          {Products.map((product) => (
            <ProductCard
              onClick={() => setProduct(product)}
              key={product.productName}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
