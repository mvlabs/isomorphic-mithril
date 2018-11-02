# Applicazione web isomorfica con Mithril.js

Le **applicazioni web isomorfiche** sono ormai da tempo una realtà. I vantaggi sono multipli: SEO, performance (render 
della prima vista, interazione e navigazione più veloci) e facilità di manutenzione (meno codice, condiviso fra client e 
server, evitando la duplicazione della logica).

Questo sito web è un esempio pratico delle sfide che abbiamo dovuto affrontare quando ci siamo cimentati nella 
realizzazione di applicazioni web isomorfiche. L'obiettivo è presentare un caso di studio reale in cui abbiamo scelto 
**Mithril** come strumento di base per la sua velocità, semplicità ed eleganza. Mostreremo dunque le gli approcci che 
abbiamo utilizzato per risolvere i problemi più comuni in questo tipo di applicazioni.

Il codice sorgente del sito è disponibile su GitHub:  
[https://github.com/mvlabs/isomorphic-mithril](https://github.com/mvlabs/isomorphic-mithril)

I contenuti e l'applicazione sono ancora in fase di sviluppo e suscettibili a cambiamenti. Per suggerimenti e migliorie 
vedi la sezione *Contributi* sottostante.


## Obiettivi

Affonteremo alcuni fra i più comuni problemi che si presentano nello sviluppo di un tipico sito web. La nostra deve:

- fare uso di **rotte condivise** fra server e client
- fare uso di uno **stato condiviso** fra server e client e fra componenti
- essere **multilingua** (i18n, cambio lingua contestuale)
- caricare **contenuti dinamici** (nel nostr ocaso da file Markdown)
- **integrare librerie di terze parti** in modo semplice
- gestire in modo appropriato i diversi casi di errore


## Stack

Useremo i seguenti strumenti:

 - [Mithril](http://mithril.js.org/) come framework per il frontend
 - [Express](http://expressjs.com/) come framework per il backend
 - [webpack 2](https://webpack.github.io/) come
 - [Babel](http://babeljs.io/) come compilatore JS (transpiler da ES6 a ES5)
 - [ESlint](http://eslint.org/) come linter JS
 - [Bulma](https://bulma.io/) come framework HTML/CSS/JS
 - [Sass](http://sass-lang.com/) come preprocessore CSS
 
 
## Ringraziamenti
 
Un ringraziamento speciale a coloro che hanno reso possible la realizzazione di questo sito:
 
- [MV Labs](http://mvlabs.it/) per averci dato l'opportunità di lavorare a questo progetto
- [Leo Horie](https://github.com/lhorie) come creatore e manutentore di [Mithril](http://mithril.js.org/)
- [Stephan Hoyer](https://github.com/StephanHoyer) come creatore e manutentore di [mithril-node-render](https://github.com/StephanHoyer/mithril-node-render) e [translate.js](https://github.com/StephanHoyer/translate.js)


## Contributi

Suggerimenti, migliorie e/o traduzioni in altre lingue dei contenuti di questo sito sono estremamente benvenuti. 
Vi preghiamo di aprire una issue su GitHub oppure contattare *ACXgit* via [Gitter](https://gitter.im/lhorie/mithril.js).
