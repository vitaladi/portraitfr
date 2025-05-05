import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

const databaseId = process.env.NOTION_DATABASE_ID!

export async function POST(req: Request) {
  const body = await req.json()

  try {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nom: {
          title: [{ text: { content: body.nom } }],
        },
        Email: {
          email: body.email,
        },
        Instagram: {
          rich_text: [{ text: { content: body.instagram } }],
        },
        Ville: {
          rich_text: [{ text: { content: body.ville } }],
        },
        Catégorie: {
          select: { name: body.categorie },
        },
        "Photo URL": {
          url: body.photoUrl,
        },
        Autorisation: {
          checkbox: body.autorisationParticipation,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Erreur Notion API :", err)
    return NextResponse.json({ success: false, error: "Erreur lors de l’envoi" }, { status: 500 })
  }
}
