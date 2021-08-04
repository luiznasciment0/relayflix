import React from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

import { SearchProvider } from 'context/searchContext'
// import FormSearchLayout from './components/FormSearchLayout'
import SignUpForm from './components/SignUpForm'
import RelayEnvironment from './relay/RelayEnvironment'

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <SearchProvider>
        {/* <FormSearchLayout /> */}
        <SignUpForm />
      </SearchProvider>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
