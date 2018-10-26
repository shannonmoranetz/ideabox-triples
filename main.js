// global variables 
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var saveButton = document.querySelector('.save-button');
var ideaForm = document.querySelector('.idea-form');


reloadCards();

// click save button
saveButton.addEventListener('click', function(e){
  e.preventDefault();
  instanceProperties();
  ideaForm.reset();
});

// click delete button
document.getElementById('card-article').addEventListener('click', function(e) {
  if (e.target.className === 'icon-size delete-icon') {
    var id = e.target.parentNode.parentNode.parentNode.children[0].dataset.index;
    var idea = JSON.parse(localStorage.getItem(id));
    var ideaMethods = new Idea('', '', id);
    ideaMethods.deleteFromStorage();
    e.target.parentNode.parentNode.parentNode.remove();
  }
});

function instanceProperties() {
  var idea = new Idea(titleInput.value, bodyInput.value);
  idea.setToStorage(); 
  populateIdeaCard(idea);
}

function reloadCards() {
  ideaForm.reset();
  Object.keys(localStorage).forEach(function(key){
  populateIdeaCard(JSON.parse(localStorage.getItem(key)));
  });
};

// function to create card
function populateIdeaCard(idea) {
  var card = document.createElement('section');
  var cardArticle = document.getElementById('card-article');
  card.className = 'idea-card';
  card.innerHTML = 
    ` <div class="card-content" data-index=${idea.id}>
        <h2 class="idea-title">${idea.title}</h2>
        <h4 class="idea-body">${idea.body}</h4>
      </div>
      <footer>
        <div class="vote">
          <img class="icon-size downvote-icon"src="images/downvote.svg">
          <img class="icon-size" src="images/upvote.svg">
          <span class="quality-text">Quality:&nbsp;</span>
          <span class="quality-category">Swill</span>
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




