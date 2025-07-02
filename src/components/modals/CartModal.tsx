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
          <div className="bg-white  overflow-hidden rounded-lg  w-[40%] h-auto">
            <div className="flex items-center justify-between border-b border-b-[#eee] p-4">
              <div className="text-[22px] font-bold">
                Shopping Cart (<span>0</span>)
              </div>
              <div>
                <IoMdClose onClick={() => showCartModal()} className="mr-2" />
              </div>
            </div>
            <div className="flex h-[184px] text-[#6b7280] flex-col justify-center items-center">
              <RiShoppingBag3Line className="w-12 h-12 text-[#9CA3AF] mb-3" />
              Your cart is empty
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
