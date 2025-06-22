import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/itemSlice";
import { uploadItem } from '../services/index';
import { uploadToCloudinary } from "../services/uploadCloudinary";

export default function AddItem() {
  const dispatch = useDispatch();
  const [formData, setFromData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: [],
  });
  const [submitting,setSubmitting] = useState(false)

  function handleChange(e) {
    if (e.target.name === "coverImage") {
      setFromData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
    } else if (e.target.name === "additionalImages") {
      setFromData((prev) => ({
        ...prev,
        additionalImages: [
          ...prev.additionalImages,
          ...Array.from(e.target.files),
        ],
      }));
    } else {
      setFromData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true)
    const coverImageURL = await uploadToCloudinary(formData.coverImage);
    const additionalImageURLs = await Promise.all(
      formData.additionalImages.map(file => uploadToCloudinary(file))
    );

    const newItem = {
      name: formData.name,
      type: formData.type,
      description: formData.description,
      coverImage: coverImageURL,
      additionalImages: additionalImageURLs,
    };

    console.log("formData.additionalImages before submit:", formData.additionalImages);

    const docRef = await uploadItem(newItem);
    
    dispatch(addItem({ id: docRef, ...newItem }));

    console.log(formData);

    setFromData({
      name: "",
      type: "",
      description: "",
      coverImage: "",
      additionalImages: [],
    });

    alert("Item uploaded successfully!");
    setSubmitting(false)
  }



  return (
    <div className="bg-violet-600 max-w-[600px] sm:m-auto mx-10 mt-10 sm:mt-10 rounded-md p-5 text-white ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter your name.."
            className="bg-white outline-none text-black p-1 rounded-md"
            required
            value={formData.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Type</label>
          <input
            name="type"
            type="text"
            placeholder="Item type.."
            className="bg-white outline-none text-black p-1 rounded-md"
            required
            value={formData.type}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Item description</label>
          <textarea
            name="description"
            type="text"
            placeholder="Description.."
            className="bg-white outline-none text-black p-1 rounded-md"
            required
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Cover Image</label>
          <input
            name="coverImage"
            type="file"
            className=""
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Additional Item Image</label>
          <input
            name="additionalImages"
            type="file"
            className=""
            required
            multiple
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          type="submit"
          className={`${submitting ? 'cursor-not-allowed bg-gray-700 text-white  text-xl  rounded-md p-2' : 'bg-violet-900 text-white  text-xl  rounded-md p-2'}`}
        >
          {submitting ? 'Submitting..' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}
