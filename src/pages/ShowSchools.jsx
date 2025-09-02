import { useEffect, useState } from "react";
import { API } from "../services/api.js";
import SchoolCard from "../components/SchoolCard.jsx";
import { motion } from "framer-motion";

export default function ShowSchools() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [total, setTotal] = useState(0);

  const fetchData = async (query = "") => {
    const res = await API.get("/schools", { params: { q: query, page: 1, limit: 24 } });
    console.log(res)
    setItems(res.data.data);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetchData(q);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-3">
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 border rounded-md px-3 py-2"
          placeholder="Search by city or school name..."
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="px-5 py-2 rounded-md bg-gray-900 text-white hover:bg-black"
        >
          Search
        </motion.button>
      </form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-600"
      >
        {total} schools found
      </motion.p>

      {/* Grid with animated items */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {items.map((it) => (
          <motion.div
            key={it._id}
            variants={itemAnim}
            whileHover={{ scale: 1.03, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <SchoolCard item={it} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
