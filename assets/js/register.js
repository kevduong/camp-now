// Initialize Firebase
var config = {
	apiKey: "AIzaSyBsuVxINUL-UnlxBQ-vTRRZbn-fO-VY0ko",
	authDomain: "campsite-b596f.firebaseapp.com",
	databaseURL: "https://campsite-b596f.firebaseio.com",
	storageBucket: "campsite-b596f.appspot.com",
	messagingSenderId: "855786603725"
};
firebase.initializeApp(config);

// Get element
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogOut = document.getElementById('btnLogOut');
var btnGoogle = document.getElementById('btnGoogle');
var userInfo = document.getElementById('registerLink');

var database = firebase.database();

// Realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if (firebaseUser) {
		console.log(firebaseUser);
		
		$('#registerLink').html("Hello " + firebaseUser.displayName);
		btnLogOut.classList.remove('hide');
//				window.close();
	} else {
		console.log('not logged in');
		btnLogOut.classList.add('hide');
	}
	
// Google Sign in

btnGoogle.addEventListener('click', function () {

	var provider = new firebase.auth.GoogleAuthProvider();
	provider.addScope('https://www.googleapis.com/auth/plus.login');

	firebase.auth().signInWithPopup(provider).then(function (result) {
		
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function (error) {
		
		console.log(error);
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	})
});

// Add login event
btnLogin.addEventListener('click', e => {
	
	$("#txtFirstName,#txtLastName,#btnSignUp").hide();
	$('#btnLogin').html("Login");
	
	var firstName = txtFirstName.value;
	var lastName = txtLastName.value;
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	
	var userInfo = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		pass: pass,
		
	};
	database.ref().push(userInfo);
	// Sign in
	var promise = auth.signInWithEmailAndPassword(email, pass);
promise.catch(e => console.log(e.message)
)

})

// Add signup event
btnSignUp.addEventListener('click', e => {
	
	var firstName = txtFirstName.value;
	var lastName = txtLastName.value;
	var email = txtEmail.value;
	var pass = txtPassword.value;
	var auth = firebase.auth();
	
	var userInfo = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		pass: pass,
		
	};
	database.ref().push(userInfo);
	// Create User
	var promise = auth.createUserWithEmailAndPassword(email, pass);
promise.catch(e => console.log(e.message)
)

})

// Store User into Database
database.ref().on("child_added", function (childSnapshot) {
	
	var email = childSnapshot.val().email;
	var pass = childSnapshot.val().pass;
});


// Logout
btnLogOut.addEventListener('click', e => {
	firebase.auth().signOut();
})



})
