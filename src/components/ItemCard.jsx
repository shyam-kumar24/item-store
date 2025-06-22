import { useNavigate } from "react-router-dom";

export default function ItemCard({ data }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/view-item/${data.id}`);
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-xl max-w-[600px] w-full flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start justify-start sm:justify-between bg-violet-500 p-4 sm:p-5 box-border"
    >
      <div className="w-full sm:w-[100px] h-[200px] sm:h-[100px] overflow-hidden rounded-xl flex-shrink-0">
        <img
          src={data.coverImage}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <p className="font-bold text-lg sm:text-2xl text-white text-center sm:text-left">
        {data.name}
      </p>
    </div>
  );
}
