const express = require("express");
const router = express.Router();
const modelBlogs = require("../model/modelBlogs");
const cloudinary = require("cloudinary");
const options = {
  cloud_name: "dotthan123",
  api_key: "462253399385342",
  api_secret: "FkLA38o2GlnqPwKXY3pe5MvH1TM"
};

router.get("/", async (req, res) => {
  let response = await modelBlogs.getAllBlogs();
  res.send(response);
});

router.get("/blog/:id", async (req, res) => {
  let { id } = req.param;
  let response = await modelBlogs.getBlogById(id);
  res.send(response);
});

router.get("/blogsbypage", async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let response = await modelBlogs.getBlogsByPage(page, limit);
  res.send(response);
});
/******************************************************************** */
router.post("/", async (req, res) => {
  let defaultImgPath =
    "https://res.cloudinary.com/dotthan123/image/upload/v1568818993/sample.jpg";
  let imgPath = defaultImgPath;
  if (req.files !== null && typeof req.files !== "undefined") {
    let file = req.files.fileImage;
    imgPath = await new Promise(function(resolve, reject) {
      cloudinary.v2.uploader
        .upload_stream(options, (err, result) => {
          if (err) {
            console.log(err.message);
            reject(defaultImgPath);
          } else {
            resolve(result.url);
          }
        })
        .end(file.data);
    });
  }
  let { title, description, timeShot } = req.body;
  let arr = timeShot.split("-");
  timeShot = arr[2] + "-" + arr[1] + "-" + arr[0];
  await modelBlogs.createBlog(title, description, imgPath, timeShot);
  res.sendStatus(200);
});
/**************************************************************************/

module.exports = router;
