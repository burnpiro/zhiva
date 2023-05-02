# Zhiva

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/zhiva-ai/zhivaai_web/master/static/medvision.png" width="450"></p>

## Build

Run `npx nx build app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Development server

Run `npx nx serve app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Running storybook

### For all libraries

`npm run storybook`

### For selected library/project

`npm run storybook -- my-lib`

## Build static storybook

`npm run build-storybook -- storybook`

`dist` version will be generated in `dist/storybook/storybook` you can run `npx http-server build/storybook/storybook` to run local HTTP server and check it out.

## Running unit tests

Run `npx nx test app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `npx nx e2e app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `npx nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `npm run graph` to see a diagram of the dependencies of your projects.

> !!! Important
>
> All commands below support `--dry-run` parameter. Adding it into the command shows you all the changes the command would do, without doing it. You should use dry-run before generating new stuff.

## Generate an application

Run `npx nx g @nrwl/react:app app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate TS library

Run `npx nx g @nrwl/js:library my-lib --appProject=app --pascalCaseFiles=true --publishable=true --importPath=@zhiva/my-lib --buildable=true` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@zhiva/my-lib`.

## Generate TS component

Run `npx nx g @nrwl/js:component Button --project=my-lib --pascalCaseDirectory=true --pascalCaseFiles=true --export=true` to generate a new component.

`--export=true` should be used when your component should be imported by other applications/libraries.

## Generate React library

Run `npx nx g @nrwl/react:lib my-lib --appProject=app --pascalCaseFiles=true --publishable=true --importPath=@zhiva/my-lib --buildable=true` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@zhiva/my-lib`.

## Generate React component

Run `npx nx g @nrwl/react:component Button --project=my-lib --pascalCaseDirectory=true --pascalCaseFiles=true --export=true` to generate a new component.

`--export=true` should be used when your component should be imported by other applications/libraries.

## Generate storybook for library

Run `npx nx g @nrwl/react:storybook-configuration my-lib` to generate storybook configuration.

### Generate stories for components

Run `npx nx g @nrwl/react:stories --project=my-lib` to generate stories for all components inside library. If stories already exists for some components then only those without `*.stories.tsx` will receive stories.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
