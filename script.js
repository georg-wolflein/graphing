/**
 *
 * The main script
 * 
 * Author: DigitalLeafGames
 * 
 */

$(document).ready(function () {
    var colors = ["#4572A7", "#AA4643", "#89A54E", "#71588F", "#4198AF", "#DB843D"];
    var data = [[2, "Type 1"], [3, "Type 2"], [4, "Type 3"], [1, "Type 4"], [2, "Type 5"]];
    var data2 = [[34, "Type 1"], [19, "Type 2"], [24, "Type 3"], [36, "Type 4"], [8, "Type 5"]];
    var data3 = [[223, "Type 1"], [311, "Type 2"], [522, "Type 3"], [190, "Type 4"], [237, "Type 5"]];
    $("#graphContainer").drawBarGraph(data3, colors, "Graph Title", "Graph Subtitle", "X-Axis Label", "Y-Axis Label");

    var data4 = [[223, "USA"], [156, "Germany"], [45, "Brasil"], [88, "China"], [129, "Russia"], [5, "UAE"]];
    $("#graphContainer2").drawBarGraph(data4, colors, "Number of Porkchops Consumed Throughout the World", "Number of Porkchops Consumed per Year in Thousands", "Country of Consumption", "Porkchops Consumed (Thousands)");
    $("#graphContainer3").drawBarGraph([[223, "USA"], [156, "Germany"], [45, "Brasil"], [88, "China"], [129, "Russia"], [5, "UAE"], [223, "USA"], [156, "Germany"], [45, "Brasil"], [88, "China"], [129, "Russia"], [5, "UAE"]], colors, "Number of Porkchops Consumed Throughout the World", "Number of Porkchops Consumed per Year in Thousands", "Country of Consumption", "Porkchops Consumed (Thousands)");
});