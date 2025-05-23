// app/api/participant2/route.ts
import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID!

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    let participants: any[] = []
    let hasMore = true
    let nextCursor = undefined

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100,
        start_cursor: nextCursor,
      })

      participants.push(
        ...response.results.map((page: any) => {
          const props = page.properties
          return {
            nom: props.Nom?.title?.[0]?.text?.content || "",
            email: props.Email?.email || "",
            instagram: props.Instagram?.rich_text?.[0]?.text?.content || "",
            ville: props.Ville?.select?.name || props.Ville?.rich_text?.[0]?.text?.content || "",
            categorie: props.Catégorie?.select?.name || "",
          }
        })
      )

      hasMore = response.has_more
      nextCursor = response.next_cursor || undefined
    }

    return NextResponse.json({ participants })
  } catch (error) {
    console.error("Erreur lors de la récupération des participants:", error)
    return NextResponse.json({ error: "Erreur serveur lors du chargement des participants" }, { status: 500 })
  }
}
