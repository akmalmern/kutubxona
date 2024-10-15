import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"




const UpdateAuthor = ()=>{
    const {id} = useParams()
    const navigate = useNavigate()
    let localAuthor = JSON.parse(localStorage.getItem("author"))
    const [cat, setCat] = useState({
        name: localAuthor.name,
        biography: localAuthor.biography,
      });

const autSubmit = async(e)=>{
    e.preventDefault()
    try {
        let {data} = await axios.put(
            `http://localhost:5000/authors/${id}`,
           cat
          );
          if (data.success === true) {
           toast.success(data.message)
            navigate("/addauthor");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message)
        }
    
}

const changeHandler = (e) => {
    setCat({ ...cat, [e.target.name]: e.target.value });
  };
    return(
        <>
          <div className="max-w-lg lg:ms-auto mx-auto text-center ">
        <div className="py-16 px-7 rounded-md bg-white">
          <form className="" onSubmit={autSubmit}>
            <div className="grid w-full grid-cols-1 gap-6">

              <div className="md:col-span-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={changeHandler}
                  value={cat.name}
                  placeholder="kategoriya nomini yozing..."
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
              </div>
              
             

              <div className="md:col-span-2">
                <textarea
                  type="text"
                  name="biography"
                  rows="5"
                  onChange={changeHandler}
                  value={cat.biography}
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
                  pUT Author +
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
        </>
    )
}

export default UpdateAuthor