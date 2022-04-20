# learn

Code description:

Subpart 2a:
Models
76 - 106 Async post call to BASE_URL/stories creating a new story, with 
token and information object (title, author, url)
The story is set to an instance of Story class with above object and token, 
then that instance is pushed in two places: the overall list of stories and
the list of user submitted stories (My Stories on nav bar)

Subpart 2b:
2B 1:
#submission-form is defined on index.html between lines 120 and 141, specifically on line 122 but including fields for Title, Author and URL to be used for the addStory call.
2B 2a:
#nav-user-submission defined on index.html, between lines 41 and 53, specifically defined on line 45.
2B 2b:
On main.js, jQuery variables form the two html elements just created are defined between lines 22 and 25.
2B 3: 
function navSubmitStoryClick() is defined on nav.js between lines 17 and 25, this function handles clicking the "submit story" button, which hides excess components with a call to hidePageComponents() on main.js (between lines 36 and 48, this function has been altered - marked "subpart addendum" - to add additional components ensuring a clean page: jQuery variables $submitForm,  $favoriteStories, $ownStoriesand are also hidden) and shows back the full story list with $allStoriesList.show() on nav.js 20.
2B 4: 
Handling the nav.js click on "submit form" occurs on stories.js with $submitForm.on("submit", submitNewStory); on line 132, which calls the async function submitNewStory() defined on stories.js between 103 and 130. This function takes the imput from the submission form in 2b1, creates an object called storyData = {title, url, author, username} on line 110, sets a const for an async call to .addstory() with the currentUser information and the storydata just created and a const $story which calls generateStoryMarkup(story) (defined between lines 23 and 26 - it already existsed but is modified in the next parts); all stories are then prepended to the page and the toplevel function submitReset() is called which resets the submission form.

Subpart 3:

main.js 10 - 13 const $favoriteStories for #favorite-stories and $storiesLists for .stories-list
models.js async function addFavorite(story) defined between 244 and 275 as part of User class

on nav.js, function navFavorites() defined at 27 to 34

on stories.js: 
Within the function generateStoryMarkup(): 
const showStar = Boolean(currentUser); defined at line 29, which shows the favorite star if the currentUser is true for that story
On line 37, ${showStar ? favStar(story, currentUser) : ""} is a ternary operator within the returned story markup which shows the start if the boolean is true for current user. 
The function call to favStar() occurs below at lines 59 to 70, which takes in the story and user as parameters and returns (to line 37) the star icon within an html icon tag to be displayed on the page.


When the #nav-favorites html element is clicked, it calls to the on.click function at line 33 of nav.js, which subsequently calls the navFavorites function at line 28, which subsequently calls the hideCompenents() function and then the showFavorites() function. 

showFavorites() is defined between lines 156 and 173 of stories.js:
First it clears the page of $favoriteStories, then has a conditional statement which either appends "No favorites added! to the page or calls generateStoryMarkup for any stories that happen to be favorited, then calls to $favoriteStories.show(). 

Lastly the async toggleStoryFavorite() function is defined on lines 175 to 192 of stories.js. This is the click handler for clicking the favorite star icon: sets consts for the target, the closest list element to the target, the id of said closest list element, an for finding the particular story in question. The function checks if the story is already a favorite, thus proceeding to remove the favorite (showing the far star icon), otherwise, not being a favorite, adds the filled in fas star icon.
 

 Subpart 4:
 The jQuery const $ownStories is set at line 16 of main.js.

 108-124 models.js:
   //Subpart 4: Deleting a story /------------------------------------------------
    async removeStory(user, storyId) {
      const token = user.loginToken;
      await axios({
        url: `${BASE_URL}/stories/${storyId}`,
        method: "DELETE",
        data: { token: user.loginToken }
      });

      // filter out the story whose ID we are removing
      this.stories = this.stories.filter(story => story.storyId !== storyId);

      // do the same thing for the user's list of stories & their favorites
      user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
      user.favorites = user.favorites.filter(s => s.storyId !== storyId);
    }
  //Subpart 4: Deleting a story ------------------------------------------------/

  36 to 45 of nav.js:
  // Subpart 4: Click "my stories" to show user submissions /-------------------------

function navMyStories() {  
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on("click", "#nav-my-stories", navMyStories);
// Subpart 4: Click "my stories" to show user submissions -------------------------/

line 36 of stories.js, adding trashcan to generateStoryMarkup()
     ${showTrashCan ? getTrashCan() : ""}

getTrashCan (above) is defined on lines 50 to 55 of stories.js:
function getTrashCan() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

deleting a story deleteStory(e) is on 88 to 101 of stories.js:
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

showing user submissions 135 to 152 putUserStoriesOnPage()
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