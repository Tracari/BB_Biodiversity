// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var gaugeArray = metadata.filter(metaObj => metaObj.id == sample); 

    // 2. Create a variable that holds the first sample in the metadata array.
    var gaugeResult = gaugeArray[0];

    // 3. Create a variable that holds the washing frequency.
    var wfreqs = gaugeResult.wfreq;
  

    // 4. Create the trace for the gauge chart.
    var gaugeData = [    { value: wfreqs,
      type: "indicator",
      mode: "gauge+number",
      title: {text: "<b> Belly Button Washing Frequency </b> <br></br> Scrubs Per Week"},
      gauge: {
        axis: {range: [null,10], dtick: "2"},
        bar: {color: "black"},
        steps:[
          {range: [0, 2], color: "blue"},
          {range: [2, 4], color: "red"},
          {range: [4, 6], color: "orange"},
          {range: [6, 8], color: "lightblue"},
          {range: [8, 10], color: "yellow"}
        ],
        dtick: 2
      }
    }
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = [{
      automargin:True
  }];

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
