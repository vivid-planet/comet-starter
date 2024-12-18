import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: `route not found: '${request.nextUrl.pathname}'` }, { status: 404 });
}
