// components/EnquiryForm.jsx
import { useState } from "react";
import emailjs from "emailjs-com";

export default function EnquiryForm({ itemName, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      item_name: itemName,
    };

    emailjs
      .send(
        "service_8y7h98l",
        "template_n3w2hse",
        templateParams,
        "layMoK-JJ_D2Hb2YV"
      )
      .then(() => {
        alert("Enquiry sent successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Email send failed:", error);
        alert("Failed to send enquiry.");
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-[300px]"
      >
        <h2 className="text-xl font-bold mb-2">Enquire about {itemName}</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border p-2 rounded"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your message..."
          required
          className="border p-2 rounded"
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit" className="bg-violet-600 text-white p-2 rounded">
          Send Enquiry
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-red-500 text-sm mt-1"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
