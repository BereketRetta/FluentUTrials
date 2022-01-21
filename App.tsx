import React, {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Close from './assets/Close.svg';
import LineBetween from './assets/LineBetween.svg';
import MoreHorizontal from './assets/more-horizontal.svg';
import MainImage from './assets/ImageMain.svg';
import Linek from './assets/Line56.svg';
import Mic from './assets/mic.svg';
import Speaker from './assets/speaker.svg';
import Video from 'react-native-video';
import MainVids from './assets/Feedback_Drills_Correct.mp4';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const App: () => ReactNode = () => {
  const [first, setfirst] = useState(true);
  const [speak, setSpeak] = useState(false);
  const [second, setSecond] = useState(false);
  const [success, setsuccess] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setTimeout(() => {
      setfirst(false);
      setSecond(true);
    }, 5000);
    request(PERMISSIONS.IOS.MICROPHONE).then((res) => console.log("REs,,,",res))
    check(PERMISSIONS.IOS.MICROPHONE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.MICROPHONE).then((res) => console.log("REs,,,",res))
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …
      });
  });

  const onSpeakPress = () => {
    setSpeak(true);
    setTimeout(() => {
      setsuccess(true);
    }, 5000);
  };

  return (
    <ImageBackground
      source={
        success
          ? require('./assets/Rectangle70.png')
          : speak
          ? require('./assets/image5.png')
          : require('./assets/Image32.png')
      }>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 40,
            marginTop: 70,
          }}>
          <Close width={14} height={14} />
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
            <Linek style={{maginTop: 10}} />
            <LineBetween width={90} style={{maginTop: 10}} />
          </View>
          <MoreHorizontal width={14} height={14} />
        </View>
        <View
          style={{
            // backgroundColor: '#2b2b2b',
            width: 335,
            height: 103,
            borderRadius: 12,
            // borderWidth: 1,
            alignSelf: 'center',
            marginTop: 20,
          }}></View>
        <View style={{marginTop: -18}}>
          <View style={{opacity: 0}}>
            <MainImage />
          </View>
          <Video
            source={MainVids} // the video file
            paused={true} // make it start
            style={styles.backgroundVideo} // any style you want
            repeat={true} // make it a loop
          />
        </View>
        {first ? (
          <View>
            <View
              style={{
                backgroundColor: '#2b2b2b',
                width: 335,
                height: 103,
                borderRadius: 12,
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: 20,
                position: 'absolute',
                top: -760,
              }}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 20,
                    marginVertical: 5,
                  }}>
                  Hola, ¿cómo están tú y tu familia estos días?
                </Text>
                <Text
                  style={{textAlign: 'center', color: '#fff', opacity: 0.5}}>
                  Hi, how are you and your family these days?
                </Text>
              </View>
            </View>
          </View>
        ) : null}
        {first ? null : (
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                borderColor: '#fff',
                width: 335,
                height: 120,
                borderRadius: 12,
                borderWidth: 1,
                alignSelf: 'center',
                marginTop: -250,
                position: 'absolute',
              }}>
              {success ? (
                <View>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      borderWidth: 1,
                      alignSelf: 'center',
                      marginTop: -30,
                      backgroundColor: '#05AA1F',
                      borderColor: '#05AA1F',
                      position: 'absolute',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 6,
                        fontSize: 30,
                        color: '#fff',
                        fontWeight: '500',
                      }}>
                      A+
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: 20,
                      fontSize: 14,
                      color: '#05AA1F',
                      fontWeight: '500',
                      // position: 'absolute'
                    }}>
                    WELL DONE!
                  </Text>
                </View>
              ) : null}
              {success ? (
                <View style={{marginTop: success ? 5 : 25}}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{marginTop: 5, marginHorizontal: 8}}></View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#05AA1F',
                        marginHorizontal: 5,
                        fontSize: 20,
                        borderColor: 'rgb(158, 233, 169)',
                        backgroundColor: 'rgb(158, 233, 169)',
                        fontWeight: '600',
                        borderWidth: 1,
                        paddingHorizontal: 5,
                      }}>
                      La estamos haciendo muy bien.
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{marginTop: success ? 5 : 25}}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <View style={{marginTop: 5, marginHorizontal: 8}}>
                      <Speaker />
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#2b2b2b',
                        marginHorizontal: 5,
                        fontSize: 20,
                      }}>
                      La estamos haciendo muy bien.
                    </Text>
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#2b2b2b',
                      opacity: 0.5,
                      marginTop: 5,
                    }}>
                    We are doing very well
                  </Text>
                </View>
              )}

              {success ? (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 17,
                    // borderWidth: 1,
                    alignSelf: 'center',
                    marginTop: success ? 10 : 20,
                    // backgroundColor: '#3038FF',
                    // borderColor: '#3038FF',
                  }}></View>
              ) : (
                <TouchableOpacity onPress={onSpeakPress}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 17,
                      borderWidth: 1,
                      alignSelf: 'center',
                      marginTop: success ? 10 : 20,
                      backgroundColor: '#3038FF',
                      borderColor: '#3038FF',
                    }}>
                    <View style={{alignSelf: 'center', marginTop: 13}}>
                      <Mic />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              {success ? (
                <TouchableOpacity>
                  <View
                    style={{
                      width: 162.93,
                      alignSelf: 'center',
                      height: 42.74,
                      borderWidth: 1,
                      borderRadius: 15,
                      backgroundColor: '#1E1F27',
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        alignSelf: 'center',
                        marginTop: 4,
                      }}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: 162.93,
                    alignSelf: 'center',
                    height: 42.74,
                    // borderWidth: 1,
                    borderRadius: 15,
                    // backgroundColor: '#1E1F27',
                  }}></View>
              )}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {},
  sectionContainer: {
    backgroundColor: '#2b2b2b',
    width: 335,
    height: 103,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  linearGradient: {
    marginTop: 90,
    height: '100%',
    width: '100%',
  },
  backgroundVideo: {
    position: 'absolute',
    top: -50,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.8,
  },
});

export default App;
