google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Voltaje', 0],
    ]);

    var options = {
        width: 400, height: 120,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'))
  

    chart.draw(data, options);
    
}  