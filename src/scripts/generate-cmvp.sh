#!/bin/bash

set -e

TEMPLATES_PATH="$(dirname $(readlink -f $0))/cmvp-templates/"

validate_name() {
    local name=$1
    if [ -z "$name" ]; then
        echo "Usage: $0 name"
        echo "Missing parameter 'name'"
        exit
    fi
}

make_file_from_template() {
    local template=$1
    local dest=$2
    local pattern="s/<%= cmvpName %>/$3/g"
    if [ ! -f "$dest" ]; then
        cp "$template" "$dest"
        sed "$pattern" -i "$dest"
        echo "generated $dest"
    fi
}

update_main() {
    echo "PLEASE, don't forget to update the dependency file"
}

validate_name $1

declare -A FILES=(
    ["$TEMPLATES_PATH/controller.js.tmpl"]="$1Controller.js"
    ["$TEMPLATES_PATH/model.js.tmpl"]="$1Model.js"
    ["$TEMPLATES_PATH/view.js.tmpl"]="$1View.js"
    ["$TEMPLATES_PATH/presenter.js.tmpl"]="$1Presenter.js"

    ["$TEMPLATES_PATH/controllerTestSpec.js.tmpl"]="$1ControllerTestSpec.js"
    ["$TEMPLATES_PATH/modelTestSpec.js.tmpl"]="$1ModelTestSpec.js"
    ["$TEMPLATES_PATH/viewTestSpec.js.tmpl"]="$1ViewTestSpec.js"
    ["$TEMPLATES_PATH/presenterTestSpec.js.tmpl"]="$1PresenterTestSpec.js"
)

for KEY in "${!FILES[@]}"
do
    make_file_from_template $KEY ${FILES[$KEY]} $1
done

update_main $1

echo "done"