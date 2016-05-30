#Réponses TP mongodb
###### Enguerran POULAIN

#### PREMIÈRE PARTIE (Un peu de sysadmin...)


1. Vérifiez qu'aucun processus mongo tourne actuellement sur votre machine. Si c’est le cas, arretez­le. Ensuite lancez une instance mongod avec le dbpath par défaut.
Connectez­vous sur le shell mongo et affichez le port utilisé et less infos du host depuis le shell.
2. Arretez le processus depuis le shell.
3. Lancez à nouveau une instance de mongod mais cette fois, modifiez le dbpath et le fichier de sortie de logs. Connectez vous sur le shell et affichez les infos utilisées pour la configuration du processus. Vérifiez aussi que les logs sont bien écrit dans le fichier avec un tail ­f ​ ou un ​cat . ​
4. Faites l’import des données contenues dans le fichier zip donnée par l’enseignant afin de construire une base de données appelé “music”.
> **Enguerran:** `sudo mongorestore /path/to/mymusic --db music`

#### DEUXIÈME PARTIE (MongoDB Queries)

1. Affichez les documents de la collection songs.
> **Enguerran:**
> ```
> use music
> show collections
> db.songs.find()
> ```
2. Comptez le nombre de documents existants dans la collection songs.
> **Enguerran:** `db.songs.count()`
3. Affichez exclusivement les titres des chansons du Coldplay de l’album X&Y.
4. Affichez le titre et album des chansons de Stromae, ordonnés par année de la plus récente à la plus ancienne, et triés par ordre alphabétique par titre.
5. Affichez les chansons du group Coldplay dans un tableau, où les éléments sont des strings ayant comme format TITRE (ALBUM). La sortie doit être comme ça :
[
"Paradise(Paradise)",
"The Scientist(The Scientist)",
"Clocks(Clocks)",
"Fix You(Fix You)",
"Speed of Sound(Speed of Sound)"
]
6. Affichez, une seule fois, le noms des artistes ayant produit des chansons entre 2002 et 2005.
7. Créez une collection recordLabel, qui puisse stocker maximum 3 documents ou 1 KB et dont la structure doit être :
nom: string
url: string
La validation doit être stricte. Cherchez les regex nécessaires pour les attributes.
8. Insérez les 3 registres dans la collection. Qu’est­ce qui se passe lorsque vous essayez insérer un 4ème ?
9. Modifiez le validator sur la collection afin d’ajouter le pays en utilisant le code ​
( ​
ISO
3166­1 alpha­2​
)
10. Pour allez plus loin:
a. Qu’est­ce que le TTL ?
b. Quelles sont les modifications à faire sur une collection pour rajouter du TTL ?
c. Si vous devez faire cette manipulation sur la collection recordLabel, il faudrait faire quoi exactement ?
d. Créez une nouvelle collection recordLabel2, avec le même validator, mais avec une TTL sur les documents de 10 secondes.

TROISIÈME PARTIE (Driver MongoDB pour NodeJS)


1. Créez un script NodeJS afin de créer et populer la collection users avec 1000 utilisateurs. Chaque document créé doit contenir un ​
username (à utiliser comme _id),
un ​
displayName et un ​
email ​
. Utilisez faker pour générer les données. Assurez vous que à chaque fois que le script soit exécuté, il n’y aura que 1000 documents dans la
collection.
2. Créez un script NodeJS afin de créer et populer un attribut favoriteSongs pour
chaque user, contenant un tableau des objets avec deux attributs : title et artist. Par
exemple :
[ { title: ‘Clocks’, artist: ‘Coldplay’ }, { title: ‘Formidable’, artist: ‘Stromae’ }, ... ]
Afin de choisir combien de chansons favorites aura chaque user, il faudrait tirer un
nombre au hasard entre 0 et 10. Puis en fonction du nombre des favorites, vous
devez piocher dans la liste existante des chansons pour construire le tableau.
Assurez vous que le tableau ne contient pas des chansons répétées.
3. Créez un script NodeJS afin de créer et populer une collection notes, contenant des
documents correspondant à des évaluations des chansons par les users. Un
exemple d’un document de cette collection est :
{
  username: ‘Garrett_Homenick46’,
  song: {
   title: ‘Fix You’,
   artist: ‘Coldplay’
  },
  note: 4
}
Afin de constituer vos données, vous devez parcourir toutes les users et pour chaque
utilisateur choisir le nombre des chansons à évaluer (min 0, max 5). En fonction du
nombre de chansons à évaluer, vous devez piocher dans la liste existante des
chansons et lui assigner une note au hasard entre 1 et 5, du type entier. Assurez
vous que un user n’évalue pas la même chanson deux fois.
4. Créez un script afin :
a. d’afficher les users n’ayant pas aucune favorites
b. d’afficher les users ayant dans la liste de ses favorites au moins une chanson
de Coldplay
5. Pour aller plus loin: créez un script pour afficher les 10 chansons les plus évaluées

QUATRIÈME PARTIE (Schema Design)



1. Considérez les conceptes de CV et Personne. Comment peut on représenter ces
deux concepts avec un Embbeded Design ? Comment le faire avec le Separated
Collection Design ? Donnez des exemples d’utilisation de chaque possible schema.

PARTIE FINALE (Export/Import des données)


1. Exportez la collections des chansons.
2. Exportez la collection des utilisateurs de la base des données n’ayant aucune
chanson dans la liste des favorites.
3. Créez une nouvelle base de données appelé ‘no­favorites’ contenant les utilisateurs
exportés.
4. Recherche: Quelles autres commandes permettent sur mongodb de faire export et
import ? Quelles sont les différences avec mongodump et mongorestore ?
