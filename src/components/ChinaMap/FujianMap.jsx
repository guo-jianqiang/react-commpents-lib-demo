import React, { useEffect } from 'react'
import {message} from 'antd'
import * as d3 from 'd3'
import dataset from '../../constant'
import computeControlPoint from '../../lib/computeControlPoint'
import FujianGeo from './福建省.json'

const centerCityCode = 350100

const FujianMap = () => {

  const initChart = () => {
    const width = 600
    const height = 800
    const fuzhouPeking = [119, 26]
    let svg = d3.select(".chart")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0,0)")
      .on("click", reset);

    // 与绘制地图时相似，使用 projection() ,把经纬度转为直角坐标
    // mercator 投影法，即正轴等角圆柱投影

    let projection = d3.geoMercator()
      .center(fuzhouPeking)
      .scale(5000)
      .translate([width / 2, height / 2])

    // 调用路径生成器，加入投影函数，生成路径。

    let path = d3.geoPath()
      .projection(projection)

    const city = svg.selectAll("path")
      .data(FujianGeo.features)
      .enter()
      .append("path")
      .each(d => {
        // 标注城市位置
        const peking = d.properties.center
        const proPeking = projection(peking)
        svg.append("circle")
          .attr("class","point")
          .attr("cx",proPeking[0])
          .attr("cy",proPeking[1])
          .attr("r",d.properties.adcode === centerCityCode ? 4 : 3)
          .attr('fill', d.properties.adcode === centerCityCode ? 'red' : '#00')
        // 标注文本
        const cityName = d.properties.name
        svg.append('text')
          .text(cityName)
          .attr('font-size', '14px')
          .attr('x', proPeking[0])
          .attr('y', proPeking[1])
          .attr('transform', 'translate(-15 -10)')
      })
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
        return d.properties.name
      });

    renderFlyLine()

    function zoomed(event) {
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
      d3.select(this).transition().style("fill", "red")
      svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
    }

    function renderFlyLine () {
      const pointData = [];
      for (let i = 0; i < dataset.length; i += 1) {
        const item = dataset[i]
        // 计算飞线点坐标
        const startPoint = projection(item.from.coordinate);
        const endPoint = projection(item.to.coordinate);
        pointData.push({
          startPoint,
          endPoint,
          controlPoint: computeControlPoint(startPoint, endPoint, 0.5),
        });
        // 定义模版飞线  用于计算控制点
        svg.append('path')
          .attr('stroke','none')
          .attr('fill', 'none')
          .attr('class', `line-path${i}`)
          .attr('d', () => transPath(pointData[i]));

        // 定义线性渐变
        const flag = item.from.coordinate[0] > item.to.coordinate[0] // 起点位置经度大不终点
        const defs = svg.append('defs')
        const radialGradient = defs.append('linearGradient')
          .attr('id', `grad${i}`)
          .attr('r', 0.5)
        radialGradient.append('stop')
          .attr('offset', '10%')
          .attr('stop-color', '#FFD700')
          .attr('stop-opacity', flag ? '1' : '0')
        radialGradient.append('stop')
          .attr('offset', '80%')
          .attr('stop-color', '#FFD700')
          .attr('stop-opacity', flag ? '0' : '1')

        const circle = svg.append('circle')
          .attr('r', '2')
          .attr('class', 'line-circle')
          .attr('fill', 'url(#RadialGradient)')

        // 定义飞线
        const line = svg.append('path')
          .attr('class', 'lineGroups')
          .attr('stroke',`url(#grad${i})`)
          .attr('stroke-width',3)
          .attr('fill','none')
        transition()
        // 贝塞尔曲线 循环过渡
        function transition () {
          line.attr('d', '')
            .style('opacity', 1)
            .transition()
            .duration(2000)
            .delay(1200)
            .attrTween('d', function () {
              circle.attr('opacity', 1)
              const $path = d3.select(`.line-path${i}`).node();
              let l
              try {
                l = $path.getTotalLength();
              } catch (e) {
                return
              }
              const coord = $path.getAttribute('d').replace(/(M|Q)/g, '').match(/((\d|\.)+)/g);
              const x1 = +coord[0];const y1 = +coord[1]; // 起点
              const x2 = +coord[2]; const y2 = +coord[3]; // 控制点
              return function (t) {
                let p
                try{
                  p = $path.getPointAtLength(t * l);  // 新的终点
                }catch (e) {
                  return
                }
                const x = ((1 - t) * x1) + (t * x2);
                const y = ((1 - t) * y1) + (t * y2);
                circle.attr('cx', p.x).attr('cy', p.y)
                // d3.select(`#mask${i}`).attr('x', p.x).attr('y', p.y);  // 蒙版坐标
                return `M${x1},${y1} Q${x},${y} ${p.x},${p.y}`;
              };
            })
            .transition()
            .duration(2000)
            // .style('opacity', 0)
            .on("end", function () {
              circle.attr('opacity', 0)
              if (this) {
                transition()
              }
            })
            .style('opacity', 0)
        }
      }

      function transPath ({startPoint, endPoint, controlPoint}) {
        return 'M'+startPoint[0]+','+startPoint[1]+' Q'+controlPoint[0]+','+controlPoint[1]+' '+endPoint[0]+','+endPoint[1];
      }
    }
  }

  useEffect(() => {
    initChart()
    return () => {
      d3.selectAll('g').remove()
    }
  }, [])

  return (<svg className='chart'>
    <defs>
      <radialGradient id="RadialGradient">
        <stop offset="0%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#fff" opacity='0'/>
      </radialGradient>
    </defs>
  </svg>)
}

export default FujianMap