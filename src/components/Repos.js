import React from "react"
import styled from "styled-components"
import { useGlobalContext } from "../context/context"
import { Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts"

const Repos = () => {
  const { repos } = useGlobalContext()

  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count: stars } = item
    if (!language) return total
    //if the language does not yet exist, create that key and instantiate with 1
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stars }
    } else {
      //increase the count for that particular language
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stars,
      }
    }
    return total
  }, {})

  // stars and forks

  //Convert the languages variable from an object to an array and reorder from highest to lowest count
  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5)
    .map((item) => {
      return { ...item, value: item.stars }
    })

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    { stars: {}, forks: {} }
  )

  // take the last 5 largest items of this array and reverse the order
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  //Dummy data
  // const chartData = [
  //   { label: "HTML", value: "25" },
  //   { label: "CSS", value: "32" },
  //   { label: "Javascript", value: "121" },
  // ]

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={languages} /> */}
        <Doughnut2D data={mostPopular} />
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Bar3D data={forks} />
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
