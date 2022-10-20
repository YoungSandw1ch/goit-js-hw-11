import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function notifySuccess(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`, {
    position: 'center-top',
  });
}

export function notifyFailure() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      position: 'center-top',
    }
  );
}
