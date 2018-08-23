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

## How to get started with codemods

If this is your first codemod (it's mine!), [I wrote a lot about how I got up and running with codemods - check it out!](https://caseywatts.com/2018/08/23/codemods.html)
