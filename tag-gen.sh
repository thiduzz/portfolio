#!/bin/sh

TAG=$(git describe --abbrev=0)

echo "\nNEXT_PUBLIC_RELEASE_TAG=${TAG}" >> ".env.production"