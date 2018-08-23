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

If this is your first codemod (it's mine!), I suggest reading these two:

1. Intro to start making a codemod for a js library, and many tips for how to use the [AST explorer tool](https://astexplorer.net/): https://vramana.github.io/blog/2015/12/21/codemod-tutorial/
2. Test setup documentation in the [jscodeshift repo](https://github.com/facebook/jscodeshift#unit-testing)

For an example of another Ember-related codemod that has a similar structure, check out:

- [ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod)
