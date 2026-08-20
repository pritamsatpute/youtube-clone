// Packages
import multer from "multer";
import path from "path";
import fs from "fs";

// Upload Directory
const UPLOAD_DIR = "uploads";

// Ensure Directory Exists
const ensureDirectory = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {
      recursive: true,
    });
  }
};

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = UPLOAD_DIR;

    switch (file.fieldname) {
      case "video":
        folder = path.join(UPLOAD_DIR, "videos");
        break;

      case "thumbnail":
        folder = path.join(
          UPLOAD_DIR,
          "thumbnails"
        );
        break;

      case "avatar":
        folder = path.join(
          UPLOAD_DIR,
          "avatars"
        );
        break;

      case "banner":
        folder = path.join(
          UPLOAD_DIR,
          "banners"
        );
        break;
    }

    ensureDirectory(folder);

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(
      file.originalname
    );

    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`;

    cb(null, filename);
  },
});

// File Filter
const fileFilter = (
  req,
  file,
  cb
) => {
  switch (file.fieldname) {
    case "video":
      if (
        file.mimetype.startsWith(
          "video/"
        )
      ) {
        return cb(null, true);
      }

      return cb(
        new Error(
          "Only video files are allowed."
        )
      );

    case "thumbnail":
    case "avatar":
    case "banner":
      if (
        file.mimetype.startsWith(
          "image/"
        )
      ) {
        return cb(null, true);
      }

      return cb(
        new Error(
          "Only image files are allowed."
        )
      );

    default:
      return cb(null, true);
  }
};

// Upload Video + Thumbnail
export const uploadVideoFiles =
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        500 * 1024 * 1024,
    },
  }).fields([
    {
      name: "video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]);

// Upload Channel Images
export const uploadChannelImages =
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  }).fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "banner",
      maxCount: 1,
    },
  ]);