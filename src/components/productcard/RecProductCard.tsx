"use client"
import React, { useEffect } from "react";

import Image from "next/image";
import { useShallow } from "zustand/react/shallow";

import { useProductStore } from "@/store/useProductStore";

type recProductType =  {
  user_id: string;
  k: string;

  title: string;
  image_url: string;
}
type RecProductCardProps = {
  product: recProductType;
  onClick?: () => void;
};
const trimmedTitle = (title: string) => {
  if(title.length > 50){
    return title.slice(0, 50) + "..."
  }
  return title
}

const RecProductCard = ({ product, onClick}: RecProductCardProps) => {
  const {productModal, showProductModal} = useProductStore(useShallow((s) => ({
  productModal: s.productModal,
  showProductModal: s.showProductModal
})))
  return (
   <div
      onClick={() => {
         showProductModal();
        onClick?.();
 
      
      }}
      className="w-full flex flex-col transition-transform duration-300 ease-in-out transform origin-center hover:scale-105"
    >
      <div className="relative w-full h-[229px] md:h-[392px] rounded-md shadow-2xl overflow-hidden">
        <Image
          fill
          className="object-contain rounded-md"
          src={product.image_url || "/assets/images/dummyimg1.svg"}
          alt=""
        />
      </div>

      <h3 className="mt-3 text-sm md:text-base font-semibold">
       { trimmedTitle(product.title)}
      </h3>
      <p className="w-full flex gap-2 text-sm mt-1 font-semibold">
        <span className="text-red-500 font-normal line-through">
          €50
        </span>
        #45
      </p>
    </div>
  )
}

export default RecProductCard







// const ProductCard = (: ProductCardProps) => {
//   const { productModal, showProductModal } = useProductStore(
//     useShallow((s) => ({
//       productModal: s.productModal,
//       showProductModal: s.showProductModal,
//     }))
//   );
//   useEffect(() => console.log(productModal), [productModal]);

//   return (
//     <div
//       onClick={() => {
//         showProductModal();
//         onClick?.();
//       }}
//       className="w-full flex flex-col transition-transform duration-300 ease-in-out transform origin-center hover:scale-105"
//     >
//       <div className="relative w-full h-[229px] md:h-[392px]">
//         <Image
//           fill
//           className="object-cover rounded-md"
//           src="/assets/images/dummyimg1.svg"
//           alt=""
//         />
//       </div>

//       <h3 className="mt-3 text-sm md:text-base font-semibold">
//         {product.productName}
//       </h3>
//       <p className="w-full flex gap-2 text-sm mt-1 font-semibold">
//         <span className="text-red-500 font-normal line-through">
//           €{product.originalPrice}
//         </span>
//         €{product.price}
//       </p>
//     </div>
//   );
// };

// export default ProductCard;
