"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummery,
  storePdfSummeryAction,
} from "@/actions/upload-actions";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size should be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

export default function UploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded sucessfully!");
      toast.success("File uploaded successfully ✅");
    },
    onUploadError: (err) => {
      console.log("Error uploading file", err);
      toast.error("Error uploading file ❌");
    },
    onUploadBegin: (data) => {
      console.log("upload started", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    //validatng the fields
    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);
    if (!validatedFields.success) {
      toast.error("Error uploading file ❌");
      setIsLoading(false);
      return;
    }

    toast(" 📄 Uploading pdf");

    //upload the filr to uplaodThing
    const uploadResponse = await startUpload([file]);
    if (!uploadResponse) {
      toast.error("Something went wrong ❌");
      setIsLoading(false);
      return;
    }

    toast(" 📄 Hold On! Our AI agent Albert is reading your pdf");

    const uploadFileUrl = uploadResponse[0].serverData.fileUrl;

    const result = await generatePdfSummery({
      fileUrl: uploadFileUrl,
      fileName: file.name,
    });
    console.log({ result });
    const { data = null, message = null } = result || {};
    if (data) {
      toast.success("Saving PDF summery 💾 ");
      setIsLoading(false);
      if (data.summery) {
        let storeResult: any;
        //save the summery to the dtabase
        storeResult = await storePdfSummeryAction({
          summary: data.summery,
          fileUrl: uploadFileUrl,
          title: data.title,
          fileName: file.name,
        });
        toast.success("Summary Generated");
        //redirect to the [id] summery page
        router.push(`/summaries/${storeResult.data.id}`);
      }
    }
  };

  return (
    <div className=" flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput isLoading={isLoading} onSubmit={handleSubmit} />
      {isLoading && (
        <>
          <div className=" relative ">
            <div
              className=" absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div
                className=" w-full border-t
             border-gray-200 dark:border-gray-800"
              />
            </div>
            <div className=" relative flex justify-center">
              <span className=" bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
