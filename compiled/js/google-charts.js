// Google charts declarations

google.load("visualization", "1", {packages:["corechart", "bar"]});
google.setOnLoadCallback(drawChart);

function drawChart() {

    if(document.getElementById('chart_OU')) {
        var data4 = google.visualization.arrayToDataTable([
            ['Year', 'Over 2,5 Goals', 'Under 2,5 Goals'],
            ['Previous season',     20, 18],
            ['Current season',     18, 16]
        ]);

        var options4 = {
            legend: {position:'bottom'},
            fontSize: 12,
            chartArea:{left:0,top:0, width:'100%'},
            colors:['#5da400', '#4A8200']
        };

        var chart4 = new google.visualization.ColumnChart(document.getElementById('chart_OU'));
        chart4.draw(data4, options4);
    }

    if(document.getElementById('chart_OU_2')) {
        var data5 = google.visualization.arrayToDataTable([
            ['Year', 'Over 2,5 Goals', 'Under 2,5 Goals'],
            ['Previous season',     20, 18],
            ['Current Season',     18, 16]
        ]);

        var options5 = {
            legend: {position:'bottom'},
            fontSize: 12,
            chartArea:{left:0,top:0, width:'100%'},
            colors:['#5da400', '#4A8200']
        };

        var chart5 = new google.visualization.ColumnChart(document.getElementById('chart_OU_2'));
        chart5.draw(data5, options5);
    }

    if(document.getElementById('chart_team_results_1')) {
        var data2 = google.visualization.arrayToDataTable([
            ['Match results', 'Number of matches'],
            ['Win', 22],
            ['Draw', 8],
            ['Lost', 12]
        ]);

        var options2 = {
            pieHole: 0.5,
            pieSliceText: 'value',
            fontSize: 12,
            height: 150,
            legend: 'none',
            chartArea: {left: 0, top: 0, width: '100%', height: '100%'},
            colors: ['#87b762', '#cacaca', '#d9534f']
        };

        var chart2 = new google.visualization.PieChart(document.getElementById('chart_team_results_1'));
        chart2.draw(data2, options2);
    }

    if(document.getElementById('chart_team_results_2')) {
        var data3 = google.visualization.arrayToDataTable([
            ['Match results', 'Number of matches'],
            ['Win', 16],
            ['Draw', 8],
            ['Lost', 8]
        ]);

        var options3 = {
            pieHole: 0.5,
            pieSliceText: 'value',
            fontSize: 12,
            height: 150,
            legend: 'none',
            chartArea: {left: 0, top: 0, width: '100%', height: '100%'},
            colors: ['#87b762', '#cacaca', '#d9534f']
        };

        var chart3 = new google.visualization.PieChart(document.getElementById('chart_team_results_2'));
        chart3.draw(data3, options3);
    }


}