import React, {Component, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  BackHandler,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width, height} = Dimensions.get('screen');

function PhotoScreen({route}) {
  const {photo} = route.params;

  return (
    <View style={styles.container}>
      <FastImage
        source={{uri: photo.urls.regular}}
        style={styles.img}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  img: {
    width: width,
    height: height,
  },
  userInfo: {
    alignItems: 'center',
    margin: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    alignItems: 'center',
  },
});

export default PhotoScreen;
