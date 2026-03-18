var Base64 = {

	// private property
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode: function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode: function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode: function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode: function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

};
function createTable(device,opt){
var P0cv = document.getElementById("num_0_0").value;
var P1cv = document.getElementById("num_0_1").value;
var P2cv = document.getElementById("num_0_2").value;
var P3cv = document.getElementById("num_0_3").value;
var P4cv = document.getElementById("num_0_4").value;
var P5cv = document.getElementById("num_0_5").value;
var P6cv = document.getElementById("num_0_6").value;
var P7cv = document.getElementById("num_0_7").value;

var P0cf = document.getElementById("num_1_0").value;
var P1cf = document.getElementById("num_1_1").value;
var P2cf = document.getElementById("num_1_2").value;
var P3cf = document.getElementById("num_1_3").value;
var P4cf = document.getElementById("num_1_4").value;
var P5cf = document.getElementById("num_1_5").value;
var P6cf = document.getElementById("num_1_6").value;
var P7cf = document.getElementById("num_1_7").value;

var P0mf = document.getElementById("num_2_0").value;
var P1mf = document.getElementById("num_2_1").value;
var P2mf = document.getElementById("num_2_2").value;
var P3mf = document.getElementById("num_2_3").value;

var P3mv = document.getElementById("num_3_0").value;

var freeFan = document.getElementById("free_fan_num").value;
var downFan = document.getElementById("down_fan_num").value;
var minFan = document.getElementById("min_fan_num").value;
var maxFan = document.getElementById("max_fan_num").value;
var senFan = document.getElementById("sen_fan_num").value;

var tempLine = document.getElementById("temp_num").value;
var power = document.getElementById("power_num").value;

var tab = "Dev="+device+"\nP0cv="+P0cv+"\nP1cv="+P1cv+"\nP2cv="+P2cv+"\nP3cv="+P3cv+"\nP4cv="+P4cv+"\nP5cv="+P5cv+"\nP6cv="+P6cv+"\nP7cv="+P7cv+"\nP0cf="+P0cf+"\nP1cf="+P1cf+"\nP2cf="+P2cf+"\nP3cf="+P3cf+"\nP4cf="+P4cf+"\nP5cf="+P5cf+"\nP6cf="+P6cf+"\nP7cf="+P7cf+"\nP3mv="+P3mv+"\nP0mf="+P0mf+"\nP1mf="+P1mf+"\nP2mf="+P2mf+"\nP3mf="+P3mf+"\nfreeFan="+freeFan+"\ndownFan="+downFan+"\nminFan="+minFan+"\nmaxFan="+maxFan+"\nsenFan="+senFan+"\ntempLine="+tempLine+"\npower="+power+"\n";
var btab = Base64.encode(tab);

if (opt == "tab"){
	window.location.href="vgtab://"+btab;
} else if (opt == "link"){
	alert("vgtab://"+btab);
}
};

