# Deploy to Github Pages by copying /public into master branch
# https://gist.github.com/cobyism/4730490

#!/bin/sh
if [ -z "$1" ]
then
  echo "Which folder do you want to deploy to GitHub Pages?"
  exit 1
fi

sed -i "" '/public\/dist/d' ./.gitignore # remove line from .gitignore
git add .
git commit -m "Edit .gitignore to publish"

git subtree push --prefix $1 origin gh-pages

git reset HEAD~
git checkout .gitignore
