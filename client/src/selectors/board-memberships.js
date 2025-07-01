import { createSelector } from 'redux-orm';

import orm from '../orm';
import { isLocalId } from '../utils/local-id';

export const makeSelectBoardMembershipById = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ BoardMembership }, id) => {
      const boardMembershipModel = BoardMembership.withId(id);

      if (!boardMembershipModel) {
        return boardMembershipModel;
      }

      return {
        ...boardMembershipModel.ref,
        isPersisted: !isLocalId(boardMembershipModel.id),
      };
    },
  );

export const selectBoardMembershipById = makeSelectBoardMembershipById();

export default {
  makeSelectBoardMembershipById,
  selectBoardMembershipById,
};
