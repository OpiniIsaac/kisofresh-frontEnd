import { useEffect, useRef } from "react";
import axios from "axios";
import * as d3 from "d3";

type CropPrice = {
  _id: string;
  Date: string;
  Crop: string;
  Prices: number;
};

export default function PriceChart({ crop }: any) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (crop) {
      axios
        .get("/api/cropPrices")
        .then((response) => {
          const filteredData: CropPrice[] = response.data.filter(
            (item: CropPrice) => item.Crop === crop
          ).filter(d => d.Date); // Filter out any entries with null or empty dates
  
          const parseDate = d3.timeParse("%Y %B");
          const data = filteredData.map((d) => ({
            date: parseDate(d.Date),
            price: d.Prices,
          }));

          // Set up dimensions and margins
          const margin = { top: 20, right: 30, bottom: 50, left: 50 },
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

          // Clear previous graph
          d3.select(svgRef.current).selectAll("*").remove();

          // Set up the SVG
          const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

          // Set up scales
          const x = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.date as Date) as [Date, Date])
            .range([0, width]);
          const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.price) ?? 0])
            .nice()
            .range([height, 0]);

          // Add X axis
          svg
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .append("text")
            .attr("fill", "#000")
            .attr("x", width / 2)
            .attr("y", margin.bottom - 10)
            .attr("text-anchor", "middle")
            .text("Date");

          // Add Y axis
          svg.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 15)
            .attr("text-anchor", "middle")
            .text("Price");

          // Add the line
          const line = svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr(
              "d",
              d3
                .line<{ date: Date, price: number }>()
                .x((d) => x(d.date))
                .y((d) => y(d.price))
            );

          // Add transitions
          line
            .attr("stroke-dasharray", function() { return this.getTotalLength(); })
            .attr("stroke-dashoffset", function() { return this.getTotalLength(); })
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0);

          // Add tooltip
          const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.7)")
            .style("color", "#fff")
            .style("padding", "5px 10px")
            .style("border-radius", "4px")
            .style("pointer-events", "none")
            .style("opacity", 0);

          svg.selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => x(d.date))
            .attr("cy", (d) => y(d.price))
            .attr("r", 5)
            .attr("fill", "steelblue")
            .on("mouseover", function(event, d) {
              d3.select(this).transition().duration(200).attr("r", 7);
              tooltip.transition().duration(200).style("opacity", 0.9);
              tooltip.html(`Date: ${d.date.toDateString()}<br>Price: ${d.price}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
              d3.select(this).transition().duration(200).attr("r", 5);
              tooltip.transition().duration(500).style("opacity", 0);
            });

          // Add zoom and pan
          const zoom = d3.zoom<SVGRectElement, unknown>()
            .scaleExtent([1, 10])
            .translateExtent([[-width, -Infinity], [2 * width, Infinity]])
            .extent([[0, 0], [width, height]])
            .on("zoom", zoomed);

          svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(zoom);

          function zoomed(event: d3.D3ZoomEvent<SVGRectElement, unknown>) {
            const newX = event.transform.rescaleX(x);
            const newY = event.transform.rescaleY(y);

            svg.selectAll("path")
              .attr("d", d3.line<{ date: Date, price: number }>()
                .x((d) => newX(d.date))
                .y((d) => newY(d.price))
              );
            svg.selectAll("circle")
              .attr("cx", (d) => newX(d.date))
              .attr("cy", (d) => newY(d.price));
            svg.select(".x-axis").call(d3.axisBottom(newX));
            svg.select(".y-axis").call(d3.axisLeft(newY));
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [crop]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{crop} Price Trends</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}
