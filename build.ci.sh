#!/bin/bash

main() {
    if [[ "${TRAVIS_EVENT_TYPE}" = "cron" ]]; then
        npm install
        npm run build
        publish Chatdown
        publish Dispatch
        publish Ludown
        publish LUIS
        publish LUISGen
        publish MSBot
        publish QnAMaker
    else
        (
            set -e
            npm install
            npm run build
            npm run eslint
            npm run tslint
            npm run coveralls
        )

    fi
    errorcode=$?

    if [ $errorcode -ne 0 ]; then
    echo exiting with errorcode $errorcode
    exit $errorcode
    fi
}

function create_npmrc() {
    cat > .npmrc << EOF
registry=https:\${NPM_REGISTRY}
\${NPM_REGISTRY}:_authToken=\${NPM_TOKEN}
EOF
}

function update_version() {
    pname=$(npm show --json | jq -r '.name')
    pversion=$(npm view $pname version)
    npm version --allow-same-version $pversion
    npm version prerelease
}

function publish() {
    echo Publish $1
    pushd packages
    pushd $1
    create_npmrc
    update_version
    npm publish
    popd
    popd
}

main "$@"
