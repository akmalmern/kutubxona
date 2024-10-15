const authorModel = require("../model/authorModel");

const addAuthor = async (req, res) => {
  try {
    const { name, biography } = req.body;
    const muallif = await authorModel.findOne({ name });
    if (muallif) {
      return res
        .status(404)
        .json({ success: false, message: "bu muallif tzimda bor" });
    }
    const newMuallif = await authorModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "muallif tzimga qoshildi",
      newMuallif,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "addAuthors ctr dan  error ",
      error: error.message,
    });
  }
};

const getAuthors = async (req, res) => {
  try {
    const mualliflar = await authorModel.find();
    if (!mualliflar) {
      return res
        .status(404)
        .json({ success: false, message: "mualliflar mavjud emas" });
    }
    res.status(200).json({
      success: true,
      message: "mualliflar success",
      mualliflar_soni: mualliflar.length,
      mualliflar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "get muallif api dan xatolik",
      error: error.message,
    });
  }
};

const singleAuthor = async (req, res) => {
  try {
    const oneID = req.params.id;
    const muallif = await authorModel.findById(oneID);
    res
      .status(200)
      .json({ success: true, message: "muallif success", muallif });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "one Author api dan xatolik",
      error: error.message,
    });
  }
};
const updateAuthor = async (req, res) => {
  try {
    const muallifOne = req.params.id;
    const newMuallif = await authorModel.findById(muallifOne);
    if (!newMuallif) {
      return res
        .status(401)
        .json({ success: false, message: "bu id da muallif topilmadi" });
    }
    const newM = await authorModel.findByIdAndUpdate(newMuallif, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, message: "ozgartirildi", newM });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "update apidan error",
      error: error.message,
    });
  }
};

const deletAuthor = async (req, res) => {
  try {
    const delID = req.params.id;
    const del = await authorModel.findById(delID);
    if (!del) {
      return res
        .status(401)
        .json({ success: false, message: "bu id da muallif topilmadi" });
    }
    await authorModel.findByIdAndDelete(del);
    res.status(200).json({ success: true, message: "muallif o'chiril" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "delet apidan error",
      error: error.message,
    });
  }
};

module.exports = {
  addAuthor,
  getAuthors,
  singleAuthor,
  updateAuthor,
  deletAuthor,
};
