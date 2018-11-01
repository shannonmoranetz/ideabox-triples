var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');

document.getElementById('card-article').addEventListener('click', updateCardQuality);
document.getElementById('card-article').addEventListener('click', removeCard);
document.getElementById('card-article').addEventListener('focusout', updateCardInputs);
document.getElementById('search-input').addEventListener('keyup', searchFilter);
document.querySelector('.save-button').disabled = true;
document.querySelector('.save-button').addEventListener('click', assignCardProperties);
document.querySelector('.show-more-button').addEventListener('click', expandPage);
document.querySelector('.genius-button').addEventListener('click', geniusFilter);
document.querySelector('.swill-button').addEventListener('click', swillFilter);
document.querySelector('.plausible-button').addEventListener('click', plausibleFilter);
titleInput.addEventListener('keyup', disableButton);

reloadCards();

function assignCardProperties(e) {
  e.preventDefault();
  instanceProperties();
  document.querySelector('.idea-form').reset();
};

function disableButton() {
  var saveButton = document.querySelector('.save-button');
    if (titleInput === '') {
      saveButton.disabled = true;
    } else {
     saveButton.disabled = false;
    }
};

function expandPage(e) {  
  if (e.target.className === 'show-more-button buttons') {
    e.target.classList.add('hide-button');
    var getArticle = document.getElementById('card-article');
    getArticle.classList.remove('overflow');
  }
};

function instanceProperties() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  newIdea.setToStorage(); 
  populateIdeaCard(newIdea);
};

function populateIdeaCard(idea) {
  var card = document.createElement('section');
  var qualityArray = ['Swill', 'Plausible', 'Genius'];
  var cardArticle = document.getElementById('card-article');
  card.className = 'idea-card';
  card.dataset.index = idea.id;
  card.innerHTML = 
    `<div class="card-content">
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
    </footer>`;
  cardArticle.insertBefore(card, cardArticle.firstChild); 
};

function removeCard(e) {
  if (e.target.className === 'icon-size delete-icon') {
    var id = e.target.closest('.idea-card').dataset.index;
    var ideaDeleteMethods = new Idea('', '', id);
    ideaDeleteMethods.deleteFromStorage();
    e.target.closest('.idea-card').remove();
  }
};

function reloadCards() {
  document.querySelector('.idea-form').reset();
    Object.keys(localStorage).forEach(function(key) {
      populateIdeaCard(JSON.parse(localStorage.getItem(key)));
  })
};

function geniusFilter(e) {
  e.preventDefault();
  var qualityCategory = document.querySelectorAll('.quality-category');
  var geniusButtonText = document.querySelector('.genius-button');
    qualityCategory.forEach(function(qualityValue) {
      if (qualityValue.innerText !== geniusButtonText.innerText) {
        qualityValue.closest('.idea-card').classList.add('display-mode-none');
      }
    })
};

function plausibleFilter(e) {
  e.preventDefault();
  var qualityCategory = document.querySelectorAll('.quality-category');
  var plausibleButtonText = document.querySelector('.plausible-button');
    qualityCategory.forEach(function(qualityValue) {
      if (qualityValue.innerText !== plausibleButtonText.innerText) {
        qualityValue.closest('.idea-card').classList.add('display-mode-none');
      }
    })
};

function searchFilter() {
  Object.keys(localStorage).forEach(function(cardObj) {
    let matchingCardsObject = document.getElementById(`${JSON.parse(localStorage[cardObj]).id}`);
    let matchingCards = matchingCardsObject.parentNode.parentNode;
    let localStorageTitle = JSON.parse(localStorage[cardObj]).title;
    let localStorageBody = JSON.parse(localStorage[cardObj]).body;
    let searchInput = document.getElementById('search-input').value.toLowerCase();
      if (!localStorageTitle.toLowerCase().includes(searchInput) && !localStorageBody.toLowerCase().includes(searchInput)) {
        matchingCards.classList.add('display-mode-none');
      } else if (localStorageTitle.toLowerCase().includes(searchInput) && localStorageBody.toLowerCase().includes(searchInput)) {
        matchingCards.classList.remove('display-mode-none');
      }
  })
};

function swillFilter(e) {
  e.preventDefault();
  var qualityCategory = document.querySelectorAll('.quality-category');
  var swillButtonText = document.querySelector('.swill-button');
    qualityCategory.forEach(function(qualityValue) {
      if (qualityValue.innerText !== swillButtonText.innerText) {
        qualityValue.closest('.idea-card').classList.add('display-mode-none');
      }
    })
};

function updateCardInputs(e) {
  var id = e.target.closest('.idea-card').dataset.index;
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  var idea = new Idea(parsedIdea.title, parsedIdea.body, id, parsedIdea.quality);
    if (e.target.className === 'idea-title') {
      idea.updateSelf(e.target.innerText, 'title');
    }
    if (e.target.className === 'idea-body') {
      idea.updateSelf(e.target.innerText, 'body');
    }
};

function updateCardQuality(e) {
  if (e.target.closest('.idea-card') !== null) {
    var id = e.target.closest('.idea-card').dataset.index;
    var idea = JSON.parse(localStorage.getItem(id));
    var ideaQuality = new Idea(idea.title, idea.body, idea.id, idea.quality);
      if (e.target.className === 'icon-size upvote-icon') {
        e.target.nextElementSibling.nextElementSibling.innerText = ideaQuality.updateQuality('up');
      } 
      if (e.target.className === 'icon-size downvote-icon') {
        e.target.nextElementSibling.nextElementSibling.nextElementSibling.innerText = ideaQuality.updateQuality('down');
      }
    }
};