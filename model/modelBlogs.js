let username = "YE6uGOG71E";
let password = "YVmffVRWY4";
let databasename = "YE6uGOG71E";
let host = "remotemysql.com";
let port = 3306;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(databasename, username, password, {
  host,
  dialect: "mysql",
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connected database !!!`);
  })
  .catch(e => {
    console.log(`Fail to connect database !!!`);
  });

const Blogs = sequelize.define("blog", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeShot: {
    type: Sequelize.STRING,
    allowNull: false
  },
  timeUp: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Blogs.sync({ force: true });

async function createBlog(title, description, url, timeShot, timeUp) {
  await Blogs.create({
    title,
    description,
    url,
    timeShot,
    timeUp
  });
}

async function getAllBlogs() {
  let data = await Blogs.findAll().catch(e => e);
  return data;
}
async function getRandomBlogs(countblogs){
 let  limit = parseInt(countblogs.limit); 
  let data = await Blogs.findAll({
    order: Sequelize.literal('rand()'),   
    limit 
  }).catch(e=>e);
  console.log(data);
  return data;
}
async function getBlogById(id) {  
  let data = await Blogs.findAll({
    where: {
      id
    }
  }).catch(e => e);  
  return data;
}

async function getBlogsByPage(page, limit) {
  let data = await Blogs.findAll({
    offset: page,
    limit
  }).catch(e => e);
  return data;
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByPage,
  getRandomBlogs
};
