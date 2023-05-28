document.addEventListener("DOMContentLoaded", async function () {
  const radios = document.querySelectorAll('input[name="chart"]');
  const chartDiv = document.getElementById("chart");
  const legendDiv = document.getElementById("legend");
  let processedData = null; // 프로세싱된 데이터를 저장할 변수

  try {
    const data = await d3.csv("data/owid-covid-data.csv");
    data.map(function (el) {
      el["percent_fully"] = el["people_fully_vaccinated"] / el["population"];
      el["total_percent"] = el["people_vaccinated"] / el["population"];
      el["percent_partly"] = el["total_percent"] - el["percent_fully"];
    });
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach((d) => {
      d.year = parseDate(d.date).getFullYear();
    });
    const share = data.filter(
      (el) => el.people_vaccinated & el.people_fully_vaccinated
    );

    const getRecent = (arr) => {
      const res = [];
      const map = {};

      arr.forEach((el) => {
        //store the index
        if (!(el["location"] in map)) {
          map[el["location"]] = res.push(el) - 1;
          return;
        }
        //compare date
        if (res[map[el["location"]]]["date"] < el["date"]) {
          res[map[el["location"]]] = el;
        }
      });
      return res;
    };

    const vaccinated = getRecent(share);
    vaccinated.sort(function (a, b) {
      return b["total_percent"] - a["total_percent"];
    });
    processedData = vaccinated
      .filter((el) => el.total_percent <= 1)
      .slice(0, 15);
    const checkboxContainer = document.createElement("div");
    checkboxContainer.style.overflowY = "scroll";
    checkboxContainer.style.maxHeight = "200px";

    processedData.forEach((location) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "location";
      checkbox.value = location.location;
      checkbox.checked = true; // 기본적으로 모두 선택된 상태로 시작

      const label = document.createElement("label");
      label.textContent = location.location;

      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.appendChild(checkbox);
      checkboxWrapper.appendChild(label);

      checkboxContainer.appendChild(checkboxWrapper);
    });

    // 체크박스 상태 변경 이벤트 핸들러
    checkboxContainer.addEventListener("change", function (event) {
      const checkedLocations = Array.from(
        checkboxContainer.querySelectorAll('input[name="location"]:checked')
      ).map((checkbox) => checkbox.value);

      // 데이터 필터링
      const filteredData = processedData.filter((el) =>
        checkedLocations.includes(el.location)
      );

      // 차트 그리기
      chartDiv.innerHTML = "";
      legendDiv.innerHTML = "";
      drawBarChart(filteredData);
    });

    // 체크박스 목록을 문서에 추가
    console.log(checkboxContainer);
    document.body.insertBefore(checkboxContainer, chartDiv);
  } catch (error) {
    console.error("Error loading the data");
  }

  // 라디오 버튼 체크 이벤트 핸들러
  function handleRadioChange() {
    const checkedVal = document.querySelector(
      'input[name="chart"]:checked'
    ).value;

    // 라디오 버튼 값에 따라 적절한 차트 모듈을 가져와서 차트를 그립니다.
    chartDiv.innerHTML = ""; // 이전 차트를 지우고
    legendDiv.innerHTML = "";
    console.log(checkedVal);
    if (checkedVal === "BAR") {
      if (processedData) {
        drawBarChart(processedData);
      } else {
        console.error("Data has not been processed yet.");
      }
    } else if (checkedVal === "LINE") {
      if (processedData) {
        const minDate = d3.min(processedData, (d) => d.year);
        const maxDate = d3.max(processedData, (d) => d.year);

        // 날짜 슬라이더 생성
        const sliderDiv = document.createElement("div");
        sliderDiv.id = "slider";

        const sliderLabel = document.createElement("label");
        sliderLabel.htmlFor = "date-slider";
        sliderLabel.textContent = "Date:";
        sliderDiv.appendChild(sliderLabel);

        const sliderInput = document.createElement("input");
        sliderInput.type = "range";
        sliderInput.id = "date-slider";
        sliderInput.min = minDate;
        sliderInput.max = maxDate;
        sliderInput.value = maxDate;
        sliderDiv.appendChild(sliderInput);

        // 슬라이더 값 변경 이벤트 핸들러
        sliderInput.addEventListener("input", function (event) {
          const selectedDate = new Date(parseInt(sliderInput.value));

          // 선택된 범위의 날짜 값 보여주기
          const minDateText = document.createElement("span");
          minDateText.textContent = minDate;
          const maxDateText = document.createElement("span");
          maxDateText.textContent = maxDate;
          const selectedDateText = document.createElement("span");
          selectedDateText.textContent = selectedDate.getFullYear();

          const dateRangeDiv = document.createElement("div");
          dateRangeDiv.appendChild(minDateText);
          dateRangeDiv.appendChild(document.createTextNode(" - "));
          dateRangeDiv.appendChild(maxDateText);
          dateRangeDiv.appendChild(document.createTextNode(" (Selected: "));
          dateRangeDiv.appendChild(selectedDateText);
          dateRangeDiv.appendChild(document.createTextNode(")"));

          chartDiv.innerHTML = "";
          drawLineChart(processedData, selectedDate);

          // 날짜 범위 표시를 업데이트
          document.getElementById("dateRange").innerHTML = "";
          document.getElementById("dateRange").appendChild(dateRangeDiv);
        });

        // 슬라이더를 문서에 추가
        const dateRangeDiv = document.createElement("div");
        dateRangeDiv.id = "dateRange";
        document.body.insertBefore(sliderDiv, chartDiv);
        document.body.insertBefore(dateRangeDiv, chartDiv);

        // 초기에 전체 데이터로 차트 그리기
        drawLineChart(processedData, new Date(maxDate));
      } else {
        console.error("Data has not been processed yet.");
      }
    }
  }

  // 최초 로드 시 차트 그리기
  handleRadioChange();

  // 라디오 버튼 체크 변경 이벤트 리스너 등록
  radios.forEach(function (radio) {
    radio.addEventListener("change", handleRadioChange);
  });
});

