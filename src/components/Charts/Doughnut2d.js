import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy"

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, CandyTheme)

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

const Doughnut2D = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars per language",
        decimals: 0,
        doughnutRadius: "45%",
        showPercentValues: 0,
        theme: 'candy'
      },
      // Chart Data
      data,
    },
  }

  return <ReactFC {...chartConfigs} />
}

export default Doughnut2D
