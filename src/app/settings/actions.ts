"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateUsername(formData: FormData) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return { message: "unauthorized" };
    }

    const name = formData.get("name");

    const username = await prisma.user.findFirst({
      where: {
        username: name,
      },
    });

    if (username) {
      return { message: "username already in use" };
    }

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    });
  } catch (error) {
    return { message: "cannot update username" };
  }
}
