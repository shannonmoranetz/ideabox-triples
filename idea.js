class Idea {
  constructor(title, body, id) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  } 

  setToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }  

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  } 

// updateSelf

// updateQuality

};

// utilize debugger!! to stop function in it's tracks 
// and see where the methods aren't being used anymore