#Réponses TP mongodb
###### Enguerran POULAIN

##### Légende :
* $ : commande exécutée avec droits utilisateur
* \# : commande exécutée avec droits root
* \> : commande exécutée dans le shell mongo
* Aucun symbole devant : réponse/résultat
* (...) : partie de résultat non incluse car longue et pas forcément utile

#### PREMIÈRE PARTIE (Un peu de sysadmin...)

1. Vérifiez qu'aucun processus mongo tourne actuellement sur votre machine. Si c’est le cas, arretez­le. Ensuite lancez une instance mongod avec le dbpath par défaut.
Connectez­vous sur le shell mongo et affichez le port utilisé et less infos du host depuis le shell.
> **Enguerran:**
> ```sh
> # mongod
> MongoDB shell version: 3.2.7
> (...)
>
> > db.serverCmdLineOpts()
>  {
>  	"argv" : [
>  		"mongod",
>  		"--dbpath",
>  		"/media/enguerran/LINUX/lpdw/mongodb/lpdw_mongodb/db"
>  	],
>  	"parsed" : {
>  		"storage" : {
>  			"dbPath" : "/media/enguerran/LINUX/lpdw/mongodb/lpdw_mongodb/db"
>  		}
>  	},
>  	"ok" : 1
>  }
> ```
> *Note :* mon ssd étant plein, je suis obligé de mettre un dbpath vers mon disque dur, d'où les infos indiquant que j'ai spécifié un dbpath.
2. Arretez le processus depuis le shell.
> **Enguerran :**
> ```sh
> > use admin
>  switched to db admin
>
> > db.shutdownServer({timeoutSecs: 60});
>  server should be down...
> (...)
> ```
3. Lancez à nouveau une instance de mongod mais cette fois, modifiez le dbpath et le fichier de sortie de logs. Connectez vous sur le shell et affichez les infos utilisées pour la configuration du processus. Vérifiez aussi que les logs sont bien écrit dans le fichier avec un tail ­f ​ ou un ​cat . ​
> **Enguerran :**
> ```sh
> # mongod --dbpath /path/to/db --logpath /path/to/log/dblog.log
>
> $ tail -f /path/to/log/dblog.log
> 2016-06-12T16:29:20.612+0200 I CONTROL  [initandlisten]
> 2016-06-12T16:29:20.612+0200 I CONTROL  [initandlisten] ** WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'.
> (...)
> 2016-06-12T16:29:20.616+0200 I NETWORK  [initandlisten] waiting for connections on port 27017
>
> $ mongo
> (...)
>
> > db.serverCmdLineOpts()
>  {
>  	"argv" : [
>  		"mongod",
>  		"--dbpath",
>  		"/media/enguerran/LINUX/lpdw/mongodb/lpdw_mongodb/db",
>  		"--logpath",
>  		"/media/enguerran/LINUX/lpdw/mongodb/lpdw_mongodb/dblog.log"
>  	],
>  	"parsed" : {
>  		"storage" : {
>  			"dbPath" : "/media/enguerran/LINUX/lpdw/mongodb/lpdw_mongodb/db"
>  		},
>  		"systemLog" : {
>  			"destination" : "file",
>  			"path" : "/media/enguerran/LINUX/lpdw/mongodb/lpdw_mongodb/dblog.log"
>  		}
>  	},
>  	"ok" : 1
>  }
> ```
4. Faites l’import des données contenues dans le fichier zip donnée par l’enseignant afin de construire une base de données appelé “music”.
> **Enguerran:**
> ```sh
> # mongorestore /path/to/mymusic --db music
>  2016-06-12T15:57:44.392+0200	building a list of collections to restore from /home/enguerran/Téléchargements/mymusic dir
>  2016-06-12T15:57:44.393+0200	reading metadata for music.songs from /home/enguerran/Téléchargements/mymusic/songs.metadata.json
>  2016-06-12T15:57:44.568+0200	restoring music.songs from /home/enguerran/Téléchargements/mymusic/songs.bson
>  2016-06-12T15:57:44.572+0200	restoring indexes for collection music.songs from metadata
>  2016-06-12T15:57:44.646+0200	finished restoring music.songs (19 documents)
>  2016-06-12T15:57:44.646+0200	done
> ```

