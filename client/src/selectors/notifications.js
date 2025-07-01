import { createSelector } from 'redux-orm';

import orm from '../orm';

export const makeSelectNotificationById = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ Notification }, id) => {
      const notificationModel = Notification.withId(id);

      if (!notificationModel) {
        return notificationModel;
      }

      return notificationModel.ref;
    },
  );

export const selectNotificationById = makeSelectNotificationById();

export const makeSelectNotificationIdsByCardId = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ Notification }, id) =>
      Notification.filter({
        cardId: id,
      })
        .toRefArray()
        .map((notification) => notification.id),
  );

export const selectNotificationIdsByCardId = makeSelectNotificationIdsByCardId();

export default {
  makeSelectNotificationById,
  selectNotificationById,
  makeSelectNotificationIdsByCardId,
  selectNotificationIdsByCardId,
};
