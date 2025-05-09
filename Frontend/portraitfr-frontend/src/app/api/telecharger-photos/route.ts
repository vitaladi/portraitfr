// app/api/telecharger-photos/route.ts
import { NextRequest } from "next/server"
import path from "path"
import fs from "fs"
import archiver from "archiver"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")

  // ✅ Vérification du token admin
  if (token !== `Bearer ${process.env.ADMIN_DOWNLOAD_TOKEN}`) {
    return new Response("Non autorisé", { status: 401 })
  }

  const uploadsPath = path.join(process.cwd(), "public", "uploads")
  const files = fs.readdirSync(uploadsPath).filter(f =>
    /\.(jpe?g|png)$/i.test(f)
  )

  if (files.length === 0) {
    return new Response("Aucune photo trouvée", { status: 404 })
  }

  const archive = archiver("zip", { zlib: { level: 9 } })
  const chunks: Buffer[] = []

  archive.on("data", chunk => chunks.push(chunk))
  archive.on("error", err => {
    throw err
  })

  for (const file of files) {
    archive.file(path.join(uploadsPath, file), { name: file })
  }

  await archive.finalize()

  return new Response(Buffer.concat(chunks), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=photos.zip"
    }
  })
}
