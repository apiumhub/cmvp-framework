#!/bin/bash

set -e
set -u

## CONSTANTS:
readonly SCRIPT_PATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
readonly TEMPLATES_PATH="$SCRIPT_PATH/cmvp-templates/"

## THESE CONSTANTS COULD BE DEFINED IN ANOTHER SCRIPT ADAPTED TO SPECIFIC NEEDS:
readonly TEST_PATH=${TEST_PATH-"test/src"}
readonly APP_PATH=${APP_PATH-"app"}

readonly CONTROLLERS_PATH=${CONTROLLERS_PATH:-"."}
readonly MODELS_PATH=${MODELS_PATH:-"."}
readonly VIEWS_PATH=${VIEWS_PATH:-"."}
readonly PRESENTERS_PATH=${PRESENTERS_PATH:-"."}

readonly TEST_EXT=${TEST_EXT:-"Test.js"}

## FILES TO BE CHANGED:
declare -A FILES=(
    ["$TEMPLATES_PATH/controller.js.tmpl"]="$APP_PATH/$CONTROLLERS_PATH/$1Controller.js"
    ["$TEMPLATES_PATH/model.js.tmpl"]="$APP_PATH/$MODELS_PATH/$1Model.js"
    ["$TEMPLATES_PATH/view.js.tmpl"]="$APP_PATH/$VIEWS_PATH/$1View.js"
    ["$TEMPLATES_PATH/presenter.js.tmpl"]="$APP_PATH/$PRESENTERS_PATH/$1Presenter.js"

    ["$TEMPLATES_PATH/controllerTest.js.tmpl"]="$TEST_PATH/$CONTROLLERS_PATH/$1Controller$TEST_EXT"
    ["$TEMPLATES_PATH/modelTest.js.tmpl"]="$TEST_PATH/$MODELS_PATH/$1Model$TEST_EXT"
    ["$TEMPLATES_PATH/viewTest.js.tmpl"]="$TEST_PATH/$VIEWS_PATH/$1View$TEST_EXT"
    ["$TEMPLATES_PATH/presenterTest.js.tmpl"]="$TEST_PATH/$PRESENTERS_PATH/$1Presenter$TEST_EXT"
)

## FUNCTIONS:
generate_cmvp() {
    validate_name $1
    local relativePath=$(dirname $1)

    for key in "${!FILES[@]}"
    do
        local value=$(fix_path ${FILES[$key]})
        make_file_from_template $key $value $1
    done
}

fix_path() { echo "$1" | sed 's/\.\///g' ; }

validate_name() {
    local name=$1
    if [ -z "$name" ]; then
        echo "Usage: $0 relative_path_with_name"
        echo "Missing parameter 'relative_path_with_name'"
        echo "Example: $0 assignment/edit/Edit will generate"
        echo "         $APP_PATH/assignment/edit/EditController.js"
        echo "         $TEST_PATH/assignment/edit/EditController$TEST_EXT"
        echo "         ... and more cmvp classes (view, presenter and model)"
        exit
    fi
}

make_file_from_template() {
    local template=$1
    local dest=$2
    local cmvpPath=$3
    local cmvpName=$(basename $3)
    local pattern1="s%<|= cmvpName |>%$cmvpName%g"
    local pattern2="s%<|= cmvpPath |>%$cmvpPath%g"
    if [ ! -f "$dest" ]; then
        mkdir -p $(dirname $dest)
        cp "$template" "$dest"
        sed "$pattern1" -i "$dest"
        sed "$pattern2" -i "$dest"
        echo "generated $dest"
    fi
}

## RUN
if [[ "$SCRIPT_PATH" == "$(cd $(dirname $0) && pwd)" ]] ; then
    generate_cmvp $1
    echo
    echo "PLEASE, don't forget to update the dependency file"
    echo
    echo "done"
fi
