import EntryActionTypes from '../constants/EntryActionTypes';

const updateCustomFieldValue = (cardId, customFieldGroupId, customFieldId, data) => ({
  type: EntryActionTypes.CUSTOM_FIELD_VALUE_UPDATE,
  payload: {
    cardId,
    customFieldGroupId,
    customFieldId,
    data,
  },
});

const handleCustomFieldValueUpdate = (customFieldValue) => ({
  type: EntryActionTypes.CUSTOM_FIELD_VALUE_UPDATE_HANDLE,
  payload: {
    customFieldValue,
  },
});

const deleteCustomFieldValue = (cardId, customFieldGroupId, customFieldId) => ({
  type: EntryActionTypes.CUSTOM_FIELD_VALUE_DELETE,
  payload: {
    cardId,
    customFieldGroupId,
    customFieldId,
  },
});

const handleCustomFieldValueDelete = (customFieldValue) => ({
  type: EntryActionTypes.CUSTOM_FIELD_VALUE_DELETE_HANDLE,
  payload: {
    customFieldValue,
  },
});

export default {
  updateCustomFieldValue,
  handleCustomFieldValueUpdate,
  deleteCustomFieldValue,
  handleCustomFieldValueDelete,
};
