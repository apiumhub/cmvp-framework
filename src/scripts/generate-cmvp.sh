#!/bin/bash

set -e

TEMPLATES_PATH="$(dirname $(readlink -f $0))/cmvp-templates/"

validate_name() {
    local name=$1
    if [ -z "$name" ]; then
        echo "Usage: $0 relative_path_with_name"
        echo "Missing parameter 'relative_path_with_name'"
        echo "Example: $0 assignment/edit/Edit will generate"
        echo "         app/assignment/edit/EditController.js"
        echo "         test/src/assignment/edit/EditControllerTestSpec.js"
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
        cp "$template" "$dest"
        sed "$pattern1" -i "$dest"
        sed "$pattern2" -i "$dest"
        echo "generated $dest"
    fi
}

update_main() {
    echo "PLEASE, don't forget to update the dependency file"
}

validate_name $1
relativePath=$(dirname $1)

mkdir -p "app/$relativePath"
mkdir -p "test/src/$relativePath"

declare -A FILES=(
    ["$TEMPLATES_PATH/controller.js.tmpl"]="app/$1Controller.js"
    ["$TEMPLATES_PATH/model.js.tmpl"]="app/$1Model.js"
    ["$TEMPLATES_PATH/view.js.tmpl"]="app/$1View.js"
    ["$TEMPLATES_PATH/presenter.js.tmpl"]="app/$1Presenter.js"

    ["$TEMPLATES_PATH/controllerTestSpec.js.tmpl"]="test/src/$1ControllerTestSpec.js"
    ["$TEMPLATES_PATH/modelTestSpec.js.tmpl"]="test/src/$1ModelTestSpec.js"
    ["$TEMPLATES_PATH/viewTestSpec.js.tmpl"]="test/src/$1ViewTestSpec.js"
    ["$TEMPLATES_PATH/presenterTestSpec.js.tmpl"]="test/src/$1PresenterTestSpec.js"
)

for KEY in "${!FILES[@]}"
do
    make_file_from_template $KEY ${FILES[$KEY]} $1
done

update_main $1

echo "done"