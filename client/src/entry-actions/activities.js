import EntryActionTypes from '../constants/EntryActionTypes';

const fetchActivitiesInCurrentBoard = () => ({
  type: EntryActionTypes.ACTIVITIES_IN_CURRENT_BOARD_FETCH,
  payload: {},
});

const fetchActivitiesInCurrentCard = () => ({
  type: EntryActionTypes.ACTIVITIES_IN_CURRENT_CARD_FETCH,
  payload: {},
});

const handleActivityCreate = (activity) => ({
  type: EntryActionTypes.ACTIVITY_CREATE_HANDLE,
  payload: {
    activity,
  },
});

export default {
  fetchActivitiesInCurrentBoard,
  fetchActivitiesInCurrentCard,
  handleActivityCreate,
};
