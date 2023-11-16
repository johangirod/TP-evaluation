//  ❌ NE PAS MODIFIER POUR L'EVALUATION

import { readFile } from "fs/promises";
import { dirname, join } from "path";

const __dirname = dirname(new URL(import.meta.url).pathname);
/**
 *
 * @returns {Promise<Array<{
 *  id: string,
 *  title: string,
 *  place: string,
 *  pictureUrl: string,
 *  }>>} Renvoie un tableau de randonnées
 */
export async function getRandonnees() {
  const randonnee = await readFile(
    join(__dirname, "../../_data/_data_0.json"),
    "utf-8"
  );
  return JSON.parse(randonnee);
}

/**
 *
 * @param {string} id
 * @returns {Promise<{
 *  id: string,
 *  title: string,
 *  place: string,
 *  pictureUrl: string,
 *  }>} Renvoie une randonnée
 */
export async function getRandonneeById(id) {
  const randonnees = await getRandonnees();
  return randonnees.find((rando) => rando.id === id);
}
