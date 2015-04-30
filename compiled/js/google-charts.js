// Google charts declarations

google.load("visualization", "1", {packages:["corechart", "bar"]});
google.setOnLoadCallback(drawChart);
function drawChart() {

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




    var data4 = new google.visualization.DataTable();
    data4.addColumn('timeofday', 'Time of Day');
    data4.addColumn('number', 'Motivation Level');
    data4.addColumn('number', 'Energy Level');

    data4.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1, .25],
        [{v: [9, 0, 0], f: '9 am'}, 2, .5],
    ]);

    var data4 = google.visualization.arrayToDataTable([
        ['Year', 'Over 2,5 Goals', 'Under 2,5 Goals'],
        ['2013/2014',     20, 18],
        ['2013/2014',     18, 16]
    ]);

    var options = {
        legend: {position:'bottom'},
        fontSize: 12,
        chartArea:{left:0,top:0, width:'100%',},
        colors:['#5da400', '#4A8200']

    };

    var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_OU'));

    chart.draw(data4, options);


}