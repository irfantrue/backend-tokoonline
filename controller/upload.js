const fs = require(`fs`);
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  uploadImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.send({
          success: false,
        });
      } else {
        const response = {
          ...req.file,
          location: "/images/" + req.file.filename,
        };
        return res.send({
          status: 201,
          msg: "success",
          data: response,
        });
      }
    } catch (err) {
      return res.status(500).json({ status: "error", message: err });
    }
  },

  deleteImage: async (req, res) => {
    try {
      const { image } = req.body;
      fs.unlink(`./public/images/${image}`, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ status: "error", message: err.message });
        }

        return res.json({
          status: 200,
          message: `Deleted ${image}`,
        });
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error });
    }
  }
}