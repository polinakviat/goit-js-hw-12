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

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

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

  currentQuery = searchQuery;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton(); 
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

    // --- ОНОВЛЕНА ЛОГІКА ПЕРЕВІРКИ КІНЦЯ КОЛЕКЦІЇ НА 1-Й СТОРІНЦІ ---
    if (data.totalHits <= perPage) {
      // Якщо всі знайдені картинки вмістилися на першій сторінці
      hideLoadMoreButton(); // Про всяк випадок переконуємося, що вона прихована
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      // Якщо картинок більше, ніж на одну сторінку, показуємо кнопку
      showLoadMoreButton();
    }

  } catch (error) {
    showErrorNotification();
  } finally {
    hideLoader();
  }

  event.currentTarget.reset();
}

async function handleLoadMore() {
  currentPage += 1;
  
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    
    createGallery(data.hits);
    
    smoothScroll();

    const totalPages = Math.ceil(data.totalHits / perPage);

    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    showErrorNotification();
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();
    
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