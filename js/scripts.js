$(document).ready(function () {
  function getWeatherInfoFrom(city) {
    $.get(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=5ca13f881159e89bde6afa3f3fe3fa3e",
      function () {
        console.log("success");
      }
    )
      .done(function (res) {
        let celsius = kelvinToCelsius();
        let sentence = `${res.name} today is ${kelvinToCelsius(
          res.main.temp
        )} degree and it feels like ${kelvinToCelsius(
          res.main.feels_like
        )} degree`;
        console.log(sentence);
        $("body").prepend("<p>" + sentence + "</p>");
      })
      .fail(function () {
        console.log("error");
        $("body").prepend("<p>" + city + "could not be found </p>");
      })
      .always(function () {
        console.log("finished");
      });
  }

  $("#search").on("click", () => {
    let searchText = $("#city").val();
    getWeatherInfoFrom(searchText);
  });

  getWeatherInfoFrom("helsinki");
});

function kelvinToCelsius(number) {
  return (number - 273.15).toFixed(1);
}

// function searchCity() {
//   let searchText = $("#city").val();
//   getWeatherInfoFrom(searchText);
// }

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

$(document).on("ready", function () {
  console.log("tesrttter");
  $(".lazy").slick({
    lazyLoad: "ondemand", // ondemand progressive anticipated
    infinite: true,
  });
});

console.log($("body").append("<div>Test</div>"));

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
    $("<li>" + registeredUser + "</li>").appendTo("#registered-users");
    // var _newUser = document.createElement("li");
    // _newUser.innerHTML = registeredUser;
    // document.getElementById("registered-users").appendChild(_newUser);
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
 *
 * @returns [Boolean] true when valid, false otherwise
 */

function getUserName() {
  console.log($("registration.username"));
  if (typeof document.registration.username === "undefined") {
    return "";
  } else {
    return $('[name="username"]').val();
    // return document.registration.username.value;
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
    return $('[name="email"]').val();
  }
}

function getPassword() {
  // TODO
  if (document.registration.password === "undefined") {
    return "";
  } else {
    return $('[name="password"]').val();
  }
}

function getConfirmPassword() {
  // TODO
  if (document.registration.password_confirm === "undefined") {
    return "";
  } else {
    return $('[name="password_confirm"]').val();
  }
}

var sliderEl = document.createElement("section");
sliderEl.classList.add("lazy", "slider");
sliderEl.setAttribute("data-sizes", "50vw");
document.body.appendChild(sliderEl);

function addSlide(theme) {
  var slide = document.createElement("div");
  var slideImage = document.createElement("img");
  slideImage.setAttribute(
    "data-lazy",
    "http://placehold.it/350x300?text=1-350w"
  );
  slideImage.setAttribute(
    "data-srcset",
    "https://source.unsplash.com/1000x1000/?" + theme
  );
  slideImage.setAttribute("data-sizes", "100vw");
  slide.appendChild(slideImage);
  sliderEl.appendChild(slide);
}

addSlide("nature");
addSlide("city");
addSlide("person");

$(document).ready(function () {
  $(".lazy").slick({
    lazyLoad: "ondemand", // ondemand progressive anticipated
    infinite: true,
    autoplay: true,
    arroes: true,
    dots: true,
  });
});
