import mysql from "mysql2/promise";

const avis = [
  {
    randonneeId: "1",
    commentaire:
      "Cette promenade sur les collines environnant Monestiés vous offre de magnifiques points de vue sur le village médiéval et sur les vallons du Ségala appelés ici puechs… Après avoir traversé la forêt de Lauzeral, vous sillonnerez dans les méandres de la vallée du Cérou par l’ancienne voie ferrée Carmaux-Monestiés. Pensez à prendre une lampe de poche, vous traverserez un tunnel pour rejoindre Monestiés.",
    date: "2022-05-01",
  },
  {
    randonneeId: "2",
    commentaire:
      "Au départ des ruines du château d’Arifat (13e siècle quand même) cette boucle de 3 kilomètres à fort dénivelé est un vrai plaisir pour les amoureux de la nature. Le sentier monte et descend jusqu’à la passerelle suspendue. Les enfants adorent ! Puis ça remonte et on découvre cette cascade de 80 mètres en trois paliers. Superbe.",
    date: "2023-08-24",
  },
  {
    randonneeId: "3",
    commentaire:
      "Une belle réussite ce saut au-dessus de l’Arnette ! La passerelle ouverte au public depuis décembre 2018 se balance à 70 mètres au-dessus du vide. Ce chemin aérien de 140 mètres de long relie les hauteurs de Mazamet au petit village médiéval d’Hautpoul.",
    date: "2021-07-12",
  },
  {
    randonneeId: "2",
    commentaire:
      "Magnifique randonnée, très bien balisée, une superbe cascade à l'arrivée. Le sentier est très bien entretenu, et les panneaux explicatifs sont très intéressants. A faire absolument !",
    date: "2023-09-05",
  },
  {
    randonneeId: "3",
    commentaire:
      "Passerelle suspendue dans le vide, âmes sensibles s'abstenir. Mais quelle vue, le jeu en vaut la chandelle. Et le village d'Hautpoul est magnifique. Attention par jour de vent, la passerelle bouge beaucoup.",
    date: "2023-10-25",
  },
  {
    randonneeId: "3",
    commentaire: "J'ai pas pu traverser j'ai eu trop peur 😱😱😱",
    date: "2023-06-14",
  },
];

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS avis (
        id INT NOT NULL AUTO_INCREMENT,
        randonneeId INT NOT NULL,
        commentaire TEXT NOT NULL,
        date DATE NOT NULL,
        PRIMARY KEY (id)
    );
`);

  // Delete all orders and menus
  await connection.execute(`
    TRUNCATE TABLE avis;
  `);

  // Insert some orders
  await connection.execute(`
    INSERT INTO avis (randonneeId, commentaire, date)
    VALUES
      ${avis
        .map(
          (avis) => `("${avis.randonneeId}", "${avis.commentaire}", "${avis.date}")`
        )
        .join(",")}
      
  `);
  await connection.end();
}

main().then(() => console.log("Database initialized"));
