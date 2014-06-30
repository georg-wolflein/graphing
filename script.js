/**
 *
 * The main script. 
 * 
 * Author: DigitalLeafGames
 * 
 */

$(document).ready(function () {
    $("#graphContainer").drawBarGraph([[34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"]], ["#06c"], "Graph Title", "Graph Subtitle");
});