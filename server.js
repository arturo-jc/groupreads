const express = require("express");
const connectDB = require("./connectDB");

// Routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth")
const groupRoutes = require("./routes/groups");
const bookRoutes = require("./routes/books");
const recordRoutes = require("./routes/records")
const markerRoutes = require("./routes/markers");
const bookmarkRoutes = require("./routes/bookmarks");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();

connectDB();

app.use(express.json())

// Routing
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/groups/:groupId/records", recordRoutes);
app.use("/api/groups/:groupId/records/:recordId/bookmarks", bookmarkRoutes);
app.use("/api/groups/:groupId/records/:recordId/markers", markerRoutes)
app.use("/api/groups/:groupId/records/:recordId/posts", postRoutes);
app.use("/api/groups/:groupId/records/:recordId/posts/:postId/comments", commentRoutes);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on ${port}`));