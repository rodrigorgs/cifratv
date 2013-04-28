function genSpaces(len, character) {
	if (!character)
		character = " "
	return new Array(len + 1).join(character);
}

var cifraElem = document.getElementById("ct_cifra");

var head = document.getElementsByTagName("head")[0];
head.innerHTML = "<title>CifraTV</title>";

var body = document.body;
body.innerHTML = "";

var cifra = cifraElem.innerHTML;

// remove tablature
cifra = cifra.replace(/<span class="tablatura">(.|[\r\n])*?<\/span><\/span>/gm, '');

// simplify chord tags
cifra = cifra.replace(/<b .*?>/g, "<b>");

var lines = cifra.split("\n");
lines.push("");

var linesToDelete = [];

for (var i = 0; i < lines.length; i++) {
	var pos = lines[i].lastIndexOf("<b>");
	while (pos != -1) {
		var subline = lines[i].substr(pos);
		var posEnd = pos + subline.indexOf("</b>") + 3;
		var chord = lines[i].substr(pos + 3, posEnd - pos - 6);

		// erase chord from the line
		lines[i] = lines[i].substr(0, pos) + 
				genSpaces(chord.length, " ") + 
				lines[i].substr(posEnd + 1);

		// insert chord into next line (extend the line if it's small)

		// extend line below with empty spaces
		if (lines[i+1].length < pos)
			lines[i+1] += genSpaces(pos - lines[i+1].length);

		// compute real pos (excluding tags)
		var before = lines[i].substr(0, pos);
		before = before.replace(/<.*?>/g, '');
		var realPos = before.length;
		lines[i+1] = lines[i+1].substr(0, realPos) + 
				"<span class='chord'>" + chord + "</span>" + 
				lines[i+1].substr(realPos);

		pos = lines[i].lastIndexOf("<b>");
		if (pos == -1 && lines[i].replace(/\s+/, '').length == 0) {
			// this is a line that used to have chords, now it's empty
			linesToDelete.push(i);
		}
	}
}

// remove lines that contained only chords
for (var i = linesToDelete.length - 1; i >= 0; i--) {
	var toDelete = linesToDelete[i];
	lines.splice(toDelete, 1);
}

// Add paragraph and paragraph style
for (var i = 0; i < lines.length; i++) {
	var cssClass = "info";
	if (lines[i].indexOf("<span class='chord'>") != -1)
		cssClass = "chordline"

	lines[i] = "<p class='" + cssClass + "'>" + lines[i] + "</p>";
}

cifra = lines.join("\n");

var newCifraElem = document.createElement("div");
newCifraElem.id = cifraElem.id;
newCifraElem.innerHTML = cifra;
body.appendChild(newCifraElem);


var height = window.innerHeight;
console.log(height);
newCifraElem.style.height = "" + (height - 35) + "px";
