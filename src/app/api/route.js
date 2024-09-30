import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Test Get version ",
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Test post version",
  });
}
