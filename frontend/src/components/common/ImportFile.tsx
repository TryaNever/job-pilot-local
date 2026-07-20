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
import { Profile } from "@/types/ProfileType";
import { Upload } from "lucide-react";

type textButton = {
  textButton?: ReactNode;
  setProfil: React.Dispatch<React.SetStateAction<Profile>>;
};

export default function ImportFile({
  textButton = (<><Upload className="mr-2 h-4 w-4" />
              Export</>),
  setProfil
}: textButton) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function importJson(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      try {
        const text = reader.result as string;
        const jsonData = JSON.parse(text) as Profile;
        // handle jsonData as needed
        console.log(jsonData);
        setProfil(jsonData);
      } catch (e) {
        console.error("Failed to parse JSON file", e);
      }
    };
    reader.readAsText(file);
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
              <Input id="json" type="file" accept=".json" ref={fileInputRef} />
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
