#!/bin/sh

TAG=$(cat package.json | grep -Po '"version":.*?[^\\]",' | awk -F':' '{print $2}' | sed -e 's/^[[:space:]]*//' | sed 's/^\|,\|"//g')

echo "NEXT_PUBLIC_RELEASE_TAG=${TAG}" >> "/vercel/path0/.env.production"

echo "Value updated!"
cat /vercel/path0/.env.production

echo "Waiting..."
sleep 2
echo "Awake..."