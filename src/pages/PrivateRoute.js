import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const PrivateRoute = ({ children, ...rest }) => {
  // const isUser = false
  const { isAuthenticated, user } = useAuth0()
  //if the user is both authenticated and exists, then you can see the dashboard, otherwise login component renders
  const isUser = isAuthenticated && user
  
  return (
    <Route
      {...rest}
      render={() => {
        // If the user exists or is logged in, render the children, otherwise render a redirect component back to login
        return isUser ? children : <Redirect to="/login"></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
