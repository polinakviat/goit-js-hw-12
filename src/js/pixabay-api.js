import axios from 'axios';

// Замість плейсхолдера вставляємо реальний рядок-ключ
const API_KEY = '45321984-abcdef1234567890987654321'; // Це приклад, сюди встав свій ключ
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return axios.get(`${BASE_URL}?${searchParams}`)
    .then(response => response.data);
}