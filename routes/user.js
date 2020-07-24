const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Login
router.route('/login')
.get((req,res)=>{
    res.render('login');
})
.post((req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
})
//logout
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
})
//register
router.route('/register')
    .get((req,res)=>{
        res.render('register');
    })
    .post((req,res)=>{
        const {name,email,password,password2} = req.body;
        let msg ='';
        if(!name||!email||!password||!password2)
        {
            msg='Please enter all fields';
        }
        else{
            if(password.length<6)  {msg='Password must be at least 6 character';}
            else{
                if(password!==password2)
                {
                    msg='Password do not match';
                }
            }
        }
        if(msg!=='')
        {
            res.render('register',{msg,name,email,password,password2});
        }
        else{
            User.findOne({email},(err,user)=>{
                if(err) console.log(err);
                else{
                    if(user)
                    {
                        msg='Email already registered';
                        res.render('register',{msg,name,email});
                    }
                    else{
                        const hashPassword = bcrypt.hashSync(password, 10);
                        const newUser = new User({
                            name,email,password:hashPassword
                        })
                        newUser.save(err=>{
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {    req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            }
                        })
                    }
                }
            })
        }
    })

module.exports = router;   