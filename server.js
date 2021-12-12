const express = require("express");
const connectDB = require("./connectDB");

// Routes
const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const bookRoutes = require("./routes/books");
const markerRoutes = require("./routes/markers");
const bookmarkRoutes = require("./routes/bookmarks");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();

connectDB();

// Routing
app.use("/api/users", userRoutes);
api.use("/api/groups", groupRoutes);
api.use("/api/groups/:groupId/books", bookRoutes);
api.use("/api/groups/:groupId/books/:bookId/bookmarks", bookmarkRoutes);
api.use("/api/groups/:groupId/books/:bookId/markers", markerRoutes)
api.use("/api/groups/:groupId/books/:bookId/posts", postRoutes);
api.use("/api/groups/:groupId/books/:bookId/posts/:postId", commentRoutes);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on ${port}`));