/**
 *
 * The main script. 
 * 
 * Author: DigitalLeafGames
 * 
 */

$(document).ready(function () {
    var data = [[2, "Type 1"], [3, "Type 2"], [4, "Type 3"], [1, "Type 4"], [2, "Type 5"]];
    var data2 = [[34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"]];
    var data3 = [[223, "Type 1"], [311, "Type 2"], [522, "Type 3"], [190, "Type 4"], [237, "Type 5"]];
    $("#graphContainer").drawBarGraph(data3, ["#06c", "#1470CC", "#287ACC", "#3D84CC", "#518ECC"], "Graph Title", "Graph Subtitle");
});