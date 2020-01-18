#!/bin/sh
wget \
     --recursive \
     --level 5 \
     --no-clobber \
     --page-requisites \
     --adjust-extension \
     --span-hosts \
     --convert-links \
     --exclude-domains googleapis.com,googleapis.com,facebook.com,www.voltespana.org \
     --no-parent \
         $1
