"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { Download } from "lucide-react";
import { apiFetch } from "@/utils/fetch";

type textButton = {
  textButton?: ReactNode;
  target?: string;
  setVersion: Dispatch<SetStateAction<number>>
};

type jsonBackResponse = {
  message: string;
};

export default function ImportPdf({
  textButton = (
    <>
      <Download className="mr-2 h-4 w-4" />
      Import
    </>
  ),
  target = "cv",
  setVersion
}: textButton) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function importJson(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<jsonBackResponse> {
    event.preventDefault();

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      throw new Error("Please select a file to upload.");
    }

    const formData = new FormData();

    formData.append("file", file);

     const apiResponse = await apiFetch(`/upload/${target}/main`, {
      method: "POST",
      body: formData,
    });

    setVersion(Date.now())
    console.log("pi");
    
    return apiResponse
  }
    const textTarget = target.replace("-", " ")

  return (
    <Dialog>
      <DialogTrigger render={<Button className="text-base w-full py-2" />}>
        {textButton}
      </DialogTrigger>

      <DialogContent className="sm:max-w-175">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Mettre a jour votre {textTarget}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={importJson}>
          <div className="space-y-3">
            <Label htmlFor="url" className="text-lg font-medium">
              Import ton {textTarget} dans l&apos;app en pdf
            </Label>

            <Field>
              <FieldLabel htmlFor="picture">.pdf file</FieldLabel>
              <Input id="json" type="file" accept=".pdf" ref={fileInputRef} />
              <FieldDescription>Select a file.pdf to upload.</FieldDescription>
            </Field>
          </div>

          <Button className="w-full h-14 text-lg" type="submit">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
