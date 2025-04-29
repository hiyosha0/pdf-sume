"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      throw new Error("User not found");
    }
    const userId = user?.id;
    const sql = await getDbConnection();
    //delete from db
    const result = await sql`
        DELETE FROM pdf_summaries
        WHERE id = ${summaryId} AND user_id = ${userId}
        RETURNING id
        
        `;

    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    return { success: false };
    //revalidate path
  } catch (error) {
    console.log("Error Deleting Summary", error);
    return { success: false };
  }
}
