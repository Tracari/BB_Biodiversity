

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data)=> {
    // 3. Create a variable that holds the samples array. 
        var samples = data.samples;
        console.log(samples)
    // 4. Create a variable that filters the samples for the object with the desired sample number.
      var sample_fil = samples.filter(num => num.id == sample);
      console.log(sample_fil)
    //  5. Create a variable that holds the first sample in the array.
      var first_sample = sample_fil[0]
      console.log("first_sample", first_sample)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var otu_ids = first_sample.otu_ids;
      console.log(otu_ids)
      var otu_labels = first_sample.otu_labels;
      var sample_values = first_sample.sample_values;
      console.log("sample_values", sample_values)

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10).map(id=>id).sort((a,b)=>b-a);
    console.log(yticks);
  

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x:sample_values,
      y: yticks,
      type:"bar",
      text:otu_labels,
      orientation: "h"

    }];
    
    // 9. Create the layout for the bar chart. 
    var barLayout ={ 
      title: " Top Ten Belly Brawlers"
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

     // 1. Create the trace for the bubble chart.
     var bubbleData = [{
       x:otu_ids,
       y:sample_values,
       type: otu_labels,
       mode: "markers",
       marker:{
         size: sample_values,
         color: otu_ids,
         colorscale: 'sunset'}
      }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title:"Culture per Sample",
      xaxis:{title: "OTU_IDs"},
      margin: true,
      hovermode: "closets"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
    console.log(data);
  
     // 1. Create a variable that filters the metadata array for the object with the desired sample number.
     var metadata = data.metadata.filter(id => id.id == sample)
     console.log(metadata);
         
     // 2. Create a variable that holds the first sample in the metadata array.
       var first_meta = metadata[0]
 
     // 3. Create a variable that holds the washing frequency.
       var wfreq = first_meta.wfreq
       console.log(wfreq)
     
     // 4. Create the trace for the gauge chart.
     var gaugeData = [{
     value: wfreq,
     title: { text: "Washing Frequency" },
     type: "indicator",
     mode: "gauge+number",
     gauge: {
       axis: { range: [null, 10] },
       bar: {color:"black"},
       steps: [
         {range: [0,2], color:"lightgreen"},
         {range: [2,4], color:"limegreen"},
         {range: [4,6], color:"forestgreen"},
         {range: [6,8], color:"green"},
         {range:[8,10], color:"darkgreen"}
     ]}
     }];
     
     // 5. Create the layout for the gauge chart.
     var gaugeLayout = { width: 500, height: 400, margin: {t: 0, b: 0} 
      
     };
 
     // 6. Use Plotly to plot the gauge data and layout.
     Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
};
