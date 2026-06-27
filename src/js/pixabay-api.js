import axios from 'axios';

const API_KEY = '56476616-0d0640f868639d933d3cc2b11';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: '15',
  });

  const response = await axios.get(`${BASE_URL}?${searchParams}`);
  return response.data;
}