#!/bin/bash
set -e

openssl aes-256-cbc -K $encrypted_0d22c88004c9_key -iv $encrypted_0d22c88004c9_iv \
  -in aepp-identity-deploy.enc -out aepp-identity-deploy -d
eval "$(ssh-agent -s)"
chmod 600 aepp-identity-deploy
ssh-add aepp-identity-deploy
mkdir -p ~/.ssh
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config

case $TRAVIS_BRANCH in
  master)
    UPLOAD_PATH=identity.aepps.com
    ;;
  develop)
    UPLOAD_PATH=stage-identity.aepps.com
    ;;
  *)
    DOMAIN=`echo $TRAVIS_BRANCH | tr '[:punct:]' '-'`
    echo "Deploying to $DOMAIN.origin.aepps.com"
    ssh deploy@139.59.142.164 "mkdir -p /var/www/html/BRANCHES.origin.aepps.com/$DOMAIN/"
    UPLOAD_PATH=BRANCHES.origin.aepps.com/$DOMAIN
    ;;
esac

if [[ $TRAVIS_OS_NAME != "osx" ]]; then
  rsync -r --delete-after -v $TRAVIS_BUILD_DIR/dist/* deploy@139.59.142.164:/var/www/html/$UPLOAD_PATH
else
  rsync -r --delete-after -v $TRAVIS_BUILD_DIR/aeternity.app.tar.gz deploy@139.59.142.164:/var/www/html/$UPLOAD_PATH
fi
