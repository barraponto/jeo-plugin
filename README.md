# JEO 

Description... 

## Setting up local environment with Lando

[Lando][lando] is a docker-based development tool to set up containerized development environments.
TLDR: Let's just focus on actual programming :) 

First, make sure `lando` [is installed][lando-install]. Also, ensure docker is running.
Then in your preferred terminal (Windows users must use powershell) run:

		lando start

It will spin up a few containers with all the tools you need:

- appserver: runs Wordpress with php/apache
- database: runs Mysql 5.7 for Wordpress default database
- node: runs Node 10 to build Gutenberg blocks
- testdb: runs a secondary database for JEO phpunit tests

Visit https://jeo-plugin.lndo.site to see the live site.
Login with username `admin` and password `admin`.

Tooling includes `lando npm`, `lando composer`, `lando wp` and `lando phpunit`.
Use them as if they were running in your host (but it actually runs inside the containers).

And when you're done with development, spin down your development environment with: 

		lando stop

Just `lando start` the next day to start working on it again.

## Setting up local environment 

### Before you start

Jeo is a WordPress plugin, so you will need all the basic dependencies you usually have to run a WordPress site, such as PHP and MySQL.

You wil also need:

* `WP-Cli` to configure the test environment
* `Phpunit` to run unit tests

```
sudo apt-get install phpunit
```

* To install WP-Cli, check [the official documentation](https://wp-cli.org/#installing).


### Setting up

First of all, clone this repository.

Note that you can NOT clone it directly in the WordPress `plugins` directory. Clone it in a folder of its own and configure your build to point to  your local WordPress `plugins` folder.

```
git clone git@github.com:EarthJournalismNetwork/jeo-plugin.git
```

* Set up a WordPress installation. This could be a dedicated installation to develop Jeo or you can use an existing instance you have. (Note: This plugin requires WordPress 5.3)

### Build

When we want to build the plugin, we run `build.sh` that basically installs any dependencies, compiles all the assets (sass and js) and moves the files to the plugin directory. This compiled version of the plugin is the one that will be added to the official WordPress Plugin repository.

In order to use it, make a copy of `build-config-sample.cfg` and name it only `build-config.cfg`. Edit and fill in your environment details:

* `wp_plugin_dir`: The directory for your plugin build. Should be a directory inside the plugins folder of a WordPress instance. e.g `~/develop/wordpress/wp-content/plugins/jeo`

Once you are ready, you can run:

```
./build.sh
```

While developing, you might want to run `build-watch.sh`. This script will watch your development folder for changes and automatically build the plugin so you don't have to do it manually every time you modify a file.

**Note:** We still have to work on the build script, for now, it's necessary to manuall run `npm install` once and `npm start` to build the js bundle and listen for changes or `npm run build` to build the bundle for production.

### Tests

Jeo uses `phpunit` to run tests for the backend and the API. This is a very important part of the development proccess! Never commit anything before run all the tests to make sure you did not break anything. If you are developing a new feature, you must write tests for it. If you are fixing a bug, you should first write a test that reproduces the bug and then make it pass.

To execute all the tests, simply execute the `phpunit` command from the project root folder. But first you need to configure PHPUnit.

#### Preparing PHPUnit

To run the unit tests it is necessary to create a new MySQL database for your unit tests. This database will be cleaned and restored every time you run PHPUnit.

Install the WordPress test library by running the script provided in the `tests/bin` folder, by running the following command:

```
tests/bin/install-wp-tests.sh wordpress_test root root /path/to/wordpress-test-folder localhost latest
```
The parameters are:

* Database name
* MySQL username
* MySQL password
* WordPress Test Directory*
* MySQL host
* WordPress version
* Optional: skip create database

\* `WordPress Test Directory` will be created with 2 sub folders:

* `wordpress-test` - An installation of WordPress
* `wordpress-tests-lib` - As the name says, the WordPress Tests Library

Inside `tests` folder, edit the file called `bootstrap-config-sample.php` and inform the folder where you installed your WordPress Test Library. This will be `/path/to/wordpress-test-folder/wodpress-tests-lib`. Save the file as `bootstrap-config.php`.

Note that the installation script will create a config file in the destination folder with your database credentials. If you have to change it, you will need to edit it there.

You only need to do all this once, and now you are ready to run tests.

#### Running tests

Simply type this command from the project root folder:

```
phpunit
```

(Note that `phpunit` accepts several parameters, for example if you want to run just a specific group of tests).

[lando]: https://lando.dev
[lando-install]: https://docs.lando.dev/basics/installation.html

