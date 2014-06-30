/**
 *
 * The graphing script
 * 
 * Author: DigitalLeafGames
 * 
 */

$.fn.drawBarGraph = function (dataArray, colorArray, graphTitle, graphSubtitle) {
    var container = this;
    var drawingSurface;
    var barArray = [];
    var backgroundLineArray = [];

    this.css({
        "background-color": "#fff",
        "border": "1px solid #ccc"
    });

    createDrawingSurface();
    createBars();
    colorBars();

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
        var roundingPrecision = 1; // Number of sig figs rounded to when deciding actual white space at the top
        var barsTotalPercentWidth = 0.4; // When you combine all of the bars, this is their width combined as a percentage of the total drawing area's width
        var barSideMargin = 3; // The margin between bars is 1, to either side of the bars, this is the margin relative to that
        var lineDensity = 5; // Approximate number of lines which is sometimes rounded up or down, depending on the circumstances

        var maxValue = Math.max.apply(Math, dataArray.map(function (v) {
                return v[0];
            }));
        var topBounds = (maxValue * (1 + graphTopMargin / 100)).toPrecision(roundingPrecision);

        for (var i = 0; i < dataArray.length; i++) {
            barArray.push($("<div></div>")
                .css({
                    "background-color": colorArray[0],
                    "width": drawingSurface.width() * barsTotalPercentWidth / dataArray.length + "px",
                    "height": drawingSurface.height() * (dataArray[i][0] / topBounds) + "px",
                    "z-index": "10",
                    "position": "absolute",
                    "left": calcLeftSpacing(i) + "px",
                    "bottom": 0
                })
                .appendTo(drawingSurface));
        }

        function calcLeftSpacing(barNumber) {
            var marginWidth = drawingSurface.width() * (1 - barsTotalPercentWidth) / (dataArray.length - 1 + 2 * barSideMargin); // Total bar surface / number of bars, pretty much
            var barWidth = drawingSurface.width() * barsTotalPercentWidth / dataArray.length; // Finds percent of drawing area allocated to bars, then divides by number of bars
            return marginWidth * (barSideMargin + barNumber) + barWidth * (barNumber); // Calculates correct number of margin and bar width spaces for each bar
        }

        generateLines(lineDensity, topBounds);
    }

    function colorBars() {
        for (i = 0; i < barArray.length; i++) {
            barArray[i].css({
                "background-color": colorArray[i % colorArray.length]
            });
        }
    }

    function generateLines(lineDensity, topBounds) {
        var lineSpacing = (2 * (topBounds / lineDensity)).toPrecision(1) / 2; // the 2 stuff makes it round to .5s as well as whole numbers (sig-fig-wise)
        console.log(lineSpacing);
        var numLines = Math.floor(topBounds / lineSpacing);
        for (var i = 0; i < numLines; i++){
            if(calcBottom(i) + 1 <= drawingSurface.height()) {
                backgroundLineArray.push($("<div></div>")
                .css({
                    "width": "100%",
                    "height": "1px",
                    "background-color": "#ddd",
                    "z-index": "5",
                    "position": "absolute",
                    "left": "0",
                    "bottom": calcBottom(i) + "px"})
                .appendTo(drawingSurface));
            }
        }
        
        function calcBottom (i){
            return (i + 1) * (lineSpacing / topBounds) * drawingSurface.height() - 1; // -1 is to get that last line, if possible (it makes a difference)
        }
    }
};