function drawBarChart(data) {
  const margin = {top: 5, right: 30, bottom: 50, left: 100},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const categories = ["percent_fully", "percent_partly"];

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
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.total_percent)])
    .range([0, width])
    .nice();

  // Create a scale for y-axis
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.location))
    .range([0, height])
    .padding(0.2);

  // Define the position of each axis
  const xAxis = d3.axisBottom(xScale).tickFormat((d) => d * 100);
  const yAxis = d3.axisLeft(yScale);

  // Define a scale for color
  const cScale = d3
    .scaleOrdinal()
    .range(["#7bccc4", "#2b8cbe"])
    .domain(categories);

  svg
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  svg.append("g").attr("class", "y-axis").call(yAxis);

  // Generate the data for a stacked bar chart
  const stackedData = d3.stack().keys(categories)(data);

  // Draw the bars
  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .join("g")
    .attr("fill", (d) => cScale(d.key))
    .selectAll("rect")
    .data((d) => d)
    .join("rect")
    .attr("y", (d) => yScale(d.data.location))
    .attr("x", (d) => xScale(d[0]))
    .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
    .attr("height", yScale.bandwidth());

  // Draw the labels for bars
  svg
    .append("g")
    .attr("fill", "black")
    .attr("text-anchor", "end")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("g")
    .data(stackedData)
    .join("g")
    .selectAll("text")
    .data((d) => d)
    .join("text")
    .attr("x", (d) => xScale(d[1]))
    .attr("y", (d) => yScale(d.data.location) + yScale.bandwidth() / 2)
    .attr("dy", "0.35em")
    .attr("dx", function (d) {
      if (d[0] == d.data.percent_fully) {
        return +20;
      } else {
        return -4;
      }
    })
    .text((d) => d3.format(".0%")(d[1] - d[0]));

  // Indicate the x-axis label
  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 40)
    .attr("font-family", "sans-serif")
    .attr("font-size", 18)
    .text("Share of people (%)");

  // Legend
  const legend = d3
    .select("#legend")
    .append("svg")
    .attr("width", width)
    .attr("height", 70)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 18)
    .attr("width", 12)
    .attr("height", 12)
    .style("fill", "#7bccc4");
  legend
    .append("rect")
    .attr("x", 0)
    .attr("y", 36)
    .attr("width", 12)
    .attr("height", 12)
    .style("fill", "#2b8cbe");
  legend
    .append("text")
    .attr("x", 18)
    .attr("y", 18)
    .text("The rate of fully vaccinated people")
    .style("font-size", "15px")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "hanging");
  legend
    .append("text")
    .attr("x", 18)
    .attr("y", 36)
    .text("The rate of partially vaccinated people")
    .style("font-size", "15px")
    .attr("text-anchor", "start")
    .attr("alignment-baseline", "hanging");
}

function drawLineChart(data) {
  const margin = {top: 5, right: 100, bottom: 50, left: 50},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const sumstat = d3.group(data, (d) => d.location);

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
    .scaleLinear()
    .domain(
      d3.extent(data, function (d) {
        return d.year;
      })
    )
    .range([0, width]);

  // Create a scale for y-axis
  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d.total_cases;
      }),
    ])
    .range([height, 0]);

  // Define the position of each axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale);

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
    .attr("fill", "none")
    .attr("stroke", function (d) {
      return cScale(d[0]);
    })
    .attr("stroke-width", 1.5)
    .attr("d", function (d) {
      return d3
        .line()
        .x(function (d) {
          return xScale(d.year);
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
      return xScale(d[1][d[1].length - 1].year);
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
