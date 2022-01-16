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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    show: false,
    message: "",
  })

  const toggleError = (show = false, message = "") => {
    setError({ show, message })
  }

  const searchGithubUser = async (user) => {
    setIsLoading(true)
    toggleError()
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) => {
      console.log(err)
    })

    if (response) {
      setGithubUser(response.data)
      const {repos_url, followers_url} = response.data
      //get user repository data
      axios(`${repos_url}?per_page=100`).then(({data}) => {
        console.log(data)
        setRepos(data)
      })
      //get use followers data
      axios(`${followers_url}?per_page=100`).then(({data}) => {
        console.log(data)
        setFollowers(data)
      })

    } else {
      toggleError(true, "There is no user with that username.")
    }

    checkRequests()
    setIsLoading(false)
  }

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        // remaining = 0 TESTING PURPOSES
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
      value={{
        repos,
        githubUser,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubProvider, useGlobalContext }
