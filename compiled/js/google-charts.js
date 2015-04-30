// Google charts declarations

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Over 2,5 Goals',     16],
        ['Under 2,5 Goals',      8]
    ]);

    var options = {
        pieHole: 0.5,
        pieSliceText: 'value',
        fontSize: 12,
        legend: {
            position: 'bottom',
        },
        chartArea:{left:0,top:20, width:'100%',height:'80%'},
        colors:['#5da400', '#4A8200']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_OU'));
    chart.draw(data, options);
}