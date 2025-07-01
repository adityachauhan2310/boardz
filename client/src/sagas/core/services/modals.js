import { put } from 'redux-saga/effects';

import actions from '../../../actions';

export function* openModal(type, params) {
  yield put(actions.openModal(type, params));
}

export function* closeModal() {
  yield put(actions.closeModal());
}

export default {
  openModal,
  closeModal,
};
