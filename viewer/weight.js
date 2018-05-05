/**
 * 計測された体重.
 */
class MeasuredWeight {
    constructor(measuringYear, measuringMonth, measuringDay, weight) {
        var date = new Date();
        date.setYear(measuringYear);
        date.setMonth(measuringMonth - 1);
        date.setDate(measuringDay);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.measuringDate = date;
        this.weight = weight;
    }
}

/**
 * 体重の計測結果の集合.
 */
class MeasuredResults {
    constructor() {
        this.results = [];
    }

    /**
     * 体重の計測結果を追加する.
     * @param {Number} measuringYear 計測年
     * @param {Number} measuringMonth 計測月
     * @param {Number} measuringDay 計測日
     * @param {Number} weight 体重
     */
    add(measuringYear, measuringMonth, measuringDay, weight) {
        this.results.push(
            new MeasuredWeight(
                measuringYear,
                measuringMonth,
                measuringDay,
                weight));

        return this;
    }

    getMeasuringDate() {
        return this.results.map(function(element) {
            return element.measuringDate;
        });
    }

    getWeights() {
        return this.results.map(function(element) {
            return element.weight;
        });
    }
}

