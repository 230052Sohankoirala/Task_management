import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

function uploadBuffer(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "taskmanagement", resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    Readable.from(file.buffer).pipe(stream);
  });
}

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No file uploaded");

  const result = await uploadBuffer(req.file);
  res.status(201).json({
    name: req.file.originalname,
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
  });
});
