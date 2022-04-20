#!/bin/sh

TAG=$(cat package.json | jq -r '.version' )

echo "\nNEXT_PUBLIC_RELEASE_TAG=${TAG}" >> ".env.production"