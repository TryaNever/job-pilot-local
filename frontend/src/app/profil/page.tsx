"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, Sparkles, Download, Upload } from "lucide-react";
import ImportFile from "@/components/common/ImportFile";
import {
  Certification,
  Experience,
  Formation,
  Langue,
  Profile,
} from "@/types/ProfileType";
import ImportPdf from "@/components/common/ImportPdf";

export default function ProfilePage() {
  const defaultProfile = {
    nom: "",
    prenom: "",
    age: "",
    localisation: "",
    email: "",
    telephone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    poste: "",
    description: "",
    skills: ["React", "Next.js"],
    experiences: [],
    formations: [],
    langues: [],
    certifications: [],
  };

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [lettreMotivationVersion, setLettreMotivationVersion] = useState(0);
  const [cvVersion, setCvVersion] = useState(0);

  useEffect(() => {
    console.log(cvVersion);
    
  }, [cvVersion])

  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const [skill, setSkill] = useState("");

  function updateField(key: keyof Profile, value: string) {
    setProfile({ ...profile, [key]: value });
  }

  function addSkill() {
    if (!skill.trim()) return;
    setProfile({ ...profile, skills: [...profile.skills, skill] });
    setSkill("");
  }

  function removeSkill(index: number) {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index),
    });
  }

  function addExperience() {
    setProfile({
      ...profile,
      experiences: [
        ...profile.experiences,
        { entreprise: "", poste: "", debut: "", fin: "", missions: "" },
      ],
    });
  }

  function updateExperience(
    index: number,
    key: keyof Experience,
    value: string,
  ) {
    const data = [...profile.experiences];
    data[index] = { ...data[index], [key]: value };
    setProfile({ ...profile, experiences: data });
  }

  function removeExperience(index: number) {
    setProfile({
      ...profile,
      experiences: profile.experiences.filter((_, i) => i !== index),
    });
  }

  function addFormation() {
    setProfile({
      ...profile,
      formations: [
        ...profile.formations,
        { ecole: "", diplome: "", annee: "", description: "" },
      ],
    });
  }

  function updateFormation(index: number, key: keyof Formation, value: string) {
    const data = [...profile.formations];
    data[index] = { ...data[index], [key]: value };
    setProfile({ ...profile, formations: data });
  }

  function removeFormation(index: number) {
    setProfile({
      ...profile,
      formations: profile.formations.filter((_, i) => i !== index),
    });
  }

  function addLangue() {
    setProfile({
      ...profile,
      langues: [...profile.langues, { nom: "", niveau: "" }],
    });
  }

  function updateLangue(index: number, key: keyof Langue, value: string) {
    const data = [...profile.langues];
    data[index] = { ...data[index], [key]: value };
    setProfile({ ...profile, langues: data });
  }

  function removeLangue(index: number) {
    setProfile({
      ...profile,
      langues: profile.langues.filter((_, i) => i !== index),
    });
  }

  function addCertification() {
    setProfile({
      ...profile,
      certifications: [...profile.certifications, { nom: "", organisme: "" }],
    });
  }

  function updateCertification(
    index: number,
    key: keyof Certification,
    value: string,
  ) {
    const data = [...profile.certifications];
    data[index] = { ...data[index], [key]: value };
    setProfile({ ...profile, certifications: data });
  }

  function removeCertification(index: number) {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((_, i) => i !== index),
    });
  }

  function saveProfile(profile: Profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  function exportProfile(key: string) {
    const data = localStorage.getItem(key);

    if (!data) {
      console.error("Aucune donnée trouvée");
      return;
    }

    const blob = new Blob([data], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${key}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <div className="flex flex-wrap gap-y-3 justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mon profil CV</h1>
            <p className="text-muted-foreground">
              Ces informations seront utilisées pour générer vos documents.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={() => saveProfile(profile)}>
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
            <Button onClick={() => exportProfile("profile")}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <ImportFile setProfil={setProfile}></ImportFile>
          </div>
        </div>

        {/* IDENTITE */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Nom"
              value={profile.nom}
              onChange={(e) => updateField("nom", e.target.value)}
            />
            <Input
              placeholder="Prénom"
              value={profile.prenom}
              onChange={(e) => updateField("prenom", e.target.value)}
            />
            <Input
              placeholder="Age"
              value={profile.age}
              onChange={(e) => updateField("age", e.target.value)}
            />
            <Input
              placeholder="Localisation"
              value={profile.localisation}
              onChange={(e) => updateField("localisation", e.target.value)}
            />
            <Input
              placeholder="Email"
              value={profile.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
            <Input
              placeholder="Téléphone"
              value={profile.telephone}
              onChange={(e) => updateField("telephone", e.target.value)}
            />
            <Input
              placeholder="LinkedIn"
              value={profile.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
            />
            <Input
              placeholder="GitHub"
              value={profile.github}
              onChange={(e) => updateField("github", e.target.value)}
            />
            <Input
              placeholder="Portfolio"
              value={profile.portfolio}
              onChange={(e) => updateField("portfolio", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* PROFIL */}
        <Card>
          <CardHeader>
            <CardTitle>Présentation professionnelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Métier recherché (ex: Développeur Full Stack)"
              value={profile.poste}
              onChange={(e) => updateField("poste", e.target.value)}
            />
            <Textarea
              rows={5}
              placeholder="Décrivez votre profil professionnel..."
              value={profile.description}
              onChange={(e) => updateField("description", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* COMPETENCES */}
        <Card>
          <CardHeader>
            <CardTitle>Compétences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Nouvelle compétence"
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
              />
              <Button onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s, index) => (
                <Badge key={index} className="flex gap-2 items-center">
                  {s}
                  <button onClick={() => removeSkill(index)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* EXPERIENCES */}
        <Card>
          <CardHeader>
            <CardTitle>Expériences professionnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.experiences.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <Input
                  placeholder="Entreprise"
                  value={exp.entreprise}
                  onChange={(e) =>
                    updateExperience(index, "entreprise", e.target.value)
                  }
                />
                <Input
                  placeholder="Poste"
                  value={exp.poste}
                  onChange={(e) =>
                    updateExperience(index, "poste", e.target.value)
                  }
                />
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Date début"
                    value={exp.debut}
                    onChange={(e) =>
                      updateExperience(index, "debut", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Date fin"
                    value={exp.fin}
                    onChange={(e) =>
                      updateExperience(index, "fin", e.target.value)
                    }
                  />
                </div>
                <Textarea
                  placeholder="Missions"
                  value={exp.missions}
                  onChange={(e) =>
                    updateExperience(index, "missions", e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeExperience(index)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addExperience}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une expérience
            </Button>
          </CardContent>
        </Card>

        {/* FORMATIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Formations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.formations.map((formation, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <Input
                  placeholder="École"
                  value={formation.ecole}
                  onChange={(e) =>
                    updateFormation(index, "ecole", e.target.value)
                  }
                />
                <Input
                  placeholder="Diplôme"
                  value={formation.diplome}
                  onChange={(e) =>
                    updateFormation(index, "diplome", e.target.value)
                  }
                />
                <Input
                  placeholder="Année"
                  value={formation.annee}
                  onChange={(e) =>
                    updateFormation(index, "annee", e.target.value)
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={formation.description}
                  onChange={(e) =>
                    updateFormation(index, "description", e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeFormation(index)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addFormation}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une formation
            </Button>
          </CardContent>
        </Card>

        {/* LANGUES */}
        <Card>
          <CardHeader>
            <CardTitle>Langues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.langues.map((langue, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Langue (ex: Français)"
                  value={langue.nom}
                  onChange={(e) => updateLangue(index, "nom", e.target.value)}
                />
                <Input
                  placeholder="Niveau (ex: B2, Langue maternelle)"
                  value={langue.niveau}
                  onChange={(e) =>
                    updateLangue(index, "niveau", e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeLangue(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addLangue}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une langue
            </Button>
          </CardContent>
        </Card>

        {/* CERTIFICATIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.certifications.map((cert, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  placeholder="Nom certification"
                  value={cert.nom}
                  onChange={(e) =>
                    updateCertification(index, "nom", e.target.value)
                  }
                />
                <Input
                  placeholder="Organisme"
                  value={cert.organisme}
                  onChange={(e) =>
                    updateCertification(index, "organisme", e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeCertification(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button variant="outline" onClick={addCertification}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter certification
            </Button>
          </CardContent>
        </Card>

        {/* GENERATION */}
        <Card>
          <CardHeader>
            <CardTitle>Documents générés</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 flex flex-col gap-2 px-5">
              <h3 className="font-semibold mb-3">CV</h3>
              <iframe
                key={cvVersion}
                src={`/documents/cv/cv.pdf?v=${cvVersion}`}
                className="h-100 w-full border rounded"
              />
              <ImportPdf
                setVersion={setCvVersion}
                textButton={
                  <>
                    <Upload className="mr-2z h-4 w-4" />
                    Importer son CV
                  </>
                }
              />
            </div>

            <div className="border rounded-lg p-4 flex flex-col gap-2 px-">
              <h3 className="font-semibold mb-3">Lettre de motivation</h3>
              <iframe
                key={lettreMotivationVersion}
                src={`/documents/lettre-motivation/lettre-motivation.pdf?v=${lettreMotivationVersion}`}
                className="h-100 w-full border rounded"
              />
              <ImportPdf
                setVersion={setLettreMotivationVersion}
                textButton={
                  <>
                    <Upload className="mr-2z h-4 w-4" />
                    Importer sa lettre de motivation
                  </>
                }
                target="lettre-motivation"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
