# <%= dizmoName %> dizmo

Create the `<%= dizmoName %>` dizmo by running `npm run make` and drag and drop the generated file &ndash; which can be found at `build/<%= dizmoName %>-x.y.z.dzm` &ndash; onto dizmoSpace. The suffix of the file will be the current version number.

## Building

Building the dizmo requires a sequence of tasks to be run, which are:

* `npm run clean`: Cleans the previous build (if any) by removing the `build/` folder completely.

* `npm run make`: Packages the dizmo as `build/<%= dizmoName %>-x.y.z.dzm` by running all required build tasks and compressing the resulting dizmo as a ZIP archive (but with a `.dzm` extension).

* `npm run install`: Builds and installs the dizmo to the `dizmo/install-to` path (see the `package.json` file). If `install-to` is empty then the dizmo is only built, but not installed.

## Testing

By default no test cases nor a test framework are pre-defined:

* `npm run test`: Runs tests (if any) &ndash; but actually the script simply returns an `exit 0` indicating success. If desired, integrate your test framework of choice, write your test cases and override the `test` script in `package.json` accordingly.

  The only requirement is that the main test script should return `0` in case of successful test runs.

## Versioning

Please use semantic versioning by applying `npm version patch` for small patches, `npm version minor` for minor and `npm version major` for major changes; see [NPM's semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) for further information.
