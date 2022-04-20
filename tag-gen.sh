#!/bin/sh

TAG=$(cat package.json | grep -Po '"version":.*?[^\\]",' | awk -F':' '{print $2}' | sed -e 's/^[[:space:]]*//' | sed 's/^\|,\|"//g')

echo "\nNEXT_PUBLIC_RELEASE_TAG=${TAG}" >> ".env.production"