#!/bin/bash
set -e

APP_NAME=aepp-base

echo "${DEPLOY_KNOWN_HOSTS_BASE64}" | base64 --decode >> ~/.ssh/known_hosts
echo "${DEPLOY_USER_KEY_BASE64}" | base64 --decode > /tmp/user-key
eval "$(ssh-agent -s)"
chmod 600 /tmp/user-key
ssh-add /tmp/user-key

DOMAIN=`echo $TRAVIS_BRANCH | tr '[:punct:]' '-'`
rsync_stage () {
  ssh -p 2022 root@z52da5wt.xyz mkdir -p /data/$APP_NAME/$DOMAIN/$2
  rsync -e "ssh -p 2022" -r --delete-after -v $1 root@z52da5wt.xyz:/data/$APP_NAME/$DOMAIN/$2
}

if [[ $TRAVIS_OS_NAME == "osx" ]]; then
  rsync_stage aeternity.app.tar.gz artifacts/
elif [[ $ANDROID_HOME != "" ]]; then
  rsync_stage aeternity.apk artifacts/
else
  if [[ $TRAVIS_TAG != "" ]]; then
    tar -czvf aeternity.tar.gz dist
    rsync_stage aeternity.tar.gz artifacts/
  fi

  rsync_stage dist/

  URL=$DOMAIN.$APP_NAME.z52da5wt.xyz
  echo "Deployed to $URL"
  curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST \
    -d "{\"body\": \"Deployed to [$URL](https://$URL), [artifacts](https://$URL/artifacts)\"}" \
    "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/commits/${TRAVIS_COMMIT}/comments"
fi
