

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,

 
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {  FunnelIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'





// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function BookLists() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [kitoblar, setKitoblar] = useState([]);
  const [authors,setAuthors] = useState([])
  const [categories,setCategories] = useState([])
  const [authorSelected, setSelectedAuthor] = useState('');
  const [categorySelected, setSelectedCategory] = useState('');

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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
  useEffect(() => {
    
    getAuthors()
    getCategories()
    fetchBooksByAuthor()
    fetchBooksByCategory()
  }, []);
useEffect(()=>{
  fetchBooks(currentPage);
},[currentPage])

  const getAuthors = async()=>{
    try {
        const {data}= await axios.get("http://localhost:5000/authors")
        if(data.success === true){
           setAuthors(data.mualliflar)
        }
    } catch (error) {
        
    }
}
const getCategories = async()=>{
  try {
      const {data}= await axios.get("http://localhost:5000/categories")
      if(data.success === true){
         setCategories(data.categories)
      }
  } catch (error) {
      
  }
}
  // author bo'yicha kitoblarni olish
  const fetchBooksByAuthor = async (authorId) => {
    try {
      const response = await axios.get(`http://localhost:5000/books/author/${authorId}`);
      setKitoblar(response.data.booksAuthors);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };


    const handleAuthorChange =async (e) => {
    const authorId = e.target.value;
    setSelectedAuthor(authorId);
    if (authorId) {
      fetchBooksByAuthor(authorId);
    } 
    if(!authorId){
 
      setKitoblar();
    }
  };

  
 // category bo'yicha kitoblarni olish
 const fetchBooksByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`http://localhost:5000/books/category/${categoryId}`);
    setKitoblar(response.data.booksCategory);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};


  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      fetchBooksByCategory(categoryId);
    } else {
      
      setKitoblar([]);
    }
  };



// qidiruv filteri
const [search1,setSearch] = useState("")
const handleSearch = async(e)=>{
  const query = e.target.value;
  setSearch(query)
  if(query.length>0){
    try {
      const {data} = await axios.get(`http://localhost:5000/books/search?query=${query}`);
     
     
      setKitoblar(data.dataB); // Natijalarni state-ga yozamiz
    } catch (error) {
      console.error('Xato:', error);
    }
  } else {
    const res = await axios.get(`http://localhost:5000/books?page=${e}&limit=5`);
    setKitoblar(res.data.books); // Agar qidiruv so'zi bo'sh bo'lsa, natijalarni tozalash
  }
  
}




 

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
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {authors.map((el) => (
                    <li key={el._id}>
                      <a  className="block px-2 py-3">
                        {el.name}
                      </a>
                    </li>
                  ))}
                </ul>

             
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="menu1 flex items-baseline  justify-between border-b border-gray-200 pb-6 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
        
            <div className="relative items-center">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
              value={search1}
              onChange={handleSearch}
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kitoblar qidirish..."
              />
            </div>
            <div className=" flex items-center">
             
              <select value={categorySelected} onChange={handleCategoryChange} className="category1 mr-3 py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
  <option value=" ">All Category</option>
  {
    categories.map((cat)=>(
      <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
    ))
  }
</select>
    
<select value={authorSelected} onChange={handleAuthorChange} className=" author1 py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
  <option value=" ">All Authors</option>
  {
    authors.map((author)=>(
      <option key={author._id} value={author._id}>
      {author.name}
    </option>
    ))
  }
</select>

              
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >

                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Menu */}
              <form className="hidden lg:block ">
                <h3 className="sr-only">Categories</h3>
             
                 <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                 
                    <li >
                      <Link >akmal</Link>
                    </li>
                    <li >
                      <Link >akmal</Link>
                    </li> <li >
                      <Link >akmal</Link>
                    </li> <li >
                      <Link >akmal</Link>
                    </li> <li >
                      <Link >akmal</Link>
                    </li> <li >
                      <Link >akmal</Link>
                    </li>
                  
                </ul>

           
              </form>


  


              {/* Product grid */}
              <div className="lg:col-span-3">{/* Your content */}
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
              <div className=" grid  gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
{
loading ? (<p>loadign</p>): (
  kitoblar?.map((el)=>(
    <div key={el._id} className="relative flex w-full  flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md ml-3 mt-3">
  
    <div className="p-6">
      <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
       {el.title}
      </h6>
      <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
       {el.summary}
      </h4>
      <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
    
      </p>
     <div className='flex flex-row items-center justify-between'>
     <Link className="inline-block" to={`/singlebook/${el._id}`}>
        <button
          className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            ></path>
          </svg>
        </button>
      </Link>
      <span className='text-gray-400'>{el.publishedYear}</span>
     </div>
    </div>
  </div>
  ))
)
}


 
              </div>
              <div>
  
   
    </div>
                

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
// ****************************************************