// Map settings keys to their corresponding UI element IDs
var settingsMap = {
	"P0cv": {num: "num_0_0", rag: "rag_0_0", dataset: 0, idx: 0},
	"P1cv": {num: "num_0_1", rag: "rag_0_1", dataset: 0, idx: 1},
	"P2cv": {num: "num_0_2", rag: "rag_0_2", dataset: 0, idx: 2},
	"P3cv": {num: "num_0_3", rag: "rag_0_3", dataset: 0, idx: 3},
	"P4cv": {num: "num_0_4", rag: "rag_0_4", dataset: 0, idx: 4},
	"P5cv": {num: "num_0_5", rag: "rag_0_5", dataset: 0, idx: 5},
	"P6cv": {num: "num_0_6", rag: "rag_0_6", dataset: 0, idx: 6},
	"P7cv": {num: "num_0_7", rag: "rag_0_7", dataset: 0, idx: 7},
	"P0cf": {num: "num_1_0", rag: "rag_1_0", dataset: 1, idx: 0},
	"P1cf": {num: "num_1_1", rag: "rag_1_1", dataset: 1, idx: 1},
	"P2cf": {num: "num_1_2", rag: "rag_1_2", dataset: 1, idx: 2},
	"P3cf": {num: "num_1_3", rag: "rag_1_3", dataset: 1, idx: 3},
	"P4cf": {num: "num_1_4", rag: "rag_1_4", dataset: 1, idx: 4},
	"P5cf": {num: "num_1_5", rag: "rag_1_5", dataset: 1, idx: 5},
	"P6cf": {num: "num_1_6", rag: "rag_1_6", dataset: 1, idx: 6},
	"P7cf": {num: "num_1_7", rag: "rag_1_7", dataset: 1, idx: 7},
	"P0mf": {num: "num_2_0", rag: "rag_2_0", dataset: 2, idx: 0},
	"P1mf": {num: "num_2_1", rag: "rag_2_1", dataset: 2, idx: 1},
	"P2mf": {num: "num_2_2", rag: "rag_2_2", dataset: 2, idx: 2},
	"P3mf": {num: "num_2_3", rag: "rag_2_3", dataset: 2, idx: 3},
	"P3mv": {num: "num_3_0", rag: "rag_3_0", annotation: true},
	"freeFan": {sync: "free_fan"},
	"downFan": {sync: "down_fan"},
	"minFan":  {sync: "min_fan"},
	"maxFan":  {sync: "max_fan"},
	"senFan":  {sync: "sen_fan"},
	"tempLine":{sync: "temp"},
	"power":   {sync: "power"}
};

function loadSettings() {
	var fileInput = document.getElementById("settingsFileInput");
	if (!fileInput) return;
	fileInput.click();
}

function handleSettingsFile(event) {
	var file = event.target.files[0];
	if (!file) return;
	var reader = new FileReader();
	reader.onload = function(e) {
		var text = e.target.result;
		var lines = text.split("\n");
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i].trim();
			if (!line || line.indexOf("=") === -1) continue;
			var parts = line.split("=");
			var key = parts[0].trim();
			var val = parts[1].trim();
			var map = settingsMap[key];
			if (!map) continue;

			if (map.num) {
				// Clock/voltage fields
				var numEl = document.getElementById(map.num);
				var ragEl = document.getElementById(map.rag);
				if (numEl) numEl.value = val;
				if (ragEl) ragEl.value = val;
				// Update chart
				if (typeof myChart !== "undefined") {
					if (map.annotation) {
						myChart.options.annotation.annotations[0].value = val;
					} else if (map.dataset !== undefined) {
						myChart.data.datasets[map.dataset].data[map.idx] = parseInt(val);
					}
				}
			} else if (map.sync) {
				// Fan/temp/power fields - use valSync pattern
				var syncNum = document.getElementById(map.sync + "_num");
				var syncRange = document.getElementById(map.sync);
				if (syncNum) syncNum.value = val;
				if (syncRange) syncRange.value = val;
			}
		}
		if (typeof myChart !== "undefined") myChart.update();
		// Reset file input so the same file can be loaded again
		event.target.value = "";
	};
	reader.readAsText(file);
}

function saveSettings(device) {
	var tab = "Dev="+device+"\n";
	var fields = ["P0cv","P1cv","P2cv","P3cv","P4cv","P5cv","P6cv","P7cv",
		"P0cf","P1cf","P2cf","P3cf","P4cf","P5cf","P6cf","P7cf",
		"P3mv","P0mf","P1mf","P2mf","P3mf"];
	for (var i = 0; i < fields.length; i++) {
		var map = settingsMap[fields[i]];
		if (map && map.num) {
			var el = document.getElementById(map.num);
			if (el) tab += fields[i] + "=" + el.value + "\n";
		}
	}
	var syncFields = ["freeFan","downFan","minFan","maxFan","senFan","tempLine","power"];
	for (var j = 0; j < syncFields.length; j++) {
		var smap = settingsMap[syncFields[j]];
		if (smap && smap.sync) {
			var sel = document.getElementById(smap.sync + "_num");
			if (sel) tab += syncFields[j] + "=" + sel.value + "\n";
		}
	}
	var blob = new Blob([tab], {type: "text/plain"});
	var a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = "VegaTab_" + device + "_settings.txt";
	a.click();
	URL.revokeObjectURL(a.href);
}