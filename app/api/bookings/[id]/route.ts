import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import Booking from "@/models/booking";
import mongodb from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Ej behörig" },
        { status: 401 }
      );
    }

    await mongodb();

    const { id } = await params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { message: "Bokning hittades inte" },
        { status: 404 }
      );
    }

    if (booking.userEmail !== session.user.email) {
      return NextResponse.json(
        { message: "Ej behörig" },
        { status: 403 }
      );
    }

    await Booking.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Kunde inte ta bort bokningen" },
      { status: 500 }
    );
  }
}