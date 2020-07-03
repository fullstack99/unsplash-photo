import Unsplash, {toJson} from 'unsplash-js/native';

const APP_ID =
  'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5';
const APP_SECRET =
  'a5ab4ed2efdc772dca8d5636a26c0d897907df38cd92baa9067e57093d9596b5';
const APP_ACCESS_KEY =
  'aa2f3c3be8125f1fc86e3007153420c4e446c19b7b0c6d80a6257b281c9a0dc5';

const unsplash = new Unsplash({
  secret: APP_SECRET,
  accessKey: APP_ACCESS_KEY,
});

export const getUsersByKeyword = async (keyword, page) => {
  try {
    const data = await unsplash.search.users(keyword, page);
    const {_bodyInit} = data;
    const {results, total_pages} = JSON.parse(_bodyInit);
    return {fetchedUsers: results, total_pages};
  } catch (error) {
    console.error(error);
  }
};
