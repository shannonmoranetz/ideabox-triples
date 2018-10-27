// global variables 
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var ideaForm = document.querySelector('.idea-form');

reloadCards();

// click save button
document.querySelector('.save-button').addEventListener('click', function(e){
  e.preventDefault();
  instanceProperties();
  ideaForm.reset();
});

// event listeners on up/down votes 
// change the index of the qualityArray


// click delete button
document.getElementById('card-article').addEventListener('click', function(e) {
  if (e.target.className === 'icon-size delete-icon') {
    var id = e.target.closest('.idea-card').dataset.index;
    var ideaDeleteMethods = new Idea('', '', id);
    ideaDeleteMethods.deleteFromStorage();
    e.target.closest('.idea-card').remove();
    }
});

function instanceProperties() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  newIdea.setToStorage(); 
  populateIdeaCard(newIdea);
}

function reloadCards() {
  ideaForm.reset();
  Object.keys(localStorage).forEach(function(key){
  populateIdeaCard(JSON.parse(localStorage.getItem(key)));
  });
};

// function to UPvote quality
document.getElementById('card-article').addEventListener('click', function(e){
  if (e.target.className === 'icon-size upvote-icon') {
    var id = e.target.closest('.idea-card').dataset.index;
    var idea = JSON.parse(localStorage.getItem(id));
    var ideaQuality = new Idea(idea.title, idea.body, idea.id, idea.quality);
    e.target.nextElementSibling.nextElementSibling.innerText = ideaQuality.updateQuality('up');
    // console.log(ideaQuality);
  }
});

// function to DOWNvote quality



// function to create card
function populateIdeaCard(idea) {
  var card = document.createElement('section');
  var qualityArray = ['Swill', 'Plausible', 'Genius'];
  var cardArticle = document.getElementById('card-article');
  card.className = 'idea-card';
  card.dataset.index =  idea.id;
  card.innerHTML = 
    ` <div class="card-content">
        <h2 class="idea-title">${idea.title}</h2>
        <h4 class="idea-body">${idea.body}</h4>
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
    cardArticle.appendChild(card);
}

//  indexOf 
//  get elements by tag name (document selector) for all the articles 
//  use a for loop iterates over every section using indexOf and 
//  it's case sensitive so make sure everything is lowercase 
//  manipulate the classname which display: none;




