import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import Booking from "@/models/booking";
import mongodb from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Du måste vara inloggad." },
        { status: 401 }
      );
    }

    const body = await req.json();

    await mongodb();

    const booking = await Booking.create({
      userId: session.user.email,
      userEmail: session.user.email,
      userName: session.user.name || "Användare",

      advisorName: body.advisorName,
      advisorRole: body.advisorRole,

      service: body.service,
      category: body.category,
      municipality: body.municipality,
      projectDescription: body.projectDescription,

      status: "pending",
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("BOOKING_CREATE_ERROR", error);

    return NextResponse.json(
      { message: "Kunde inte skapa bokning." },
      { status: 500 }
    );
  }
}