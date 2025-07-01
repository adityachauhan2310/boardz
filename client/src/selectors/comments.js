import { createSelector } from 'redux-orm';

import orm from '../orm';
import { isLocalId } from '../utils/local-id';

export const makeSelectCommentById = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ Comment }, id) => {
      const commentModel = Comment.withId(id);

      if (!commentModel) {
        return commentModel;
      }

      return {
        ...commentModel.ref,
        isPersisted: !isLocalId(commentModel.id),
      };
    },
  );

export const selectCommentById = makeSelectCommentById();

export default {
  makeSelectCommentById,
  selectCommentById,
};
