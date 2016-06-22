# generator-dizmo [![NPM version][npm-image]][npm-url]
> Dizmo generator

## Installation

First, install [Yeoman](http://yeoman.io) and *generator-dizmo* using [npm] (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-dizmo
```

On most operating systems the `-g` option (shortcut for `--global`) requires super user (administrator) rights: Therefore, on Unix like systems you might be required to run the above commands using either `sudo` (i.e. `sudo npm install -g yo` and `sudo npm install -g generator-dizmo`), or run them directly from your super user (administrator) account of your operating system.

## Quick start

Invoke the dizmo generator with a name of your choice, e.g. `my-dizmo`, and answer a few questions:

    yo dizmo my-dizmo

After the build, drag and drop the `./my-dizmo/build/MyDizmo-0.0.0.dzm` file onto dizmoSpace: You should see the front side of the dizmo with `Hello World!` written on it.

The name parameter is optional and can be changed at the prompt. Further, calling `yo dizmo` is equivalent to invoking the default generator with `yo dizmo:app`.

To list all possible arguments and options of the generator, enter:

     yo dizmo --help

## Caching

[Npm] uses a built in [cache](https://docs.npmjs.com/misc/config#cache) mechanism to accelerate package installation. There are various configuration options to control the behaviour of the cache. Here, we are interested in [cache-min](https://docs.npmjs.com/misc/config#cache-min):

> The minimum time (in seconds) to keep items in the registry cache before re-checking against the registry. [default: 10]

The provided default of `10` seconds is too short, to efficiently make use of caching. Therefore, we recommend setting it to e.g. a week, by running the configuration command:

    npm config set cache-min 604800

By setting `chache-min` to `604800`, you ensure that no package with a timestamp younger than a week is checked against the central registry (for a possible update). This significantly improves your [npm] experience.

Further, we suggest to clear the cache initially by running `npm cache clean`, but this is not necessarily required: It will simply wipe out your cached packages, and ensure that no corrupted cache exists.

However, this also means that your very first dizmo skeleton generation (and corresponding installation of [npm] packages) will take longer than later invocations.

By running `npm cache ls` you can determine, which [npm] packages have already been cached.

### Questions

At the start, you will be asked a few questions, after which the terminal should look similar to:

    ~/my-dizmos $ yo dizmo

         _-----_
        |       |    .--------------------------.
        |--(o)--|    |   Welcome to the awsome  |
       `---------´   |     dizmo generator!     |
        ( _´U`_ )    '--------------------------'
        /___A___\
         |  ~  |
       __'.___.'__
     ´   `  |° ´ Y `

    ? Name your dizmo: MyDizmo
    ? Describe it: My Dizmo
    ? And its bundle ID? com.example.my_dizmo
    ? What's your name? Name Surname
    ? And your email? name.surname@mail.net

The `dizmo` generator asks you a few questions; let's have a look at them:

    ? Name your dizmo: MyDizmo

If no `dizmoName` argument is provided then by default `MyDizmo` will be suggested; accept, or change as desired. This name will be used to create a project folder in the current directory; e.g. for the `MyDizmo` name the folder would be `my-dizmo/`.

    ? Describe it: My Dizmo

You should provide a short succinct description of your project. By default the name of the current directory will be taken as a base for a suggestion.

    ? And its bundle ID? com.example.my_dizmo

Each dizmo is required to have a unique `bundle ID`, which is a name of the bundle each dizmo instance will belong to: E.g. each sticky note dizmo would have the *same* `com.dizmo.stickynote` bundle ID (but with *different* dizmo IDs).

Choose as a prefix e.g. the domain of your company (in reverse notation with the `com.`, `org.` etc. preceding the rest), and then a name related to the dizmo.

    ? What's your name? Full Name

Provide e.g. your full name, to designate yourself as the author of the project. By default, the current GIT user name &ndash; if available &ndash; or OS login will be suggested. Anything you enter here will be remembered and automatically suggested as the default at your next invocation of `yo dizmo`.

The entry will be stored once the project skeleton is setup in `package.json` under `person.name`. For multiple contributors, see the [npm:package.json](https://docs.npmjs.com/files/package.json) documentation, section [people-fields-author-contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

    ? And your email? my@email.net

Provide your email, so people can reach you for feedback, bug reports etc. By default the generator suggests the GIT user email &ndash; if available &ndash; or the `MAIL` environment variable (which you may want to correct with your proper email). Again, the next time you invoke `yo dizmo`, your entry will be the new default suggestion.

The entry will be stored in `package.json` under `person.email`
For multiple contributors, see again [people-fields-author-contributors](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

## Skeleton

After you have answered the last question, the generator will create the project's skeleton. If you have the `tree` command on your system, then you can visualize the directory structure:

    my-dizmo $ tree
    .
    ├── LICENSE
    ├── README.md
    ├── assets
    │   ├── Icon-dark.svg
    │   ├── Icon.svg
    │   └── Preview.png
    ├── gulp
    │   ├── package.js
    │   └── tasks
    │       ├── 010-build.js
    │       ├── 020-clean.js
    │       ├── 030-process-help.js
    │       ├── 040-process-assets.js
    │       ├── 050-process-libs.js
    │       ├── 060-process-styles.js
    │       ├── 070-process-scripts.js
    │       ├── 080-process-markup.js
    │       ├── 090-process-properties.js
    │       └── 100-install.js
    ├── gulpfile.js
    ├── help
    │   └── en
    │       ├── help.md
    │       └── placeholder-400x275.png
    ├── package.json
    └── src
        ├── index.html
        ├── index.js
        └── style
            └── style.css

Let's have a look at each ot the top level files and directories:

* `LICENCE`: By default an [ISC](http://opensource.org/licenses/ISC) (Internet Software Consortium) license is generated, which is functionally equivalent to the simplified BSD and MIT licenses, but with a simpler language. Leave or change this according to your needs.

* `README.md`: A simple shortened version of this README.md; it is meant to provide a quick overview, and can then be replaced with a project specific content.

* `assets`: A folder containing asset files like images, which can be accessed from within the dizmo using a relative path like `assets/Preview.png`. Put any such files (or media) which are not directly related to styling into this folder. You can also create sub-folders or any nested directory structure according to your needs.

* `gulp`: A folder containing a build system based on [gulp](http://gulpjs.com/). If you are familiar with `gulp`, then you can change the build mechanism according to your needs; otherwise, just use it as it is.

* `gulpfile.js`: The main script driving the `gulp` build system; usually you can leave this file as it is.

* `help`: Once you've developed your dizmo, you might want to provide a user documentation, which can be placed in this folder.

* `package.json`: This is an important file! It is consumed by the [npm] package manager, provides run scripts for build system (like `lint`, `clean`, `make`, `install` etc.), and allows to change the dizmo settings. Have a look at the corresponding section for further information.

* `src`: A folder containing your own scripts for your dizmo, like `index.html` and `index.js` plus CSS styles under `style/style.css`

## Package manager: package.json

Dizmos use [npm] as a package manager; to thoroughly understand its functionality, please consult [What is npm?](https://docs.npmjs.com/getting-started/what-is-npm) and work through the 15 small video based tutorials in the *Getting Started* section.

### Dizmo section

In addition to the default entries of [npm] the `package.json` file contains a `dizmo` section:

    "dizmo": {
        "install-to": "",
        "settings": {
            "bundle-identifier": "com.example.my_project_1",
            "height": 240, "width": 480
        }
    }

Lets have a look at each entry:

* `install-to`: Your dizmoSpace caches locally installed dizmos in a location that looks on Unix likes system e.g. like this:

```
/home/user/.local/share/dizmo/dizmo/user/InstalledDizmos/
```

where `user` is your login. If you set `install-to` to this path, then you will be able to directly build and install a dizmo to the given path. Just run:

    npm run-script install

Or you can abbreviate to:

    npm run install

If no `install-to` path is provided, then the dizmo is build and will be available under `build/`, but it will not be copied to the installation path (since latter is not given).

* `settings`: Any entry provided here will be translated to an entry in `build/Info.plist`, which is the main control file defining the properties of a dizmo. Each entry key is converted to came-case, before being translated. See the *build* section for further information on `Info.plist`.

#### Defaults

The `dizmo` section in `package.json` can be extended with default values, which have to reside in `.generator-dizmo/config.json` (in *any* of the parent directories). E.g. to set the credentials and the upload URL for dizmoStore, use the following content:

    {
        "dizmo": {
            "credentials": {
                "password": "my-password",
                "username": "my-username"
            },
            "urls": {
                "upload": "http://store-api.dizmo.com"
            }
        }
    }

The configuration is hierarchical and recursive, i.e. that a `.generator-dizmo/config.json` file can be saved in any parent directory of the current project's path, all of which are then merged during the build dynamically into `package.json`, where configuration files in the lower levels have precedence.

#### `npm install` vs `npm run-script install`

Please note that `npm install` and `npm run-script install` are *two* different actions! While the former installs all dependencies provided in `package.json` *and* runs the latter, the latter simple builds the dizmo and copies the `*.dzm` file to the `install-to` destination.

This means that if you are sure that all your dependencies have been installed and are met, then you can quickly invoke `npm run install` (which is much faster thant `npm install` due to the lack of dependency checks).

## NPM scripts

Please read first [npm#scripts](https://docs.npmjs.com/misc/scripts); in each `package.json` the following scripts should be available:

* `clean`: ensures to run the clean task provided by the build system;
```
npm run clean
```

* `make`: ensures to run the build system; if you want to run custom sub-task then suffix the command with a double hyphen and provide the corresponding task name; e.g.:
```
npm run make -- clean
```

* `test`: ensures to run tests; by default no tests nor a test frameworks are pre-defined (therefore a simple `exit 0` script has been provided). It's up to the dizmo developer to decide how tests shall be implemented. The only condition is, that the main test script should provide an exit value of `0` in case of success.

## Build

Once your dizmo is build, a `build/` folder with the following content will be available:

    my-dizmo $ tree build/
    build/
    ├── MyDizmo
    │   ├── Icon-dark.svg
    │   ├── Icon.svg
    │   ├── Info.plist
    │   ├── Preview.png
    │   ├── assets
    │   │   ├── Icon-dark.svg
    │   │   ├── Icon.svg
    │   │   └── Preview.png
    │   ├── help.zip
    │   ├── index.html
    │   ├── index.js
    │   └── style
    │       └── style.css
    └── MyDizmo-0.0.0.dzm

* `MyDizmo-0.0.0.dzm`: A ZIP archive of the `MyDizmo` folder with a version suffix, which has been defined in `project.json`. Please see [Semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning) for further information. You can drag and drop this file onto dizmoSpace to instantiate a dizmo.

  In dizmoSpace only the dizmo bundle with the highest version number is cached! Therefore, it is important to increase the version when releasing a dizmo to your audience. However, simply changing the version suffix in the `*.dzm` file name will *not* work: the version is required to be set in `MyDizmo/build/Info.plist` (which happens automatically based on the version information in `package.json`).

* `MyDizmo/Info.plist`: a list of properties (in XML notation) defining a dizmo; this file is derived from the original `.info.plist` template file, which has been enriched with information from `package.json`.

* `MyDizmo/assets`: a copy of the original `assets` folder;
* `MyDizmo/help.zip`: a ZIP archive of the original `help` folder;
* `MyDizmo/index.html`: the main HTML script;
* `MyDizmo/index.js`: the main JavaScript;
* `MyDizmo/style/style.css`: CSS style sheets.

## Dependency management

There is no automatic dependency management implemented, because of which you should extend the `src_list` array in the `070-process-scripts.js` task if required so.

However, for third party dependencies please consider using the `opt:browserify` sub-generator.

## Advanced sub-generators

Once you have accommodated yourself with the basics of dizmo development, you can go further and try out the advanced sub-generators `dizmo:ext` and `dizmo:ext-coffee-script` and `dizmo:opt-browserify`.

All sub-generators require the basic skeleton to be setup with `yo dizmo` (or equivalently with `yo dizmo:app`) first!

It's in theory possible to run the advanced sub-generators even after having edited the basic skeleton, but only as long as the original directory structure has been left in place. Using this feature you can later-on convert your basic dizmo projects to more advanced ones.

### dizmo:ext &ndash; extended skeleton

Invoke the `dizmo:ext` sub-generator (after having invoked `yo dizmo`):

    yo dizmo my-dizmo --skip-install
    cd my-dizmo && yo dizmo:ext

Or simpler by directly enabling the `dizmo:ext` sub-generator:

    yo dizmo my-dizmo --ext

This will run the basic generator and then apply on top of it the extended sub-generator. However, when you invoke the above command, then the install step will be executed multiple times (once for the each generator). To avoid that run:

    yo dizmo my-dizmo --ext --skip-install
    cd my-dizmo && npm install

It will create or modify the regular skeleton:

    my-dizmo $ tree
    .
    ├── .eslintrc.json
    ├── gulp
    │   ├── package.js
    │   └── tasks
    │       ├── 000-lint.js
    │       ├── 010-build.js
    │       ├── 060-process-styles.js
    │       ├── 070-process-scripts.js
    │       ├── 080-process-markup.js
    │       ├── 100-install.js
    │       └── 999-watch.js
    ├── package.json
    └── src
        └── style
            └── style.scss

The extended features are:

* **Linting:** Run `npm run lint` to manually start linting. But since now `npm run make` and `npm run install` are dependent on it, there is no need to manually start it.

  The `.eslintrc.json` file can be used to configure the linting process for JavaScript files.

* **SASS:** Instead of `style.css` you can now work with `style.scss` style sheets.

* **Minification:** All JavaScript, HTML and CSS files will be minified (with `htmlmin` and `uglify`).

### dizmo:ext-coffee-script &ndash; CoffeeScript integration

Invoke the `dizmo:ext-coffee-script` sub-generator (after having invoked `yo dizmo`):

    yo dizmo my-dizmo --skip-install
    cd my-dizmo && yo dizmo:ext-coffee-script

Or simpler by directly enabling the `dizmo:ext-coffee-script` sub-generator:

    yo dizmo my-dizmo --ext-coffee-script

This will run the basic generator and then apply on top of it the extended CoffeeScript sub-generator. However, when you invoke the above command, then the install step will be executed multiple times (once for the each generator). To avoid that run:

    yo dizmo my-dizmo --ext-coffee-script --skip-install
    cd my-dizmo && npm install

It will create or modify the regular skeleton:

    my-dizmo $ tree
    .
    ├── coffeelint.json
    ├── gulp
    │   ├── package.js
    │   └── tasks
    │       ├── 000-lint.js
    │       ├── 010-build.js
    │       ├── 060-process-styles.js
    │       ├── 070-process-scripts.js
    │       ├── 080-process-markup.js
    │       ├── 100-install.js
    │       └── 999-watch.js
    ├── package.json
    └── src
        ├── index.coffee
        └── style
            └── style.scss

The extended features are:

* **Linting:** Run `npm run lint` to manually start linting. But since now `npm run make` and `npm run install` are dependent on it, there is no need to manually start it.

  The `coffeelint.json` file can be used to configure the linting process for CoffeeScript files.

* **SASS:** Instead of `style.css` you can now work with `style.scss` style sheets.

* **Minification:** All JavaScript, HTML and CSS files will be minified (with `htmlmin` and `uglify`).

* **CoffeeScript:** Using the `index.coffee` file you can start developing your application in [CoffeeScript](http://coffeescript.org/).

### dizmo:opt-library &ndash; Library integration

Thanks to the [browserify](http://browserify.org/) project it is possible to integrate (browser compatible) node modules directly into your dizmo projects:

    yo dizmo my-dizmo --skip-install
    cd my-dizmo
    yo dizmo:ext --skip-install
    yo dizmo:with-library --skip-install
    npm install

You could omit `yo dizmo:ext` and directly run the (optional) `yo dizmo:with-library` sub-generator, but we assume that if you want to have a browserified integration, then you may also want to work on the extended skeleton.

Or again a simpler invocation would be to directly enable the `dizmo:ext` and `dizmo:with-library` sub-generators:

    yo dizmo my-dizmo --ext --with-library

This will run the basic generator and then apply on top of it the other sub-generators. However, when you invoke the above command, then the install step will be executed multiple times (once for the each generator). To avoid that run:

    yo dizmo my-dizmo --ext --with-library --skip-install
    cd my-dizmo && npm install

Let's have a look at the changes:

    my-dizmo $ tree
    .
    ├── gulp
    │   └── tasks
    │       └── 050-process-lib.js
    ├── package.json
    └── src
        └── index.html

If you look at the content of `index.html`, then you'll see that an additional `libary.js` script has been included:

    <script src="lib/library.js"></script>

This script is *not* available in the skeleton, but will be constructed on the fly during the build process: It will contain the browserified content of any Node library, which you have declared in `package.json` as a dependency.

For example, if you want to have access to the [lodash](https://lodash.com/) library within your dizmo, then you only have to run:

    npm install --save lodash

which adds the corresponding dependency in `package.json`:

    "dependencies": {
        "lodash": "^3.10.1"
    }

Now, if you run `npm run make` and drag and drop the generated dizmo onto dizmoViewer, then you'll notice that the global `lodash` variable references the [lodash](https://lodash.com/) library.

Of course this does not mean, that you cannot include libraries the old fashioned way, by simply downloading the (minified) distribution, putting it in your dizmo project, and referencing it directly from your HTML markup as a script: this is still possible!

But declaring a dependency in `package.json` offers you the benefit of semantic versioning.

## License

 © 2016 [dizmo AG, Switzerland](http://dizmo.com/)

[npm-image]: https://badge.fury.io/js/generator-dizmo.svg
[npm-url]: https://npmjs.org/package/generator-dizmo
[npm]: https://www.npmjs.com
