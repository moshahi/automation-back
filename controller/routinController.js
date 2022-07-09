const Routins = require("../models/Routins");
const RoutinsRQ = require("../models/RoutinsRQ");
const multer = require("multer");
const { array } = require("yup");
const uuid = require("uuid").v4;

exports.createRoutins = async (req, res) => {
  // console.log(req.body);
  try {
    const { routinName, requestUsers, confirmationUsers, userCreated } =
      req.body;
    await Routins.routinsValidation(req.body);
    await Routins.create({
      routinName,
      requestUsers,
      confirmationUsers,
      userCreated,
    })
      .then((response) => {
        res.status(201).json({ success: true, message: "روال ساخته شد" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ success: false, message: "مشکلی از سمت سرور رخ داده است" });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.newRoutin = async (req, res) => {
  try {
    RoutinsRQ.create(req.body)
      .then((resault) => {
        res.status(200).json({
          success: true,
          message: "درخواست با موفقیت ثبت شد",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "مشکلی از سمت سرور رخ داده است",
        });
      });
  } catch (error) {
    console.log(error);
  }
};

exports.handleUsersRoutin = (req, res) => {
  Routins.find({})
    .then((resualt) => {
      res.status(200).json({ success: true, data: resualt });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: "مشکلی پیش آمده است" });
    });
};

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

exports.routinsListID = async (req, res) => {
  await RoutinsRQ.find({ userCreated: req.params.id })
    .populate("userCreated")
    .then((resault) => {
      res.status(200).json({
        data: resault,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.routinsList = async (req, res) => {
  await Routins.findById(req.params.id)
    .then((response) => {
      res.status(200).json({
        success: true,
        data: response,
      });
    })
    .catch((err) => console.log(err));
};
exports.currentRoutins = async (req, res) => {
  let finalRQ = [];
  await RoutinsRQ.find({ confirm: "none" })
    .populate("userCreated")
    .then((resualt) => {
      resualt.forEach((RQ) => {
        // let confirm = RQ.routin.confirmationUsers.some(
        //   (item) => item.userID === req.body.id && item.confirm === false
        // );

        // if (confirm) {
        //   finalRQ.push(RQ);
        // }

        let confirm =
          RQ.routin.confirmationUsers.filter((item) => item.confirm == false)[0]
            .userID === req.body.id;

        if (confirm) {
          finalRQ.push(RQ);
        }
        // for (val of RQ.routin.confirmationUsers) {
        //   if (val.userID === req.body.id && val.confirm === false) {
        //     finalRQ.push(RQ);
        //     break;
        //   }
        // }
        //! if (
        //   !RQ.routin.confirmationUsers.every(
        //!     (item) => !(item.userID === req.body.id && item.confirm === false)
        //!   )
        //! ) {
        //!   finalRQ.push(RQ);
        //! }
        // RQ.routin.confirmationUsers.forEach((val) => {
        //   if (val.userID === req.body.id && val.confirm === false) {
        //     finalRQ.push(RQ);
        //   }
        // });
      });
    })
    .catch((err) => console.log(err));
  res.json(finalRQ);
};

exports.showRoutins = async (req, res) => {
  await RoutinsRQ.findById(req.params.RQID)
    .then((result) => res.status(200).json({ success: true, data: result }))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "اروری از سمت سرور رخ داده است" });
    });
};

exports.routinConfirmation = async (req, res) => {
  console.log("req.body:", req.body);

  let routins = [];
  var confirmationArr = [];
  var messageArr = [];

  await RoutinsRQ.findById(req.body.routinsID).then((result) => {
    confirmationArr.push(result.routin.confirmationUsers);
    routins.push(result.routin);
    // console.log("result:", result);
    let newMSG = { userID: req.body.id, message: req.body.text };
    messageArr = result.messages;
    messageArr.push(newMSG);
  });

  console.log("confirmationArr: ", confirmationArr);
  console.log("messageArr: ", messageArr);

  if (req.body.confirm == "confirm") {
    confirmationArr.forEach((item) => {
      if (item.confirm === false && item.userID === req.body.id) {
        confirmationArr.push(item);
      }
    });
    if (confirmationArr.length > 0) {
      confirmationArr[0][0].confirm = true;
    }
    routins.confirmationUsers = confirmationArr;

    await RoutinsRQ.findByIdAndUpdate(req.body.routinsID, {
      routin: routins[0],
      messages: messageArr,
    })
      .then((resualt) => {
        res.status(200).json({ message: "روال با موفقیت تایید شد." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "ظاهرا مشکلی رخ داده است . با مدیر سیستم تماس بگیرید.",
        });
      });
  }

  if (req.body.confirm == "disapproval") {
    await RoutinsRQ.findByIdAndUpdate(req.body.routinsID, {
      confirm: "disapproval",
    })
      .then((resualt) => {
        res.status(200).json({ message: "روال با موفقیت عدم تایید شد." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "ظاهرا مشکلی رخ داده است . با مدیر سیستم تماس بگیرید.",
        });
      });
  }
};
