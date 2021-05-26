sharpie
=======

A tool for encoding and optimize image on-the-fly

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sharpie.svg)](https://npmjs.org/package/sharpie)
[![CircleCI](https://circleci.com/gh/https://github.com/n3m3s7s/sharpie/sharpie/tree/master.svg?style=shield)](https://circleci.com/gh/https://github.com/n3m3s7s/sharpie/sharpie/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/sharpie.svg)](https://npmjs.org/package/sharpie)
[![License](https://img.shields.io/npm/l/sharpie.svg)](https://github.com/https://github.com/n3m3s7s/sharpie/sharpie/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sharpie
$ sharpie COMMAND
running command...
$ sharpie (-v|--version|version)
sharpie/0.0.1 linux-x64 node-v15.14.0
$ sharpie --help [COMMAND]
USAGE
  $ sharpie COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
./bin/run --type=avif --force -q=50 tests/images/test.png tests/outputs/test-a.avif

./bin/run --type=webp --force -q=50 tests/images/test.png tests/outputs/test-a.webp
<!-- commandsstop -->
