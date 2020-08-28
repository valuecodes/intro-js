var registeredUsers = [
  "user1",
  "user2",
  "user3",
  "user4",
  "user5",
  "user6",
  "user7",
  "user8",
  "user9",
]; // this array stores valid usernames until the next pageload

function validateForm(e) {
  e.preventDefault(); // stop the submit button from refreshing the page
  console.log("validating....");

  console.log("user name: " + validateUsername());
  console.log("email: " + validateEmail());
  console.log("first name: " + validateFirstName());
  console.log("last name: " + validateLastName());
  console.log("phone " + validatePhone());
  console.log("password: " + validatePassword());
  if (
    validateUsername() &&
    validateEmail() &&
    validateFirstName() &&
    validateLastName() &&
    validatePhone() &&
    validateEmail() &&
    validatePassword()
  ) {
    var _newUser = getUserName();

    // add code to update registeredUsers array with new user and call render function
    registeredUsers.push(_newUser);

    if (registeredUsers.length > 4) {
      while (registeredUsers.length > 5) {
        registeredUsers.shift();
      }
    }

    renderRegisteredUsers();
    document.registration.reset(); // reset form input fields
  }
}

function renderRegisteredUsers() {
  document.getElementById("registered-users").innerHTML = "";
  registeredUsers.forEach(function (registeredUser) {
    var _newUser = document.createElement("li");
    _newUser.innerHTML = registeredUser;
    document.getElementById("registered-users").appendChild(_newUser);
  });
}

function validateFirstName() {
  let _firstName = getFirstName();
  return _firstName ? true : false;
}
function validateLastName() {
  let _lastName = getLastName();
  return _lastName ? true : false;
}
function validatePhone() {
  let _phone = getPhone();

  return _phone.length > 6 ? _phone : false;
}

/**
 * this function supposely validates submitted username
 * @returns [Boolean] true when valid, false otherwise
 */
function validateUsername() {
  var _userName = getUserName();
  return !checkSpace(_userName);
}

/**
 * this function supposely validates submitted email
 * @returns [Boolean] true when valid, false otherwise
 */
function validateEmail() {
  var _email = getEmail();
  if (checkSpace(_email) === true) {
    return false;
  }

  // check for @
  var atSymbol = _email.indexOf("@");
  if (atSymbol < 1) {
    return false;
  }

  // check if there is a dot located less than 2 symbols away from the @ sign
  var dot = _email.indexOf(".");
  if (dot <= atSymbol + 2) {
    return false;
  }

  // check that the dot is not at the end
  if (dot === _email.length - 1) {
    return false;
  }

  return true;
}

/**
 * this function supposely validates submitted password
 * if password and confirmPassword do not match, return false
 *
 * @returns [Boolean] true when valid, false otherwise
 */
function validatePassword() {
  var _password = getPassword();
  var _confirmPassword = getConfirmPassword();

  if (password.length < 8) {
    return false;
  }

  if (_password !== _confirmPassword) {
    return false;
  }

  return true;
}

/**
 * this function supposely checks whether the sample is an empty string
 * or there is space within it
 * @param [String] sample text to be evaluated
 * @returns [Boolean] true when valid, false otherwise
 */
function checkSpace(sample) {
  return sample === "" || sample.indexOf(" ") > -1;
}

/**
 * this function looks under the form with name "registration"
 * look under the "username" input field and returns the value of it
 * returns nothing if no value is found
 *
 * @returns [Boolean] true when valid, false otherwise
 */
function getUserName() {
  if (typeof document.registration.username === "undefined") {
    return "";
  } else {
    return document.registration.username.value;
  }
}
function getFirstName() {
  if (typeof document.registration.firstname === "undefined") {
    return "";
  } else {
    return document.registration.firstname.value;
  }
}
function getLastName() {
  if (typeof document.registration.lastname === "undefined") {
    return "";
  } else {
    return document.registration.lastname.value;
  }
}
function getPhone() {
  if (typeof document.registration.phone === "undefined") {
    return "";
  } else {
    return document.registration.phone.value;
  }
}

function getEmail() {
  // TODO
  if (document.registration.email === "undefined") {
    return "";
  } else {
    return document.registration.email.value;
  }
}

function getPassword() {
  // TODO
  if (document.registration.password === "undefined") {
    return "";
  } else {
    return document.registration.password.value;
  }
}

function getConfirmPassword() {
  // TODO
  if (document.registration.password_confirm === "undefined") {
    return "";
  } else {
    return document.registration.password_confirm.value;
  }
}
