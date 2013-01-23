#!/bin/bash

#
# Retrieves all the image files within your .fla files.
#
# author: Rafael Rinaldi (rafaelrinaldi.com)
# since: Jan 21, 2013
#

usage() {
	echo "
You can pass a folder or a list of files to be published:

sh fla2img.sh folder/
sh fla2img.sh folder/foo.fla folder/bar.fla
"
}

if [[ $@ == "" ]]; then
	usage
	exit
fi

for source in $@
do
	if [[ -d $source ]]; then
		open $source/*.fla
	else
		open $source
	fi
done
 
# Executing JSFL script.
open fla2img.jsfl