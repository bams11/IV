import countryToContinent from "./utils.js";
import createSlider from "./DateSlider.js";
const processedData = {};
let years;

async function loadData() {
  const chartDiv = document.getElementById("chart");
  try {
    const fertilityData = await d3.csv("data/fertility-rate.csv");
    const lifeExpectancyData = await d3.csv("data/life-expectancy.csv");
    const populationData = await d3.csv("data/population.csv");

    const columns = fertilityData.columns;
    years = columns.splice(4);
    years.splice(-2);
    for (let year of years) {
      processedData[year] = [];
    }
    // 데이터 전처리 작업을 수행합니다.
    fertilityData.forEach(function (d) {
      var countryCode = d.CountryCode;

      for (let year of years) {
        processedData[year].push({
          CountryCode: d["Country Code"],
          CountryName: d["Country Name"],
          FertilityRate: +d[year],
        });
      }
    });

    lifeExpectancyData.forEach(function (d) {
      for (let year of years) {
        var matchingObject = processedData[year].find(function (obj) {
          return obj.CountryCode === d["Country Code"];
        });
        matchingObject.LifeExpectancy = +d[year];
      }
    });

    populationData.forEach(function (d) {
      for (let year of years) {
        var matchingObject = processedData[year].find(function (obj) {
          return obj.CountryCode === d["Country Code"];
        });
        matchingObject.Population = +d[year];
      }
    });

    for (let year of years) {
      processedData[year] = processedData[year].filter(
        (d) =>
          d.FertilityRate !== 0 && d.LifeExpectancy !== 0 && d.Population !== 0
      );
      processedData[year].sort(function (a, b) {
        return b.Population - a.Population;
      });
    }

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = years[0];
    slider.max = years[years.length - 1];
    slider.step = 1;
    slider.value = years[0];
    slider.classList.add("slider");

    const sliderValue = document.createElement("span");
    sliderValue.textContent = years[0];
    sliderValue.classList.add("slider-value");

    const sliderContainer = document.createElement("div");
    sliderContainer.classList.add("slider-container");
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(sliderValue);

    document.getElementById("slider").appendChild(sliderContainer);

    // Date slider의 이벤트 핸들러를 등록합니다.
    slider.addEventListener("input", function (event) {
      const selectedYear = event.target.value;
      sliderValue.textContent = selectedYear;
      chartDiv.innerHTML = "";
      drawBubbleChart(processedData[selectedYear]);
    });
    drawBubbleChart(processedData[years[0]]);
  } catch (error) {
    // 데이터 로드 또는 전처리 과정에서 오류가 발생한 경우 처리합니다.
    console.log("오류가 발생했습니다:", error);
  }
}

// loadData 함수를 호출하여 데이터를 로드하고 전처리합니다.
loadData();
// set the dimensions and margins of the graph

//Read the data
function drawBubbleChart(data) {
  const margin = {top: 10, right: 20, bottom: 80, left: 50},
    width = 500 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  // Add X axis
  const allData = years.flatMap((year) => processedData[year]);

  // X축과 y축의 범위를 결정합니다.
  const xDomain = d3.extent(allData, (d) => d.LifeExpectancy);
  const yDomain = d3.extent(allData, (d) => d.FertilityRate);
  const zDomain = d3.extent(allData, (d) => d.Population);

  // 고정된 X축과 y축의 범위를 설정합니다.
  const xScale = d3.scaleLinear().domain(xDomain).range([0, width]);
  const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);
  const x = d3.scaleLinear().domain(xDomain).range([0, width]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain(yDomain).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add a scale for bubble size
  const z = d3.scaleLinear().domain(zDomain).range([3, 60]);

  var myColor = d3
    .scaleOrdinal()
    .domain(["AS", "AN", "AF", "OC", "EU", "SA", "NA", "OTHERS"])
    .range([
      "#66c2a5",
      "#fc8d62",
      "#8da0cb",
      "#e78ac3",
      "#a6d854",
      "#ffd92f",
      "#e5c494",
      "#b3b3b3",
    ]);
  const tooltip = d3
    .select("#chart")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("color", "white")
    .style("font-size", "10px")
    .style("position", "absolute") // 툴팁을 절대 위치로 설정
    .style("pointer-events", "none"); // 툴팁이 마우스 이벤트를 가로채지 않도록 설정

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  const showTooltip = function (event, d) {
    tooltip.transition().duration(200);
    tooltip
      .style("opacity", 1)
      .html(
        "Country: " +
          d.CountryName +
          "<br/>Fertility Rate: " +
          d.FertilityRate +
          "<br/>Life Expectancy: " +
          d.LifeExpectancy +
          "<br/>Population: " +
          d.Population
      )
      .style("left", event.x + 10 + "px")
      .style("top", event.y - 30 + "px");
  };
  const moveTooltip = function (event, d) {
    tooltip
      .style("left", event.x + 10 + "px")
      .style("top", event.y - 30 + "px");
  };
  const hideTooltip = function (event, d) {
    tooltip.transition().duration(200).style("opacity", 0);
  };
  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("class", "bubbles")
    .attr("cx", (d) => x(d.LifeExpectancy))
    .attr("cy", (d) => y(d.FertilityRate))
    .attr("r", (d) => z(d.Population))
    .style("fill", function (d) {
      return myColor(countryToContinent[d.CountryCode]);
    })
    .style("opacity", "0.7")
    .attr("stroke", "black")
    .on("mouseover", showTooltip)
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);

  svg
    .append("text")
    .attr("class", "axis-legend")
    .attr("transform", `translate(${width / 2}, ${height + 40})`)
    .style("text-anchor", "middle")
    .text("Life Expectancy");

  svg
    .append("text")
    .attr("class", "axis-legend")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - height / 2)
    .style("text-anchor", "middle")
    .text("Fertility Rate");
}
