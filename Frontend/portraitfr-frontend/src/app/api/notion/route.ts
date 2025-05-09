// app/api/notion/route.ts
import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"
import { randomUUID } from "crypto"
import path from "path"
import fs from "fs/promises"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const nom = formData.get("nom") as string
    const email = formData.get("email") as string
    const instagram = formData.get("instagram") as string
    const ville = formData.get("ville") as string
    const categorie = formData.get("categorie") as string
    const autorisation = formData.get("autorisationParticipation") === "true"
    const file = formData.get("photo") as File | null

    if (!nom || !email || !instagram || !ville || !categorie || !file || !autorisation) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
    }

    // Vérification taille fichier
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "L'image ne doit pas dépasser 25 Mo." }, { status: 400 })
    }

    // Nom unique pour le fichier
    const ext = file.name.split(".").pop() || "jpg"
    const filename = `${Date.now()}-${randomUUID()}.${ext}`
    const uploadPath = path.join(process.cwd(), "public/uploads", filename)

    // Sauvegarde locale du fichier
    const arrayBuffer = await file.arrayBuffer()
    await fs.writeFile(uploadPath, Buffer.from(arrayBuffer))

    // URL publique vers l’image (à adapter selon ton domaine)
    const fileUrl = `https://awards.portraitfr.fr/uploads/${filename}`

    // Création de la page dans Notion
    const notionResponse = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Nom: { title: [{ text: { content: nom } }] },
        Email: { email },
        Instagram: { rich_text: [{ text: { content: instagram } }] },
        Ville: { rich_text: [{ text: { content: ville } }] },
        Catégorie: { select: { name: categorie } },
        Autorisation: { checkbox: autorisation },
        Date: { date: { start: new Date().toISOString() } },
        Photo: {
          files: [
            {
              name: filename,
              external: { url: fileUrl },
            },
          ],
        },
      },
    })

    return NextResponse.json({ success: true, message: "Participation enregistrée", id: notionResponse.id }, { status: 200 })
  } catch (err) {
    console.error("Erreur serveur :", err)
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
