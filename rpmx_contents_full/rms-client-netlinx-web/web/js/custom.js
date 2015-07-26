$(window).load(function() {
//    $("#spinner").fadeOut("slow");
    refreshAll();
    setInterval(refreshAll, 4000);
})

var baseURL = "/web/module/Resource-Management-Suite/client/http/api/";
var curConnectionStatusLabelClass = "label-danger";

function refreshAll() {
    try {
        refreshClientVersion();
        refreshClientConnectionStatus();
    } catch (err) { alert("bar");}

}

function updateClientConnectionStatus(connectionStatus, connectionLabelClass) {
    $("#clientConnectionStatus").html(connectionStatus);
    $("#clientConnectionStatus").removeClass(curConnectionStatusLabelClass);
    $("#clientConnectionStatus").addClass(connectionLabelClass);
    curConnectionStatusLabelClass = connectionLabelClass;
}

function refreshClientConnectionStatus() {
    try {
        $.getJSON(baseURL + "client/connection/status", function(data) {
            var connectionStatus = "OFFLINE";
            var connectionStatusLabelClass = "label-danger";
            connectionStatus = data.connectionStatus;
            if (connectionStatus == "INIT") {
                connectionStatus = "INITIALZING";
                connectionStatusLabelClass = "label-default";
            } else if (connectionStatus == "DISABLED") {
                connectionStatusLabelClass = "label-default";
            } else if (connectionStatus == "OFFLINE") {
                connectionStatusLabelClass = "label-danger";
            } else if (connectionStatus == "CONNECT-SERVER") {
                connectionStatus = "CONNECTING";
                connectionStatusLabelClass = "label-info";
            } else if (connectionStatus == "CONNECT-CLIENT") {
                connectionStatus = "CONNECTING";
                connectionStatusLabelClass = "label-info";
            } else if (connectionStatus == "CONNECT-LOCATION") {
                connectionStatus = "CONNECTING";
                connectionStatusLabelClass = "label-info";
            } else if (connectionStatus == "CONNECT-FAIL") {
                connectionStatus = "CONNECTION FAILURE";
                connectionStatusLabelClass = "label-warning";
            } else if (connectionStatus == "ONLINE") {
                connectionStatusLabelClass = "label-success";
            } else if (connectionStatus == "ONLINE-UNREGISTERED") {
                connectionStatus = "UNREGISTERED";
                connectionStatusLabelClass = "label-warning";
            } else if (connectionStatus == "REINITIALIZE") {
                connectionStatus = "REINITIALIZING";
                connectionStatusLabelClass = "label-info";
            }
            updateClientConnectionStatus(connectionStatus, connectionStatusLabelClass);
        }).error(function() {
            updateClientConnectionStatus("CONTROLLER OFFLINE", "label-danger");
        })
    } catch (err) {
        alert("foo");
        updateClientConnectionStatus("CONTROLLER OFFLINE", "label-danger");
    }

}

function refreshClientVersion() {
    $.getJSON(baseURL + "client/version", function(data) {
        var version = "Version 4";
        version = "Version " + data.clientVersion;
        $("#clientVersion").html(version)
    })
}