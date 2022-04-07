/**
 * Reference: https://sebhastian.com/express-fileupload/
 */

const express = require("express");
const path = require("path");

// the router
const uploadRouter = express.Router();

// the routes
// 1. show the form to upload a file
uploadRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// 2. upload the file
uploadRouter.post("/uploader", (req, res) => {
  // check if a file was uploaded
  if (!req.files) {
    res.status(400).send("No file was uploaded");
    return;
  }

  // get the file
  // NOTE: the files property is attached to the 'req' object by expres-fileupload
  const file = req.files.myFile; // the name of the input field (in index.html) must match the name of the attribute in the html form
  const picture = req.files.myPicture;

  // some validation
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const extensionStr = path.extname(file.name);

  // TODO: also check validity of picture above
  if (!allowedExtensions.includes(extensionStr)) {
    return res
      .status(422)
      .send("Invalid file format..can only upload images for now!!");
  }

  // the location in this app/server where the file will be saved
  const fileUploadPath = path.join(__dirname, "../uploads", file.name);

  // use the mv() method to place the file somewhere on your server
  file.mv(fileUploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send(`The file ${file.name} was uploaded!`);
    }
  });
});

// exporting
module.exports = uploadRouter;
