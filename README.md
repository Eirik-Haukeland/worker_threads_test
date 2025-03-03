# worker_treads_test

trying out worker_treads api in node

## get up and running:
1. run `npm i` in the terminal
2. run `npm run start` (start currently accepts a optional arguemnt "test") **note** we are using `--experimental-type-stripping` which is in active development

## developing:
- to run tests once use: `npm run test`
- to watch the tests use: `npm run test-watch` **note** this is stil exerimental in the node-test runner

## packages we use
- for tests we use the buildt inn test runner from node: https://nodejs.org/docs/latest-v22.x/api/test.html#test-runner
- we use typescript with --experimental-type-stripping: https://nodejs.org/docs/latest-v22.x/api/typescript.html#type-stripping