#### DEUXIÈME PARTIE (MongoDB Queries)

1. Affichez les documents de la collection songs.
> **Enguerran:**
> ```javasript
> > use music
> switched to db music
>
> > show collections
> songs
>
> > db.songs.find()
> { "_id" : ObjectId("55328bd3f238ef5f0de2ad33"), "title" : "Papaoutai", "artist" : "Stromae", "album" : "Racine carrée", "year" : 2013 }
> { "_id" : ObjectId("55328c04f238ef5f0de2ad34"), "title" : "Alors on danse", "artist" : "Stromae", "album" : "Cheese", "year" : 2010 }
> (...)
> { "_id" : ObjectId("553290a7f238ef5f0de2ad45"), "title" : "Elevation", "artist" : "U2", "album" : "All That You Can't Leave Behind", "year" : 2000 }
> ```
2. Comptez le nombre de documents existants dans la collection songs.
> **Enguerran:**
> ```javascript
> > db.songs.count()
> 19
> ```
3. Affichez exclusivement les titres des chansons du Coldplay de l’album X&Y.
> **Enguerran:**
> ```javascript
> > db.songs.find({album: "X&Y", artist: "Coldplay"}, {title:1, _id:0})
> { "title" : "Fix You" }
> { "title" : "Speed of Sound" }
> ```
4. Affichez le titre et album des chansons de Stromae, ordonnés par année de la plus récente à la plus ancienne, et triés par ordre alphabétique par titre.
> **Enguerran:**
> ```javascript
> > db.songs.find({artist: "Stromae"}, {title:1, album:1, _id:0}).sort({year: -1, title: 1})
> { "title" : "Formidable", "album" : "Racine carrée" }
> { "title" : "Papaoutai", "album" : "Racine carrée" }
> { "title" : "Tous les memes", "album" : "Racine carrée" }
> { "title" : "Alors on danse", "album" : "Cheese" }
> ```
5. Affichez les chansons du group Coldplay dans un tableau, où les éléments sont des strings ayant comme format TITRE (ALBUM). La sortie doit être comme ça :
```
[
"Paradise(Paradise)",
"The Scientist(The Scientist)",
"Clocks(Clocks)",
"Fix You(Fix You)",
"Speed of Sound(Speed of Sound)"
]
```
> **Enguerran:**
> ```javascript
> > db.songs.find({artist: "Coldplay"}).map(function(song) { return song.title + "(" + song.album + ")" })
> [
> 	"Paradise(Mylo Xyloto)",
> 	"The Scientist(A Rush of Blood to the Head)",
> 	"Clocks(A Rush of Blood to the Head)",
> 	"Fix You(X&Y)",
> 	"Speed of Sound(X&Y)"
> ]
> ```
6. Affichez, une seule fois, le noms des artistes ayant produit des chansons entre 2002 et 2005.
> **Enguerran:**
> ```javascript
> > db.songs.distinct("artist", {$and: [{ year : { $gte: 2002 } }, { year: { $lte: 2005 } }]})
> [ "Maroon 5", "Coldplay" ]
> ```
7. Créez une collection recordLabel, qui puisse stocker maximum 3 documents ou 1 KB et dont la structure doit être :
```
nom: string
url: string
```
La validation doit être stricte. Cherchez les regex nécessaires pour les attributes.
> **Enguerran:**
> ```javascript
> > db.createCollection("recordLabel", { capped: true, max: 3, size: 1000, validator: { $and: [ { name: { $type: "string", $exists: true } }, { url: { $type: "string", $exists: true, $regex: /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i } } ] } });
>  { "ok" : 1 }
> ```
8. Insérez les 3 registres dans la collection. Qu’est­ce qui se passe lorsque vous essayez insérer un 4ème ?
> **Enguerran:**
> ```javascript
> > db.recordLabel.insert([{name: "RickRoll'D", url: "https://youtu.be/dQw4w9WgXcQ"},{name: "Nyan Cat", url: "https://youtu.be/QH2-TGUlwu4"},{name: "Gangnam Style", url: "https://youtu.be/9bZkp7q19f0"}]);
> BulkWriteResult({
> 	"writeErrors" : [ ],
> 	"writeConcernErrors" : [ ],
> 	"nInserted" : 3,
> 	"nUpserted" : 0,
> 	"nMatched" : 0,
> 	"nModified" : 0,
> 	"nRemoved" : 0,
> 	"upserted" : [ ]
> })
>
> > db.recordLabel.find({},{_id:0})
>  { "name" : "RickRoll'D", "url" : "https://youtu.be/dQw4w9WgXcQ" }
>  { "name" : "Nyan Cat", "url" : "https://youtu.be/QH2-TGUlwu4" }
>  { "name" : "Gangnam Style", "url" : "https://youtu.be/9bZkp7q19f0" }
>
> > db.recordLabel.insert({name: "Stop! HammerTime", url: "https://youtu.be/GbKAaSf6e10"})
> WriteResult({ "nInserted" : 1 })
>
> > db.recordLabel.find({},{_id:0})
> { "name" : "Nyan Cat", "url" : "https://youtu.be/QH2-TGUlwu4" }
> { "name" : "Gangnam Style", "url" : "https://youtu.be/9bZkp7q19f0" }
> { "name" : "Stop! HammerTime", "url" : "https://youtu.be/GbKAaSf6e10" }
> ```
> Insérer un 4ème document supprime le premier inséré.

