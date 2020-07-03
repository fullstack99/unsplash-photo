import React, {Component} from 'react';
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
  TextInput,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';

import FloatingLabelInput from '../../components/FloatingLabelInput';
import {getUsersByKeyword} from '../../utils/unsplash';
import {userActions} from '../../redux/actions';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loading: false,
      total_pages: 1,
      current_page: 1,
    };
  }

  componentWillMount() {
    this.props.setUsers([]);
  }

  searchUsers = _.debounce(async () => {
    const {username, current_page} = this.state;
    if (username.length > 2) {
      const {fetchedUsers, total_pages} = await getUsersByKeyword(
        username.toLowerCase(),
        current_page,
      );
      console.log(fetchedUsers);
      this.props.setUsers(fetchedUsers);
      this.setState({total_pages});
    }
  }, 1000);

  _renderUserItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.goDetailPage(item)}>
        <View style={styles.userInfo}>
          <FastImage
            style={styles.avatar}
            onLoadEnd={() => this.setState({loading: false})}
            onError={() => this.setState({loadError: true})}
            source={{uri: item.profile_image.large}}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  goDetailPage = (item) => {
    this.props.navigation.navigate('Photo', {photos: item.photos});
  };

  nextPage = async () => {
    const {users} = this.props;
    const {current_page, total_pages, username} = this.state;

    if (current_page > total_pages) return;
    const {fetchedUsers} = await getUsersByKeyword(
      username.toLowerCase(),
      current_page + 1,
    );

    this.props.setUsers(users.concat(fetchedUsers));
    this.setState({current_page: current_page + 1});
  };

  render() {
    const {username, current_page, total_pages} = this.state;
    const {users} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <FloatingLabelInput
            label="User Name"
            value={username}
            onChangeText={(username) => {
              this.setState({username});
              this.searchUsers(username);
            }}
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          />
        </View>

        <FlatList
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={2}
          data={users}
          renderItem={this._renderUserItem}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={
            <View>
              <Text>No results</Text>
            </View>
          }
          ListFooterComponent={
            current_page > total_pages ? (
              <View>
                <Text>No more results</Text>
              </View>
            ) : null
          }
          onEndReached={() => this.nextPage()}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
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

const mapStateToProps = (state) => ({
  users: state.userReducer.users,
});

const mapDispatchToProps = {
  setUsers: userActions.setUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
