import { NavLink, useParams } from "react-router-dom";

export default function NavBar() {


  return (
    <nav className="h-14 bg-violet-700 text-xl text-white shadow flex justify-end pr-20 items-center gap-10">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? " underline"
            : " "
        }
        end
      >
        Add Item
      </NavLink>
      <NavLink
        to="/view-item"
        end
        className={({ isActive }) =>
          isActive 
            ? "underline"
            : ''
        }
      >
        View Item
      </NavLink>
    </nav>
  );
}
