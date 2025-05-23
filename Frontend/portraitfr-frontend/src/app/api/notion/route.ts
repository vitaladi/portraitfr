import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs/promises";

// Initialisation du client Notion
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Paramètres pour la validation des fichiers
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 Mo

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extraction des données du formulaire
    const nom = formData.get("nom") as string;
    const email = formData.get("email") as string;
    const instagram = formData.get("instagram") as string;
    const ville = formData.get("ville") as string;
    const categorie = formData.get("categorie") as string;
    const autorisation = formData.get("autorisationParticipation") === "true";
    const file = formData.get("photo") as File | null;

    // Validation des champs obligatoires
    if (!nom || !email || !instagram || !ville || !categorie || !file || !autorisation) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
    }

    // Validation de l'image
    if (!file) {
      return NextResponse.json({ error: "Une photo est requise pour participer." }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format d'image non valide. Utilisez une photo de type JPEG, PNG ou WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "La photo ne doit pas dépasser 25 Mo." },
        { status: 400 }
      );
    }

    // Validation de l'email, il ne doit pas dépasser 100 caractères
    if (email.length > 100) {
      return NextResponse.json(
        { error: "L'email ne doit pas dépasser 100 caractères." },
        { status: 400 }
      );
    }
    // Vérification du format de l'email
    // Regex pour valider l'email
    // Il doit contenir au moins un caractère avant le @, un domaine et une extension
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Veuillez entrer une adresse email valide." },
        { status: 400 }
      );
    }

    // Génération d'un nom de fichier unique sous la forme : originalName - +@instagram - +categorie - +date-uuid.ext
    
    const ext = file.name.split(".").pop() || "jpg";
    const originalName = file.name.split(".").slice(0, -1).join(".") || "upload";
    const safeInstagram = instagram.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeCategorie = categorie.replace(/[^a-zA-Z0-9_-]/g, "");
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    // Génération d'un  UUID sur 5 caractères
    const randomUUID = Math.random().toString(36).substring(2, 7);

    const filename = `${originalName}+@${safeInstagram}+${safeCategorie}+${today}-${randomUUID}.${ext}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", filename);

    // Enregistrement du fichier sur le serveur
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(uploadPath, Buffer.from(arrayBuffer));

    const fileUrl = `https://awards.portraitfr.fr/uploads/${filename}`;
    const databaseId = process.env.NOTION_DATABASE_ID!;

    // 🔍 Étape 1 : Récupération des propriétés de la base Notion
    const db = await notion.databases.retrieve({ database_id: databaseId }) as any;
    const villeProperty = db.properties?.Ville;

    if (!villeProperty || villeProperty.type !== "select") {
      return NextResponse.json({ error: "La propriété 'Ville' n'est pas un select dans Notion." }, { status: 500 });
    }

    const existingOptions = villeProperty.select.options;
    const villeExists = existingOptions.some((opt: any) => opt.name.toLowerCase() === ville.toLowerCase());

    // ✅ Étape 2 : Ajout de la ville si elle n'existe pas
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
      });
    }

    // ✅ Étape 3 : Création de la page dans Notion
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
    });

    return NextResponse.json(
      { success: true, message: "Participation enregistrée", id: notionResponse.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erreur :", err);
    return NextResponse.json(
      { error: "Veuillez réessayer ou nous contacter si le problème persiste." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";