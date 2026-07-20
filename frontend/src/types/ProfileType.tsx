interface Experience {
  entreprise: string;
  poste: string;
  debut: string;
  fin: string;
  missions: string;
}

interface Formation {
  ecole: string;
  diplome: string;
  annee: string;
  description: string;
}

interface Langue {
  nom: string;
  niveau: string;
}

interface Certification {
  nom: string;
  organisme: string;
}

interface Profile {
  nom: string;
  prenom: string;
  age: string;
  localisation: string;
  email: string;
  telephone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  poste: string;
  description: string;
  skills: string[];
  experiences: Experience[];
  formations: Formation[];
  langues: Langue[];
  certifications: Certification[];
}

export type {Experience,Formation,Langue,Certification,Profile}