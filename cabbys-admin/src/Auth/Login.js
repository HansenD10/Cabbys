import React from 'react'
import { Redirect } from 'react-router-dom'
import Lock from './Lock'
import isAuthenticated from './isAuthenticated'
import '../Styles/Login.css'

const Login = (props) => (
  isAuthenticated() ? (
    <Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }} /> 
  ) : (
    <Lock location={props.location} />
  )
)

export default Login