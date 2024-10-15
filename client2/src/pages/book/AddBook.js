import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddBook = () => {

  const [categories, setCategories] = useState([]);
  const [mualliflar, setMualliflar] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthors] = useState("");
  const [category, setCategory] = useState("");
  const [publishedYear, setYear] = useState("");
  const [summary, setSumarry] = useState("");

  //submit the htmlForm
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/books", {
        title,
        author,
        category,
        publishedYear,
        summary,
      });
      if (data.success === true) {
        setTitle("");
        setAuthors("");
        setCategory("");
        setYear("");
        setSumarry("");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ****************
  useEffect(() => {
    getCategory();
    getAuthors();
  }, []);

  const getCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };
  const getAuthors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/authors");
      setMualliflar(data.mualliflar);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };
// aaaaaaaaaaaaaaaaa
const Delete = async (id) => {
  try {
    let res = await axios.delete(
      `http://localhost:5000/books/${id}  `
    );
    if (res.data.success === true) {
     toast.success(res.data.message)
     window.location.reload(false);
    }
  } catch (error) {
    console.log(error);
  }

};

const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(false);
const [kitoblar, setKitoblar] = useState([]);

const fetchBooks = async (page) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/books?page=${page}&limit=5` );
    setKitoblar(data.books);
    setCurrentPage(data.currentPage);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  }finally {
    setLoading(false);
  }
};
useEffect(()=>{
  fetchBooks(currentPage);
},[currentPage])
const handleNext = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const handlePrev = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

  return (
    <>
      <div className="max-w-lg lg:ms-auto mx-auto text-center ">
        <div className="py-16 px-7 rounded-md bg-white">
          <form className="" onSubmit={submitForm}>
            <div className="grid w-full grid-cols-1 gap-6">
              {/* <input type="text" id="title" name="title" placeholder="title *" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700 "/> */}

              <div className="md:col-span-2">
                <input
                  type="text"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Kitob titlelini yozing..."
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
              </div>
              <div className="md:col-span-2">
                <select
                  id="subject"
                  onChange={(e) => setAuthors(e.target.value)}
                  value={author}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                >
                  <option value="">Kitob muallifini tanlang</option>
                  {mualliflar.map((mualliflar) => (
                    <option key={mualliflar._id} value={mualliflar._id}>
                      {mualliflar.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <select
                  id="subject"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                >
                  <option value="">Kitob categoriyasini tanlang</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  onChange={(e) => setYear(e.target.value)}
                  value={publishedYear}
                  id="publishedYear"
                  placeholder="Kitob yilini yozing..."
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-700"
                />
              </div>

              <div className="md:col-span-2">
                <textarea
                  type="text"
                  rows="5"
                  onChange={(e) => setSumarry(e.target.value)}
                  value={summary}
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
                  Add Book +
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex flex-col items-center">
  {/* <!-- Help text --> */}
  <span className="text-sm text-gray-700 dark:text-gray-400">
      page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> to <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span> 
  </span>
  {/* <!-- Buttons --> */}
  <div className="inline-flex mt-2 xs:mt-0">
      <button onClick={handlePrev} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
      </button>
      <button onClick={handleNext} disabled={currentPage === totalPages} className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
      </button>
  </div>
</div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    kitob title
                </th>
                <th scope="col" className="px-6 py-3">
                    Tasnifi
                </th>
                <th scope="col" className="px-6 py-3">
                    Muallif
                </th>
                <th scope="col" className="px-6 py-3">
                    Categoriyasi
                </th>
               
                <th scope="col" className="px-6 py-3">
                    Delete
                </th>
                
            </tr>
        </thead>
        <tbody>
          {
            kitoblar.map((el)=>(
                <tr key={el._id} className="  odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
               
                <td className="px-6 py-4">
                        {el.title}
                    </td>
                    <td className="px-6 py-4">
                        {el.summary}
                    </td>
                    <td className="px-6 py-4">
                        {el.author.name}
                    </td>
                    <td className="px-6 py-4">
                        {el.category.name}
                    </td>
                 
                    <td className="px-6 py-4">
                    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"  onClick={() => Delete(el._id)}>Delet</button>
                   
                    </td>
                  
                  
                  
                </tr>
            ))
          }
            
            
        </tbody>
    </table>
    
</div>

    </>
  );
};
export default AddBook;
