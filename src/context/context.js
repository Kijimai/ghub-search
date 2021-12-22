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

  return (
    <GithubContext.Provider value={{ repos, githubUser, followers }}>
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(GithubContext)
}

export { GithubContext, GithubProvider, useGlobalContext }
