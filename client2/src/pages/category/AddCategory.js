import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';



const AddCategory = () =>{
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [categories,setCategories] = useState([])
    const navigate = useNavigate()

    const getCategories = async()=>{
        try {
            const {data} =await axios.get("http://localhost:5000/categories")
            setCategories(data.categories)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post("http://localhost:5000/categories",{
                name,
                description
            })
            console.log(data.newCategory)
            
            if(data.success === true){
                setName("")
                setDescription("")
                toast.success(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            
        }
    }

// update
const UpdateCategory = (elem) => {
  localStorage.setItem("category", JSON.stringify(elem));
  navigate(`/updatecat/${elem._id}`);
};

const Delete = async (id) => {
  try {
    let res = await axios.delete(
      `http://localhost:5000/categories/${id}  `
    );
    if (res.data.success === true) {
     toast.success(res.data.message)
    }
  } catch (error) {
    console.log(error);
  }
  window.location.reload(false);
};


// paginatin

    return(
        <>
         <div className="max-w-lg lg:ms-auto mx-auto text-center ">
        <div className="py-16 px-7 rounded-md bg-white">
          <form className="" onSubmit={handleSubmit}>
            <div className="grid w-full grid-cols-1 gap-6">

              <div className="md:col-span-2">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="kategoriya nomini yozing..."
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
              </div>
              
             

              <div className="md:col-span-2">
                <textarea
                  type="text"
                  rows="5"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  cols=""
                  placeholder="Qisqacha tavsifi *"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="py-3 text-base font-medium rounded text-white bg-blue-800 w-full hover:bg-blue-700 transition duration-300"
                >
                  Add Category +
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Edit
                </th>
                <th scope="col" className="px-6 py-3">
                    Delete
                </th>
                
            </tr>
        </thead>
        <tbody>
          {
            categories.map((cat)=>(
                <tr key={cat._id} className="  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               
                <td className="px-6 py-4">
                        {cat.name}
                    </td>
                    <td className="px-6 py-4">
                        {cat.description}
                    </td>
                    <td className="px-6 py-4">
                    <button  onClick={()=>UpdateCategory(cat)} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                    
                    </td>
                    <td className="px-6 py-4">
                      
                      <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"   onClick={() => Delete(cat._id)}>Delet</button>
                   
                    </td>
                  
                  
                  
                </tr>
            ))
          }
            
            
        </tbody>
    </table>
    
</div>

        </>
    )
}

export default AddCategory