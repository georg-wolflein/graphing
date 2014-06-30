/**
 *
 * The graphing script. 
 * 
 * Author: DigitalLeafGames
 * 
 */

$.fn.drawBarGraph = function (dataArray, colorArray, graphTitle, graphSubtitle) {
    var container = this;
    var drawingSurface;
    var barArray = [];

    this.css({
        "background-color": "#fff",
        "border": "1px solid #ccc"
    });

    createDrawingSurface();
    createBars();

    function createDrawingSurface() {
        drawingSurface = $("<div></div>")
            .css({
                "border": "1px solid #ccc",
                "border-width": "0 0 1px 1px",
                "position": "relative",
                "width": "60%",
                "height": "60%",
                "margin": "0 auto",
                "margin-top": container.height() * 0.2 + "px"
                })
            .appendTo(container);
    }

    function createBars() {
        var graphTopMargin = 20; // Percentage of graph allocated to white space at the top
        var roundingPrecision = 2; // Number of sig figs rounded to when deciding actual white space at the top
        var barWidth = 0.4; // When you combine all of the bars, this is their width combined as a percentage of the total drawing area's width
        var barSideMargin = 3; // The margin between bars is 1, to either side of the bars, this is the margin relative to that

        var maxValue = Math.max.apply(Math, dataArray.map(function (v) {
                return v[0];
            }));
        var topBounds = maxValue * (1 + graphTopMargin / 100);
        topBounds = topBounds.toPrecision(roundingPrecision);

        for (var i = 0; i < dataArray.length; i++) {
            barArray.push($("<div></div>")
                .css({
                    "background-color": colorArray[0],
                    "width": drawingSurface.width() * barWidth / dataArray.length + "px",
                    "height": drawingSurface.height() * (dataArray[i][0] / topBounds) + "px",
                    "position": "absolute",
                    "left": drawingSurface.height() * 0.3 * i + "px",
                    "bottom": 0
                })
                .appendTo(drawingSurface));
        }
    }
};