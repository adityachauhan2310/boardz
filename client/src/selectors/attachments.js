import { createSelector } from 'redux-orm';

import orm from '../orm';
import { isLocalId } from '../utils/local-id';

export const makeSelectAttachmentById = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ Attachment }, id) => {
      const attachmentModel = Attachment.withId(id);

      if (!attachmentModel) {
        return attachmentModel;
      }

      return {
        ...attachmentModel.ref,
        isPersisted: !isLocalId(attachmentModel.id),
      };
    },
  );

export const selectAttachmentById = makeSelectAttachmentById();

export const selectIsAttachmentWithIdExists = createSelector(
  orm,
  (_, id) => id,
  ({ Attachment }, id) => Attachment.idExists(id),
);

export default {
  makeSelectAttachmentById,
  selectAttachmentById,
  selectIsAttachmentWithIdExists,
};
