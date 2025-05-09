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

    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "L'image ne doit pas dépasser 25 Mo." }, { status: 400 })
    }

    const ext = file.name.split(".").pop() || "jpg"
    const filename = `${Date.now()}-${randomUUID()}.${ext}`
    const uploadPath = path.join(process.cwd(), "public/uploads", filename)

    const arrayBuffer = await file.arrayBuffer()
    await fs.writeFile(uploadPath, Buffer.from(arrayBuffer))

    const fileUrl = `https://awards.portraitfr.fr/uploads/${filename}`

    const databaseId = process.env.NOTION_DATABASE_ID!

    // 🔍 Étape 1 : récupérer les propriétés de la base
    const db = await notion.databases.retrieve({ database_id: databaseId }) as any
    const villeProperty = db.properties?.Ville

    if (!villeProperty || villeProperty.type !== "select") {
      return NextResponse.json({ error: "La propriété 'Ville' n'est pas un select dans Notion." }, { status: 500 })
    }

    const existingOptions = villeProperty.select.options
    const villeExists = existingOptions.some((opt: any) => opt.name.toLowerCase() === ville.toLowerCase())

    // ✅ Étape 2 : si la ville n'existe pas, on l’ajoute
    if (!villeExists) {
      await notion.databases.update({
        database_id: databaseId,
        properties: {
          Ville: {
            select: {
              options: [...existingOptions, { name: ville }],
            },
          },
        },
      })
    }

    // ✅ Étape 3 : créer la page dans Notion
    const notionResponse = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nom: { title: [{ text: { content: nom } }] },
        Email: { email },
        Instagram: { rich_text: [{ text: { content: instagram } }] },
        Ville: { select: { name: ville } },
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

    return NextResponse.json(
      { success: true, message: "Participation enregistrée", id: notionResponse.id },
      { status: 200 }
    )
  } catch (err) {
    console.error("Erreur serveur :", err)
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
