This codemod is to help transition from importing `faker` through `ember-cli-mirage`, to instead import it directly from `faker`.

For more background on the situation, see [this github issue](https://github.com/samselikoff/ember-cli-mirage/issues/1037#issuecomment-411452618).


## Running the script
Replace `path/to/directories/or/files/you/want` with `./tests` and any other files you want to run through this. Then you can `git add -p` the parts that are useful.

- `npm install -g jscodeshift`
- `jscodeshift -t https://raw.githubusercontent.com/caseywatts/ember-cli-mirage-faker-codemod/master/transform.js path/to/directories/or/files/you/want`


### Development

```
git clone https://github.com/caseywatts/ember-cli-mirage-faker-codemod`
cd ember-cli-mirage-faker-codemod`
npm install
npm test
npm run codemod path/to/directories/or/files/you/want
```

## Codemod Background Reading

If this is your first codemod (it's mine!), here are some helpful references & resources.

1. Intro Articles
  - Intro to start making a codemod for a js library, and many tips for how to use the [AST explorer tool](https://astexplorer.net/): https://vramana.github.io/blog/2015/12/21/codemod-tutorial/
  - This is the original article that explains the structure of jscodeshift and how it was designed https://medium.com/@cpojer/effective-javascript-codemods-5a6686bb46fb
2. Documentation
  - jscodeshift documentation is in the [source files](https://github.com/facebook/jscodeshift/tree/master/src) or you can view them as jsdocs (see [my pull request](https://github.com/facebook/jscodeshift/pull/272) for how)
  - AST type function signatures are documented in the [ast-types](https://github.com/benjamn/ast-types) repo (the `def` folder).
  - The [`recast` documentation](https://github.com/benjamn/recast) goes through path vs node pretty well
3. Development Tips
  - Test setup documentation in the [jscodeshift repo](https://github.com/facebook/jscodeshift#unit-testing)
  - To automate test setup (and for npx setup), try [codemod-cli](https://github.com/rwjblue/codemod-cli)
  - For sharing your codemod, there are many options, from `npx` to running it with githubusercontent. See [my gist about the options](https://gist.github.com/caseywatts/b8fffb51180fe44cd3706407d61150a3)
4. More Resources
  - this "[recipe](https://github.com/facebook/jscodeshift/blob/master/recipes/retain-first-comment.md)" from the jscodeshift repo
  - [ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod)
  - [ember-qunit-codemod](https://github.com/rwjblue/ember-qunit-codemod)
  - For examples of other codemods, articles, and related tools, check out [awesome jscodeshift](https://github.com/sejoker/awesome-jscodeshift)
