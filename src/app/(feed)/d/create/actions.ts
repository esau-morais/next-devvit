"use server";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function createCommunity(formData: FormData) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return { message: "unauthorized" };
    }

    const name = formData.get("name");

    const alreadyExists = await prisma.subreddit.findFirst({
      where: {
        name,
      },
    });
    if (alreadyExists) {
      return { message: "Subdevvit already exists" };
    }

    const subdevvit = await prisma.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    // creator also has to be subscribed
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subdevvit.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) return { message: error.message };
  }
}
