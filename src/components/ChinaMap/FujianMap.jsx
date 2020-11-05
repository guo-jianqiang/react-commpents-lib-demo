import React, { useEffect } from 'react'
import * as d3 from 'd3'
import FujianGeo from './福建省.json'

const FujianMap = () => {

  const initChart = () => {
    const width = 600
    const height = 800
    let svg = d3.select(".chart")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0,0)")
      .on("click", reset);

    let projection = d3.geoMercator()
      .center([119, 26])
      .scale(5000)
      .translate([width / 2, height / 2])

    let path = d3.geoPath()
      .projection(projection)

    const city = svg.selectAll("path")
      .data(FujianGeo.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "#000")
      .attr("stroke-width", 0.3)
      .attr("stroke-linejoin", "round")
      .style("fill", "steelblue")
      .style('cursor', 'pointer')

    // city.on("mouseenter", function(e) {
    //   this.style.fill = 'red'
    // })
    //
    // city.on("mouseleave", function(e) {
    //   this.style.fill = 'steelblue'
    // })

    city.on("click", clicked)



    city.append("title")
      .text(d => {
        console.log(d)
        return d.properties.name
      });




    function zoomed(event) {
      console.log(event)
      const t = event.transform;
      svg.attr("transform", `translate(${t.x}, ${t.y}) scale(${t.k})`);
    }
    const zoom = d3.zoom()
      .scaleExtent([1, 3])  //设置监听范围
      .on("zoom", zoomed);  //设置监听事件

    svg.call(zoom)

    function reset() {
      d3.select(this).transition().style("fill", "steelblue");
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
      );
    }

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = path.bounds(d);
      event.stopPropagation();
      city.transition().style("fill", 'steelblue')
      d3.select(this).transition().style("fill", "red");
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
    }

  }

  useEffect(() => {
    initChart()
  }, [])

  return (<svg className='chart' />)
}

export default FujianMap