"use server";

import { revalidateTag } from "next/cache";

export default async function submit(tag: string) {
    revalidateTag(tag);
}
