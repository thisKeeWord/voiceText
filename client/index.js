var speechRecognizer = new webkitSpeechRecognition();
var result = document.getElementById("result");

if (document.getElementById("micStart")) {
	document.getElementById("micStart").addEventListener("click", startConverting);
}

if (document.getElementById("micStop")) {
	document.getElementById("micStop").addEventListener("click", stopConverting);
}

function startConverting() {
	if("webkitSpeechRecognition" in window) {
		speechRecognizer.continuous = true;
		speechRecognizer.interimResults = true;
		speechRecognizer.lang = 'en-IN';
		speechRecognizer.start();
		var finalTranscriptions = '';
		speechRecognizer.onresult = function(e) {
			var interimTranscriptions = '';
			for (var i = e.resultIndex; i < e.results.length; i++) {
				var transcription = e.results[i][0].transcript;
				transcription.replace("\n", "<br>");
				e.results[i].isFinal ? finalTranscriptions += transcription : interimTranscriptions += transcription;
			}
			result.innerHTML = finalTranscriptions + '<span style="color:#999">' + interimTranscriptions + '</span>';
		};
		speechRecognizer.onerror = function(e) {
			console.log('please give the page access to your mic');
		};
	}
	else {
		result.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
	}
}

function stopConverting() {
	speechRecognizer.stop();
}