var clientId = "ws" + Math.random();
// Conexion con broker MQTT
var client = new Paho.MQTT.Client("XXX.XXX.XXX.XXX", 9001, clientId); 

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess:onConnect});

function onConnect() {
    console.log("Conectado MQTT-websocket");
    client.subscribe("ControlSistema/Salidas/#");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Conexion perdida: "+responseObject.errorMessage);
    }
}

function onMessageArrived(message) {

    var v = message.payloadString;
    console.log(message.destinationName + ": " + v);
    document.getElementById("ValorA").textContent = v;
    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Label', 'Value'],
            ['Voltaje', parseInt(v, 10)],
        ]);

        var options = {
            width: 400, height: 120,
            minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);
    }
}