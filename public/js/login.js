// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('loginForm');
//     form.addEventListener('submit', async function(event) {
//       // Prevent the default form submission
//       event.preventDefault();

//       const usernameInput = document.getElementById('username').value;
//       const passwordInput = document.getElementById('password').value;
//       const rememberMeCheckbox = document.getElementById('remember_me');
      
//       // Hashing the password using SHA-256
//       const hashedPassword = await sha256(passwordInput);

//       if (rememberMeCheckbox.checked) {
//         // Store the login data as a string
//         sessionStorage.setItem("login", JSON.stringify({'username': usernameInput, 'password': hashedPassword}));
//       } else {
//         sessionStorage.removeItem('login');
//       }

//       // Manually submit the form
//       form.submit();
//     });
//   });

//   // SHA-256 hashing function
//   async function sha256(plainText) {
//     const encoder = new TextEncoder();
//     const data = encoder.encode(plainText);
//     const buffer = await crypto.subtle.digest('SHA-256', data);
//     const hashArray = Array.from(new Uint8Array(buffer));
//     const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
//     return hashHex;
//   }