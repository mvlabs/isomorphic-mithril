# Isomorphic web application with Mithril.js

**Isomorphic JavaScript webapps** have been around for a while. The benefits are multiple: SEO (crawlable urls), 
performance (faster first render, interaction and navigation) and maintainability (less code, shared by both the client 
and the server, no duplicate logic).

This website is a showcase of the challenges that we faced implementing an isomorphic web application. 
The aim is to present a real case study where we chose **Mithril** for its speed, simplicity and elegance. 
We will show the solutions we used to solve the common problems for this kind of app.

The source code of the website is available on GitHub:  
[https://github.com/mvlabs/isomorphic-mithril](https://github.com/mvlabs/isomorphic-mithril)

The contents and the app are still work in progress and susceptible to changes. Please see 
the *Contributing* section below for suggestions and improvements.


## Challenges

We will cover some of the most common issues that need to be solved in the development of an average website. 
Our app needs to:

- use **shared routes** between server and client
- use **shared state** between server and client and across components
- be **multilanguage** (i18n, contextual language switch)
- load **dynamic contents** (in our case from Markdown files)
- implement a basic **user auth**
- allow easy **integration of third party libraries**
- manage different kind of errors appropriately


## Stack

We will use the following tools:

 - [Mithril](http://mithril.js.org/) as Javascript frontend framework
 - [Express](http://expressjs.com/) as backend framework
 - [webpack 2](https://webpack.github.io/) as bundler
 - [Babel](http://babeljs.io/) as JS compiler (ES6 to ES5 transpiler)
 - [ESlint](http://eslint.org/) as JS linter
 - [Bulma](https://bulma.io/) as HTML/CSS/JS framework
 - [Sass](http://sass-lang.com/) as CSS preprocessor
 
 
## Credits
 
A special thank you to these people to making this possible:
 
- [MVlabs](http://mvlabs.it/) for giving us the opportunity to work at this project
- [Leo Horie](https://github.com/lhorie) for developing and maintaining [Mithril](http://mithril.js.org/)
- [Stephan Hoyer](https://github.com/StephanHoyer) for developing and maintaining 
[mithril-node-render](https://github.com/StephanHoyer/mithril-node-render) and 
[translate.js](https://github.com/StephanHoyer/translate.js)


## Contributing

Suggestions for improvements and/or translations of the contents of this website in other languages are welcome. 
Please file an issue on GitHub or contact *ACXgit* via [Gitter](https://gitter.im/lhorie/mithril.js).
