import { useForm } from "react-hook-form";
import { API } from "../services/api.js";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm();
  const [serverMsg, setServerMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      setServerMsg("");
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === "image" && v?.[0]) formData.append("image", v[0]);
        else formData.append(k, v);
      });
      await API.post("/schools", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setServerMsg("✅ School added successfully!");
      reset();
    } catch (e) {
      setServerMsg(e?.response?.data?.message || "❌ Failed to add school");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Add School</h2>

      {/* Server message animation */}
      <AnimatePresence>
        {serverMsg && (
          <motion.div
            key="msg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 text-sm ${
              serverMsg.startsWith("✅")
                ? "text-green-700"
                : serverMsg.startsWith("❌")
                ? "text-red-700"
                : "text-blue-700"
            }`}
          >
            {serverMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="sm:col-span-2"
        >
          <label className="block text-sm font-medium mb-1">School Name</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("name", { required: "Name is required" })}
            placeholder="ABC Public School"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
          )}
        </motion.div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("address", { required: "Address is required" })}
            placeholder="123 Street, Area"
          />
          {errors.address && (
            <p className="text-xs text-red-600 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("city", { required: true })}
          />
          {errors.city && (
            <p className="text-xs text-red-600 mt-1">City is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("state", { required: true })}
          />
          {errors.state && (
            <p className="text-xs text-red-600 mt-1">State is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            {...register("contact", {
              required: true,
              pattern: {
                value: /^[0-9+\-\s]{7,15}$/,
                message: "Invalid contact"
              }
            })}
            placeholder="+91 98xxxxxx"
          />
          {errors.contact && (
            <p className="text-xs text-red-600 mt-1">
              {errors.contact.message || "Contact is required"}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            className="w-full border rounded-md px-3 py-2"
            type="email"
            {...register("email_id", { required: true })}
            placeholder="school@example.com"
          />
          {errors.email_id && (
            <p className="text-xs text-red-600 mt-1">
              Valid email is required
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full border rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            PNG/JPG/WEBP up to 2MB.
          </p>
        </div>

        <div className="sm:col-span-2">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="relative w-full sm:w-auto px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center"
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
          >
            {/* Loader inside button */}
            <AnimatePresence>
              {isSubmitting ? (
                <motion.div
                  key="loader"
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ) : (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Save School
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
