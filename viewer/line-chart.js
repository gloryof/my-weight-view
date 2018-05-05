class LineChart {
    constructor(componentId, results) {
        this.baseElement = document.getElementById(componentId);
        this.results = results;
    }

    load() {
        var chartColor = "rgb(54, 162, 235)";
        var dateFormat = function(v) { return v.toLocaleDateString("japanese"); }
        var config = {
            type: "line",
            data: {
                labels: this.results.getMeasuringDate().map(dateFormat),
                datasets: [
                    {
                        label: "体重",
                        fill: false,
                        backgroundColor: chartColor,
					              borderColor: chartColor,
                        data: this.results.getWeights()
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks:{
                                max: 68,
                                min: 58
                            }
                        }
                    ]
                }
            }
        };

        var canvas = this.baseElement.getElementsByClassName("chart")[0];
        var context = canvas.getContext('2d');
        new Chart(context, config);
    }
}
