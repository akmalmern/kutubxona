import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBook from "./pages/book/AddBook";
import AddAuthor from "./pages/author/AddAuthor";
import BookLists from "./pages/book/BookLists";
import AddCategory from "./pages/category/AddCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import Navbar from "./components/Navbar";
import UpdateAuthor from "./pages/author/UpdateAuthor";
import SingleBook from "./pages/book/SingleBook";
function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1500}/>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<BookLists />} />
        
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/singlebook/:id" element={<SingleBook />} />
       

        <Route path="/addcat" element={<AddCategory />} />
        <Route path="/updatecat/:id" element={<UpdateCategory />} />

        <Route path="/addauthor" element={<AddAuthor/>}/>
        <Route path="/updateauthor/:id" element={<UpdateAuthor/>}/>


      </Routes>
    </div>
  );
}
export default App;
