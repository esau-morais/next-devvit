"use server";

import { ExtendedPost } from "@/@types/post";
import { LIMIT } from "@/lib/constants";

export async function fetchPosts(page: number, subdevvitName?: string) {
  try {
    const response = await fetch(
      `/api/posts?limit=${LIMIT}&page=${page}` +
        (!!subdevvitName ? `&subdevvitName=${subdevvitName}` : ""),
    );
    const data = await response.json();
    return data as ExtendedPost[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
