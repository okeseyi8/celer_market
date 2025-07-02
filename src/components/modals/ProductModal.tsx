"use client";
import { useProductStore } from "@/store/useProductStore";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiShoppingBag3Line } from "react-icons/ri";
import { useShallow } from "zustand/shallow";
import { IoMdHeartEmpty } from "react-icons/io";
import { Product } from "@/types";
import Image from 'next/image';

import { IoMdClose } from "react-icons/io";
const ProductModal = () => {
  const { productModal, showProductModal, product, setProduct } = useProductStore(
    useShallow((s) => ({
      productModal: s.productModal,
      setProduct: s.setProduct,
      showProductModal: s.showProductModal,
      product: s.product,
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

  return (
    <AnimatePresence>
      {productModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div className="fixed flex justify-center items-center top-0 left-0 md:w-full  h-full bg-[#00000080] z-50">
            <div className="lg:w-[53.3%] w-[90%] h-[90%] overflow-hidden rounded-lg bg-[white]">
              <div className="flex items-center justify-between p-[16px] border-b-[1px] border-[#E4E4E7]">
                <div className="flex items-center h-[36px]">
                  <h1 className="text-[20px] font-bold">Product Details</h1>
                </div>
                <div
                  onClick={() => showProductModal()}
                  className="flex items-center h-[36px] px-5"
                >
                  <IoMdClose />
                </div>
              </div>
              <div className="overflow-y-auto h-[750px]">
                <div className="flex flex-col md:flex-row gap-[32px] p-[24px]">
                  <Image
                    width={408}
                    height={267}
                    className="md:w-[48%] rounded-[8px] md:h-[544px] h-[393px] object-cover "
                    src="/assets/images/dummyimg1.svg"
                    alt=""
                  />
                  <div className="w-full">
                    <h1 className="w-full font-extrabold text-[24px] mb-2">
                      {product.productName}
                    </h1>
                    <p className="text-[16px] font-medium text-[#4b5563] mb-4">
                      {product.desc}
                    </p>
                    <p className="w-full  flex items-center gap-2 text-2xl  mt-[4px] mb-[26px] font-extrabold">
                      <span className="text-[#ef4444] text-lg font-normal line-through">
                        €{product.originalPrice}
                      </span>
                      €{product.price}
                    </p>
                    <h3 className="text-sm font-bold mb-2">Size</h3>
                    <ul className="flex gap-2 mb-[16px]">
                      <li className="w-[44px] h-[36px] rounded-lg text-[14px] font-semibold border-[1px] border-[#E4E4E7] flex items-center justify-center">
                        XS
                      </li>
                      <li className="w-[44px] h-[36px] rounded-lg text-[14px] font-semibold border-[1px] border-[#E4E4E7] flex items-center justify-center">
                        S
                      </li>
                      <li className="w-[44px] h-[36px] rounded-lg text-[14px] font-semibold border-[1px] border-[#E4E4E7] flex items-center justify-center">
                        M
                      </li>
                      <li className="w-[44px] h-[36px] rounded-lg text-[14px] font-semibold border-[1px] border-[#E4E4E7] flex items-center justify-center">
                        L
                      </li>
                      <li className="w-[44px] h-[36px] rounded-lg text-[14px] font-semibold border-[1px] border-[#E4E4E7] flex items-center justify-center">
                        XL
                      </li>
                    </ul>
                    <button className="w-full bg-black text-white rounded-md mb-[12px] flex items-center justify-center gap-3 h-[44px] ">
                      <RiShoppingBag3Line className="font-bold text-[17px]" />
                      <span className="text-[14px] font-bold">
                        {" "}
                        Add to Cart
                      </span>
                    </button>
                    <button className="w-full border-[1px] border-[#E4E4E7] text-black rounded-md flex items-center justify-center gap-3 h-[44px] ">
                      <IoMdHeartEmpty className="font-bold text-[17px]" />
                      <span className="text-[14px] font-bold">
                        {" "}
                        Add to WishList
                      </span>
                    </button>
                  </div>
                </div>
                <div className=" px-[24px] mt-[8px]">
                  <h3 className="text-[18px]  font-bold mb-[16px]">
                    You might also like
                  </h3>
                  <div className="w-full gap-4 flex  justify-center flex-wrap p-0">
                    {Products.map((product) => (
                      <div
                        onClick={() => setProduct(product)}
                        key={product.productName}
                        className=" w-[140px] md:w-[196px] p-0 flex flex-col  transition-transform duration-300 ease-in-out transform origin-center hover:scale-110 "
                      >
                        <div className=" md:h-[267px] h-[196px] ">
                          <Image
                           width={220}
                           height={392}
                            className=" rounded-md object-cover  h-full"
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
