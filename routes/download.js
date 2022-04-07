/**
 * The https module allows you to create an HTTPS request using NodeJS, while the fs module grants you access to the filesystem.
 * By combining both modules, you can create an HTTPS GET request and write the response stream as a new file in your filesystem.
 * Reference: https://sebhastian.com/nodejs-download-file/
 */
const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");

// the router
const downloadRouter = express.Router();

downloadRouter.get("/", (_req, routerRes) => {
  const urlOfFileToDwld =
    "https://th.bing.com/th/id/R.86a095f298ede4b3bcd0c5350fee1099?rik=Bi9roiOqcjFt2g&riu=http%3a%2f%2fnodejs.developpez.com%2ftutoriels%2fjavascript%2fnode-js-livre-debutant%2fimages%2fnodejs.png&ehk=ubVqZTzrybzL9wCnub5FWXfyGQsjqaoAX%2bPlZEE7tyw%3d&risl=&pid=ImgRaw&r=0";

  https.get(urlOfFileToDwld, (httpsResponse) => {
    const pathAndNameOfFileToSave = path.join(
      __dirname,
      "../downloads",
      `downloaded-file-${Date.now()}.png`
    );

    // create a writable stream
    const writeStream = fs.createWriteStream(pathAndNameOfFileToSave);

    /**
     * Finally, send the GET response data stream to the writeStream object using the pipe() method.
     * When the writeStream sends the finish signal, close the writeStream object.
     */
    httpsResponse.pipe(writeStream);

    writeStream.on("finish", () => {
      writeStream.close();

      return routerRes
        .status(200)
        .send(`The file was downloaded to ${pathAndNameOfFileToSave}`);
    });
  });
});

module.exports = downloadRouter;
