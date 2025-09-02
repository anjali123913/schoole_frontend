import { motion } from "framer-motion";

export default function SchoolCard({ item }) {
  const imageurl =
    item.image || item.image == "" || !import.meta.env.VITE_API_URL_FOR_IMAGE
      ? `${import.meta.env.VITE_API_URL_FOR_IMAGE}${item.image}`
      : "https://static.vecteezy.com/system/resources/previews/004/641/880/original/illustration-of-high-school-building-school-building-free-vector.jpg";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
      }}
      whileTap={{ scale: 0.97 }}
      className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col"
    >
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-lg">
        {item.image ? (
          <motion.img
            src={imageurl}
            alt={item.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-lg line-clamp-1">{item.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-1">{item.address}</p>
      <p className="text-sm text-gray-600">{item.city}</p>
    </motion.div>
  );
}
