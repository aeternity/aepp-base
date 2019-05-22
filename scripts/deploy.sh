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

UPLOAD_PATH=deploy@139.59.142.164:/var/www/html/$UPLOAD_PATH
RSYNC_OPTIONS="-r --delete-after -v"

if [[ $TRAVIS_OS_NAME == "osx" ]]; then
  rsync $RSYNC_OPTIONS aeternity.app.tar.gz $UPLOAD_PATH
elif [[ $ANDROID_HOME != "" ]]; then
  rsync $RSYNC_OPTIONS aeternity.apk $UPLOAD_PATH
else
  if [[ $TRAVIS_TAG != "" ]]; then
    tar -czvf aeternity.tar.gz dist
  fi

  rsync $RSYNC_OPTIONS dist $UPLOAD_PATH
fi
