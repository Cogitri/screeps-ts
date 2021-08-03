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

You can create new unit tests (tests which don't need the entire game running) under `test/unit/$MY_NAME.test.ts`, see `test/unit/main.test.ts` for a template.
This is useful for testing small functions which don't depend on game logic.

## Integration Tests

Integration tests are a fair bit slower than unit tests, but in return they provide a mockup of the actual game, so one can test functions which depend on
game logic in these tests. Since these tests are slower and a bit harder to write, one should write unit tests if at all possible.
You can add new integration tests in `test/integration/$MY_NAME.test.ts`, see `test/integration/integration.test.ts` for a template.

# IDE/Devsetup

The chosen IDE to develop the project is Visual Studio Code latest.
To support development and help maintaining code quality, both a linter and a formatter extension is used:

- ESLint

  - Preferred choice for linting both TypeScript and JavaScript projects
  - Linting rules defined via configuration file `.eslint.js` in the repository

- Prettier
  - Formats code to maintain both readability and unity in style
  - Formatting rules are defined in the .prettierrc
