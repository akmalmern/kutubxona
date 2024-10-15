const categoryModel = require("../model/categoryModel");

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.findOne({ name });
    if (category) {
      return res.status(404).json({ success: false, message: "bu tzimda bor" });
    }
    const newCategory = await categoryModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "category tzimga qoshildi",
       newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "addCategory error ",
      error: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      return res
        .status(404)
        .json({ success: false, message: "categoryalar mavjud emas" });
    }
    res.status(200).json({
      success: true,
      message: "categoriyalar",
      categoriesLenght: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "ategory api dan xatolik",
      error: error.message,
    });
  }
};

const singleCategory = async (req, res) => {
  try {
    const oneCatId = req.params.id;
    const oneCat = await categoryModel.findById(oneCatId);
    res
      .status(200)
      .json({ success: true, message: "one categorey success", oneCat });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "one category api dan xatolik",
      error: error,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const updCatID = req.params.id;
    const updCat = await categoryModel.findById(updCatID);
    if (!updCat) {
      return res
        .status(401)
        .json({ success: false, message: "bu id da category topilmadi" });
    }
    const newCat = await categoryModel.findByIdAndUpdate(updCat, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, message: "ozgartirildi", newCat });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "update apidan error", error });
  }
};

const deletCategory = async (req, res) => {
  try {
    const delCatID = req.params.id;
    const delCat = await categoryModel.findById(delCatID);
    if (!delCat) {
      return res
        .status(401)
        .json({ success: false, message: "bu id da category topilmadi" });
    }
    await categoryModel.findByIdAndDelete(delCat);
    res.status(200).json({ success: true, message: "categdiory o'chiril" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "delet apidan error", error });
  }
};

module.exports = {
  addCategory,
  getCategory,
  singleCategory,
  updateCategory,
  deletCategory,
};
