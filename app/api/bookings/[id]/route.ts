import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import Booking from "@/models/booking";
import mongodb from "@/lib/mongodb";
import { resend } from "@/lib/resend";
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

    if (booking.userEmail) {
  const meetingUrl =
    booking.meetingUrl || "https://whereby.com/bygglov-radgivning";

  if (!resend) {
    console.error("RESEND_API_KEY saknas.");
  } else {
    const emailResult = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Bygglov <onboarding@resend.dev>",
      to: [booking.userEmail],
      subject: "Din bokning har accepterats",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #17212F;">
          <h1 style="color: #29547B;">
            Din bokning har accepterats
          </h1>

          <p>
            Hej ${booking.userName || "Användare"},
          </p>

          <p>
            Din bokningsförfrågan hos Bygglov har accepterats.
          </p>

          <div style="padding:16px;background:#F1F5F9;border-radius:12px;">
            <p><strong>Rådgivare:</strong> ${booking.advisorName}</p>
            <p><strong>Tjänst:</strong> ${booking.service}</p>
            <p><strong>Kategori:</strong> ${booking.category}</p>
            <p><strong>Kommun:</strong> ${booking.municipality}</p>
            <p><strong>Datum:</strong> ${booking.acceptedDate || "Ej angivet"}</p>
            <p><strong>Tid:</strong> ${booking.acceptedTime || "Ej angivet"}</p>
          </div>

          <p style="margin-top:20px;">
            <a
              href="${meetingUrl}"
              style="
                background:#29547B;
                color:white;
                padding:12px 18px;
                border-radius:8px;
                text-decoration:none;
                display:inline-block;
              "
            >
              Starta videomöte
            </a>
          </p>

          <p style="margin-top:24px;">
            Hälsningar,<br/>
            Bygglov.se
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error(
        "RESEND_EMAIL_ERROR",
        emailResult.error
      );
    }
  }
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