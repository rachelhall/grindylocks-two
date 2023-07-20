import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import type { NextRequest, NextResponse } from "next/server";

cloudinary.config({ secure: true });

export const uploadImage = async (req: NextRequest, res: NextResponse) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const file = await new Promise((resolve, reject) => {
      const form = formidable();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
      });
      form.on("file", (formName, file) => {
        resolve(file);
      });
    });

    const data = await cloudinary.uploader.upload(file.filepath);

    res.status(200).json({ fileUrl: data.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server upload error" });
  }
};

// const getAssetInfo = async (publicId: string) => {
//   // Return colors in the response
//   const options = {
//     colors: true,
//   };

//   try {
//     // Get details about the asset
//     const result = await cloudinary.api.resource(publicId, options);
//     console.log(result);
//     return result.colors;
//   } catch (error) {
//     console.error(error);
//   }
// };
