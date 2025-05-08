import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

// Augmente la limite à 10 Mo (valable uniquement en dev/test local)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
}

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

const databaseId = process.env.NOTION_DATABASE_ID!

export async function POST(req: Request) {
  try {
    const body = await req.json()

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
        Autorisation: {
          checkbox: body.autorisationParticipation,
        },
      },
      children: body.photoUrl
        ? [
            {
              object: "block",
              type: "image",
              image: {
                type: "external",
                external: {
                  url: body.photoUrl,
                },
              },
            },
          ]
        : [],
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Erreur Notion API :", err)
    return NextResponse.json({ success: false, error: "Erreur lors de l’envoi" }, { status: 500 })
  }
}
