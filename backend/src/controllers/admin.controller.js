import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";

const uploadToCloudinary = async (file) => {
    const options = {
        resource_type: "auto",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options); // Use `file.tempFilePath`
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error in uploading to Cloudinary");
    }
};

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all files" });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // Upload files to Cloudinary in parallel
        const [audioUrl, imageUrl] = await Promise.all([
            uploadToCloudinary(audioFile),
            uploadToCloudinary(imageFile),
        ]);

        // Create song in the database
        const song = await Song.create({
            title,
            artist,
            imageUrl,
            audioUrl,
            duration,
            albumId: albumId || null,
        });

        await song.save();

        if(albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id}
            })
        }

        res.status(201).json({ message: "Song created successfully", song });
    } catch (error) {
        console.log("Error in Create Song Controller", error);
        next(error);
    }
};

export const deleteSong = async (req, res, next) => {
    const songId = req.params.id;

    try {
        const song = await Song.findById(songId);
        //if songs belongs to an album, update the album's song array
        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id},
            })
        }
        await Song.findByIdAndDelete(songId);
        res.status(200).json({ message: "Song deleted successfully"});
    } catch (error) {
        console.log("Error in deleting song", error)
        next(error)
    }
};
export const createAlbum = async (req, res, next) => {
    try {
        const {title, artist, releaseYear} = req.body;
        const imageFile = req.files.imageFile;
        if (!title || artist || releaseYear || !imageFile) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const imageUrl = uploadToCloudinary(imageUrl);

        const album = new Album({
            title,
            artist, 
            imageUrl,
            releaseYear
        })
        
        await album.save();
        res.status(200).json({message: "album created successfully", album});
    } catch (error) {
        console.log("Error in create Album", error); 
        next(error);
    }
};
export const deleteAlbum = async (req, res, next) => {
    try {
        const albumsId = req.params.id;
        await Song.deleteMany({albumId: albumsId});
        await Album.findByIdAndDelete(albumsId);
    } catch (error) {
        console.log("Error in DeleteAlbum", error);
        next(error);
    }
};

export const checkAdmin = (req, res, next) => {
    res.status(200).json({ admin: true });
};
