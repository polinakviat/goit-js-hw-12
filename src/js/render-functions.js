import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Ініціалізуємо один екземпляр лайтбоксу для всього модуля
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// 1. Очищає вказаний контейнер
export function clearGallery(container) {
  container.innerHTML = '';
}

// 2. Рендерить розмітку у вказаний контейнер
export function createGallery(images, container) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
          <div class="info-block">
            <p class="info-item"><b>Likes:</b> ${likes}</p>
            <p class="info-item"><b>Views:</b> ${views}</p>
            <p class="info-item"><b>Comments:</b> ${comments}</p>
            <p class="info-item"><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `;
    })
    .join('');

  container.innerHTML = markup;
  lightbox.refresh();
}

// 3. Оновлює вміст: спочатку чистить, потім рендерить нові дані
export function updateGallery(images, container) {
  clearGallery(container);
  createGallery(images, container);
}

// 4. Показує вказаний елемент лоадера
export function showLoader(loaderElement) {
  loaderElement.classList.remove('is-hidden');
}

// 5. Ховає вказаний елемент лоадера
export function hideLoader(loaderElement) {
  loaderElement.classList.add('is-hidden');
}