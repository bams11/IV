import createSlider from "./DateSlider.js";

export default function drawLineChart(data) {
  d3.select("#slider svg").remove();

  const margin = {top: 5, right: 100, bottom: 50, left: 100};
  const width = 900 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;
  let sumstat = d3.group(data, (d) => d.location);

  // Find the maximum total_cases value
  const maxTotalCases = d3.max(data, function (d) {
    return parseInt(d.total_cases);
  });

  // Adjust the maximum y-axis domain based on the maximum total_cases value
  const yMax = Math.ceil(maxTotalCases / 1000000) * 1000000;

  // Define the position of the chart
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create a scale for x-axis
  const xScale = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d.date;
      })
    )
    .range([0, width]);

  // Create a scale for y-axis
  const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  // Define the position of each axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));

  // Draw axes
  const xAxisGroup = svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  const yAxisGroup = svg.append("g").attr("class", "y-axis").call(yAxis);

  // Define a scale for color
  const cScale = d3
    .scaleOrdinal()
    .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

  // Draw the line
  svg
    .selectAll(".line")
    .data(sumstat)
    .join("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", function (d) {
      return cScale(d[0]);
    })
    .attr("stroke-width", 1.5)
    .attr("d", function (d) {
      return d3
        .line()
        .x(function (d) {
          return xScale(d.date.getTime());
        })
        .y(function (d) {
          return yScale(d.total_cases);
        })(d[1]);
    });

  // Draw the labels for lines
  svg
    .selectAll(".text")
    .data(sumstat)
    .enter()
    .append("text")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("class", "label")
    .attr("x", function (d) {
      return width + 10; // 오른쪽에 위치하도록 설정
    })
    .attr("y", function (d) {
      return yScale(d[1][d[1].length - 1].total_cases);
    })
    .attr("fill", function (d) {
      return cScale(d[0]);
    })
    .attr("dy", ".75em")
    .text(function (d) {
      return d[0];
    });

  // Create the date slider
  const minDate = d3.min(data, (d) => d.date);
  const maxDate = d3.max(data, (d) => d.date);

  const slider = createSlider(minDate, maxDate, width, redrawChart);

  d3.select("#slider")
    .append("svg")
    .attr("width", 800)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)")
    .call(slider);

  // Redraw the chart based on the selected date range
  function redrawChart(startDate, endDate) {
    svg.selectAll("path.line").remove(); // 모든 path.line 요소를 제거
    svg.selectAll(".label").remove();
    const filteredData = data.filter(
      (d) =>
        d.date >= d3.timeParse("%Y/%m/%d")(startDate) &&
        d.date <= d3.timeParse("%Y/%m/%d")(endDate)
    );
    const sumstat = d3.group(filteredData, (d) => d.location);

    // Create a new xScale for the selected date range
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(filteredData, (d) => d.date))
      .range([0, width]);

    // Create a new yScale based on the maximum total_cases value of the filtered data
    const maxTotalCases = d3.max(filteredData, (d) => parseInt(d.total_cases));
    const yMax = Math.ceil(maxTotalCases / 1000000) * 1000000;
    const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

    // Update the x-axis and y-axis with the new scales
    xAxis.scale(xScale);
    xAxisGroup.call(xAxis);
    yAxis.scale(yScale);
    yAxisGroup.call(yAxis);

    // Redraw the lines
    svg
      .selectAll(".line")
      .data(sumstat)
      .join("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", function (d) {
        return cScale(d[0]);
      })
      .attr("stroke-width", 1.5)
      .attr("d", function (d) {
        return d3
          .line()
          .x(function (d) {
            return xScale(d.date.getTime());
          })
          .y(function (d) {
            return yScale(d.total_cases);
          })(d[1]);
      });

    svg
      .selectAll(".text")
      .data(sumstat)
      .enter()
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("class", "label")
      .attr("x", function (d) {
        return width + 10; // 오른쪽에 위치하도록 설정
      })
      .attr("y", function (d) {
        return yScale(d[1][d[1].length - 1].total_cases);
      })
      .attr("fill", function (d) {
        return cScale(d[0]);
      })
      .attr("dy", ".75em")
      .text(function (d) {
        return d[0];
      });
  }
}
