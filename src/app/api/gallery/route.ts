import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "gallery.json")
  const file = await fs.readFile(filePath, "utf8")
  const data = JSON.parse(file)

  return NextResponse.json(data)
}
