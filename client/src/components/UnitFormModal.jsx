import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UnitFormModal = ({ isOpen, onClose, onSubmit, listingId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  const user = useSelector((state) => state?.user?.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("listingId", listingId);
      setValue("token", user?.token);
      setValue("images", file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Unit</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Type</label>
            <select
              {...register("type", { required: "Type is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Type</option>
              <option value="room">Room</option>
              <option value="table">Table</option>
            </select>
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Unit Name</label>
            <input
              type="text"
              {...register("name", { required: "Unit name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Capacity</label>
            <input
              type="number"
              {...register("capacity", { required: "Capacity is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.capacity && (
              <p className="text-red-500">{errors.capacity.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              {...register("price", { required: "Price is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>

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
              Add Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnitFormModal;
