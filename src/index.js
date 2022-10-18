import './sass/index.scss';

const refs = {
  submitBtn: document.querySelector('.js-submit'),
  header: document.querySelector('.header'),
};

refs.submitBtn.addEventListener('click', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  refs.header.classList.add('wrap');
}
