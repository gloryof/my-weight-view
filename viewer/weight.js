/**
 * 計測された体重.
 */
class MeasuredWeight {
    constructor(measuringYear, measuringMonth, measuringDay, weight) {
        var date = new Date(measuringYear, measuringMonth - 1, measuringDay);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        this.measuringDate = date;
        this.weight = weight;
    }

    /**
     * 測定月のデータを返す.
     * 日付は必ず1日となる。
     * @return {Date} 測定月
     */
    getMeasuringMonthDate() {
      
        var date = new Date(this.measuringDate.getFullYear(), this.measuringDate.getMonth(), 1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }

    /**
     * 同じ月に測定されたものかを判定する。
     * @param {Number} year 比較年数
     * @param {Number} monthIndex 月のインデックス（0が1月）
     * @return 同じ月の場合：true、同じ月ではない場合：false
     */
    isMeasuredWithinMonth(year, monthIndex) {
        if (this.measuringDate.getFullYear() != year) {
            return false;
        }

        return this.measuringDate.getMonth() == monthIndex;
    }
}

/**
 * 体重の計測結果の集合.
 */
class MeasuredResults {
    constructor() {
        this.results = [];
        this.monthAverage = [];
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

    getSummarizedDate() {
        var summarizedResult = [];

        this.results.forEach(function(val, index) {
            var count = summarizedResult
                          .filter(v => val.isMeasuredWithinMonth(v.getFullYear(), v.getMonth()))
                          .length;
            if (count < 1) {

                summarizedResult.push(val.getMeasuringMonthDate());
            }
        });
        
        return summarizedResult;
    }

    getSummarizedWeigths() {

        var values = [];
        this.getSummarizedDate().forEach(function(val, index) {
            var month = ("0" + val.getMonth()).slice(-2);
            var key = String(val.getFullYear() + month);
            values[key] = [];
        });

        this.results.forEach(function(val, index) {
            for (var key in values) {
                var numKey = Number(key);
                var year = Math.floor(key / 100);
                var monthIndex = key % 100;
                if (val.isMeasuredWithinMonth(year, monthIndex)) {
                    values[key].push(val.weight);
                }
            }
        });
        
        var summarizedResult = [];
        for (var key in values) {
            var valArray = values[key];

            var sumVal = valArray.reduce(function(prev, current, i, arr) {
                return prev+current;
            });

            var result = (sumVal / valArray.length).toFixed(2);
            summarizedResult.push(result)
        }

        return summarizedResult;
    }
}
