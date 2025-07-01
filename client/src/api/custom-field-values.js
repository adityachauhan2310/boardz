import socket from './socket';

/* Actions */

const updateCustomFieldValue = (cardId, customFieldGroupId, customFieldId, data, headers) =>
  socket.patch(
    `/cards/${cardId}/custom-field-values/customFieldGroupId:${customFieldGroupId}:customFieldId:${customFieldId}`,
    data,
    headers,
  );

const deleteCustomFieldValue = (cardId, customFieldGroupId, customFieldId, headers) =>
  socket.delete(
    `/cards/${cardId}/custom-field-values/customFieldGroupId:${customFieldGroupId}:customFieldId:${customFieldId}`,
    undefined,
    headers,
  );

export default {
  updateCustomFieldValue,
  deleteCustomFieldValue,
};
