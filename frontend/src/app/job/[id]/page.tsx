import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ExternalLink, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return [{id: "0"},{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function JobInfo({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            </Link>

            <h1 className="text-3xl font-bold tracking-tight">
              Développeur Full Stack
            </h1>

            <p className="text-muted-foreground">Google</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>

            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>

        {/* Informations principales */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Entreprise</p>
                <p className="text-lg font-medium">Google</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Poste</p>
                <p className="text-lg font-medium">Développeur Full Stack</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Date de candidature
                </p>
                <p className="text-lg font-medium">12/07/2026</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Contact</p>
                <p className="text-lg font-medium">Marie Dupont</p>
              </div>
            </CardContent>
          </Card>

          {/* Statut */}
          <Card>
            <CardHeader>
              <CardTitle>Suivi</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Statut actuel
                </p>

                <Badge className="border-blue-500/20 bg-blue-500/10 text-blue-500">
                  Entretien
                </Badge>
              </div>

              <div>
                <p className="mb-2 text-sm text-muted-foreground">
                  Lien de l&apos;offre
                </p>

                <Button variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Voir l&apos;offre
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Préparer des questions techniques avant l&apos;entretien. Revoir
              React et Node.js.
            </p>
          </CardContent>
        </Card>
        {/* Documents */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Preview CV */}
          <Dialog>
            <DialogTrigger
              nativeButton={false}
              render={
                <Card className="cursor-pointer overflow-hidden transition hover:shadow-lg" />
              }
            >
              <CardHeader>
                <CardTitle>CV</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="h-[450px] overflow-hidden rounded-lg border bg-white">
                  <iframe
                    src="/documents/cv.pdf#toolbar=0&navpanes=0"
                    title="Aperçu du CV"
                    className="pointer-events-none h-full w-full"
                  />
                </div>

                <p className="mt-3 text-center text-sm text-muted-foreground">
                  Cliquer pour agrandir
                </p>
              </CardContent>
            </DialogTrigger>

            <DialogContent className="h-[95vh] sm:max-w-6xl">
              <DialogHeader>
                <DialogTitle>Aperçu du CV</DialogTitle>
              </DialogHeader>

              <iframe
                src="/documents/cv.pdf"
                title="CV en plein écran"
                className="h-[85vh] w-full rounded-lg border"
              />
            </DialogContent>
          </Dialog>

          {/* Preview Lettre motivation */}
          <Dialog>
            <DialogTrigger
              nativeButton={false}
              render={
                <Card className="cursor-pointer overflow-hidden transition hover:shadow-lg" />
              }
            >
              <CardHeader>
                <CardTitle>Lettre de motivation</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="h-[450px] overflow-hidden rounded-lg border bg-white">
                  <iframe
                    src="/documents/lettre-motivation.pdf#toolbar=0&navpanes=0"
                    title="Aperçu de la lettre de motivation"
                    className="pointer-events-none h-full w-full"
                  />
                </div>

                <p className="mt-3 text-center text-sm text-muted-foreground">
                  Cliquer pour agrandir
                </p>
              </CardContent>
            </DialogTrigger>

            <DialogContent className="h-[95vh] w-[90vw] sm:max-w-6xl">
              <DialogHeader>
                <DialogTitle>Lettre de motivation</DialogTitle>
              </DialogHeader>

              <iframe
                src="/documents/lettre-motivation.pdf"
                title="Lettre de motivation en plein écran"
                className="h-[85vh] w-full rounded-lg border"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}