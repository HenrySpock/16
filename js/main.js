"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $('body');

const $storiesLoadingMsg = $('#stories-loading-msg');
const $allStoriesList = $('#all-stories-list');

//  Subpart 3A: variable for favorite-stories list on html; collecting story lists into one place /------
const $favoriteStories = $('#favorite-stories');
const $storiesLists = $('.stories-list'); 
//  Subpart 3A -----------------------------------------------------------------------------------------/

// Subpart 4: user submitted stories / deletion /---------------------------------------------------------
const $ownStories = $('#my-stories');
// Subpart 4: user submitted stories / deletion ---------------------------------------------------------/

const $loginForm = $('#login-form');
const $signupForm = $('#signup-form');

// Subpart 2B 2b: define ids for the submission form and for clicking on Submit Story in navbar /-------
const $submitForm = $('#submission-form');
const $navSubmitStory = $('#nav-user-submission');
// Subpart 2B 2b: define ids for the submission form and for clicking on Submit Story in navbar --------/

const $navLogin = $('#nav-login');
const $navUserProfile = $('#nav-user-profile');
const $navLogOut = $('#nav-logout'); 

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    // Subpart Addendum: additional nav-click cleanup /--------------------------------------
    $submitForm,
    $favoriteStories,
    $ownStories
    // Subpart Addendum: additional nav-click cleanup --------------------------------------/
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
  
$(start);
