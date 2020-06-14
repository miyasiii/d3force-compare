const app = document.querySelector("#app");
let graphDom = null;
let graphSimulation = null;
let worker = null;
let graph = {};
let masterGraph = {};
let modelFile = "./model/mplate.mtx";
// let modelFile = "./model/vibrobox.mtx";

async function loadModelFile(){
  await d3.text(modelFile).then((data) => {
    let loadingTxt = d3.select("body").append("p")
      .html("Loading...")
      .style("position", "fixed")
      .style("top", "50%")
      .style("left", "50%")

    let pairs = data.split("\n")
    .slice(14) // remove notes
    .map(function(d) { return d.split(" "); });
    
    let node_set = d3.set();
    pairs.forEach(function(d) {
      node_set.add(d[0]);
      node_set.add(d[1]);
    });
    
    masterGraph.nodes = node_set.values().map((d) => {
      return { id: d };
    });
    
    masterGraph.links = pairs.map((d) => {
      return { source: d[0], target: d[1] }
    })
    .filter((d) => {
      return d.source !== d.target;
    });

    d3.select("input").attr("max", masterGraph.links.length);
    loadingTxt.remove();
  }).catch((e) => {
    console.log('error: ', e)
  })
}

loadModelFile().then( () => {
  let canvasButton = d3.select("body").append("button")
  .html("canvas")
  .style("width", "10%")
  .style("position", "fixed")
  .style("top", "50%")
  .style("left", "35%")
  .on("click", function(){
    canvasButton.remove();
    svgButton.remove();
    svgWorkerButton.remove();
    d3.select("form").attr("hidden", null);
    startCanvas();
  })
let svgButton = d3.select("body").append("button")
  .html("svg")
  .style("width", "10%")
  .style("position", "fixed")
  .style("top", "50%")
  .style("left", "50%")
  .on("click", function(){
    canvasButton.remove();
    svgButton.remove();
    svgWorkerButton.remove();
    d3.select("form").attr("hidden", null);
    startSvg();
  })
let svgWorkerButton = d3.select("body").append("button")
  .html("svg + worker")
  .style("width", "10%")
  .style("position", "fixed")
  .style("top", "50%")
  .style("left", "65%")
  .on("click", function(){
    canvasButton.remove();
    svgButton.remove();
    svgWorkerButton.remove();
    d3.select("form").attr("hidden", null);
    startSvgWorker();
  })

})

function sliceGraph(range){
  graph.links = JSON.parse(JSON.stringify(masterGraph.links.slice(0, range)));
  let sourceIds = [...graph.links].map(elem => elem.source);
  let targetIds = [...graph.links].map(elem => elem.target);
  let ids = sourceIds.concat(targetIds);
  graph.nodes = JSON.parse(JSON.stringify(masterGraph.nodes.filter(elem => ids.includes(elem.id))));
}

function startCanvas(){
  sliceGraph(100);

  import('./d3ForceGraphDom.js')
  .then(module => {
    graphDom = new module.d3ForceGraphDom(app, "canvas");
  })
  .catch((e) => {
    console.log('error: ', e)
  })
  

  import('./d3ForceGraphSimulation.js')
  .then(module => {
    graphSimulation = new module.d3ForceGraphSimulation();
    graphSimulation.setData();
    graphSimulation.start();
  })
  .catch((e) => {
    console.log('error: ', e)
  })
}

function startSvg(){
  sliceGraph(100);

  import('./d3ForceGraphDom.js')
  .then(module => {
    graphDom = new module.d3ForceGraphDom(app, "svg");
    graphDom.setData();
  })
  .catch((e) => {
    console.log('error: ', e)
  })

  import('./d3ForceGraphSimulation.js')
  .then(module => {
    graphSimulation = new module.d3ForceGraphSimulation();
    graphSimulation.setData();
    graphSimulation.start();
  })
  .catch((e) => {
    console.log('error: ', e)
  })
}

function startSvgWorker(){
  sliceGraph(100);

  import('./d3ForceGraphDom.js')
  .then(module => {
    graphDom = new module.d3ForceGraphDom(app, "svg");
    graphDom.setData();
  })
  .catch((e) => {
    console.log('error: ', e)
  })

  worker = new Worker("./js/worker.js");
  worker.postMessage({command: "setSize", width: document.body.clientWidth, height: document.body.clientHeight});
  worker.postMessage({command: "setData", data: graph});
  worker.postMessage({command: "start"});
  worker.addEventListener('message', (event) => {
    graph = event.data;
    graphDom.update();
  })
}

d3.select("input").on("change", function() {
  sliceGraph(this.value);

  if(d3.select("svg").empty() === false){
    graphDom.setData();
  }
  
  if(worker !== null){
    worker.postMessage({command: "setData", data: graph});
    worker.postMessage({command: "start"});
  }else if(graphSimulation !== null){
    graphSimulation.setData();
    graphSimulation.start();
  }
})
