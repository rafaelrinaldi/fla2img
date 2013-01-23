/*
Retrieves all the image files within your .fla files.

@author Rafael Rinaldi (rafaelrinaldi.com)
@since Jan 21, 2013
*/

var documents = fl.documents,
	temp,
	report = [];

// Cleaning up the output.
fl.outputPanel.clear();

if(documents.length === 0) {
	alert("Nothing to be published");
} else {
	extractImages();
}

function extractImages() {

	report.length = 0;

	alert("Getting ready to extract images from " + documents.length + " file" + (documents.length > 1 ? "s" : "") + "...");

	// Creating an empty document to perform all the actions.
	temp = new fl.createDocument();

	var document,
		path,
		image,
		name,
		imagesFolder;


	for(var count = 0; count < documents.length; ++count) {

		// Current document.
		document = documents[count];

		// Skip unsaved files.
		if(!document.path) {
			document.close();
			continue;
		}
		
		// The path is relative to .fla file.
		path = "file:///" + document.path.slice(0, document.path.lastIndexOf("/"));

		// Images folder.
		imagesFolder = "/" + getFileName(document.name) + "_images";

		// Saving data to report it later.
		report[count] = {document: document.name, files: 0, folder: imagesFolder};

		// Creating images folder.
		FLfile.createFolder(path = path.concat(imagesFolder));

		document.library.items.forEach(function( p_item ) {

			if(p_item.itemType.toLowerCase() === "bitmap") {

				++report[count]["files"];

				// Add image to the stage.
				temp.addItem({x: 0, y: 0}, p_item);

				// Saving image reference.
				image = temp.getTimeline().layers[0].frames[0].elements[0];

				if(image) {

					// Setting up temp document.
					temp.width = image.getBits().width;
                	temp.height = image.getBits().height;

					image.x = 0;
					image.y = 0;

					// Keep the original image name.
					name = getFileName(p_item.name);

					// Finally exporting.
					temp.exportPNG(path + "/" + name + ".png", false, true);

					// Resetting temp document.
					temp.selectAll();
        			temp.deleteSelection();
					temp.selectNone();

					// Removing all items added to temp's library to avoid conflicts.
					temp.library.selectAll();
					temp.library.deleteItem();

				}

			}
		});



	}

	// Close temp document without saving it.
	fl.closeDocument(temp, false);

	if(confirm("All images have been exported! Do you want to close all opened files?")) {
		fl.closeAll(false);
	}

	generateReport();

}

/*
@return File name without extension.
*/
function getFileName( p_file ) {
	return p_file.slice(p_file.lastIndexOf("/") + 1, p_file.lastIndexOf("."));
}

/*
Prints an overall report of the export process.
*/
function generateReport() {

	fl.outputPanel.trace("[fla2img] Overall report:");

	report.forEach(function( p_item ) {
		fl.outputPanel.trace("[fla2img] Extracted " + p_item.files + " image files from '" + p_item.document + "' to: '" + p_item.folder + "'");
	});

}