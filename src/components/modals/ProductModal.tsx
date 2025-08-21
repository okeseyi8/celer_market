"use client";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiShoppingBag3Line } from "react-icons/ri";
import { useShallow } from "zustand/shallow";
import { IoMdHeartEmpty } from "react-icons/io";
import { Product } from "@/types";
import Image from "next/image";

import { IoMdClose } from "react-icons/io";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "../ui/Loader";
const ProductModal = () => {
  const {
    productModal,
    recProducts,
    newRecProducts,
    showProductModal,
    getNewRecProducts,
    product,
    setProduct,
    makePurchase,
    purchaseLoading,
  } = useProductStore(
    useShallow((s) => ({
      productModal: s.productModal,
      setProduct: s.setProduct,
      showProductModal: s.showProductModal,
      product: s.product,
      recProducts: s.recProducts,
      makePurchase: s.makePurchase,
      purchaseLoading: s.purchaseLoading,
      newRecProducts: s.newRecProducts,
      getNewRecProducts: s.getNewRecProducts,
    }))
  );
  const user = useAuthStore((s: any) => s.user);
  // useEffect(() => {
  //   const myUser = user;
  //   console.log("User ID:", myUser);
  // }, [user]);
  const [imgSrc, setImgSrc] = useState(product.image_url);
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
          <div className="relative z-50 flex items-center justify-center w-full h-full">
            <div className="bg-white mx-4 w-full max-w-5xl h-[90vh] overflow-hidden rounded-xl shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h1 className="text-xl font-bold">Product Details</h1>
                <button
                  onClick={showProductModal}
                  className="text-xl cursor-pointer text-gray-600 hover:text-black"
                >
                  <IoMdClose />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto h-[calc(90vh-4rem)] p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/2">
                    <Image
                      width={408}
                      height={544}
                      className="w-full h-[393px] md:h-[544px] object-contain rounded-md"
                      // src={imgSrc || "/assets/images/dummyimg1.svg"}
                      src={product.image_url}
                      alt=""
                      onError={() => setImgSrc("/assets/images/dummyimg1.svg")}
                    />
                  </div>

                  <div className="w-full md:w-1/2">
                    <h1 className="text-2xl font-extrabold mb-2">
                      {product.title}
                    </h1>
                    <p className="text-base text-gray-600 mb-4">
                      {/* {product.desc} */}
                      None
                    </p>

                    <div className="flex items-center gap-2 text-2xl font-extrabold mb-6">
                      <span className="line-through text-lg font-normal text-red-500">
                        {/* €{product.originalPrice} */}
                        $40
                      </span>
                      {/* €{product.price} */}
                      €50
                    </div>

                    {/* <h3 className="text-sm font-bold mb-2">Size</h3> */}
                    {/* <ul className="flex gap-2 mb-4">
                      {["XS", "S", "M", "L", "XL"].map((size) => (
                        <li
                          key={size}
                          className="w-11 h-9 border border-gray-200 rounded-md text-sm font-semibold flex items-center justify-center"
                        >
                          {size}
                        </li>
                      ))}
                    </ul> */}

                    <button
                      onClick={() => {
                        makePurchase(user.mlUserId, product.item_id);
                        getNewRecProducts(user.mlUserId, 40);
                      }}
                      className="w-full cursor-pointer h-11 mb-3 bg-black text-white rounded-md flex items-center justify-center gap-2"
                    >
                      <RiShoppingBag3Line className="text-lg cursor-pointer" />
                      <span className="text-sm font-bold">
                        {purchaseLoading ? <Loader /> : "Buy Now"}
                      </span>
                    </button>

                    <button className="w-full h-11 border border-gray-300 text-black rounded-md flex items-center justify-center gap-2">
                      <IoMdHeartEmpty className="text-lg" />
                      <span className="text-sm font-bold">Add to Wishlist</span>
                    </button>
                  </div>
                </div>

                {/* Related Products */}
                <div className="mt-10">
                  <h3 className="text-lg font-bold mb-4">
                    You might also like
                  </h3>
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4"
                    >
                      {newRecProducts.map((product) => (
                     
                          <motion.div

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            key={product.title}
                            onClick={() => setProduct(product)}
                            className="cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                          >
                            <div className="relative h-[196px] md:h-[267px] w-full">
                              <Image
                                fill
                                className="rounded-md object-contain"
                                src={product.image_url}
                                onError={() =>
                                  setImgSrc("/assets/images/dummyimg1.svg")
                                }
                                alt=""
                              />
                            </div>
                            <h3 className="mt-3 text-sm font-semibold">
                              {product.title}
                            </h3>
                            <p className="flex gap-2 text-sm font-semibold">
                              <span className="line-through text-gray-400">
                                {/* €{product.originalPrice} */}
                                €40
                              </span>
                              {/* €{product.price} */}
                              €50
                            </p>
                          </motion.div>
                    
                      ))}
                    </motion.div>
                  </AnimatePresence>
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
