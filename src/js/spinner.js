export function renderSpinner() {
  const SPINNER_MARKUP = `
    <div class="loadingio-spinner-spin-6roj7qlej6p js-hide"><div class="ldio-gxtzawpy8y">
    <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
    </div></div>`;
  const spinner = document.querySelector('.loadingio-spinner-spin-6roj7qlej6p');
  if (!spinner) {
    refs.spinner.innerHTML = SPINNER_MARKUP;
  }
}

export function showSpinner() {
  const spinner = document.querySelector('.loadingio-spinner-spin-6roj7qlej6p');
  spinner.classList.remove('js-hide');
}

export function hideSpinner() {
  const spinner = document.querySelector('.loadingio-spinner-spin-6roj7qlej6p');
  spinner.classList.add('js-hide');
}
