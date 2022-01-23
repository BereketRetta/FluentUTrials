import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Close from './assets/Close.svg';
import LineBetween from './assets/LineBetween.svg';
import MoreHorizontal from './assets/more-horizontal.svg';
import MainImage from './assets/ImageMain.svg';
import Linek from './assets/Line56.svg';
import Mic from './assets/mic.svg';
import Speaker from './assets/speaker.svg';
import Video from 'react-native-video';
import MainVids from './assets/Feedback_Drills_Correct.mp4';
import Voice from 'react-native-voice';
import LottieView from 'lottie-react-native';

interface IProps {}

interface IState {
  playOrPause?: string;
  recognized?: string;
  started?: string;
  results?: string[];
  first?: boolean;
  checking?: boolean;
  speak?: boolean;
  success?: boolean;
  paused?: boolean;
  second?: boolean;
}

export default class VoiceNative extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      first: false,
      second: false,
      speak: false,
      success: false,
      paused: false,
      checking: true,
    };

    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  async onSpeakEnds() {
    this.setState({
      speak: false,
      success: true,
      paused: false,
    });
    await Voice.stop();
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
      paused: true,
      speak: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    console.log('This.state,,,', this.state);
    setTimeout(() => {
      this.state.checking === true ? 
      this.setState({
        first: true,
        checking: false
      }) : null
    }, 9000);
    setTimeout(() => {
      this.setState({
        first: false,
        second: true,
        paused: true,
      });
    }, 13000);
    return (
      <ImageBackground
        source={
          this.state.success
            ? require('./assets/Rectangle70.png')
            : this.state.speak
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
              paused={this.state.paused} // make it start
              // paused={true} // make it start
              style={styles.backgroundVideo} // any style you want
              repeat={true} // make it a loop
            />
          </View>
          <LottieView
            source={require('./Recording.json')}
            style={{width: 50, height: 20}}
            autoPlay
            loop
          />
          {/* {this.state.speak ? : null} */}
          {this.state.first ? (
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
                    estupendo trabajo
                  </Text>
                  <Text
                    style={{textAlign: 'center', color: '#fff', opacity: 0.5}}>
                    Great job!
                  </Text>
                </View>
              </View>
            </View>
          ) : null}
          {this.state.first ? null : this.state.second ? (
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
                {this.state.success ? (
                  <View>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        borderWidth: 1,
                        alignSelf: 'center',
                        marginTop: -30,
                        backgroundColor: this.state.results[0] === 'Great job' ?  '#05AA1F' : 'red',
                        borderColor: this.state.results[0] === 'Great job' ?  '#05AA1F' : 'red',
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
                        {this.state.results[0] === 'Great job' ?  'A+' : 'C-'}
                      </Text>
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: 20,
                        fontSize: 14,
                        color: this.state.results[0] === 'Great job' ? '#05AA1F' : 'red',
                        fontWeight: '500',
                        // position: 'absolute'
                      }}>
                     {this.state.results[0] === 'Great job' ? 'WELL DONE!' : 'TRY AGAIN'}
                    </Text>
                  </View>
                ) : null}
                {this.state.success ? (
                  <View style={{marginTop: this.state.success ? 5 : 25}}>
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
                        {this.state.results}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={{marginTop: this.state.success ? 5 : 25}}>
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
                        estupendo trabajo
                      </Text>
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#2b2b2b',
                        opacity: 0.5,
                        marginTop: 5,
                      }}>
                      Great job
                    </Text>
                  </View>
                )}

                {this.state.success ? (
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 17,
                      // borderWidth: 1,
                      alignSelf: 'center',
                      marginTop: this.state.success ? 10 : 20,
                      // backgroundColor: '#3038FF',
                      // borderColor: '#3038FF',
                    }}></View>
                ) : (
                  <TouchableOpacity
                    onPress={
                      this.state.speak
                        ? this.onSpeakEnds.bind(this)
                        : this._startRecognition.bind(this)
                    }>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 17,
                        borderWidth: 1,
                        alignSelf: 'center',
                        marginTop: this.state.success ? 10 : 20,
                        backgroundColor: '#3038FF',
                        borderColor: '#3038FF',
                        zIndex: 9090909,
                      }}>
                      <View style={{alignSelf: 'center', marginTop: 13}}>
                        <Mic />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {this.state.success ? (
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
                          marginTop: 8,
                        }}>
                        Continue
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : this.state.speak ? (
                  <View
                    style={{
                      // width: 162.93,
                      alignSelf: 'center',
                      // height: 42.74,
                      // borderWidth: 1,
                      borderRadius: 15,
                      position: 'absolute',
                      bottom: 30,
                      // backgroundColor: '#1E1F27',
                    }}>
                    <LottieView
                      source={require('./Recording.json')}
                      style={{width: 900, height: 200}}
                      autoPlay
                      loop
                    />
                  </View>
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
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
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

AppRegistry.registerComponent('VoiceNative', () => VoiceNative);
