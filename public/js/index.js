import '@babel/polyfill';
import { login } from './login';
import {createuser} from './createuser';
import {recover} from './recover';
import { updateSettings } from './updateSettings';
import {deleteuser} from './deleteUser';
import {updateuser} from './updateUser';
import {upload} from './upload';
import {deletepost} from './deletepost';
// import {dataupload} from './dataupload';
// import {uploadfiles} from './uploadfiles';
import { set } from 'mongoose';


// DOM ELEMENTS

const loginForm = document.querySelector('.form--login');
const uploadData = document.querySelector('.form--upload');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const recoveremail = document.querySelector('.form--reset');
const uploadFiles = document.querySelector('.upload--files');
const userdelete=document.querySelector('.form--delete');
const userupdate = document.querySelector('.form--update');
const uploaddata = document.querySelector('.form--upload');
const postdelete = document.querySelector('.form--deletepost');






// DELEGATION
if(postdelete)
postdelete.addEventListener('submit', e => {
  e.preventDefault();
  const title =document.getElementById('post').value;
  deletepost(title);
})
if(uploaddata)
uploaddata.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('authorname').value;
  const category = document.getElementById('category').innerHTML;
  const subcategory = document.getElementById('subcategory').value;
  const hint = document.getElementById('hint').value;
  const description = document.getElementById('description').value;
  upload(title,author, category,subcategory,hint,description);

})
if(userdelete)
 userdelete.addEventListener('submit', e => {
   e.preventDefault();
   const email = document.getElementById('email').value;
   deleteuser(email);

 })
 if(userupdate)
 userupdate.addEventListener('submit', e => {
   e.preventDefault();
   const email = document.getElementById('mail').value;
   const role = document.getElementById('role').value;
   updateuser(email,role);

 })
 
if (signupForm)
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    createuser(name,email,password,confirmPassword);
  });

if (uploadFiles)
uploadFiles.addEventListener('submit',e=>{
  e.preventDefault();
  const photo = document.getElementById('photo').value;
  // const pdf = document.getElementById('pdf').value;
  uploadFiles(photo);

})
if(uploadData)
uploadData.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;
  const imageCover = document.getElementById('imageCover').value;
  const download = document.getElementById('download').value;
  const summary = document.getElementById('summary').value;
  dataupload(name,price,category,imageCover,download,summary);
  // updateSettings(form, 'data');
});

if (recoveremail)
recoveremail.addEventListener('submit',e=>{
  e.preventDefault();
  const email = document.getElementById('email').value;
  recover(email);
})

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);


    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

