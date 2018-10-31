// global variables 
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var ideaForm = document.querySelector('.idea-form');
var saveButton = document.querySelector('.save-button');

reloadCards();
saveButton.disabled = true;


// click save button
document.querySelector('.save-button').addEventListener('click', function(e){
  e.preventDefault();
  instanceProperties();
  ideaForm.reset();
});

// 

titleInput.addEventListener('keyup', function(){
    if (titleInput === '') {
      saveButton.disabled = true;
    } else {
     saveButton.disabled = false;
    }
  });



// click delete button
document.getElementById('card-article').addEventListener('click', function(e) {
  if (e.target.className === 'icon-size delete-icon') {
    var id = e.target.closest('.idea-card').dataset.index;
    var ideaDeleteMethods = new Idea('', '', id);
    ideaDeleteMethods.deleteFromStorage();
    e.target.closest('.idea-card').remove();
  }
});

// update quality 
document.getElementById('card-article').addEventListener('click', function(e){
  if (e.target.className === 'icon-size upvote-icon') {
    var id = e.target.closest('.idea-card').dataset.index;
    var idea = JSON.parse(localStorage.getItem(id));
    var ideaQuality = new Idea(idea.title, idea.body, idea.id, idea.quality);
    e.target.nextElementSibling.nextElementSibling.innerText = ideaQuality.updateQuality('up');
  }
  if (e.target.className === 'icon-size downvote-icon') {
    var id = e.target.closest('.idea-card').dataset.index;
    var idea = JSON.parse(localStorage.getItem(id));
    var ideaQuality = new Idea(idea.title, idea.body, idea.id, idea.quality);
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText = ideaQuality.updateQuality('down');
  }
});

// edit idea
document.getElementById('card-article').addEventListener('focusout', function(e) {
  if (e.target.className === 'idea-title') {
    var id = e.target.closest('.idea-card').dataset.index;
    var parsedIdea = JSON.parse(localStorage.getItem(id));
    var idea = new Idea(parsedIdea.title, parsedIdea.body, id, parsedIdea.quality);
    idea.updateSelf(e.target.innerText, 'title');
  }
  if (e.target.className === 'idea-body') {
    var id = e.target.closest('.idea-card').dataset.index;
    var parsedIdea = JSON.parse(localStorage.getItem(id));
    var idea = new Idea(parsedIdea.title, parsedIdea.body, id, parsedIdea.quality);
    idea.updateSelf(e.target.innerText, 'body');
  }
});

function reloadCards() {
  ideaForm.reset();
  Object.keys(localStorage).forEach(function(key){
    populateIdeaCard(JSON.parse(localStorage.getItem(key)));
  });
};

function instanceProperties() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  newIdea.setToStorage(); 
  populateIdeaCard(newIdea);
}


// Event listener for the search bar
document.getElementById('search-input').addEventListener('keyup', searchFilter);

// function to filter ideas
function searchFilter() {
  Object.keys(localStorage).forEach(function(cardObj) {
    let matchingCardsObject = document.getElementById(`${JSON.parse(localStorage[cardObj]).id}`);
    let matchingCards = matchingCardsObject.parentNode.parentNode;
    let localStorageTitle = JSON.parse(localStorage[cardObj]).title;
    let localStorageBody = JSON.parse(localStorage[cardObj]).body;
    let searchInput = document.getElementById('search-input').value.toLowerCase();

    if (!localStorageTitle.toLowerCase().includes(searchInput) && !localStorageBody.toLowerCase().includes(searchInput)) {
      matchingCards.classList.add('display-mode-none')
    } else if (localStorageTitle.toLowerCase().includes(searchInput) && localStorageBody.toLowerCase().includes(searchInput)) {
      matchingCards.classList.remove('display-mode-none')
    }
  });
}

document.querySelector('.swill').addEventListener('click', function(e) {
  var qualityCategory = document.querySelectorAll('.quality-category');
  var swillButtonText = document.querySelector('.swill');
  e.preventDefault();
  console.log(qualityCategory)
    qualityCategory.forEach(function(qualityValue) {
      if (document.querySelectorAll('.quality-category').innerText == swillButtonText.innerText) {
        qualityCategory.parentNode.parentNode.parentNode.classList.add('display-mode-none')
      }
    })
})

  // var plausibleButtonText = document.querySelector('.plausible');
  // var geniusButtonText = document.querySelector('.genius');
  

document.querySelector('.show-more-button').addEventListener('click', function(e) {
  if (e.target.className === 'show-more-button buttons') {
  console.log('fire')
    e.target.classList.add('hide-button');
    var getArticle = document.getElementById('card-article');
    getArticle.classList.remove('overflow');
  }
})



// function to create card
function populateIdeaCard(idea) {
  var card = document.createElement('section');
  var qualityArray = ['Swill', 'Plausible', 'Genius'];
  var cardArticle = document.getElementById('card-article');
  card.className = 'idea-card';
  card.dataset.index =  idea.id;
  card.innerHTML = 
  ` <div class="card-content">
  <h2 class="idea-title" id="${idea.id}" contenteditable= "true">${idea.title}</h2>
  <h4 class="idea-body" contenteditable="true">${idea.body}</h4>
  </div>

  <footer>
  <div class="vote">
  <img class="icon-size downvote-icon"src="images/downvote.svg">
  <img class="icon-size upvote-icon" src="images/upvote.svg">
  <span class="quality-text">Quality:&nbsp;</span>
  <span class="quality-category">${qualityArray[idea.quality]}</span>
  </div>
  <div class="delete">
  <img class="icon-size delete-icon" src="images/delete.svg">
  </div>
  </footer> `;
  cardArticle.insertBefore(card, cardArticle.firstChild); 
}

//  get elements by tag name (document selector) for all the articles 
//  use a for loop iterates over every section using indexOf and 
//  it's case sensitive so make sure everything is lowercase 
//  manipulate the classname which display: none;




