import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({ secure: true })

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({
            data: null,
            error: "Method Not Allowed",
        });
        return;
    }
    try {
        const form = formidable({ maxFiles: 1 })
        form.parse(req, (err, _fields, files) => {
            if (err) {
                res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
                res.end(String(err));
                return;
            }
            if (files.file && Array.isArray(files.file)) {
                files.file.forEach(async (file) => {
                    const cloudinaryResponse = await cloudinary.uploader.upload(file.filepath)
                    res.status(200).json({ filePath: cloudinaryResponse.secure_url })
                })
            }
        });
    } catch (e) {
        res.status(500).json({ data: null, error: e });
    }
}


export const config = {
    api: {
        bodyParser: false,
    },
};


export default handler;