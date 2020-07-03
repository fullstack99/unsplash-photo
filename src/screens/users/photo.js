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

function PhotoScreen({route, navigation}) {
  const [loading, SetLoading] = useState(true);
  const [loadError, SetloadError] = useState(false);
  const [visible, SetVisible] = useState(false);
  const [photo, SetPhoto] = useState('');

  const {photos} = route.params;
  let images = [];
  images = photos.map((v) => ({uri: v.urls.regular}));

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => preViewPhoto(item)}>
        <View style={styles.userInfo}>
          <FastImage
            style={styles.avatar}
            onLoadEnd={() => SetLoading(false)}
            onError={() => SetloadError(true)}
            source={{uri: item.urls.thumb}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </TouchableOpacity>
    );
  };

  preViewPhoto = (item) => {
    navigation.navigate('Preview', {photo: item});
    // SetVisible(true);
    // SetPhoto(item.urls.full);
  };

  getGalleryImages = () => {
    images = photos.map((v) => ({uri: v.urls.regular}));
    return images;
  };

  return (
    <View>
      <FlatList
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={2}
        data={photos}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={
          <View>
            <Text>No results</Text>
          </View>
        }
      />
      <Modal
        animationType={'slide'}
        visible={visible}
        transparent={true}
        onRequestClose={() => SetVisible(false)}
        onDismiss={() => SetVisible(false)}>
        <ImageViewer
          imageUrls={images}
          onSwipeDown={() => {
            console.log('onSwipeDown');
          }}
          renderHeader={() => (
            <TouchableOpacity
              style={{zIndex: 9999}}
              onPress={() => {
                SetVisible(false);
              }}>
              <View style={{paddingTop: 40, paddingLeft: 20}}>
                <Text style={{color: '#ffffff'}}>Back</Text>
              </View>
            </TouchableOpacity>
          )}
          onMove={(data) => console.log(data)}
          enableSwipeDown={true}
          loadingRender={() => (
            <View>
              <Text style={{color: '#ffffff'}}>Loading</Text>
            </View>
          )}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
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
