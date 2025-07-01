module.exports = async function isAuthenticated(req, res, proceed) {
  if (req.currentUser.role !== User.Roles.ADMIN) {
    return res.notFound(); // Forbidden
  }

  return proceed();
};
