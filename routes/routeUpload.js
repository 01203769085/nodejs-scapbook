const express = require('express');
const router = express.Router();
const cors = require('cors');
const cloudinary = require("cloudinary");
const modelBlogs = require('../model/modelBlogs');

const options = {
    cloud_name: "dotthan123",
    api_key: "462253399385342",
    api_secret: "FkLA38o2GlnqPwKXY3pe5MvH1TM"
};
router.use(cors());
router.use(express.urlencoded({extended:false}))
router.use(express.json())

router.get("/",(req,res)=>{
    res.sendStatus(200);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    let defaultImgPath =
        "https://res.cloudinary.com/dotthan123/image/upload/v1568818993/sample.jpg";
    let imgPath = defaultImgPath;
    if (req.files !== null && typeof req.files !== "undefined") {
        let file = req.files;             
        imgPath = await new Promise(function (resolve, reject) {
            cloudinary.v2.uploader
                .upload_stream(options, (err, result) => {                    
                    if (err) {
                        console.log(err.message);                        
                        reject(defaultImgPath);
                    } else {
                        resolve(result.url);
                    }
                })
                .end(file.files.data);
        });        
    }
    let { title, description, timeShot } = req.body;
    let arr = timeShot.split("-");
    timeShot = arr[2] + "-" + arr[1] + "-" + arr[0];

    let timeUp = new Date();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    timeUp = dd + '-' + mm + '-' + yyyy;
    await modelBlogs.createBlog(title, description, imgPath, timeShot, timeUp);
    console.log(req);
    res.sendStatus(200);    
});

// router.post("/",(req,res)=>{
//     console.log(req.body);
//     res.sendStatus(200)
// });

module.exports = router;