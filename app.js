const galleryItems = [
  {
    preview:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Container Cargo Ship',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&h=400&q=80',
    original:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&h=850&q=80',
    description: 'Lighthouse Coast Sea',
  },
];

const galleryContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

let currentIndex = 0;

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.innerHTML = galleryMarkup;

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

galleryContainer.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  const isImage = event.target.classList.contains('gallery__image');
  if (!isImage) {
    return;
  }

  const largeImageUrl = event.target.dataset.source;

  currentIndex = galleryItems.findIndex(item => item.original === largeImageUrl);

  openModal();
}

function openModal() {
  lightbox.classList.add('is-open');

  updateModalImage(currentIndex);

  window.addEventListener('keydown', onKeyPress);
}

function closeModal() {
  lightbox.classList.remove('is-open');

  lightboxImage.src = '';
  lightboxImage.alt = '';

  window.removeEventListener('keydown', onKeyPress);
}


function updateModalImage(index) {
  lightboxImage.src = galleryItems[index].original;
  lightboxImage.alt = galleryItems[index].description;
}


function onKeyPress(event) {
  const key = event.key;
  const code = event.code;

  if (key === 'Escape' || code === 'Escape') {
    closeModal();
  }

  if (key === 'ArrowRight' || code === 'ArrowRight') {
    currentIndex += 1;
    if (currentIndex >= galleryItems.length) {
      currentIndex = 0;
    }
    updateModalImage(currentIndex);
  }

  if (key === 'ArrowLeft' || code === 'ArrowLeft') {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = galleryItems.length - 1;
    }
    updateModalImage(currentIndex);
  }
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);