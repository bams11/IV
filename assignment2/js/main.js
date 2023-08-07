async function loadData() {
  try {
    const matchData = await d3.csv("data/results.csv");
    const playerData = await d3.csv("data/players.csv");

    const filteredData = {};

    matchData.forEach((d) => {
      if (d.HomeTeam === "Arsenal" || d.AwayTeam === "Arsenal") {
        const date = d.DateTime.substring(0, 10);
        const season = d.Season;
        const result =
          (d.FTR === "H" && d.HomeTeam === "Arsenal") ||
          (d.FTR === "A" && d.AwayTeam === "Arsenal")
            ? "W"
            : (d.FTR === "H" && d.AwayTeam === "Arsenal") ||
              (d.FTR === "A" && d.HomeTeam === "Arsenal")
            ? "L"
            : "D";
        const opponent = d.HomeTeam === "Arsenal" ? d.AwayTeam : d.HomeTeam;

        if (!filteredData[season]) {
          filteredData[season] = [];
        }

        filteredData[season].push({
          date: date,
          result: result,
          oppenent: opponent,
        });
      }
    });
    drawMatchMap(filteredData);
    drawMatchChart(filteredData);
    drawBarChart(filteredData);
    const selectedGameData = playerData.filter(
      (player) => player.Date === "2018-05-13"
    );
    drawStarPlot(selectedGameData);
  } catch (error) {
    // 데이터 로드 또는 전처리 과정에서 오류가 발생한 경우 처리합니다.
    console.log("오류가 발생했습니다:", error);
  }
}

// loadData 함수를 호출하여 데이터를 로드하고 전처리합니다.
loadData();

const drawMatchMap = (data) => {
  // 네모로 표시할 컨테이너 요소 선택
  const container = document.getElementById("main-chart"); // 실제로 표시할 컨테이너 요소의 ID에 맞게 선택하세요.
  // 각 경기 결과에 대해 네모 요소 생성 및 스타일 적용

  Object.keys(data).forEach((season) => {
    let boxCount = 0;

    const seasonContainer = document.createElement("div");
    seasonContainer.classList.add("season-container");

    // 시즌 명 추가
    const seasonName = document.createElement("div");
    seasonName.classList.add("season-name");
    seasonName.textContent = season;
    seasonContainer.appendChild(seasonName);

    Object.values(data[season]).forEach((d) => {
      const square = document.createElement("div");
      square.classList.add("square");

      // 경기 결과에 따라 배경색 변경
      if (d.result === "W") {
        square.style.backgroundColor = "lime";
      } else if (d.result === "D") {
        square.style.backgroundColor = "gray";
      } else if (d.result === "L") {
        square.style.backgroundColor = "red";
      }

      // 네모 요소를 시즌 컨테이너에 추가
      seasonContainer.appendChild(square);

      boxCount++;

      // 10개의 박스마다 줄 바꿈
      if (boxCount % 15 === 0) {
        const lineBreak = document.createElement("br");
        seasonContainer.appendChild(lineBreak);
      }
    });

    // 시즌 컨테이너를 메인 컨테이너에 추가
    container.appendChild(seasonContainer);
  });
};

const drawMatchChart = (data) => {
  const seasonData = Object.values(data);
  const subgroups = ["W", "D", "L"]; // 승, 무, 패

  const margin = {top: 10, right: 30, bottom: 20, left: 50};
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#graph-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const groups = seasonData.map((season, index) => Object.keys(data)[index]);

  const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height - 30})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  const y = d3
    .scaleLinear()
    .domain([0, 38])
    .range([height - 30, 20]);
  svg.append("g").call(d3.axisLeft(y));

  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  const dataNormalized = [];
  seasonData.map((d, index) => {
    const group = Object.keys(data)[index];
    let W = 0;
    let D = 0;
    let L = 0;
    d.forEach((match) => {
      if (match.result == "W") {
        W++;
      } else if (match.result == "D") {
        D++;
      } else {
        L++;
      }
    });
    dataNormalized.push({group: group, W: W, D: D, L: L});
  });
  // stack 메서드를 사용하여 데이터 스택 구성
  var stackedData = d3.stack().keys(subgroups)(dataNormalized);

  svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("x", (d, i) => x(groups[i]))
    .attr("y", (d) => y(d[1]))
    .attr("height", (d) => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());
};

