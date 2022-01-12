import React from "react"
import ReactFC from "react-fusioncharts"
import FusionCharts from "fusioncharts"
import Chart from "fusioncharts/fusioncharts.charts"
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy"

ReactFC.fcRoot(FusionCharts, Chart, CandyTheme)

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "languages",
        theme: "candy",
        decimals: 0,
        pieRadius: "50%",
        paletteColors: "EBF434, 24DEE7, F1A01B",
      },
      // Chart Data
      data,
    },
  }

  return <ReactFC {...chartConfigs} />
}

export default ChartComponent
