const express = require("express");
const router = express.Router();
const modelBlogs = require("../model/modelBlogs");

router.get("/", async (req, res) => {
  let response = await modelBlogs.getAllBlogs();  
  res.send(response);    
});

router.get("/blog/:id", async (req, res) => {
  let { id } = req.params;  
  let response = await modelBlogs.getBlogById(id);
  res.send(response);
});

router.get("/randomblog/:limit", async (req,res)=>{
  let limit = req.params;
  let response = await modelBlogs.getRandomBlogs(limit);
  res.send(response);
});

router.get("/blogsbypage", async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  let response = await modelBlogs.getBlogsByPage(page, limit);
  res.send(response);
});

module.exports = router;
