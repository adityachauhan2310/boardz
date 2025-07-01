import { createSelector } from 'redux-orm';

import orm from '../orm';
import { isLocalId } from '../utils/local-id';

export const makeSelectNotificationServiceById = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ NotificationService }, id) => {
      const notificationServiceModel = NotificationService.withId(id);

      if (!notificationServiceModel) {
        return notificationServiceModel;
      }

      return {
        ...notificationServiceModel.ref,
        isPersisted: !isLocalId(notificationServiceModel.id),
      };
    },
  );

export const selectNotificationServiceById = makeSelectNotificationServiceById();

export default {
  makeSelectNotificationServiceById,
  selectNotificationServiceById,
};
