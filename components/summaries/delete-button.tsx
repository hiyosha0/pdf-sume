"use client";
import { Loader2, Trash2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

interface DeleteButtonProps {
  summaryId: string;
}

export default function DeleteButton({ summaryId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    //TODO: Delete Summary
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId });
      if (!result.success) {
        toast.error("oops! something wrong");
      }
      setOpen(false);
    });
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" text-gray-400
        bg-gray-50 border border-gray-200 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300
         hover:scale-105"
          >
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Summary ?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this summary? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"ghost"}
              className=" 
        bg-gray-50 border border-gray-200 hover:text-gray-600 hover:bg-gray-100 transition-all duration-300
         hover:scale-105"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              className=" bg-gray-900 hover:bg-gray-600 "
              onClick={handleDelete}
            >
              {isPending ? <Loader2 className=" animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
