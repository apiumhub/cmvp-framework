#!/bin/bash

set -e

cd "$(dirname $(readlink -f $0))/.."

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
    local SRCS="'controllers/$1Controller', 'views/$1View', 'presenters/$1Presenter', 'models/$1Model',"
    if ! cat app/main.js | grep "$SRCS"; then
        sed "s%// CMVP%// CMVP\n\t\t\t$SRCS%g" -i app/main.js
        echo "added line to app/main.js: $SRCS"
    fi
}

validate_name $1

declare -A FILES=(
    ["scripts/cmvp-templates/controller.js"]="app/controllers/$1Controller.js"
    ["scripts/cmvp-templates/model.js"]="app/models/$1Model.js"
    ["scripts/cmvp-templates/view.js"]="app/views/$1View.js"
    ["scripts/cmvp-templates/presenter.js"]="app/presenters/$1Presenter.js"

    ["scripts/cmvp-templates/controllerTestSpec.js"]="test/src/controllers/$1ControllerTestSpec.js"
    ["scripts/cmvp-templates/modelTestSpec.js"]="test/src/models/$1ModelTestSpec.js"
    ["scripts/cmvp-templates/viewTestSpec.js"]="test/src/views/$1ViewTestSpec.js"
    ["scripts/cmvp-templates/presenterTestSpec.js"]="test/src/presenters/$1PresenterTestSpec.js"
)

for KEY in "${!FILES[@]}"
do
    make_file_from_template $KEY ${FILES[$KEY]} $1
done

update_main $1

echo "done"