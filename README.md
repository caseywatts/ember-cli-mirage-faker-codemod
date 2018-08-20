This codemod is to help transition from importing `faker` through `ember-cli-mirage`, to instead import it directly from `faker`. See [this issue](https://github.com/samselikoff/ember-cli-mirage/issues/1037#issuecomment-411452618) for more background.

If this is your first codemod (it's mine!), I suggest reading these two:

1. Intro to start making a codemod for a js library, and many tips for how to use the [AST explorer tool](https://astexplorer.net/): https://vramana.github.io/blog/2015/12/21/codemod-tutorial/
2. Test setup documentation in the [jscodeshift repo](https://github.com/facebook/jscodeshift#unit-testing)

For an example of another Ember-related codemod that has a similar structure, check out:

- [ember-modules-codemod](https://github.com/ember-cli/ember-modules-codemod)
