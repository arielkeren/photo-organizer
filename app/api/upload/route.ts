import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function toNodeStream(
  req: NextRequest
): Promise<NodeJS.ReadableStream & { headers: Record<string, string> }> {
  const readable = new Readable();
  readable._read = () => {};

  const buffer = Buffer.from(await req.arrayBuffer());
  readable.push(buffer);
  readable.push(null);

  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers),
  });
}

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (_name, _ext, part) => {
      return part.originalFilename || "unknown";
    },
  });

  const nodeStream = await toNodeStream(req);

  return new Promise(resolve => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.parse(nodeStream as any, (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        resolve(
          NextResponse.json(
            { message: "Error uploading file" },
            { status: 500 }
          )
        );
        return;
      }

      console.log("Uploaded files:", files);

      resolve(NextResponse.json({ files }, { status: 200 }));
    });
  });
}
