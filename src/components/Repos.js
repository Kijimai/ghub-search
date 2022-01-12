import React from "react"
import styled from "styled-components"
import { GithubContext, useGlobalContext } from "../context/context"
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"

const Repos = () => {
  const { repos } = useGlobalContext()
  let languages = repos.reduce((total, item) => {
    const { language } = item
    if (!language) return total
    //if the language does not yet exist, create that key and instantiate with 1
    if (!total[language]) {
      total[language] = { label: language, value: 1 }
    } else {
      //increase the count for that particular language
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      }
    }
    return total
  }, {})

  //Convert the languages variable from an object to an array and reorder from highest to lowest count
  languages = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  console.log(languages)

  const chartData = [
    {
      label: "HTML",
      value: "13",
      color: "#F28C25",
    },
    {
      label: "CSS",
      value: "33",
      color: "#1CAAD1",
    },
    {
      label: "Javascript",
      value: "80",
      color: "#F7E654",
    },
  ]

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartData} /> */}
        <Pie3D data={languages} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
