// Import all variables
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

// declare types of props 

interface IProps {}

// declare types of state 
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
    // Define all the states
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

    // Binding this to the voice recognition package
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }


  componentWillUnmount() {
    // initialize all the listeners for the voice recognition
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    // invocked when the speech recognition start
    this.setState({
      started: '√',
    });
  }

  onSpeechRecognized(e) {
    // invoked when the voice is recognised
    this.setState({
      recognized: 'yes',
    });
  }

  onSpeechResults(e) {
     // the speech is stored on the results array we defined on the state
    this.setState({
      results: e.value,
    });
  }

  async onSpeakEnds() {
    // This is invoked when the speech ends
    this.setState({
      speak: false,
      success: true,
      paused: false,
    });
    await Voice.stop();
  }

  async _startRecognition(e) {
    // This function is invoked when the mic button is pressed to start the speech recognition
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
    setTimeout(() => {
      this.state.checking === true
        ? this.setState({
            first: true,
            checking: false,
          })
        : null;
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
          <View style={styles.mianConatiner}>
            <Close width={14} height={14} />
            <View style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
              <Linek style={{maginTop: 10}} />
              <LineBetween width={90} style={{maginTop: 10}} />
            </View>
            <MoreHorizontal width={14} height={14} />
          </View>
          <View style={styles.contain}></View>
          <View style={{marginTop: -18}}>
            <View style={{opacity: 0}}>
              <MainImage />
            </View>
            <Video
              source={MainVids} // the video file
              // paused={this.state.paused} // make it start
              paused={true} // make it start
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
              <View style={styles.estupeContainer}>
                <View>
                  <Text style={styles.estupendo}>estupendo trabajo</Text>
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
              <View style={styles.firstContainer}>
                {this.state.success ? (
                  <View>
                    <View
                      style={[
                        {
                          backgroundColor:
                            this.state.results[0] === 'Great job'
                              ? '#05AA1F'
                              : 'red',
                          borderColor:
                            this.state.results[0] === 'Great job'
                              ? '#05AA1F'
                              : 'red',
                        },
                        styles.AplusContainer,
                      ]}>
                      <Text style={styles.Aplus}>
                        {this.state.results[0] === 'Great job' ? 'A+' : 'C-'}
                      </Text>
                    </View>
                    <Text
                      style={[
                        {
                          color:
                            this.state.results[0] === 'Great job'
                              ? '#05AA1F'
                              : 'red',
                        },
                        styles.welldone,
                      ]}>
                      {this.state.results[0] === 'Great job'
                        ? 'WELL DONE!'
                        : 'TRY AGAIN'}
                    </Text>
                  </View>
                ) : null}
                {this.state.success ? (
                  <View style={{marginTop: this.state.success ? 5 : 25}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View style={{marginTop: 5, marginHorizontal: 8}}></View>
                      <Text style={styles.results}>{this.state.results}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={{marginTop: this.state.success ? 5 : 25}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <View style={{marginTop: 5, marginHorizontal: 8}}>
                        <Speaker />
                      </View>
                      <Text style={styles.greatJobSpanish}>
                        estupendo trabajo
                      </Text>
                    </View>
                    <Text style={styles.greatJob}>Great job</Text>
                  </View>
                )}

                {this.state.success ? (
                  <View
                    style={[
                      styles.micBorder,
                      {
                        marginTop: this.state.success ? 10 : 20,
                      },
                    ]}></View>
                ) : (
                  <TouchableOpacity
                    onPress={
                      this.state.speak
                        ? this.onSpeakEnds.bind(this)
                        : this._startRecognition.bind(this)
                    }>
                    <View
                      style={[
                        styles.micContainer,
                        {marginTop: this.state.success ? 10 : 20},
                      ]}>
                      <View style={{alignSelf: 'center', marginTop: 13}}>
                        <Mic />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                {this.state.success ? (
                  <TouchableOpacity>
                    <View style={styles.continueContainer}>
                      <Text style={styles.continue}>Continue</Text>
                    </View>
                  </TouchableOpacity>
                ) : this.state.speak ? (
                  <View style={styles.animations}>
                    <LottieView
                      source={require('./Recording.json')}
                      style={{width: 900, height: 200}}
                      autoPlay
                      loop
                    />
                  </View>
                ) : (
                  <View style={styles.border}></View>
                )}
              </View>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    );
  }
}
// The styles are all here
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
  border: {
    width: 162.93,
    alignSelf: 'center',
    height: 42.74,
    borderRadius: 15,
  },
  animations: {
    alignSelf: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 30,
  },
  continue: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 8,
  },
  continueContainer: {
    width: 162.93,
    alignSelf: 'center',
    height: 42.74,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#1E1F27',
  },
  micContainer: {
    width: 50,
    height: 50,
    borderRadius: 17,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: '#3038FF',
    borderColor: '#3038FF',
    zIndex: 9090909,
  },
  micBorder: {
    width: 50,
    height: 50,
    borderRadius: 17,
    alignSelf: 'center',
  },
  greatJob: {
    textAlign: 'center',
    color: '#2b2b2b',
    opacity: 0.5,
    marginTop: 5,
  },
  greatJobSpanish: {
    textAlign: 'center',
    color: '#2b2b2b',
    marginHorizontal: 5,
    fontSize: 20,
  },
  results: {
    textAlign: 'center',
    color: '#05AA1F',
    marginHorizontal: 5,
    fontSize: 20,
    borderColor: 'rgb(158, 233, 169)',
    backgroundColor: 'rgb(158, 233, 169)',
    fontWeight: '600',
    borderWidth: 1,
    paddingHorizontal: 5,
  },
  welldone: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  Aplus: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 30,
    color: '#fff',
    fontWeight: '500',
  },
  AplusContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: -30,
    position: 'absolute',
  },
  firstContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    width: 335,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: -250,
    position: 'absolute',
  },
  estupendo: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginVertical: 5,
  },
  estupeContainer: {
    backgroundColor: '#2b2b2b',
    width: 335,
    height: 103,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    position: 'absolute',
    top: -760,
  },
  contain: {
    width: 335,
    height: 103,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
  },
  mianConatiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 70,
  },
});

AppRegistry.registerComponent('VoiceNative', () => VoiceNative);
