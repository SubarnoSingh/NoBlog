require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const Blog = require("./models/blog")



const app = express();
const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URI)
    .then((e) => console.log("Mongodb connected"));

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

const { checkForAuthenticationCookie } = require("./middlewares/authentication");


app.set("view engine" ,"ejs");
app.set("views", path.resolve("./views"));


app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use(express.static(path.resolve('./public')))
app.get("/" ,async (req , res) => {
    const allBlogs = await (await Blog.find({}));
    res.render("home" , {
        user: req.user,
        blogs: allBlogs,
    })
})

app.use("/user", userRouter);
app.use("/blog" , blogRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));