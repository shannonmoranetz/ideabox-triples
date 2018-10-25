class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  } 

  setToStorage() {
   localStorage.setItem(this.id, JSON.stringify(this));
  }  

// deleteFromStorage

// function deleteKey() {
//   Object.keys(localStorage).forEach(function(key) {
//     localStorage.removeItem(key);
//   })
// }

// updateSelf

// updateQuality

};