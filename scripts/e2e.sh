#!/usr/bin/env bash

export CODE_TESTS_PATH="$(pwd)/dist/test"
export CODE_TESTS_WORKSPACE="$(pwd)/fixture"

node "$(pwd)/node_modules/vscode/bin/test"