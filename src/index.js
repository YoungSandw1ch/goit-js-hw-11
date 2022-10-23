import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import getRefs from './js/get-refs';
import fetchImages from './js/fetch-images';
import { notifySuccess, notifyFailure } from './js/notify';
import photoCardTpl from './templates/photo-card.hbs';

const refs = getRefs();
const THROTTLE_TIME = 250;
let page = 1;
let query = '';

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  window.removeEventListener(
    'scroll',
    throttle(onScrollGallery, THROTTLE_TIME)
  );
  clearGallery();

  query = e.currentTarget.elements.searchQuery.value;
  if (!query.trim()) return;

  page = 1;
  const data = await fetchImages(query, page);
  const totalHits = data.totalHits;
  const photos = data.hits;

  console.log(data);

  if (!photos.length) {
    notifyFailure();
    return;
  }

  wrapHeader();
  clearGallery();
  renderPhotoCards(photos);
  notifySuccess(totalHits);
  simplelightbox();

  window.addEventListener('scroll', throttle(onScrollGallery, THROTTLE_TIME));
}

function onScrollGallery(query, page) {
  const bodyRect = document.body.getBoundingClientRect();
  const documentHeight = document.documentElement.clientHeight;

  if (bodyRect.bottom < documentHeight + 200) {
    console.log('done');
    page += 1;
    fetchImages(query, page).then(data => {
      renderPhotoCards(data.hits);
      console.log(data.hits);
      return data;
    });
  }
}

async function searchImage(query, page) {
  const data = await fetchImages(query, page);
  const photos = data.hits;
  return photos;
}

function renderPhotoCards(photos) {
  const photosCardMarkup = photoCardTpl(photos);
  refs.gallery.insertAdjacentHTML('beforeend', photosCardMarkup);
}

function simplelightbox() {
  let gallery = new SimpleLightbox('.gallery a');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

// function infiniteScroll() {
//   const options = {
//     path: () => {
//       page += 1;
//       return
//     },
//     append: '.photo-link',
//     history: false,
//   };

//   let infScroll = new InfiniteScroll(refs.gallery, options);
// }

//======================header animation================
function wrapHeader() {
  refs.header.classList.add('wrap');
}

function openHeader() {
  refs.header.classList.remove('wrap');
}
