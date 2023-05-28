import drawBarChart from "./BarChart.js";
import drawLineChart from "./LineChart.js";
import createCheckbox from "./Checkbox.js";

document.addEventListener("DOMContentLoaded", async function () {
  const radios = document.querySelectorAll('input[name="chart"]');
  const chartDiv = document.getElementById("chart");
  const legendDiv = document.getElementById("legend");
  let currentChart = null;
  let barData = null;
  let lineData = null;
  let filteredBarData = null;
  let filteredLineData = null;

  try {
    const data = await d3.csv("data/owid-covid-data.csv");
    data.map(function (el) {
      el["percent_fully"] = el["people_fully_vaccinated"] / el["population"];
      el["total_percent"] = el["people_vaccinated"] / el["population"];
      el["percent_partly"] = el["total_percent"] - el["percent_fully"];
      el["checked"] = false;
      el["date"] = d3.timeParse("%Y-%m-%d")(el["date"]);
    });
    const share = data.filter(
      (el) => el.people_vaccinated & el.people_fully_vaccinated
    );

    lineData = data.filter((el) => el.total_cases);

    const getRecent = (arr) => {
      const res = [];
      const map = {};

      arr.forEach((el) => {
        //store the index
        if (!(el["location"] in map)) {
          map[el["location"]] = res.push(el) - 1;
          return;
        }
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
    barData = vaccinated.filter((el) => el.total_percent <= 1);

    const checkboxContainer = document.createElement("div");
    checkboxContainer.style.overflowY = "scroll";
    checkboxContainer.style.maxHeight = "200px";

    barData.forEach((location) => {
      createCheckbox(location, checkboxContainer);
    });

    filteredBarData = barData.filter((el) => el.checked);
    filteredLineData = lineData.filter((el) => el.checked);

    // 체크박스 상태 변경 이벤트 핸들러
    checkboxContainer.addEventListener("change", function (event) {
      const checkedLocations = Array.from(
        checkboxContainer.querySelectorAll('input[name="location"]:checked')
      ).map((checkbox) => checkbox.value);

      // 차트 그리기
      chartDiv.innerHTML = "";
      legendDiv.innerHTML = "";
      barData.forEach((el) => {
        el.checked = checkedLocations.includes(el.location);
      });

      filteredBarData = barData.filter((el) => el.checked);
      lineData.forEach((el) => {
        el.checked = checkedLocations.includes(el.location);
      });

      filteredLineData = lineData.filter((el) => el.checked);
      if (currentChart === "BAR") {
        // document.getElementById("slider").style.display = "none";
        drawBarChart(filteredBarData);
      } else if (currentChart === "LINE") {
        // document.getElementById("slider").style.display = "";
        drawLineChart(filteredLineData);
      }
    });
    document.body.insertBefore(checkboxContainer, legendDiv);
  } catch (error) {
    console.error("Error loading the data", error);
  }

  // 라디오 버튼 체크 이벤트 핸들러
  function handleRadioChange() {
    currentChart = document.querySelector('input[name="chart"]:checked').value;

    chartDiv.innerHTML = "";
    legendDiv.innerHTML = "";

    if (currentChart === "BAR") {
      if (filteredBarData) {
        drawBarChart(filteredBarData);
      } else {
        console.error("No filtered data");
      }
    } else if (currentChart === "LINE") {
      if (filteredLineData) {
        drawLineChart(filteredLineData);
      } else {
        console.error("No filtered data");
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
