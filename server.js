const express = require("express");
const connectDB = require("./connectDB");
const methodOverride = require("method-override");
const routes = require("./routes/");

const app = express();
connectDB();
app.use(express.json())
app.use(methodOverride("_method"))

app.use("/api/users", routes.users);
app.use("/api/auth", routes.auth);
app.use("/api/books", routes.books);
app.use("/api/groups", routes.groups);
app.use("/api/groups/:groupId/records", routes.records);
app.use("/api/groups/:groupId/records/:recordId/bookmarks", routes.bookmarks);
app.use("/api/groups/:groupId/records/:recordId/markers", routes.markers)
app.use("/api/groups/:groupId/records/:recordId/posts", routes.posts);
app.use("/api/groups/:groupId/records/:recordId/posts/:postId/comments", routes.comments);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on ${port}`));