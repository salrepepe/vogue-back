const { uploadImage } = require("../services/upload.service");

async function upload(req, res) {
  try {
    const { folder } = req.body;

    const url = await uploadImage(req.file, folder);

    res.json({
      url,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  upload,
};
