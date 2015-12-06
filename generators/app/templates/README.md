# <%= dizmoName %> dizmo

Create the `<%= dizmoName %>` dizmo by running the `npm run make` script and drag and drop the generated file &ndash; which can be found at `build/<%= dizmoName %>-x.y.z.dzm` &ndash; onto dizmoSpace. The suffix of the file will be the current version number.

## Building

Building the dizmo requires a sequence of tasks to be run, which are:

* `npm run make -- clean`: Cleans the previous build (if any) by removing the `build/` folder completely.

* `npm run make -- lint`: Lints all JavaScript files under `src/**/*.js`; this task can be shortened to `npm run lint`.

* `npm run make -- all`: Builds the dizmo under `build/<%= dizmoName %>` &ndash; this task depends on other tasks which are not elaborated here further; see the `gulpfile.js` for details.

* `npm run make -- pack`: Packages the dizmo as `build/<%= dizmoName %>-x.y.z.dzm` by running all tasks and compressing the resulting dizmo as a ZIP archive (but with a `dzm` extension); this task can be shortened to `npm run make`.

## Testing

By default no test cases nor a test framework are provided:

* `npm run test`: Runs tests (if any) &ndash; but actually the script simply returns an `exit 0` indicating a (pseudo) success. If desired, integrate your test framework of choice, write your test cases and override the `test` script in `package.json` accordingly.

## Versioning

Please use semantic versioning by applying `npm version patch` for small patches, `npm version minor` for minor and `npm version major` for major changes; see [NPM's semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) for further information.
