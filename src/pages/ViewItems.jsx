import { useSelector } from "react-redux"
import ItemCard from "../components/ItemCard"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItems } from "../services/index";

export default function ViewItem(){

    const [items,setItems] = useState([])
    const [loading,setLoading] = useState(true)

    // const items = useSelector(state => state.items.items)
    // console.log(items);

    useEffect(() => {
        async function loadItems(){
            try{
                const data = await fetchItems()
                setItems(data)
            }catch(e){
                console.log('failed to fetch',e);
            }finally{
                setLoading(false)
            }
        }

        loadItems()
    },[])


    if(loading) return <h1 className="font-bold text-2xl max-w-fit m-auto mt-[200px]">Loading Data.. please wait!</h1>

    return (
        <div >
            <h1 className="font-bold text-2xl w-[100px] m-auto mt-5">All Items</h1>
            {
                items.length > 0 ? (<div className="flex flex-col gap-5 rounded-xl p-10 ">
                {
                    items.map(item => <ItemCard key={item.id} data={item}/>)
                }
            </div>) : <div className="font-bold text-2xl w-[300px] m-auto mt-[100px] flex items-center justify-center flex-col">
                <h1>No item to show</h1>
                <Link to='/' className="bg-violet-600 text-white p-2 rounded-xl mt-5">Go to add Item page</Link>
            </div>
            }
            
        </div>
    )
}