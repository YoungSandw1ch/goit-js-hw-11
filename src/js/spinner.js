const spinnerContainer = document.querySelector('.spinner');
let spinner;

export function renderSpinner() {
  const SPINNER_MARKUP = `
    <div class="loadingio-spinner-spin-6roj7qlej6p js-hide"><div class="ldio-gxtzawpy8y">
    <div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div>
    </div></div>`;
  if (!spinner) {
    spinnerContainer.innerHTML = SPINNER_MARKUP;
    spinner = document.querySelector('.loadingio-spinner-spin-6roj7qlej6p');
  }
}

export function showSpinner() {
  spinner.classList.remove('js-hide');
}

export function hideSpinner() {
  spinner.classList.add('js-hide');
}