const drawBarChart = (data) => {
  const seasonData = Object.values(data);
  const subgroups = ["W", "D", "L"]; // 승, 무, 패

  const dataNormalized = [];
  seasonData.map((d, index) => {
    const group = Object.keys(data)[index];
    let W = 0;
    let D = 0;
    let L = 0;
    d.forEach((match) => {
      if (match.result == "W") {
        W++;
      } else if (match.result == "D") {
        D++;
      } else {
        L++;
      }
    });
    dataNormalized.push({group: group, W: W, D: D, L: L});
  });
  const maxGames = d3.max(dataNormalized, (d) => Math.max(d.W, d.D, d.L));

  const margin = {top: 10, right: 30, bottom: 20, left: 50};
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#graph-container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const groups = seasonData.map((season, index) => Object.keys(data)[index]);

  const x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, maxGames]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  var xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05]);

  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  svg
    .append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(dataNormalized) // 수정: data를 dataNormalized로 변경
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + x(d.group) + ",0)";
    })
    .selectAll("rect")
    .data(function (d) {
      return subgroups.map(function (key) {
        return {key: key, value: d[key]};
      });
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xSubgroup(d.key);
    })
    .attr("y", function (d) {
      return y(d.value);
    })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function (d) {
      return height - y(d.value);
    })
    .attr("fill", function (d) {
      return color(d.key);
    });
};

const drawStarPlot = (data) => {
  const playerData = Object.values(data);

  const width = 500; // 그래프의 가로 크기
  const height = 500; // 그래프의 세로 크기

  const attributes = ["Passes", "PassesA", "Carries", "Min", "Touches"]; // 선택한 속성 목록

  const numAttributes = attributes.length; // 속성 개수

  // SVG 요소 생성
  const svg = d3
    .select("#player-chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // 스케일 설정
  const radius = Math.min(width, height) / 2 - 50; // 반지름

  const angleScale = d3
    .scalePoint()
    .range([0, 2 * Math.PI])
    .domain(attributes);

  const valueScale = d3
    .scaleLinear()
    .range([0, radius])
    .domain([
      0,
      d3.max(playerData, (player) =>
        d3.max(attributes, (attr) => player[attr])
      ),
    ]);

  // 극좌표계 생성
  const line = d3
    .lineRadial()
    .angle((d) => angleScale(d))
    .radius((d) => valueScale(d))
    .curve(d3.curveLinearClosed);

  // 그래프 그리기
  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  g.selectAll(".player-path")
    .data(playerData)
    .enter()
    .append("path")
    .attr("class", "player-path")
    .attr("d", (d) => line(attributes.map((attr) => +d[attr])))
    .attr("fill", "none")
    .attr("stroke", "steelblue");

  // 축 그리기
  const axis = g
    .selectAll(".axis")
    .data(attributes)
    .enter()
    .append("g")
    .attr("class", "axis");

  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr(
      "x2",
      (d) => valueScale(d.axis) * Math.cos(angleScale(d.axis) - Math.PI / 2)
    )
    .attr(
      "y2",
      (d) => valueScale(d.axis) * Math.sin(angleScale(d.axis) - Math.PI / 2)
    )
    .attr("stroke", "gray");

  axis
    .append("text")
    .attr(
      "x",
      (d) =>
        valueScale(attributes[numAttributes - 1]) *
          Math.cos(angleScale(d) - Math.PI / 2) +
        10
    )
    .attr(
      "y",
      (d) =>
        valueScale(attributes[numAttributes - 1]) *
          Math.sin(angleScale(d) - Math.PI / 2) +
        10
    )
    .text((d) => d);

  // 축 값 표시
  playerData.forEach((player) => {
    g.selectAll(".player-value")
      .data(attributes)
      .enter()
      .append("circle")
      .attr("class", "player-value")
      .attr("r", 3)
      .attr(
        "cx",
        (d) => valueScale(player[d]) * Math.cos(angleScale(d) - Math.PI / 2)
      )
      .attr(
        "cy",
        (d) => valueScale(player[d]) * Math.sin(angleScale(d) - Math.PI / 2)
      )
      .attr("fill", "steelblue");
  });
};
