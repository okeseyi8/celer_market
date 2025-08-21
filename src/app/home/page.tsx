"use client";
import ProductCard from "@/components/productcard/ProductCard";
import React, { useEffect } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { Product } from "@/types";
import { CiLogout } from "react-icons/ci";
import { useProductStore } from "@/store/useProductStore";
import { useShallow } from "zustand/shallow";
import ProductModal from "@/components/modals/ProductModal";
import CartModal from "@/components/modals/CartModal";
import { useAuthStore } from "@/store/useAuthStore";
import RecProductCard from "@/components/productcard/RecProductCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    productModal,
    showCartModal,
    showProductModal,
    cartModal,
    setProduct,
    recProducts,
    recProductsLoading,
    getRecProducts,
    newRecProducts,
    getNewRecProducts,
  } = useProductStore(
    useShallow((s) => ({
      productModal: s.productModal,
      showCartModal: s.showCartModal,
      cartModal: s.cartModal,
      recProducts: s.recProducts,
      recProductsLoading: s.recProductsLoading,
      getRecProducts: s.getRecProducts,
      showProductModal: s.showProductModal,
      setProduct: s.setProduct,
      newRecProducts: s.newRecProducts,
      getNewRecProducts: s.getNewRecProducts,
    }))
  );
  const router = useRouter();
  const { user, userToken, logout } = useAuthStore(
    useShallow((s: any) => ({
      user: s.user,
      userToken: s.userToken,
      logout: s.logout,
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
  useEffect(() => {
    const prod = getRecProducts(user.mlUserId, 20);
    const newProd = getNewRecProducts(user.mlUserId, 40);

    console.log("MY RECOMMENDED PRODUCTS:", recProducts, newRecProducts);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full flex flex-col font-geist items-center py-8"
    >
      {productModal && <ProductModal />}
      {cartModal && <CartModal />}

      <div className="w-full max-w-6xl flex items-center justify-between text-center mb-8 px-4 md:px-8 xl:px-0">
        <div></div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            CELER STORE COLLECTION
          </h1>
          <p className="text-base text-gray-600">
            Discover our latest products
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex text-sm cursor-pointer font-semibold items-center border border-gray-200 px-4 py-2 rounded-md gap-3"
          >
            <CiLogout className="text-lg" />
            <span className="hidden lg:inline">Log Out</span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4 md:px-8 xl:px-0">
        <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
          {recProducts.map((product) => (
            <RecProductCard
              onClick={() => {
                setProduct(product);
              }}
              key={product.title}
              product={product}
            />
          ))}
        </div>
        <div className="my-10">
          <div className="w-full relative h-[100px]">
            <Image
              src="/assets/gifs/fs.gif"
              alt="Recommended products"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold text-3xl">Recommended Products</h1>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
          {newRecProducts.map((product) => (
            <RecProductCard
              // onClick={() => setProduct(product)}
              key={product.title}
              product={product}
            />
          ))}
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]"></div>
      </div>
    </motion.div>
  );
};

export default Page;
