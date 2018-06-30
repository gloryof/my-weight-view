class ChartComonOptions {

    get scales() {
        return {
            yAxes: [
                {
                    ticks:{
                        max: this.maxWeight,
                        min: this.minWeight
                    }
                }
            ]
        }
    }
    get maxWeight() { return 68; }
    get minWeight() { return 58; }
}

window.chartOptions = new ChartComonOptions();