import React from 'react'
import {Text,LogBox} from 'react-native'
import Providers from './navigation'

const App = () =>{
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return (
    <Providers />
  );
}

export default App;

