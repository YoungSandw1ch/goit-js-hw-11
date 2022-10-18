import './sass/index.scss';
import getRefs from './js/get-refs';
import fetchImages from './js/fetch-images';

const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  let page = 1;
  const query = e.currentTarget.elements.searchQuery.value;
  wrapHeader();

  const data = await fetchImages(query, page);
  console.log(data);
}

//======================header animation================
function wrapHeader() {
  refs.header.classList.add('wrap');
}

function openHeader() {
  refs.header.classList.remove('wrap');
}
