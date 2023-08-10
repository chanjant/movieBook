window.addEventListener("load", function () {
  /**
   * Olivia: fetch anlaytics dashboard data
   */
  fetchData();
  async function fetchData() {
    const response = await fetch("./commentTrend");
    const json = await response.json();
    displayData(json);
  }

  //display the data in chart
  function displayData(jsondata) {
    let chart = new Chart(document.getElementById("chart"), {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Comment Trend",
            data: jsondata,
            showLine: true,
            lineTension: 0,
            borderColor: "rgb(100, 100, 255)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "D MMM yyyy",
              },
            },
          },
          y: {},
        },
      },
    });
  }
});
