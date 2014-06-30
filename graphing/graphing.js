$.fn.drawBarGraph = function (dataArray, colorArray, graphTitle, graphSubtitle) {
    var container = this;
    var drawingSurface;
    var graphTopMargin = 20;

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
                "width": "60%",
                "height": "60%",
                "margin": "0 auto",
                "margin-top": container.height() * 0.2 + "px"
                })
            .appendTo(container);
    }

    function createBars() {
        for (var i = 0; i < dataArray.length; i++) {
            
        }
    }
};