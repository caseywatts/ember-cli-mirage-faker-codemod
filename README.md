This codemod is to help transition from importing `faker` through `ember-cli-mirage`, to instead import it directly from `faker`.

For more background on the situation, see [this github issue](https://github.com/samselikoff/ember-cli-mirage/issues/1037#issuecomment-411452618).


## How To Remove The Faker Dependency

### Install faker and ember-auto-import
```
yarn add faker
git add . && git commit -m "adding faker package"
ember install ember-auto-import
git add . && git commit -m "installing ember-auto-import package"
```

### Run the codemod
This example will run the codemod on all files in the `./tests` folder. Then you can selectively check in as many changes as you'd like to keep (try `git add -p`!).

```
npm install -g jscodeshift
jscodeshift -t https://raw.githubusercontent.com/caseywatts/ember-cli-mirage-faker-codemod/master/transform.js ./tests
```

You might also be using faker in your `mirage` directory, so you can run it there as well:

```
npm install -g jscodeshift
jscodeshift -t https://raw.githubusercontent.com/caseywatts/ember-cli-mirage-faker-codemod/master/transform.js ./mirage
```

- If you find additional edge cases, please clone this repo and contribute :D
- Don't be afraid of codemods, check out Casey's [tutorial](https://caseywatts.com/2018/08/23/codemods.html)

## How do codemods even?

If this is your first codemod (it's mine!), [I wrote a lot about how I got up and running with codemods - check it out!](https://caseywatts.com/2018/08/23/codemods.html)


## Development

```
git clone https://github.com/caseywatts/ember-cli-mirage-faker-codemod`
cd ember-cli-mirage-faker-codemod`
npm install
npm test
npm run codemod path/to/directories/or/files/you/want
```

Make sure to add test cases to the `__testfixtures__` (see the [tutorial](https://caseywatts.com/2018/08/23/codemods.html) for details).
