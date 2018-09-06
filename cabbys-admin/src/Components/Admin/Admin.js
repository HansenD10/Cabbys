import React from 'react'
import isAuthenticated from '../../Auth/isAuthenticated';
import { Redirect } from 'react-router-dom'

const Admin = (props) => (
  isAuthenticated() ? (
    <div>
      <h2>You're signed in</h2>
    </div>
  ) : (
    <Redirect to='/admin/login' />
  )
)

export default Admin