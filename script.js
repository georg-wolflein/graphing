/**
 *
 * The main script. 
 * 
 * Author: DigitalLeafGames
 * 
 */

$(document).ready(function () {
    var data = [[34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"], [34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"]];
    $("#graphContainer").drawBarGraph(data, ["#06c"], "Graph Title", "Graph Subtitle");
});