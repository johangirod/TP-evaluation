// ✅ Modifier ce fichier pour l'évaluation
import { getAvisByRandonneeId } from "../models/avis.js";
import { getRandonneeById } from "../models/randonnees.js";

export async function getAvisPage(req, res) {
  const { id } = req.params;
  const listAvis = await getAvisByRandonneeId(id);
  listAvis.forEach((avis) => {
    avis.date = new Date(avis.date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  const randonnee = await getRandonneeById(id);
  res.render("avis", {
    avis: listAvis,
    randonnee,
    title: randonnee.title + " : avis - RandoTarn",
  });
}

export async function postAvisPage(req, res) {
  // ✅ Exercice 4 : Insérer votre code ici
}
