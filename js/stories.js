"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

// Subpart 4: Deleting a story - adding delete button to markup generation /---------------
function generateStoryMarkup(story, showTrashCan = false) {
  // showTrashCan is an added argument, set true from 

  const hostName = story.getHostName();

  // Subpart 3A Show "favorites" star if user is logged in (true): /--------------------
  const showStar = Boolean(currentUser);
  // Subpart 3A Show "favorites" star if user is logged in (true): --------------------/

  // Subpart 3A Ternary operator below for showing star in returned markup - cannot comment inside literal/----
  // Subpart 3A Ternary operator below for showing star in returned markup - cannot comment inside literal----/
  return $(`
      <li id="${story.storyId}">
        ${showTrashCan ? getTrashCan() : ""}
        ${showStar ? favStar(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

//Get trash can icon 

function getTrashCan() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

// Subpart 4: Deleting a story - adding delete button to markup generation ---------------/

// Subpart 3A: Making star icon appear /-----------
//Function call for getting font-awesome star 

function favStar(story, user) {
  const isFavorite = user.isFavorite(story);
  const fasFarStar = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${fasFarStar} fa-star"></i>
      </span>`;
}
// Subpart 3A: Making star icon appear -----------/

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story,);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// Subpart 4: deleting a story /-------------------------------------------------------
async function deleteStory(e) { 

  const $closestLi = $(e.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  await putUserStoriesOnPage();
}

$ownStories.on("click", ".trash-can", deleteStory);
// Subpart 4: deleting a story -------------------------------------------------------/

// Subpart 2B 4: handle clicking the submit button for a new story /---------------
async function submitNewStory(e) { 
  e.preventDefault();

  // grab all info from form for storyData
  const title = $("#title-input").val();
  const url = $("#url-input").val();
  const author = $("#author-input").val();

  const username = currentUser.username
  const storyData = {title, url, author, username};
  // console.log(storyData);

  const story = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);
 
  // //jQuery calls on id #submitForm to hide form and reset it:
  // $submitForm.slideUp("hide");
  // $submitForm.slideUp("reset"); 
  submitReset();  
}

function submitReset(){
  $submitForm.slideUp("hide");
  $submitForm.slideUp("reset"); 
}

$submitForm.on("submit", submitNewStory);
// Subpart 2B 4: handle clicking the submit button for a new story ---------------/

// Subpart 4: Put User Submissions on Page /------------------------------------------
function putUserStoriesOnPage() { 

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}
// Subpart 4: Put User Submissions on Page ------------------------------------------/

// Subpart 3A: Showing favorites list and handling star click /-------------------------------------------

function showFavorites() { 

  $favoriteStories.empty();
 
  if (currentUser.favorites.length === 0) {
    console.log($favoriteStories)
    $favoriteStories.append("<h5>No favorites added!</h5>"); 
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      console.log($story);
      $favoriteStories.append($story); 
    }
  }

  $favoriteStories.show();
}

async function toggleStoryFavorite(a) { 

  const $tgt = $(a.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  // see if the item is already favorited (checking by presence of star)
  if ($tgt.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}

$storiesLists.on("click", ".star", toggleStoryFavorite);
// Subpart 3A: handling star click ---------------------------------------------------------------------/