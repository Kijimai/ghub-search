import React, { useState, useEffect, useContext } from "react"
import mockUser from "./mockData.js/mockUser"
import mockRepos from "./mockData.js/mockRepos"
import mockFollowers from "./mockData.js/mockFollowers"
import axios from "axios"

const rootUrl = "https://api.github.com"

//Gives GithubContext access to Provider and Consumer methods
const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  const [requests, setRequests] = useState(0)
  const [loading, isLoading] = useState(false)
  const [error, setError] = useState({
    show: false,
    message: "",
  })

  const toggleError = (show = false, message = "") => {
    setError({ show, message })
  }

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        remaining = 0
        setRequests(remaining)
        console.log(requests)
        if (remaining === 0) {
          // throw an error
          toggleError(true, "Sorry, you have exceeded your hourly rate limit.")
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(checkRequests, [requests])

  return (
    <GithubContext.Provider
      value={{ repos, githubUser, followers, requests, error }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubProvider, useGlobalContext }
