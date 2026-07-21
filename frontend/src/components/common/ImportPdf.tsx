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
import { ReactNode, useRef } from "react";
import { Upload } from "lucide-react";
import { apiFetch } from "@/utils/fetch";

type textButton = {
  textButton?: ReactNode;
  folder?: string;
};

type jsonBackResponse = {
  message: string;
};

export default function ImportPdf({
  textButton = (
    <>
      <Upload className="mr-2 h-4 w-4" />
      Export
    </>
  ),
  folder = "cv",
}: textButton) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function importJson(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<jsonBackResponse> {
    event.preventDefault();

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      throw new Error("Please select a file to upload.");
    }

    const formData = new FormData();

    formData.append("file", file);

    return apiFetch(`/upload/${folder}/main`, {
      method: "POST",
      body: formData,
    });
  }
  return (
    <Dialog>
      <DialogTrigger render={<Button className="text-base" />}>
        {textButton}
      </DialogTrigger>

      <DialogContent className="sm:max-w-175">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Mettre a jour votre profile
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={importJson}>
          <div className="space-y-3">
            <Label htmlFor="url" className="text-lg font-medium">
              Vos données en json que vous avec export
            </Label>

            <Field>
              <FieldLabel htmlFor="picture">.json file</FieldLabel>
              <Input id="json" type="file" accept=".pdf" ref={fileInputRef} />
              <FieldDescription>Select a file.json to upload.</FieldDescription>
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
