import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton 
} from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Глобальний стан пагінації
let currentQuery = '';
let currentPage = 1;
const perPage = 15;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

// --- ОБРОБКА ПЕРШОГО ПОШУКУ ---
async function handleSearch(event) {
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

  // Зберігаємо нове слово та скидаємо сторінку на початкову
  currentQuery = searchQuery;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton(); // Ховаємо кнопку перед новим запитом
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    // Перевіряємо, чи є взагалі сенс показувати кнопку (якщо результатів більше ніж 1 сторінка)
    if (data.totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    showErrorNotification();
  } finally {
    hideLoader();
  }

  event.currentTarget.reset();
}

// --- ОБРОБКА КЛІКУ НА LOAD MORE ---
async function handleLoadMore() {
  currentPage += 1; // Збільшуємо номер сторінки на 1
  
  hideLoadMoreButton(); // Тимчасово ховаємо кнопку під час завантаження
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    
    createGallery(data.hits);
    
    // Функція плавного скролу сторінки
    smoothScroll();

    // Розрахунок ліміту: чи дійшов користувач до кінця колекції
    const totalPages = Math.ceil(data.totalHits / perPage);

    if (currentPage >= totalPages) {
      hideLoadMoreButton(); // Ховаємо назовсім
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton(); // Якщо картинки ще є, знову показуємо кнопку
    }
  } catch (error) {
    showErrorNotification();
  } finally {
    hideLoader();
  }
}

// --- ФУНКЦІЯ ПЛАВНОГО СКРОЛУ ---
function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  
  if (galleryItem) {
    // Отримуємо висоту однієї картки
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    
    // Прокручуємо на дві висоти картки
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

function showErrorNotification() {
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong with the server fetching.',
    position: 'topRight',
  });
}