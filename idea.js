class Idea {
  constructor(id, title, body) {
    this.id = Date.now() || id;
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

// 1. local storage items into array
// 2. delete array items

// findindex of && splice for array values

// 3. quality functionality & new quality array