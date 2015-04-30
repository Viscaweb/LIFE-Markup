// Google charts declarations

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Type of OU', 'Number of matches'],
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


    var data2 = google.visualization.arrayToDataTable([
        ['Match results', 'Number of matches'],
        ['Win',     22],
        ['Draw',      8],
        ['Lost',      12]
    ]);

    var options2 = {
        pieHole: 0.5,
        pieSliceText: 'value',
        fontSize: 12,
        height:150,
        legend: 'none',
        chartArea:{left:0,top:0, width:'100%',height:'100%'},
        colors:['#87b762', '#cacaca' , '#d9534f']
    };

    var chart2 = new google.visualization.PieChart(document.getElementById('chart_team_results_1'));
    chart2.draw(data2, options2);


    var data3 = google.visualization.arrayToDataTable([
        ['Match results', 'Number of matches'],
        ['Win',     16],
        ['Draw',      8],
        ['Lost',      8]
    ]);

    var options3 = {
        pieHole: 0.5,
        pieSliceText: 'value',
        fontSize: 12,
        height:150,
        legend: 'none',
        chartArea:{left:0,top:0, width:'100%',height:'100%'},
        colors:['#87b762', '#cacaca' , '#d9534f']
    };

    var chart3 = new google.visualization.PieChart(document.getElementById('chart_team_results_2'));
    chart3.draw(data3, options3);
}