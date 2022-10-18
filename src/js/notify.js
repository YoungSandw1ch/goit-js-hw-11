import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function notifySuccess(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
