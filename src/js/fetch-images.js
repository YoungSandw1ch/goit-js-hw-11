import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '25718154-32288cdf6837b8e29b2d2c309';
const SEARCH_DETAILS =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export default async function fetchImages(query, page) {
  const URL = `${BASE_URL}/?key=${KEY}&q=${query}${SEARCH_DETAILS}&page=${page}`;
  try {
    return await axios.get(URL);
  } catch (error) {
    console.log('Error status: ', error.status);
  }
}
