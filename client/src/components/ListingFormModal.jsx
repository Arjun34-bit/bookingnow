import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ListingFormModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  const user = useSelector((state) => state?.user?.user);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("token", user?.token);
      setValue("image", file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Listing</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block font-medium">Listing Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block font-medium">Type</label>
              <select
                {...register("type", { required: "Type is required" })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Type</option>
                <option value="hotel">Hotel</option>
                <option value="restaurants">Restaurant</option>
              </select>
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium">Address</label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block font-medium">Contact Number</label>
              <input
                type="number"
                {...register("contact", {
                  required: "Contact number is required",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.contact && (
                <p className="text-red-500">{errors.contact.message}</p>
              )}
            </div>

            {/* Starting Price */}
            <div>
              <label className="block font-medium">Starting Price</label>
              <input
                type="number"
                {...register("startingPrice", {
                  required: "Starting price is required",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.startingPrice && (
                <p className="text-red-500">{errors.startingPrice.message}</p>
              )}
            </div>

            {/* Facilities */}
            <div>
              <label className="block font-medium">Facilities</label>
              <select
                multiple
                {...register("facilities")}
                className="w-full p-2 border rounded"
              >
                <option value="wifi">WiFi</option>
                <option value="parking">Parking</option>
                <option value="pool">Swimming Pool</option>
                <option value="gym">Gym</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-40 h-24 object-cover border rounded"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded h-24"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingFormModal;
