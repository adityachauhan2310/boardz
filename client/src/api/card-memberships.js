import socket from './socket';

/* Actions */

const createCardMembership = (cardId, data, headers) =>
  socket.post(`/cards/${cardId}/card-memberships`, data, headers);

const deleteCardMembership = (cardId, userId, headers) =>
  socket.delete(`/cards/${cardId}/card-memberships/userId:${userId}`, undefined, headers);

export default {
  createCardMembership,
  deleteCardMembership,
};
