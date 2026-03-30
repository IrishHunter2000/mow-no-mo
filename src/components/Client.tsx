// import mow_no_mo_logo from "../assets/mow_no_mo_logo.png";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import UpdateClientModal from "./UpdateClientModal";

export default function Client({client}: {client: any}) {
    const [open, setOpen] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

	return (
        <div className="w-full bg-black text-white">
            {/* Top Row */}
            <div
                className="flex items-center px-6 py-4 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <span className="w-[100px] text-left font-bold pr-4">
                    {client.name}
                </span>

                <span className="w-full text-left">
                    {client.address}
                </span>

                {/* Icon */}
                <ChevronDown
                    className={`transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </div>

            {/* Expandable Section */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-4 text-sm text-left text-gray-300 overflow-hidden"
                    >
                        <div>Neighborhood: {client.neighborhood}</div>
                        <div>Area: {client.area}</div>
                        <div>Email: {client.email}</div>
                        <div>Phone: {client.phone_number}</div>
                        <div>Frequency: {client.frequency}</div>
                        <div>Price: {client.price}</div>
                        <div>Notes: {client.notes}</div>
                        <button
                            onClick={() => { setUpdateModal(true)}}
                            className="mt-3 px-2! py-1! bg-green-500! text-black rounded"
                        >
                            Update
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {updateModal && (
                <UpdateClientModal client={client} setModal={setUpdateModal} />
            )}
        </div>
	)
}
