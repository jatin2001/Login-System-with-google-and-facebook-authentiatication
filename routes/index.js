const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/',(req,res)=>{
    res.render('welcome')
})
router.get('/dashboard', (req, res) =>{
  if(req.isAuthenticated())
  {
    res.render('dashboard', {
      user: req.user,
    })
  }
  else{
    req.flash('error_msg','Please Login')
    res.redirect('users/login');
  }
}
);
//goggle login
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/dashboard', 
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });

module.exports = router;  