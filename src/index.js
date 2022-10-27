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
const options = {};
const infiniteObserver = new IntersectionObserver(callback, options);

refs.form.addEventListener('submit', throttle(onSubmit, THROTTLE_TIME));

async function onSubmit(e) {
  e.preventDefault();
  clearGallery();

  query = e.currentTarget.elements.searchQuery.value;
  if (!query.trim()) return;

  page = 1;
  const data = await fetchImages(query, page);
  const totalHits = data.totalHits;
  const photos = data.hits;

  if (!photos.length) {
    notifyFailure();
    return;
  }

  wrapHeader();
  clearGallery();
  renderPhotoCards(photos);
  notifySuccess(totalHits);
  simplelightbox();

  createObserve();
}

async function loadMorePhoto(query, page) {
  const data = await fetchImages(query, page);
  const photos = data.hits;
  renderPhotoCards(photos);
  createObserve();
}

function createObserve() {
  const lastPhoto = document.querySelector('.photo-link:last-child');
  infiniteObserver?.observe(lastPhoto);
}

function callback([entry], observer) {
  if (!entry.isIntersecting) return;
  page += 1;

  observer.unobserve(entry.target);
  loadMorePhoto(query, page);
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

//======================header animation================
function wrapHeader() {
  refs.header.classList.add('wrap');
}

function openHeader() {
  refs.header.classList.remove('wrap');
}
