const router = require('express').Router();

// Logout route
router.get('/logout', (req, res) => {
  try {
    // Clear the session to log out the user
    req.session.destroy();

    // Redirect to the login page or any other desired page after logout
    res.redirect('/login');
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;