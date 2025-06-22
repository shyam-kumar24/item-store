import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { fetchItems } from "../services/index";
import EnquiryForm from "./EnquiryForm";

export default function ItemDetail() {
  const { id } = useParams();
  // const items = useSelector((state) => state.items.items);
  // const item = items.find((item) => item.id.toString() === id);
  const [item, setItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [loading ,setLoading] = useState(true)

  useEffect(() => {
    async function fetchItem() {
      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
          setLoading(false)
        } else {
          setItem(null); // Not found
        }
      } catch (err) {
        console.error("Error fetching item:", err);
        setLoading(false)
      }
    }

    fetchItem();
  }, [id]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === item.additionalImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? item.additionalImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!item) return;
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [item]);

  if (loading)
    return <h1 className="text-center mt-40 font-bold text-2xl">Loading data... Please wait!</h1>;

  return (
    <div className="p-10">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold text-2xl">Name: {item.name}</h1>
        <p className="text-lg text-gray-600">Type: {item.type}</p>
        <p className="text-lg text-gray-700 text-center max-w-xl">
          {item.description}
        </p>

        <div>
          <img
          src={item?.coverImage}
          alt="cover"
          className="bg-violet-400 w-full h-full p-3 rounded-md max-w-[400px] max-h-[400px] object-cover shadow-md"
        />
        </div>

        {item.additionalImages?.length > 0 ? (
          <div className="flex flex-col gap-5 items-center mt-8 w-full">
            <div className="relative max-w-[400px] w-full h-[400px] overflow-hidden rounded-xl shadow-lg">
              <img
                src={item.additionalImages[currentIndex]}
                className="w-full h-full object-contain transition duration-500 ease-in-out"
                alt={`Slide ${currentIndex}`}
              />
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80"
              >
                ◀
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/80"
              >
                ▶
              </button>
            </div>

            <div className="flex gap-3 mt-2">
              {item.additionalImages.map((img, i) => (
                <div
                  key={i}
                  className={`h-3 w-3 rounded-full transition-all duration-100 ${
                    i === currentIndex ? "bg-black scale-110" : "bg-gray-400"
                  } cursor-pointer`}
                  onClick={() => setCurrentIndex(i)}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <h2 className="text-red-500 mt-4">No additional image selected!</h2>
        )}

        <div>
          <button
            onClick={() => setShowEnquiry(true)}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-md shadow"
          >
            Enquire
          </button>

          {showEnquiry && (
            <EnquiryForm
              itemName={item.name}
              onClose={() => setShowEnquiry(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
