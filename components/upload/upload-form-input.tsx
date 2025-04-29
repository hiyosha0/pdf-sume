"use client";

import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CloudUpload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, file: File | null) => void;
  isLoading: boolean;
}

function UploadFormInput({ onSubmit, isLoading }: UploadFormInputProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, selectedFile);
    setSelectedFile(null);
    formRef.current?.reset();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <form
        ref={formRef}
        className="flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <div className="mt-2.5 flex justify-end items-center gap-2">
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            required
            className={cn(
              isLoading && "opacity-50 cursor-not-allowed ",
              "rounded-full shadow-md"
            )}
            disabled={isLoading}
            onChange={handleFileChange}
          />
          <Button
            disabled={isLoading}
            className="rounded-full shadow-md  bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
          >
            {isLoading ? (
              <>
                <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <p className=" font-bold">upload your pdf</p>
                <CloudUpload />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadFormInput;
