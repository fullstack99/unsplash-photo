import React, {Component} from 'react';
import {View, StatusBar, TextInput, Animated, Dimensions} from 'react-native';
var {width, height} = Dimensions.get('window');

class FloatingLabelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const {label, ...props} = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [25, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#767676', '#767676'],
      }),
    };
    let isOvered = false;
    if (
      this.props.value &&
      this.props.value.length > 14 &&
      this.props.type == 'cardName'
    ) {
      isOvered = true;
    }
    return (
      <View style={{paddingTop: 18, marginTop: 15}}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={{
            height: 52,
            fontSize: 20,
            color: '#000',
            borderBottomWidth: 1,
            borderBottomColor: '#767676',
            width: width * 0.9,
            paddingLeft: 0,
            paddingBottom: 0,
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}

export default FloatingLabelInput;
