"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddJobs from "@/components/common/AddJobs";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Eye, Pencil, Trash2, Link } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const alternances = [
  {
    entreprise: "Google",
    poste: "Développeur Full Stack",
    date: "12/07/2026",
    statut: "Entretien",
    contact: "Marie Dupont",
  },
  {
    entreprise: "OpenAI",
    poste: "Software Engineer",
    date: "08/07/2026",
    statut: "Candidature envoyée",
    contact: "Thomas Martin",
  },
  {
    entreprise: "Doctolib",
    poste: "Frontend Developer",
    date: "01/07/2026",
    statut: "Refusé",
    contact: "-",
  },
  {
    entreprise: "Alan",
    poste: "React Developer",
    date: "25/06/2026",
    statut: "Accepté",
    contact: "Sophie Leroy",
  },
];

// Badge statut
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Entretien: "bg-blue-500/10 text-blue-500 border-blue-500/20",

    "Candidature envoyée":
      "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",

    Refusé: "bg-red-500/10 text-red-500 border-red-500/20",

    Accepté: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  );
}

function ActionsMenu({ id }: { id: number }) {
  const router = useRouter();

  const styles = {
    trigger:
      "h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
    icon: "h-4 w-4 text-muted-foreground",
    menu: "w-40 rounded-xl border bg-popover p-1 shadow-lg",
    item: "cursor-pointer rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
    deleteItem:
      "cursor-pointer rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive",
    itemIcon: "mr-2 h-4 w-4",
  };

  return (
    <DropdownMenu key={id}>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className={styles.trigger} />
        }
      >
        <MoreHorizontal className={styles.icon} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={styles.menu}>
        <DropdownMenuItem
          className={styles.item}
          onClick={() => router.push(`/job/${id}`)}
        >
          <Eye className={styles.itemIcon} />
          Voir
        </DropdownMenuItem>
        <DropdownMenuItem className={styles.item}>
          <Pencil className={styles.itemIcon} />
          Modifier
        </DropdownMenuItem>

        <DropdownMenuItem className={styles.deleteItem}>
          <Trash2 className={styles.itemIcon} />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Suivi d&apos;alternance
          </h1>

          <p className="mt-2 text-muted-foreground">
            Gère tes candidatures, entretiens et opportunités.
          </p>
          <AddJobs />
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Candidatures</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">24</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Entretiens</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Acceptées</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">2</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Relances</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">7</p>
            </CardContent>
          </Card>
        </div>
        {/* Tableau */}
        <Card>
          <CardHeader>
            <CardTitle>Mes candidatures</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Poste</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternances.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.entreprise}
                    </TableCell>
                    <TableCell>{item.poste}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.contact}</TableCell>
                    <TableCell>
                      <StatusBadge status={item.statut} />
                    </TableCell>
                    <TableCell className="text-right">
                      <ActionsMenu id={index} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
