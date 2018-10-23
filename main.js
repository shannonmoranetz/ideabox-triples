
// var doc query title input, body input
// event listener for save button 
// createElement for new idea in response to save button

// global variables 

var titleInput = document.getElementById('title-input');
var bodyInput = document.getElementById('body-input');

var saveButton = document.querySelector('.save-button');


var ideaTitle = document.querySelector('.idea-title');
var ideaBody = document.querySelector('.idea-body');

// event listeners

// click save button
saveButton.addEventListener('click', function(e) {
  e.preventDefault();
  addIdeaCard();
});

// click delete button
document.getElementById('card-article').addEventListener('click', function(e) {
  if (e.target.className === 'icon-size delete-icon') {
    e.target.parentNode.parentNode.parentNode.remove();
  }

});

// functions 

// function to create card
function addIdeaCard() {
  var card = document.createElement('section');
  var cardArticle = document.getElementById('card-article');
  card.className = 'idea-card';
  card.innerHTML = 
    ` <div class="card-content">
        <h2 class="idea-title">${titleInput.value}</h2>
        <h4 class="idea-body">${bodyInput.value}</h4>
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
