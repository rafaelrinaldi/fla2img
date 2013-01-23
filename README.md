# fla2img
Retrieves all the image files within your `.fla` files.

## How to use it
You can either run it thru cli:
	
Passing a single file

	sh fla2img.sh foo.fla

Passing multiple files

	sh fla2img.sh foo.fla bar.fla

Passing a path of files

	sh fla2img.sh path/of/flas/

Or simply open the `.fla` files with the images you want, then drag `fla2img.jsfl` to Flash icon.

## Notes and features

* It's recommended to close your current documents before executing this script.
* Fully tested with a bunch of files at once. It performs well.
* Don't worry about internal collisions between library items. This script is able to take care of it.
* After processing, the script will print you an overall report of files exported among other stats.

## How it works
It works by creating an empty document which will handle every single opened `.fla`, one by one.

## License
[MIT](http://opensource.org/licenses/MIT).