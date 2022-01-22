import React from 'react'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'

const ClassicPostLoader = ({ size = 100 }) => {
  return (
    <View>
      <LottieView
        source={require('./Recording.json')}
        style={{ width: size, height: size }}
        autoPlay
        loop
      />
    </View>
  )
}
export default ClassicPostLoader
