import EntryActionTypes from '../constants/EntryActionTypes';

const fetchCommentsInCurrentCard = () => ({
  type: EntryActionTypes.COMMENTS_IN_CURRENT_CARD_FETCH,
  payload: {},
});

const createCommentInCurrentCard = (data) => ({
  type: EntryActionTypes.COMMENT_IN_CURRENT_CARD_CREATE,
  payload: {
    data,
  },
});

const handleCommentCreate = (comment, users) => ({
  type: EntryActionTypes.COMMENT_CREATE_HANDLE,
  payload: {
    comment,
    users,
  },
});

const updateComment = (id, data) => ({
  type: EntryActionTypes.COMMENT_UPDATE,
  payload: {
    id,
    data,
  },
});

const handleCommentUpdate = (comment) => ({
  type: EntryActionTypes.COMMENT_UPDATE_HANDLE,
  payload: {
    comment,
  },
});

const deleteComment = (id) => ({
  type: EntryActionTypes.COMMENT_DELETE,
  payload: {
    id,
  },
});

const handleCommentDelete = (comment) => ({
  type: EntryActionTypes.COMMENT_DELETE_HANDLE,
  payload: {
    comment,
  },
});

export default {
  fetchCommentsInCurrentCard,
  createCommentInCurrentCard,
  handleCommentCreate,
  updateComment,
  handleCommentUpdate,
  deleteComment,
  handleCommentDelete,
};
