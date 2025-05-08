// app/api/submit/route.ts
import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

// Interface pour le typage des fichiers
interface NotionFileUpload {
  name: string;
  url: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validation des données requises
    if (!body.nom || !body.email || !body.instagram || !body.ville || !body.categorie) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      )
    }

    if (!body.autorisationParticipation) {
      return NextResponse.json(
        { error: "Vous devez accepter les conditions de participation" },
        { status: 400 }
      )
    }

    // Traitement de l'image
    let fileUrl: string | null = null
    if (body.photoBase64) {
      try {
        const matches = body.photoBase64.match(/^data:(.+);base64,(.+)$/)
        if (!matches || matches.length !== 3) {
          return NextResponse.json(
            { error: "Format d'image invalide" },
            { status: 400 }
          )
        }

        const mimeType = matches[1]
        const base64Data = matches[2]
        const fileBuffer = Buffer.from(base64Data, 'base64')

        // Vérification de la taille (25MB max pour les comptes payants)
        if (fileBuffer.length > 25 * 1024 * 1024) {
          return NextResponse.json(
            { error: "La taille de l'image ne doit pas dépasser 25MB" },
            { status: 400 }
          )
        }

        // Solution alternative pour l'upload via API Pages
        // On va stocker l'image directement dans la propriété files
        const fileExtension = mimeType.split('/')[1] || 'jpg'
        fileUrl = `data:${mimeType};base64,${base64Data}`

      } catch (error) {
        console.error("Erreur lors du traitement de l'image:", error)
        return NextResponse.json(
          { error: "Erreur lors du traitement de l'image" },
          { status: 500 }
        )
      }
    }

    // Construction des propriétés Notion
    const pageProperties = {
      Nom: {
        title: [{ text: { content: body.nom } }]
      },
      Email: {
        email: body.email
      },
      Instagram: {
        rich_text: [{ text: { content: body.instagram } }]
      },
      Ville: {
        rich_text: [{ text: { content: body.ville } }]
      },
      Catégorie: {
        select: { name: body.categorie }
      },
      Autorisation: {
        checkbox: body.autorisationParticipation
      },
      Date: {
        date: { start: new Date().toISOString() }
      },
      // Removed Photo from properties as it is incompatible
    }

    // Création de la page dans Notion
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: pageProperties,
      ...(fileUrl && {
        children: [
          {
            object: "block",
            type: "image",
            image: {
              type: "external",
              external: { url: fileUrl }
            }
          },
          {
            object: "block",
            type: "file",
            file: {
              type: "external",
              external: { url: fileUrl }
            }
          }
        ]
      })
    })
    console.log("Page créée avec succès:", response)
    return NextResponse.json(
      { message: "✅ Participation envoyée avec succès !" },
      { status: 200 }
    )
  } catch (error) {
    // Gestion des erreurs
    if (error instanceof Error) {
    console.error("Erreur serveur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la soumission" },
      { status: 500 }
    )
  }
}
}
export const dynamic = "force-dynamic"