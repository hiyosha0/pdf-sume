"use server";

import { getDbConnection } from "@/lib/db";
import { generateSummeryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langChain";
import { generateSummeryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PDFsummeryType {
  userId?: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export async function generatePdfSummery({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }

  if (!fileUrl) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }
  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log({ pdfText });

    let summery;
    try {
      summery = await generateSummeryFromGemini(pdfText);
      // summery = await generateSummeryFromOpenAI(pdfText);
      console.log({ summery });
    } catch (error) {
      console.log(error);
      //call gemini
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summery = await generateSummeryFromGemini(pdfText);
        } catch (geminiError) {
          console.error(
            "Gemini API failed after openAI quote exceeded",
            geminiError
          );
          throw new Error(
            "Failed to generate summery with available AI providers. "
          );
        }
      }
    }

    const formattedFileName = formatFileNameAsTitle(fileName);

    if (!summery) {
      return {
        success: false,
        message: "faild to generate summery",
        data: null,
      };
    }
    return {
      success: true,
      message: "Summery generated successfully",
      data: {
        title: fileName,
        summery,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null,
    };
  }
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  //sql inserting pdf summery
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`
    INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES(
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    ) RETURNING id,summary_text;`;
    return savedSummary;
  } catch (error) {
    console.log("Error saving pdf summery", error);
    throw new Error();
  }
}

//func-02
export async function storePdfSummeryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PDFsummeryType) {
  //user is logged in and has a userid
  //savepdfsummery
  let savedSummary;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });
    if (!savePdfSummary) {
      return {
        success: false,
        message: "Faild to save pdf summery",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error saving pdf",
    };
  }
  //revalidate our cache
  revalidatePath(`/summaries/${savedSummary.id}`);
  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
    },
  };
}
