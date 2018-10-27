class Idea {
  constructor(title, body, id, quality) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.quality = quality || 0;
  }

  setToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }  

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  } 

  updateQuality(quality) {
    if (this.quality[0]) {
      console.log(this.quality[1]);
      return this.quality[1];
    } 
    else if (this.quality[1]) {
      return this.quality[2];
      console.log(this.quality[2]);
    } else {
      return;
    }
    // this.quality[quality]++;
    // this.assignedQuality.quality++;
  }

// updateSelf


};

// utilize debugger!! to stop function in it's tracks 
// and see where the methods aren't being used anymore