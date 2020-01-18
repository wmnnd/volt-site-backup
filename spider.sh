#!/bin/sh
while read p; do
 echo "Doing site: "
 echo $p
 wget \
     --recursive \
     -N \
     --level 2 \
     --no-clobber \
     --page-requisites \
     --adjust-extension \
     --span-hosts \
     --convert-links \
     --reject "https://d3n8a8pro7vhmx.cloudfront.net/3dna*" \
     --exclude-domains 3dna.nationbuilder.com,googleapis.com,googleapis.com,facebook.com,www.voltespana.org \
     --domains $p,nationbuilder.com,d3n8a8pro7vhmx.cloudfront.net \
     --no-parent \
         $p
done <$1
