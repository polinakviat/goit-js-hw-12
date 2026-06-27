import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery() {
  if (galleryContainer) galleryContainer.innerHTML = '';
}

export function createGallery(images) {
  if (!galleryContainer) return;

  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info-block">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `;
    })
    .join('');

  // Використовуємо insertAdjacentHTML, щоб нові сторінки ДОДАВАЛИСЯ до старих
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

// Керування лоадером
export function showLoader() {
  if (loaderElement) loaderElement.classList.remove('is-hidden');
}

export function hideLoader() {
  if (loaderElement) loaderElement.classList.add('is-hidden');
}

// Керування кнопкою Load More
export function showLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
}