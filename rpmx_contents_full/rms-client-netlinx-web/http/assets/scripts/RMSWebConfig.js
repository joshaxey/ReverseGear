/* JavaScript functions for RMSWebConfig
/*--------------------------------------------------------------------------*/

// Set time for Test Connection Delay
var _timeAllowedForTestConnectionFail = 10; // in seconds

function checkAllowConnect() {
	($('allowConnect').checked) ? enableRfidForm(false) : enableRfidForm(true);
}

// Enable Form if 'Allow Master to Connect' is checked
function enableRfidForm(val) {
	$('rmsServerUrl').disabled = val;
	$('rmsServerPassword').disabled = val;
	$('clientGatewayName').disabled = val;
	// $('useSecureCommunication').disabled = val;
	$('testConnectionFeedback').style.display = "none";
	(val) ? $('testConnectionButton').style.visibility = "hidden"
			: $('testConnectionButton').style.visibility = "visible";
}

function validateRMSFormFields() {
	var errMsg = "";
	if ($('rmsServerUrl').value != "" && $('rmsServerPassword').value != "") {
		return errMsg;
	} else if ($('rmsServerUrl').value == ""
			&& $('rmsServerPassword').value == "") {
		errMsg += "RMS Server URL and RMS Server Password are required fields ";
	} else if ($('rmsServerUrl').value == "") {
		errMsg += "RMS Server URL is a required field ";
	} else if ($('rmsServerPassword').value == "") {
		errMsg += "RMS Server Password is a required field ";
	}
	errMsg += "and cannot be empty.";
	return errMsg;
}

var _connectionTimeout = 0;

// If cannot connect to master
function connectionFailed() {
	var _myResult = "";
	var _fontColor = "";

	clearTimeout(_connectionTimeout);

	_myResult = "Connection Failed: Time Out";
	_fontColor = "red";

	// Make sure to clear any old feedback
	so_clearInnerHTML($('testConnectionFeedback'));

	var _tfcFeedbackText = document.createTextNode(_myResult);
	$('testConnectionFeedback').appendChild(_tfcFeedbackText);
	$('testConnectionFeedback').style.color = _fontColor;
	processTestConnectionFeedback();

	// alert("Connection Successful. Make sure master is online and try
	// again.");
}

function testConnection() {
	$('testConnectionFeedback').style.display = "none";
	$('loadingIcon').style.display = "none";

	if ($('rmsServerUrl').value != "" && $('rmsServerPassword').value != "") {
		$('testConnectionButton').disabled = true;
		$('loadingIcon').style.display = "block";

		AJAX_testConnection();
		_connectionTimeout = setTimeout("connectionFailed()",
				_timeAllowedForTestConnectionFail * 1000);
	} else {
		alert(validateRMSFormFields());
	}
}

// AJAX call to start connection test
function AJAX_testConnection() {
	var serverUrlParameter = encodeURIComponent($("rmsServerUrl").value);
	var serverPasswordParameter = encodeURIComponent($("rmsServerPassword").value);
	var url = "RMSWebConfig?Test=true&rmsServerUrl=" + serverUrlParameter
			+ "&rmsServerPassword=" + serverPasswordParameter; // &useSecureCommunication="
																// +
																// $("useSecureCommunication").checked;
	var pars = '';
	var myAjax = new Ajax.Request(

	url, {
		method : 'get',
		parameters : pars,
		onFailure : showFailure,
		// onException: showException,
		onComplete : showTestResponse
	});

}

// Show AJAX Results, currently not needed
function showTestResponse(originalRequest) {
	var _getResult = originalRequest.responseXML
			.getElementsByTagName('RmsInformation')[0]
			.getElementsByTagName('webConfig')[0].getAttribute('connection');
	var _resultMessage = originalRequest.responseXML
			.getElementsByTagName('RmsInformation')[0]
			.getElementsByTagName('webConfig')[0]
			.getAttribute('connectionFailMessage');

	var _myResult = "";
	var _fontColor = "";

	if (_getResult != null && _getResult != "" && _getResult != 'undefined') {
		if (_getResult == 'true') {
			_myResult = "Connection Successful";
			_fontColor = "green";

		} else {
			_myResult = "Connection Failed";
			if (_resultMessage != "")
				_myResult = "Connection Failed: " + _resultMessage;

			_fontColor = "red";
		}

		clearTimeout(_connectionTimeout);

		// Make sure to clear any old feedback
		so_clearInnerHTML($('testConnectionFeedback'));

		var _tfcFeedbackText = document.createTextNode(_myResult);
		$('testConnectionFeedback').appendChild(_tfcFeedbackText);

		$('testConnectionFeedback').style.color = _fontColor;

		processTestConnectionFeedback();
		return;
	} else {
		return;
	}
}

// If AJAX fails, show failure message
function showFailure(response) {
	alert('Request failed: ' + response);
}

// If AJAX fails, show exception message
function showException(request, error) {
	alert('Request exception: ' + error.message);
}

// Show Feedback
function processTestConnectionFeedback() {
	$('testConnectionButton').disabled = false;
	$('testConnectionFeedback').style.display = "block";
	$('loadingIcon').style.display = "none";
}

// Used with creating text nodes
// better support than replacing innerHTML
function so_clearInnerHTML(obj) {
	// so long as obj has children, remove them
	while (obj.firstChild)
		obj.removeChild(obj.firstChild);
}

// Validate Form
function validateRMSForm() {
	if (validateRMSFormFields() != "") {
		alert(validateRMSFormFields());
		return false;
	} else {
		return true;
	}
}
