import './sass/index.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';
import getRefs from './js/get-refs';
import fetchImages from './js/fetch-images';
import { notifySuccess, notifyFailure, notifyWarning } from './js/notify';
import photoCardTpl from './templates/photo-card.hbs';
import { renderSpinner, showSpinner, hideSpinner } from './js/spinner';

const refs = getRefs();
const THROTTLE_TIME = 250;
const options = { threshold: 0.2 };
let page = 1;
let gallery = '';
let query = '';

const infiniteObserver = new IntersectionObserver(infiniteLoadMore, options);
refs.form.addEventListener('submit', throttle(onSubmit, THROTTLE_TIME));

async function onSubmit(e) {
  e.preventDefault();
  clearGallery();

  query = e.currentTarget.elements.searchQuery.value;
  if (!query.trim()) {
    unwrapHeader();
    notifyWarning();
    return;
  }

  toogleBtnSpinner();
  page = 1;
  const data = await fetchImages(query, page);
  const totalHits = data.totalHits;
  const photos = data.hits;

  if (!photos.length) {
    toogleBtnSpinner();
    notifyFailure();
    return;
  }

  wrapHeader();
  clearGallery();
  renderPhotoCards(photos);
  toogleBtnSpinner();
  notifySuccess(totalHits);
  resetForm();
  createObserver();

  if (gallery) {
    gallery.refresh();
    return;
  }

  simplelightbox();
}

function infiniteLoadMore([entry], observer) {
  if (!entry.isIntersecting) return;
  page += 1;

  observer.unobserve(entry.target);
  loadMorePhoto(query, page);
}

async function loadMorePhoto(query, page) {
  renderSpinner();
  showSpinner();

  const data = await fetchImages(query, page);
  const photos = data?.hits;

  if (!data || !photos.length) {
    hideSpinner();
    return;
  }

  renderPhotoCards(photos);
  hideSpinner();
  gallery.refresh();
  createObserver();
}

function createObserver() {
  const lastPhoto = document.querySelector('.photo-link:last-child');
  infiniteObserver?.observe(lastPhoto);
}

function renderPhotoCards(photos) {
  const photosCardMarkup = photoCardTpl(photos);
  refs.gallery.insertAdjacentHTML('beforeend', photosCardMarkup);
}

function simplelightbox() {
  gallery = new SimpleLightbox('.gallery a');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  refs.input.blur();
}

function resetForm() {
  refs.form.reset();
}

function wrapHeader() {
  refs.header.classList.add('wrap');
}

function unwrapHeader() {
  refs.header.classList.remove('wrap');
}

function toogleBtnSpinner() {
  const spinner = document.querySelector('.js-spinner');
  const svg = document.querySelector('.button__icon');

  spinner.classList.toggle('js-hide');
  svg.classList.toggle('js-hide');
}
