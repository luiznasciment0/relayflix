import React from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'

import { SearchProvider } from 'context/searchContext'
import Layout from './components/Layout'
import RelayEnvironment from './relay/RelayEnvironment'

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <SearchProvider>
        <Layout />
      </SearchProvider>
    </RelayEnvironmentProvider>
  )
}

export default AppRoot
