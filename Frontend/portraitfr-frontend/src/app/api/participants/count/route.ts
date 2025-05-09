// app/api/participants/count/route.ts
import { NextResponse } from "next/server"
import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const databaseId = process.env.NOTION_DATABASE_ID!

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    let hasMore = true
    let nextCursor = undefined
    let total = 0

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        page_size: 100,
        start_cursor: nextCursor,
      })

      total += response.results.length
      hasMore = response.has_more
      nextCursor = response.next_cursor || undefined
    }

    return NextResponse.json({ count: total })
  } catch (err) {
    console.error("Erreur lors du comptage des participants :", err)
    return NextResponse.json({ error: "Impossible de compter les participants" }, { status: 500 })
  }
}
