/**
 *
 * The graphing script
 * 
 * Author: DigitalLeafGames
 *
 */

$.fn.drawBarGraph = function (dataArray, colorArray, graphTitle, graphSubtitle, xAxisLabel, yAxisLabel) {
    var container = this;
    var drawingSurface;
    var barArray = [];
    var barLabelArray = [];
    var backgroundLineArray = [];
    var backgroundLineLabelArray = [];
    var title;
    var xAxisLabelRef;
    var yAxisLabelRef;

    this.css({
        "background-color": "#fff",
        "border": "1px solid #ccc"
    });

    createDrawingSurface();
    createBars(); // Also generates lines
    colorBars();
    createTitles();
    createXAxisLabel();
    createYAxisLabel();

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
                    "width": drawingSurface.innerWidth() * barsTotalPercentWidth / dataArray.length + "px",
                    "height": drawingSurface.height() * (dataArray[i][0] / topBounds) + "px",
                    "z-index": "10",
                    "position": "absolute",
                    "left": calcLeftSpacing(i) + "px",
                    "bottom": 0
                })
                .appendTo(drawingSurface));
        }

        function calcLeftSpacing(barNumber) {
            var marginWidth = drawingSurface.innerWidth() * (1 - barsTotalPercentWidth) / (dataArray.length - 1 + 2 * barSideMargin); // Total bar surface / number of bars, pretty much
            var barWidth = drawingSurface.innerWidth() * barsTotalPercentWidth / dataArray.length; // Finds percent of drawing area allocated to bars, then divides by number of bars
            return marginWidth * (barSideMargin + barNumber) + barWidth * (barNumber); // Calculates correct number of margin and bar width spaces for each bar
        }

        createLines(lineDensity, topBounds);
        createBarLabels(barsTotalPercentWidth, barSideMargin);
    }

    function colorBars() {
        for (i = 0; i < barArray.length; i++) {
            barArray[i].css({
                "background-color": colorArray[i % colorArray.length]
            });
        }
    }

    function createLines(lineDensity, topBounds) {
        var lineSpacing = (2 * (topBounds / lineDensity)).toPrecision(1) / 2; // the 2 stuff makes it round to .5s as well as whole numbers (sig-fig-wise)
        console.log(lineSpacing);
        var numLines = Math.floor(topBounds / lineSpacing);
        for (var i = 0; i < numLines; i++){
            if(calcBottom(i) + 1 <= drawingSurface.height()) {
                backgroundLineArray.push($("<div></div>")
                .css({
                    "width": "100%",
                    "height": "1px",
                    "background-color": "#eee",
                    "z-index": "5",
                    "position": "absolute",
                    "left": "0",
                    "bottom": calcBottom(i) + "px"
                })
                .appendTo(drawingSurface));
            }
        }
        
        function calcBottom (i){
            return (i + 1) * (lineSpacing / topBounds) * drawingSurface.height() - 1; // -1 is to get that last line, if possible (it makes a difference)
        }

        createLineLabels(lineSpacing, topBounds);
    }

    function createLineLabels(lineSpacing, topBounds) {
        for (var i = 0; i <= backgroundLineArray.length; i++) {
            backgroundLineLabelArray.push($("<div>" + lineSpacing * i + "</div>")
                .css({
                    "font-family": "'Open Sans', helvetica",
                    "font-size": container.innerWidth() * 0.025 + "px",
                    "text-align": "right",
                    "color": "#999",
                    "position": "absolute",
                    "-webkit-user-select": "none",        
                    "-moz-user-select": "none",
                    "-ms-user-select": "none",
                    "right": container.innerWidth() * 0.025 + drawingSurface.innerWidth() + "px",
                })
                .appendTo(drawingSurface));
            backgroundLineLabelArray[i].css({
                "bottom": (lineSpacing / topBounds) * drawingSurface.height() * i + backgroundLineLabelArray[i].height() * -0.5 + "px" // Needs to be done separately, since height hasn't been defined yet in the other CSS adjustment thingie
            });
        }
    }

    function createTitles() {
        title = $("<div>asdasd</div>")
            .appendTo(drawingSurface)
            .css({
                "font-family": "'Open Sans', helvetica",
                "width": "100%",
                "text-align": "center",
                "position": "absolute"
            })
            .html("<span style='color: #aaa; font-size: " + container.height() * 0.05 + "px" + "'>" + graphTitle + "</span><br /><span style='color: #ccc; font-size: " + container.height() * 0.025 + "px" + "'>" + graphSubtitle + "</span>");
        title.css({
            "top": container.height() * -0.1 + title.height() * -0.5
        });
    }

    function createXAxisLabel() {
        xAxisLabelRef = $("<div>" + xAxisLabel + "</div>")
            .css({
                "font-family": "'Open Sans', helvetica",
                "position": "absolute",
                "color": "#999",
                "font-size": container.innerWidth() * 0.025 + "px"
            })
            .appendTo(drawingSurface);
        xAxisLabelRef.css({
            "top": container.height() * 0.7 - xAxisLabelRef.height() / 2,
            "left": drawingSurface.width() / 2 - xAxisLabelRef.width() / 2
        });
    }

    function createYAxisLabel() {
        yAxisLabelRef = $("<div>" + yAxisLabel + "</div>")
            .css({
                "font-family": "'Open Sans', helvetica",
                "position": "absolute",
                "color": "#999",
                "font-size": container.innerWidth() * 0.025 + "px"
            })
            .appendTo(drawingSurface);
        yAxisLabelRef.css({
            "top": drawingSurface.height() / 2 - yAxisLabelRef.height() / 2,
            "left": container.width() * -0.1 - yAxisLabelRef.width() / 2,
            "transform": "rotate(-90deg)",
            "-ms-transform": "rotate(-90deg)",
            "-webkit-transform": "rotate(-90deg)",
            "-moz-transform": "rotate(-90deg)"
        });
    }

    function createBarLabels(barsTotalPercentWidth, barSideMargin) {
        var rotateNecessary = false;
        for (var i = 0; i < dataArray.length; i++) {
            barLabelArray.push($("<div>" + dataArray[i][1] + "</div>")
                .css({
                    "font-family": "'Open Sans', helvetica",
                    "position": "absolute",
                    "color": "#999",
                    "font-size": container.innerWidth() * 0.02 + "px",
                    "position": "absolute"
                })
                .appendTo(drawingSurface));
            barLabelArray[i].css({
                "left": calcLeftSpacing(i, 1) + "px",
                "top": container.height() * 0.6375 - barLabelArray[i].height() / 2 + "px"
            });

            if(barLabelArray[i].width() >= 0.8 * calcLeftSpacing(0, 1)) {
                rotateNecessary = true;
            }
        }

        if(rotateNecessary === true) {
            for (var j = 0; j < barLabelArray.length; j++) {
                barLabelArray[j].css({
                    "transform": "rotate(20deg)",
                    "-ms-transform": "rotate(20deg)",
                    "-webkit-transform": "rotate(20deg)",
                    "-moz-transform": "rotate(20deg)",
                    "left": calcLeftSpacing(j, 1) + "px",
                    "top": container.height() * 0.6375 - barLabelArray[j].height() / 2 + "px"
                });
            }
        }

        function calcLeftSpacing(barNumber, type) {
            var marginWidth = drawingSurface.innerWidth() * (1 - barsTotalPercentWidth) / (dataArray.length - 1 + 2 * barSideMargin); // Total bar surface / number of bars, pretty much
            var barWidth = drawingSurface.innerWidth() * barsTotalPercentWidth / dataArray.length; // Finds percent of drawing area allocated to bars, then divides by number of bars
            if (type === 1) {
                return marginWidth * (barSideMargin + barNumber) + barWidth * (barNumber) + barWidth / 2 - barLabelArray[barNumber].width() / 2; // Calculates correct number of margin and bar width spaces for each bar
            } else {
                return marginWidth + barWidth;
            }
        }
    }
};
