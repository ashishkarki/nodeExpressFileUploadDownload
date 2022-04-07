const express = require("express");
const fileUpload = require("express-fileupload");

const uploadRouter = require("./routes/upload");

// the app
const app = express();

// middlewares
// 1. for uploading files to our server
app.use(
  fileUpload({
    // The option will let express-fileupload create the
    // (parent) directory path for mv() method when it doesn’t exist
    createParentPath: true,

    /**
     * set the file size limit to 1 MB and abort the request process by
     * returning an HTTP 413 response when the file exceeds the limit.
     */
    limits: {
      fileSize: 1024 * 1024, // 1 MB in bytes
    },
    abortOnLimit: true,
  })
);

// the routes
app.use("/upload", uploadRouter);
app.use("/download", require("./routes/download"));

// listen
app.listen(3000, () => {
  console.log("listening on port 3000");
});
