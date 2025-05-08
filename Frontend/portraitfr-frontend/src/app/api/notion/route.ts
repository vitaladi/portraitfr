// app/api/notion/route.ts
import { Client } from "@notionhq/client"
import { NextResponse } from "next/server"

const notion = new Client({ auth: process.env.NOTION_TOKEN })


export async function POST(request: Request) {
    
  try {
    interface PageProperties {
        Nom: {
          title: Array<{
            text: { content: string }
          }>
        };
        Email: {
          email: string
        };
        Instagram: {
          rich_text: Array<{
            text: { content: string }
          }>
        };
        Ville: {
          rich_text: Array<{
            text: { content: string }
          }>
        };
        Catégorie: {
          select: { name: string }
        };
        Autorisation: {
          checkbox: boolean
        };
        Date: {
          date: { start: string }
        };
        Photo?: {
          files: Array<{
            name: string;
            external: { url: string };
          }>
        };
      }
    // Configuration du timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

    // Récupération et validation des données
    const body = await request.json()
    
    // Validation des champs obligatoires
    const requiredFields = ['nom', 'email', 'instagram', 'ville', 'categorie', 'autorisationParticipation']
    for (const field of requiredFields) {
      if (!body[field]) {
        throw new Error(`Le champ ${field} est requis`)
      }
    }

    // Traitement de l'image
    let fileUrl: string | null = null
    if (body.photoBase64) {
      const matches = body.photoBase64.match(/^data:(.+);base64,(.+)$/)
      if (!matches || matches.length !== 3) {
        return NextResponse.json(
          { error: "Format d'image invalide" },
          { status: 400 }
        )
      }

      const base64Data = matches[2]
      const fileBuffer = Buffer.from(base64Data, 'base64')

      // Vérification taille fichier (25MB max)
      if (fileBuffer.length > 25 * 1024 * 1024) {
        return NextResponse.json(
          { error: "La taille de l'image ne doit pas dépasser 25MB" },
          { status: 400 }
        )
      }
      fileUrl = body.photoBase64
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
      ...(fileUrl && {
        Photo: {
          files: [{
            name: "submission.jpg",
            external: { url: fileUrl }
          }]
        }
      })
    }

    // Création de la page dans Notion
    const response = await notion.pages.create({
      parent: { 
        database_id: process.env.NOTION_DATABASE_ID! 
      },
      properties: pageProperties,
      ...(fileUrl && {
        children: [{
          object: "block",
          type: "image",
          image: {
            type: "external",
            external: { url: fileUrl }
          }
        }]
      })
    })

    clearTimeout(timeout)

    return NextResponse.json(
      { 
        success: true,
        message: "✅ Participation envoyée avec succès !",
        pageId: response.id
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    )

  } catch (error) {
    console.error("Erreur serveur:", error)
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Une erreur est survenue lors de la soumission"

    return NextResponse.json(
      { error: errorMessage },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}

export const dynamic = "force-dynamic"