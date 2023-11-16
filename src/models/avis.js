// @ts-nocheck
// ✅ Fichier à modifier pour l'évaluation

/**
 * Récupère les avis d'une randonnée
 * @param {string} randonneeId
 * @returns {Promise<Array<{
 *   randonneeId: string,
 *   date: string,
 *   commentaire: string,
 * }>>} Renvoie un tableau d'avis
 */
export async function getAvisByRandonneeId(randonneeId) {
  // ✅ Exercice 3 : Insérer votre code ici
 
}

/**
 * Crée un avis
 * @param {string} randonneeId
 * @param {string} commentaire
 * @param {string} date (format YYYY-MM-DD)
 *
 * @returns {Promise<{
 *  id: number,
 *  randonneeId: string,
 *  date: string,
 *  commentaire: string,
 * }>} Renvoie l'avis créé avec son id
 */
export async function createAvis(randonneeId, commentaire, date) {
  // ✅ Exercice 4 : Insérer votre code ici
}
