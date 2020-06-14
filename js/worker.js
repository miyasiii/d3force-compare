importScripts("./lib/d3.v5.min.js");
class d3ForceGraphSimulation {
  #simulation;
  #graph;
  #parameters;
  
  constructor(){
    this.#simulation = d3.forceSimulation();
    this.#parameters = {
      alpha:{
        alphaMin: 0.01,
        alphaDecay: null,
        alphaTarget: null,
        velocityDecay: null
      },
      center:{
        x: 1920/2,
        y: 1080/2
      },
      collision:{
        radius: 5,
        strength: 0.7,
        iterations: null
      },
      link:{
        strength: 0.5,
        iterations: null
      },
      charge:{
        strength: -30,
        theta: null,
        distanceMin: 1,
        distanceMax: 1000
      },
      position:{
        forceX: null,
        strengthX: null,
        x: null,
        forceY: null,
        strengthY: null,
        y: null
      },
      radial:{
        forceRadial: null,
        strength: null,
        radius: null,
        x: null,
        y: null
      }
    }

    this.#simulation
      .force("charge", d3.forceManyBody()
        .strength(this.#parameters.charge.strength)
        .distanceMin(this.#parameters.charge.distanceMin)
        .distanceMax(this.#parameters.charge.distanceMax))
      .force("link",d3.forceLink()
        .strength(this.#parameters.link.strength))
      .force("center", d3.forceCenter(this.#parameters.center.x, this.#parameters.center.y))
      .force("collide",d3.forceCollide()
        .radius(this.#parameters.collision.radius)
        .strength(this.#parameters.collision.strength))

    this.#simulation
      .alphaMin(this.#parameters.alpha.alphaMin);
  }
  
  start(){
    this.#simulation.restart();
    this.#simulation.alpha(1);
  }

  stop(){
    this.#simulation.alpha(0);
  }

  ticked(){
    postMessage({type: "worker", command: "tick", nodes: this.#graph.nodes, links: this.#graph.links});
  }

  ended(){
    console.log("simulation ended");
    postMessage({type: "worker", command: "end", nodes: this.#graph.nodes, links: this.#graph.links});
  }

  setData(g){
    this.#graph = g;
    this.#simulation
      .nodes(this.#graph.nodes)
      .on("tick", () => this.ticked())
      .on("end", () => this.ended());

      this.#simulation.force("link",d3.forceLink()
      .id((d) => { return d.id })
      .links(this.#graph.links));
  }

  setSize(width, height){
    this.#parameters.center.x = width/2;
    this.#parameters.center.y = height/2;
    this.#simulation.force("center", d3.forceCenter(this.#parameters.center.x, this.#parameters.center.y));
  }
}

let simulationApp = new d3ForceGraphSimulation();
onmessage = function(event) {
  switch (event.data.command) {
    case "start": return start();
    case "stop": return stop();
    case "setData": return setData(event.data.data);
    case "setSize": return setSize(event.data.width, event.data.height);
  }

  function start(){
    simulationApp.start();
  }

  function stop(){
    simulationApp.stop();
  }

  function setData(data){
    simulationApp.setData(data);
  }
  
  function setSize(width, height){
    simulationApp.setSize(width, height);
  }
}