import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
// Імпортуємо всі потрібні функції для роботи з інтерфейсом
import { 
  clearGallery, 
  updateGallery, 
  showLoader, 
  hideLoader 
} from './js/render-functions.js';

// ТУТ МАЄ БУТИ ТІЛЬКИ ФОРМА! 
// Видали звідси рядки з .gallery та .loader
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  
  const searchQuery = event.currentTarget.elements.query.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Search field cannot be empty!',
      position: 'topRight',
    });
    return;
  }

  // Викликаємо функції БЕЗ передачі будь-яких DOM-елементів з цього файлу
  clearGallery(); 
  showLoader();

  getImagesByQuery(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      // Передаємо ТІЛЬКИ чистий масив даних з бекенду (data.hits)
      updateGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong with the server fetching.',
        position: 'topRight',
      });
      console.error(error);
    })
    .finally(() => {
      // Функція сама знає, який лоадер їй потрібно сховати
      hideLoader();
    });

  event.currentTarget.reset();
}