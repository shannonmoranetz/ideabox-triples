// global variables 
var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');
var saveButton = document.querySelector('.save-button');
var ideaForm = document.querySelector('.idea-form');
var ideaArray = [];

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
    e.target.parentNode.parentNode.parentNode.remove();
    // specify which id is to be deleted
    idea.deleteFromStorage();
  }
});

function instanceProperties() {
  var idea = new Idea(titleInput.value, bodyInput.value);
  idea.setToStorage(); 
  ideaArray.push(JSON.parse(localStorage.getItem(idea.id))); 
  localStorage.setItem('ideaArray', JSON.stringify(ideaArray));
  var storedArray = JSON.parse(localStorage.getItem('ideaArray'));

  populateIdeaCard(idea);
  
  console.log(storedArray);
}

function reloadCards() {
  ideaForm.reset();

  Object.keys(localStorage).forEach(function(key){
  populateIdeaCard(JSON.parse(localStorage.getItem(key)));
  })
};

// function to create card
function populateIdeaCard(idea) {
  var card = document.createElement('section');
  var cardArticle = document.getElementById('card-article');
  card.className = 'idea-card';
  card.innerHTML = 
    ` <div class="card-content" id=${idea.id}>
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