9. Modifiez le validator sur la collection afin d’ajouter le pays en utilisant le code ​
( ​[ISO 3166­1 alpha­2​](http://www.iso.org/iso/country_names_and_code_elements) )
> **Enguerran:**
> ```javascript
> > db.runCommand( { "collMod": "recordLabel" , "validator": { $and: [ { name: { $type: "string", $exists: true } }, { url: { $type: "string", $exists: true, $regex: /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i } }, { ISOCountry: { $type: "string", $exists: true, $regex: /(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|AN|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SK|SI|SB|SO|ZA|GS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)/ } } ] } } )
> { "ok" : 1 }
> ```

10. Pour allez plus loin:

a. Qu’est-­ce que le TTL ?
> **Enguerran:** TTL = **Time to Live**, délai avant qu'un document ne s'autodétruise (comme dans _Mission Impossible_ mais en moins impressionnant)

b. Quelles sont les modifications à faire sur une collection pour rajouter du TTL ?
> **Enguerran:**
> ```javascript
> > db.aCollection.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )
> ```

c. Si vous devez faire cette manipulation sur la collection recordLabel, il faudrait faire quoi exactement ?
> **Enguerran:**
Il n'est pas possible de faire directement la manipulation sur recordLabel car mongodb ne peut pas supprimer via le TTL (ou le `db.aCollection.remove()`) les collections "capped". Il faudrait donc enlever la limitation avant d'ajouter le TTL. Pour cela, le seul moyen est de copier temporairement la collection, ce qui supprimera la limitation, la renommer, puis ajouter le TTL

> ```javascript
> > db.recordLabel.copyTo("recordLabel_temp")
> WARNING: db.eval is deprecated
> 3
>
> > db.recordLabel.drop()
> true
>
> > db.recordLabel_temp.renameCollection("recordLabel")
> { "ok" : 1 }
>
> > db.recordLabel.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )
> {
> 	"createdCollectionAutomatically" : false,
> 	"numIndexesBefore" : 1,
> 	"numIndexesAfter" : 2,
> 	"ok" : 1
> }
> ```

d. Créez une nouvelle collection recordLabel2, avec le même validator, mais avec une TTL sur les documents de 10 secondes.

> **Enguerran:**
> ```javascript
> > db.createCollection("recordLabel2", { size: 1000, validator: { $and: [ { name: { $type: "string", $exists: true } }, { url: { $type: "string", $exists: true, $regex: /((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)/i } }, { ISOCountry: { $type: "string", $exists: true, $regex: /(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|AN|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SK|SI|SB|SO|ZA|GS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)/ } } ]}})
> { "ok" : 1 }
>
> > db.recordLabel.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 10 } )
> {
> 	"createdCollectionAutomatically" : false,
> 	"numIndexesBefore" : 2,
> 	"numIndexesAfter" : 2,
> 	"note" : "all indexes already exist",
> 	"ok" : 1
> }
> ```


####TROISIÈME PARTIE (Driver MongoDB pour NodeJS)


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
