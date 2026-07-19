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

export default function AddJobs() {
  return (
    <Dialog>
      <DialogTrigger render={<Button className="text-base"/>}>
      Ajouter Une Offre
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Ajouter une candidature
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="url" className="text-lg font-medium">
              Lien de l&apos;offre
            </Label>

            <Input
              id="url"
              type="url"
              placeholder="https://www.linkedin.com/jobs/..."
              className="h-14 text-lg"
            />
          </div>

          <Button className="w-full h-14 text-lg" type="submit">
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
