import formidable from "formidable";
import type { NextApiRequest } from "next";
import { join } from "path";
import { format } from "date-fns";
import { mkdir, stat } from "fs/promises";
import mime from "mime";



export const parseForm = async (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise(async (resolve, reject) => {
        const uploadDir = join(
            process.env.ROOT_DIR || process.cwd(),
            `/uploads/${format(Date.now(), "dd-MM-Y")}`
        );

        try {
            await stat(uploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(uploadDir, { recursive: true });
            } else {
                console.error(e);
                reject(e);
                return;
            }
        }

        const form = formidable({
            maxFiles: 2,
            maxFileSize: 1024 * 1024, // 1mb
            uploadDir,
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const filename = `${part.name || "unknown"}-${uniqueSuffix}.${mime.extension(part.mimetype || "") || "unknown"
                    }`;
                return filename;
            },
            filter: (part) => {
                return (
                    part.name === "media" && (part.mimetype?.includes("image") || false)
                );
            },
        });

        form.parse(req, function (err, fields, files) {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};