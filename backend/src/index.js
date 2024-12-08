import express from "express";
import { config } from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./database/connectDB.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //parse the data
app.use(clerkMiddleware()); //used for the clerk authentication

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
	})
);


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/app/v1/admin", adminRoutes);
app.use("/api/v1/song", songRoutes);
app.use("/api/v1/album", albumRoutes);
app.use("/api/v1/stats", statsRoutes);

// error handler middleware
app.use((err, req, res, next) => {
    res
        .status(500)
        .json({
            message:
                process.env.NODE_ENV === "production"
                    ? "Internal Server Error"
                    : err.message,
        });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
