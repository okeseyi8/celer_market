"use client";
import React, { useEffect } from "react";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { motion } from "framer-motion";
type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};
const ProductCard = ({ product, onClick }: ProductCardProps) => {
  // const { productModal, showProductModal } = useProductStore(
  //   useShallow((s) => ({
  //     productModal: s.productModal,
  //     showProductModal: s.showProductModal,
  //   }))
  // );
  // useEffect(() => console.log(productModal), [productModal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => {
        // showProductModal();
        onClick?.();
      }}
      className="w-full flex flex-col transition-transform duration-300 ease-in-out transform origin-center hover:scale-105"
    >
      <div className="relative w-full h-[229px] md:h-[392px]">
        <Image
          fill
          className="object-cover rounded-md"
          src="/assets/images/dummyimg1.svg"
          alt=""
        />
      </div>

      <h3 className="mt-3 text-sm md:text-base font-semibold">
        {product.productName}
      </h3>
      <p className="w-full flex gap-2 text-sm mt-1 font-semibold">
        <span className="text-red-500 font-normal line-through">
          €{product.originalPrice}
        </span>
        €{product.price}
      </p>
    </motion.div>
  );
};

export default ProductCard;
