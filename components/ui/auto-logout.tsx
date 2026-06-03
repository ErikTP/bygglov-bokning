"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const TIMEOUT = 15 * 1000; // 15 sekunder

export default function AutoLogout() {
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        signOut({ callbackUrl: "/" });
      }, TIMEOUT);
    };

    resetTimer();

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [status]);

  return null;
}