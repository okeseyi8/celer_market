"use client";
import React, { useEffect } from "react";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
type ProductCardProps = {
  product: Product;
  onClick?: () => void;
};
const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { productModal, showProductModal } = useProductStore(
    useShallow((s) => ({
      productModal: s.productModal,
      showProductModal: s.showProductModal,
    }))
  );
  useEffect(() => console.log(productModal), [productModal]);

  return (
    <div
      onClick={() => {
        showProductModal();
        onClick?.();
      }}
      className=" md:w-[301px] w-[47%]    flex flex-col transition-transform duration-300 ease-in-out transform origin-center hover:scale-110 "
    >
      <div className="relative  md:h-[392px] h-[229px]">
        <Image
          //   width={301}
          //   height={392}
          fill
          className=" object-cover h-full"
          src="/assets/images/dummyimg1.svg"
          alt=""
        />
      </div>

      <h3 className=" mt-[12px] text-[14px] font-semibold">
        {product.productName}
      </h3>
      <p className="w-full flex gap-2 text-[14px]  mt-[4px] font-semibold">
        <span className="text-[#ef4444] font-normal line-through">
          €{product.originalPrice}
        </span>
        €{product.price}
      </p>
    </div>
  );
};

export default ProductCard;
