var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/scrappAll', function (greeting) {
            showGreeting(JSON.parse(greeting.body));
        });
    });
}




function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/helloWorld", {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    for (var i = 1; i < message.length; ++i) {
        $("#greetings").append("<tr>");
        $("#greetings").append("<tr><td>" + message[i]["eventName"] + "</td></tr>");
        $("#greetings").append("</tr>");
    }

}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() {
        disconnect();

    });
    $( "#send" ).click(function() { sendName(); });
});

