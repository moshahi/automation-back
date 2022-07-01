const multer = require("multer");
const Ticket = require("../models/Ticket");
const uuid = require("uuid").v4;

exports.handleFileUpload = (req, res) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // console.log(file);
      cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}_${file.originalname}`);
    },
  });

  const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 100000 },
    storage: fileStorage,
  }).single("file");

  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "آپلود ناموفق بود ، احتمالا مشکلی از سمت سرور رخ داده است",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "آپلود فایل با موفقیت انجام شد",
        fileName: req.file.filename,
      });
    }
  });
};

exports.handleSendTicket = async (req, res) => {
  await Ticket.create(req.body)
    .then((resault) => {
      res.status(200).json({
        success: true,
        message: "تیکت با موفقیت ثبت شد",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "مشکلی از سمت سرور رخ داده است",
      });
    });
};
exports.ticketListID = async (req, res) => {
  console.log(req.params.id);
  if (req.params.id == "625c13679091f08c9f35e922") {
    await Ticket.find({})
      .then((resault) => {
        res.status(200).json({
          data: resault,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await Ticket.find({ user: req.params.id })
    .then((resault) => {
      res.status(200).json({
        data: resault,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
