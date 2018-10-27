class Idea {
  constructor(title, body, id, quality) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.quality = ['Swill', 'Plausible', 'Genius'];
  }

  setToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }  

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  } 

  updateQuality(quality) {
    console.log(this.quality);
    if (this.quality === 'Swill') {
      this.quality = 'Plausible';
      console.log('fire')
    }
    else if (this.quality === 'Plausible') {
      this.quality = 'Genius';
      console.log('hi')

    }
  }


// updateSelf

};

// utilize debugger!! to stop function in it's tracks 
// and see where the methods aren't being used anymore