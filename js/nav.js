"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) { 
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

// Subpart 2B 3: un-hide the story submission form /--------------------------
function navSubmitStoryClick() { 
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$navSubmitStory.on("click", navSubmitStoryClick);
// Subpart 2B 3: un-hide the story submission form --------------------------/

// Subpart 3A: show favorites on click: /-------------------------------------
function navFavorites() {  
  hidePageComponents();
  showFavorites();
}

$body.on("click", "#nav-favorites", navFavorites);
// Subpart 3A: show favorites on click: -------------------------------------/

// Subpart 4: Click "my stories" to show user submissions /-------------------------

function navMyStories() {  
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);
// Subpart 4: Click "my stories" to show user submissions -------------------------/

function navLoginClick(e) {
  console.debug("navLoginClick", e);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
