const bookModel = require("../model/bookModel");

const searchBook = async (req, res) => {
  try {
    const {query} = req.query
    let dataB = await bookModel.find({
      $or: [
        { title: { $regex: query,$options: 'i' } },
        { summary: { $regex: query,$options: 'i' } },
        { name: { $regex: query,$options: 'i' } },
      ],
    });
    res.status(200).json({success: true, dataB});
  } catch (error) {
    console.log(error);
  }
};

const addBook = async (req, res) => {
  try {
    const { title, category, author } = req.body;
    const existbook = await bookModel.findOne({ title });
    if (existbook) {
      return res
        .status(401)
        .json({ success: false, message: "Bu kitob tizimda mavjud" });
    }
  
    const newBook = await bookModel.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "kitob qo'shildi", newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "addBook apidan xatolik",
      error: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  
  try {
    const page = parseInt(req.query.page) || 1; // Sahifani oling
    const limit = parseInt(req.query.limit) || 5; // Sahifa hajmini oling
    const skip = (page - 1) * limit; // Qaysi ma'lumotlardan boshlash kerakligini hisoblash


    const books = await bookModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate("author")
      .populate("category");
    if (!books) {
      return res
        .status(404)
        .json({ success: false, message: "kitoblar mavjud emas" });
    }
    
    // Umumiy elementlar sonini hisoblash
    const total = await bookModel.countDocuments();

    res.status(200).json({
      success: true,
      message: "kitoblar success",
      Kitoblas_SONI: books.length,
     
    
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      jami_kitoblar: total,
      books,
    });
  } catch (error) {}
};

const singleBook = async (req, res) => {
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ message: 'Invalid book ID' });
  // }
  try {
    const oneBook = await bookModel
      .findById(req.params.id)
      .populate("author")
      .populate("category");
    res
      .status(200)
      .json({ success: true, message: "one book success", oneBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "singleBokk api dan xatolik",
      error: error.mesage,
    });
  }
};

const updateBook = async (req, res) => {
  const ID = req.params.id;
  const updateBook = await bookModel.findById(ID);

  if (!updateBook) {
    return res
      .status(401)
      .json({ success: false, message: "bu id da category topilmadi" });
  }
  const newUpBook = await bookModel
    .findByIdAndUpdate(updateBook, req.body, {
      new: true,
    })
    .populate("author")
    .populate("category");
  res
    .status(200)
    .json({ success: true, message: "kitob o'zgartirildi", newUpBook });
};

const deletBook = async (req, res) => {
  try {
    const ID = req.params.id;
    const deletB = await bookModel.findById(ID);
    if (!deletB) {
      return res
        .status(404)
        .json({ success: false, message: "bu id dagi kitob topilmadi" });
    }
    await bookModel.findByIdAndDelete(deletB);
    res.status(200).json({ success: true, message: "kitob o'chiril" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "deletbook apidan error",
      error: error.message,
    });
  }
};


const getBooksByCategory = async (req, res) => {

  try {
    const booksCategory = await bookModel
      .find({ category: req.params.categoryId })
      .populate("category");
    res
      .status(200)
      .json({ success: true, message: "category success", booksCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getBooksByAuthors = async (req, res) => {
  try {
    const booksAuthors = await bookModel
      .find({ author: req.params.authorId })
      .populate("author");
    res
      .status(200)
      .json({ success: true, message: "author success", booksAuthors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addBook,
  searchBook,
  getBooks,
  singleBook,
  updateBook,
  deletBook,
 
  getBooksByCategory,
  getBooksByAuthors,
 
};
