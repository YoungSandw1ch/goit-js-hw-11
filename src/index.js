import './sass/index.scss';
import getRefs from './js/get-refs';
import fetchImages from './js/fetch-images';
import { notifySuccess } from './js/notify';
import photoCardTpl from './templates/photo-card.hbs';

const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  let page = 1;
  const query = e.currentTarget.elements.searchQuery.value;
  wrapHeader();

  const data = await fetchImages(query, page);
  const totalHits = data.totalHits;
  const photos = data.hits;

  notifySuccess(totalHits);
  renderPhotoCards(photos);

  console.log(photos);
}

function renderPhotoCards(photos) {
  const photosCardMarkup = photoCardTpl(photos);
  refs.gallery.innerHTML = photosCardMarkup;
}

//======================header animation================
function wrapHeader() {
  refs.header.classList.add('wrap');
}

function openHeader() {
  refs.header.classList.remove('wrap');
}
