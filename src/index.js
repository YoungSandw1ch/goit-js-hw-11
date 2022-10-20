import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import InfiniteScroll from 'infinite-scroll';
import getRefs from './js/get-refs';
import fetchImages from './js/fetch-images';
import { notifySuccess, notifyFailure } from './js/notify';
import photoCardTpl from './templates/photo-card.hbs';

const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  let page = 1;
  const query = e.currentTarget.elements.searchQuery.value;
  if (!query.trim()) return;

  const data = await fetchImages(query, page);
  const totalHits = data.totalHits;
  const photos = data.hits;

  if (!photos.length) {
    notifyFailure();
    return;
  }

  wrapHeader();
  renderPhotoCards(photos);
  notifySuccess(totalHits);
  simplelightbox();
  infiniteScroll();
}

function renderPhotoCards(photos) {
  const photosCardMarkup = photoCardTpl(photos);
  refs.gallery.innerHTML = photosCardMarkup;
}

function simplelightbox() {
  let gallery = new SimpleLightbox('.gallery a');
}

function infiniteScroll() {
  const options = {
    path: '.pagination__next',
    append: '.photo-link',
    history: false,
  };

  let infScroll = new InfiniteScroll(refs.gallery, options);
}
//======================header animation================
function wrapHeader() {
  refs.header.classList.add('wrap');
}

function openHeader() {
  refs.header.classList.remove('wrap');
}
