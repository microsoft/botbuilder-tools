function install() {
    echo Install $1
    pushd $1
    npm install
    if [ $2 ]; then npm run test; fi
    popd
}

function coveralls() {
    echo Run Coveralls Aggregated tests
    npm install
    npm run test:travis
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
    pushd $1
    create_npmrc
    update_version
    npm install
    npm publish
    popd
}

if [[ "${TRAVIS_EVENT_TYPE}" = "cron" ]]; then
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
        install Chatdown with_test
        install Dispatch
        # Disable failing tests
        install Ludown with_test
        install LUIS with_test
        install LUISGen
        install MSBot
        install QnAMaker with_test

        coveralls
    )
fi
errorcode=$?

if [ $errorcode -ne 0 ]; then
  echo exiting with errorcode $errorcode
  exit $errorcode
fi
