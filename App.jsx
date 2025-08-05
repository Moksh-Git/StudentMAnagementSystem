import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import { initDB } from './src/db/Database'

const App = () => {
  useEffect(()=>{
    initDB();
  },[])

  
  return (
   <MainNavigator/>
  )
}

export default App