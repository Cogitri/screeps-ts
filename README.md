# How to install the project

1. Install npm
2. Install yarn via npm
   `npm install -g yarn`
3. Run yarn with `yarn`
4. Get a Screeps Auth Token from https://screeps.com/a/#!/account/auth-tokens
5. Copy the Token into the token fields in the screeps.sample.json file
6. Rename screeps.sample.json to screeps.json
7. Run the code with `yarn push-main`
8. Check the result at screeps.com

# Run tests

You can run tests via `yarn test`

# Adding new tests

When adding new functionality, tests should be added as well to avoid regressions in the future.

## Unit Tests

We use [jest](https://jestjs.io/) and [screeps-jest](https://github.com/eduter/screeps-jest) for unit testing.
Tests are written in *.spec.ts files where the * represents the module that is tested (e.g. main.spec.test => tests for main.ts module). Each module is described by the jest [describe()](https://jestjs.io/docs/api#describename-fn) global to split the tests into individual suites. The individual tests itself are described with the it() global.

# IDE/Devsetup

The chosen IDE to develop the project is Visual Studio Code latest.
To support development and help maintaining code quality, both a linter and a formatter extension is used:

- ESLint

  - Preferred choice for linting both TypeScript and JavaScript projects
  - Linting rules defined via configuration file `.eslint.js` in the repository

- Prettier
  - Formats code to maintain both readability and unity in style
  - Formatting rules are defined in the .prettierrc
