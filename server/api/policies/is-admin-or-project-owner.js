module.exports = async function isAuthenticated(req, res, proceed) {
  if (!sails.helpers.users.isAdminOrProjectOwner(req.currentUser)) {
    return res.notFound(); // Forbidden
  }

  return proceed();
};
