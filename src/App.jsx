import { Routes,Route } from "react-router-dom"
import AddItem from "./pages/AddItem"
import ViewItem from "./pages/ViewItems"
import NavBar from "./components/NavBar"
import ItemDetail from "./components/ItemDetail"

export default function App(){


  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<AddItem />}/>
        <Route path="/view-item" element={<ViewItem />}/>
        <Route path="/view-item/:id" element={<ItemDetail />}/>
      </Routes>
    </div>
  )
}