import React from "react";
import { useProductStore } from "@/store/useProductStore";

import { motion, AnimatePresence } from "framer-motion";
import { RiShoppingBag3Line } from "react-icons/ri";
import { useShallow } from "zustand/shallow";
import { IoMdClose,} from "react-icons/io";

const CartModal = () => {
  const { cartModal, showCartModal } = useProductStore(
    useShallow((s) => ({
      cartModal: s.cartModal,
      showCartModal: s.showCartModal

    }))
  );
  return (
   <AnimatePresence>
  {cartModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-white w-full max-w-2xl mx-4 sm:mx-0 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className=" flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg sm:text-xl font-bold">
            Shopping Cart (<span>0</span>)
          </h2>
          <button
            onClick={showCartModal}
            className="text-gray-600 hover:text-black text-2xl"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Empty Cart Message */}
        <div className="flex flex-col items-center justify-center px-6 py-10 text-gray-500 text-center">
          <RiShoppingBag3Line className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-base">Your cart is empty</p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

  );
};

export default CartModal;
