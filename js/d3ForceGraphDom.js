export class d3ForceGraphDom {
  #graphNodesGroup;
  #graphLinksGroup;
  #resizeObserver;
  #transform;
  #context;

  constructor(graphDiv, type) {
    if(type === "svg"){
      const svg = d3.select(graphDiv)
        .append("svg")
        .attr('width', document.body.clientWidth)
        .attr('height', document.body.clientHeight);
      
      const background = svg
        .append("rect")
        .attr("id", "background")
        .attr("fill", "#fff")
        .attr("x", 0.5)
        .attr("y", 0.5)
        .attr("width", document.body.clientWidth)
        .attr("height", document.body.clientHeight);

      const svgGroup = svg
        .append('svg:g')
        .attr("id", "svgGroup");

      this.#graphLinksGroup = svgGroup
        .append("g")
        .attr("id", "links");

      this.#graphNodesGroup = svgGroup
        .append("g")
        .attr("id", "nodes");

      const zoom = d3.zoom()
        .scaleExtent([0.10, 1.0])
        .on("zoom", () => {
          svgGroup
            .attr("transform",
            `translate(${d3.event.transform.x}, ${d3.event.transform.y})` + " " +
            `scale(${d3.event.transform.k})`);
        });
      svg.call(zoom);

      this.#resizeObserver = new ResizeObserver(entries => {
        d3.select(graphDiv).attr("width", document.body.clientWidth);
        d3.select(graphDiv).attr("height", document.body.clientHeight);
        svg.attr("width", document.body.clientWidth);
        svg.attr("height", document.body.clientHeight);
        background.attr("width", document.body.clientWidth);
        background.attr("height", document.body.clientHeight);
      });

    }else if(type === "canvas"){
      const canvas = d3.select(graphDiv)
        .append("canvas")
        .attr('width', document.body.clientWidth)
        .attr('height', document.body.clientHeight);

      this.#context = d3.select("canvas").node().getContext("2d");

      this.#resizeObserver = new ResizeObserver(entries => {
        d3.select(graphDiv).attr("width", document.body.clientWidth);
        d3.select(graphDiv).attr("height", document.body.clientHeight);
        canvas.attr("width", document.body.clientWidth);
        canvas.attr("height", document.body.clientHeight);
      });

      canvas.call(d3.zoom()
        .scaleExtent([0.10, 1.0])
        .on("zoom", () => {
          this.#transform = d3.event.transform;
          this.update();
        }))
    }
    this.#resizeObserver.observe(document.body);
    this.#transform = d3.zoomIdentity;
  }

  setData() {
    // nodes
    let graphNodesData = this.#graphNodesGroup
      .selectAll("g")
      .data(window.graph.nodes, d => d.id);

    let graphNodesEnter = graphNodesData
      .enter()
        .append("g")
        .attr("id", d => d.id || null)
        .on("contextmenu", (d, i)  => {d3.event.preventDefault();});

    graphNodesData
      .exit()
      .remove();

    graphNodesEnter
      .append("circle")
      .classed('node', true)
      .attr("r", 2)
      .attr("fill", "#000");

    graphNodesData = graphNodesEnter.merge(graphNodesData);

    // links
    let graphLinksData = this.#graphLinksGroup
      .selectAll("line")
      .data(window.graph.links);

    graphLinksData
      .exit()
      .remove();

    let graphLinksEnter = graphLinksData
      .enter()
        .append("line")
        .style("stroke-width", "1px")
        .style("stroke", "#000")
        .attr("opacity", 0.25)

    graphLinksData = graphLinksEnter.merge(graphLinksData);
  }

  update() {
    if(d3.select("svg").empty() === false){
      let graphNodesData = this.#graphNodesGroup
      .selectAll("g")
      .data(window.graph.nodes);

    let graphLinksData = this.#graphLinksGroup
      .selectAll("line")
      .data(window.graph.links);

    graphLinksData
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

    graphNodesData
      .attr("transform", d => { return `translate(${[d.x, d.y]})`});

    }else if(d3.select("canvas").empty() === false){
      this.#context.save();
      this.#context.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
      this.#context.translate(this.#transform.x, this.#transform.y);
      this.#context.scale(this.#transform.k, this.#transform.k);

      this.#context.globalAlpha = 0.25;
      this.#context.beginPath();
      this.#context.strokeStyle = "#000";
      window.graph.links.forEach( (d) => {
        this.#context.moveTo(d.source.x, d.source.y);
        this.#context.lineTo(d.target.x, d.target.y);
      });
      this.#context.stroke();

      this.#context.globalAlpha = 1;
      window.graph.nodes.forEach( (d) => {
        this.#context.fillRect(d.x-1, d.y-1, 2, 2);
      });
      this.#context.restore();
    }
    
  }
}
