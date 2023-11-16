# TP noté : Randonnées

L'office de tourisme du Tarn souhaite créer une application pour promouvoir les randonnées dans le département.

On vous demande de créer une application web qui permet aux utilisateurs de visualiser les randonnées, et de lister et poster des avis sur ces randonnées.

Cette application reprend les mêmes technologies que les TP précédents, à savoir :
- une architecture MVC (modèle-vue-contrôleur)
- le framework express pour servir les pages web
- le moteur de template Handlebars pour générer les vues
- une base de donnée mySQL pour stocker les avis

## A faire dès maintenant

1. Cloner le dépôt git du TP : 
    ```bash
    git clone https://github.com/johangirod/TP-evaluation
    cd TP-evaluation
    ```
2. Ouvrir le projet dans VSCode : 
    ```bash
    code .
    ```
3. Compléter le ficher WHOAMI.md avec les informations suivantes : 
    - Votre nom
    - Votre prénom
    - Si vous utilisez chatGPT ou copilot pour ce TP

## Information et consignes générales
> [!TIP] 
> Lisez attentivement cette section avant de commencer le TP
- Vous pouvez utiliser [les corrigés des TPs précédents](https://johangirod.com/cours)
- Vous pouvez utiliser internet librement.
- Vous ne **pouvez pas** communiquer entre vous
- Au début de chaque fichier, il est précisé si vous devez ou non les modifier pour les exercices.
- Il est **fortement conseillé** d'utiliser les machines de l'école pour éviter les problèmes de configuration. Si vous utilisez votre machine, **vous êtes seul responsable** de la configuration de votre environnement de développement, et du temps que vous pourrez perdre à le faire fonctionner.
- Vous pouvez solliciter l'enseignant pour toute question relative à la compréhension de l'énoncé, ou de lancement de l'application (base de données, container, etc). En revanche, il ne vous aidera pas pour la résolution des exercices.
- Lisez les énoncés des exercices jusqu'au bout avant de commencer à coder, des informations importantes peuvent être données à la fin.
- En cas de blocage, passez à l'exercice suivant.

*Le conseil bonus :*
- Faites bien attention aux erreurs liées à l'oublie de `await` devant les fonctions asynchrones.

### Projet en JavaScript pur
Ce projet sera en **JavaScript**, et non TypeScript (moins de blocages possibles à cause de mauvais types)

Par conséquent, il faudra **systématiquement ajouter `.js`** à la fin des imports de modules.
Au lieu de :

```js
import { getRandonnées } from "../models/randonnees";
```
Il faudra écrire :
```js
import { getRandonnées } from "../models/randonnees.js";
```

> [!NOTE]
> Les imports de bibliothèques externes (express, mysql, etc) ne sont pas concernés par cette règle.

Cela veut dire que vous n'avez pas à écrire les types. Par exemple, au lieu de `return queryResult[0] as Menu[];` vous devrez simplement écrire `return queryResult[0]`.


## Préparatif 

1. Lancer le container de la base de donnée avec la commande suivante : 
    ```bash
    sh scripts/database-start.sh
    ```

1. Lancer le projet avec la commande suivante : 
    ```bash
    sh scripts/start.sh
    ```

1. Pour voir les logs de l'application, vous pouvez utiliser la commande suivante : 
    ```bash
    docker logs -f app
    ```
### Test

Pour lancer les tests, utilisez la commande suivante :
```bash
sh scripts/test.sh
```
Les tests sont tous au rouge, et passeront au vert au fur et à mesure que vous compléterez les exercices.

> [!NOTE]
> Les exercices 1, 2 et 3 ont des tests pour chaque consigne principales. Si les tests sont au vert, vous avez tous les points.

> [!WARNING]
> Il est conseillé de d'abord vérifier que cela fonctionne sur le navigateur par vous même, avant de lancer les tests pour vérifier que tout est bon.

## Exercice 1 : (2 points)
- Créer une route `/` qui affiche la vue de la page d'accueil `home` grâce à `res.render` – *1 point*
- Servir le dossier `src/img` afin que son contenu soit publié sur le chemin `/img` du site –  *1 point*

## Exercice 2 : (8 points)
- Créer une route `/randonnees` – *1 points*
- Sa balise `<title>` doit contenir : `Toutes les randonnées - RandoTarn` – *1 point*
- Elle doit afficher la liste des randonnées avec pour chacune :
    - Le titre – *1 point*
    - Le lieu – *1 point*
    - La photo – *1 point*
    - Un lien vers la page des avis : `/randonnees/:randonneeId/avis` – *1 point*

**Consignes additionnelles** :
- La route `/randonnees` est déclarée dans un nouveau fichier `route.js` – *1 point*
- Vous créerez un controlleur `getRandonnéesPage` dans un nouveau fichier `controlers/randonnee.js` pour servir la page – *1 point*

### Informations complémentaires pour l'exercice 2
1. Vous récupererez la liste des randonnées grâce à la fonction `async function getRandonnées()` dans le fichier `models/randonnees.js`. Cette fonction retourne une liste d'objet randonnées avec les propriétés suivantes : 
    - `title`: Le titre de la randonnée
    - `place`: Le lieu de la randonnée
    - `pictureUrl`: Le nom de l'image de la randonnée
    - `id`: L'identifiant de la randonnée

1. Voici un exemple de code HTML à utiliser pour afficher une randonnée. Il faudra bien sûr l'adapter pour afficher les informations de manière dynamique.
    ```html
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/img/arifat.jpg" data-test-id="photo" />
      <div class="px-6 py-4">
        <small class="text-gray-600" data-test-id="lieu">
          <i class="fas fa-map-marker-alt mr-1"></i>
          <!-- Nom du lieu -->
          Arifat
        </small>
        <h2
          data-test-id="titre"
          class="font-bold text-xl my-2"
        >
          <!-- Titre de la randonnée --> 
          Cascade d'Arifat
        </h2>
        <a
          data-test-id="lien"
          href="/randonnees/2/avis"
          class="inline-block bg-green-600 rounded-full mt-2 px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-green-800"
        >
          Voir les avis
        </a>
      </div>
    </div>
    ```

## Exercice 3 : afficher les avis – *4 points*

- Créer une route `/randonnees/:randonneeId/avis` qui appelle le contrôleur `getAvisPage` du fichier `controlers/avis.js` – *1 point*
- Dans le fichier `models/avis.js`, modifiez la fonction `getAvisByRandonneeId` pour qu'elle retourne les avis de la randonnée - *3 points

> [!TIP]
> Si tout fonctionne, les tests passent et les avis s'affichent à droite de l'image de la randonnée sur la page `/randonnees/:randonneeId/avis`.

#### Informations complémentaires pour l'exercice 3
1. Pour créer une connection à la base de données vous utiliserez les informations suivantes : 
    ```
    host: "mysql",
    user: "root",
    database: "randotarn",
    password: "secret"
    ```
2. Les avis sont stockés dans la table `avis` qui a les colonnes suivantes : 
  - `randonneeId: string`
  - `commentaire: string`
  - `date: date`

  Il n'est pas nécessaire de créer la table.
  
## Exercice 4 : poster un avis – *6 points*
> [!WARNING]
> Pas de tests pour cet exercice, vérifiez manuellement que tout fonctionne

Faire en sorte que le formulaire pour poster un avis sur la page `/randonnees/:randonneeId/avis` fonctionne : lorsque l'utilisateur clique sur « publier » la page s'actualise avec le nouveau commentaire.

1. Implémenter la fonction `createAvis` du fichier `models/avis.js` – *2.5 point*
1. Faire en sorte que l'avis soit sauvegardé en base de donnée quand l'utilisateur clique sur « publier »  – *2 points*
1. Afficher la page des avis après avoir posté un avis – *1 point*
1. Utiliser l'architecture MVC pour séparer le code – *0.5 point*


## Consigne de fin

Créer une archive du projet avec la commande suivante, en remplaçant `<nom>` par votre nom :

```bash
tar -czvf "<nom>".tar.gz --exclude=node_modules .
```

Envoyer l'archive par mail à l'adresse suivante :
`johan.girod@ext.univ-jfc.fr`

> [!IMPORTANT]
> Avant de quitter la salle, venez me voir pour que je valide votre rendu. Si vous ne le faites pas, votre rendu ne sera pas pris en compte.