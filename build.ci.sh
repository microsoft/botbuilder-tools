#!/bin/bash

main() {
  if [[ "${TRAVIS_EVENT_TYPE}" = "cron" ]] || [[ $1 = "publish" ]]; then
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
            npm install -g typescript
            cd packages/LUISGen/tests/LUISGenTestJS/
            npm install
            cd ../../../../
            npm run build
            npm run coveralls
            npm run tslint
            npm run eslint
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
  oldregistry=$(npm config get registry)
  npm config set registry https://botbuilder.myget.org/F/botbuilder-tools-daily/npm/
  pname=$(cat package.json | jq -r '.name' | cut -d- -f1)
  pversion=$(cat package.json | jq -r '.version' | cut -d- -f1)
  ppatch=$(npm view $pname version | cut -d- -f2 | rev | cut -d. -f1 | rev)
  npm version --allow-same-version $pversion-$ppatch
  npm version prerelease
  npm config set registry $oldregistry
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
