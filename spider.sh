#!/bin/sh
while read p; do
 echo $p
 wget \
     --recursive \
     -N \
     --level 5 \
     --no-clobber \
     --page-requisites \
     --adjust-extension \
     --span-hosts \
     --convert-links \
     --exclude-domains googleapis.com,googleapis.com,facebook.com,www.voltespana.org \
     --domains $p,nationbuilder.com,d3n8a8pro7vhmx.cloudfront.net \
     --no-parent \
         $p
done <$1
