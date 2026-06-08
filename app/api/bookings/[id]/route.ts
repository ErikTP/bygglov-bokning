import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import Booking from "@/models/booking";
import mongodb from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Ej behörig" }, { status: 401 });
    }

    await mongodb();

    const { id } = await params;
    const body = await request.json();

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: "accepted",
        acceptedDate: body.acceptedDate,
        acceptedTime: body.acceptedTime,
        meetingType: body.meetingType || "Extern möteslänk",
        meetingUrl: body.meetingUrl,
      },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json(
        { message: "Bokning hittades inte" },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("BOOKING_UPDATE_ERROR", error);

    return NextResponse.json(
      { message: "Kunde inte uppdatera bokningen" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Ej behörig" }, { status: 401 });
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
      return NextResponse.json({ message: "Ej behörig" }, { status: 403 });
    }

    await Booking.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BOOKING_DELETE_ERROR", error);

    return NextResponse.json(
      { message: "Kunde inte ta bort bokningen" },
      { status: 500 }
    );
  }
}