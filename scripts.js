new Vue({
  el: '#app',

  data: { 
    numClicks: 0,
    active: false,
    secs: 10,
    items: [],
    GameOver: 'Click Here!',
    id: 1,
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    Finished: 'Good Luck!',
  },

  mounted:function() {

    setInterval(() => {
      if(this.active){
      this.secs -= 1;
      if(this.secs == 0){
        this.active = false;
        this.GameOver = 'Game Over!!';
        if (this.numClicks > this.fifth) {
          if (this.numClicks > this.fourth) {
            if (this.numClicks > this.third) {
              if (this.numClicks > this.second) {
                if (this.numClicks > this.first) {
                  this.fifth = this.fourth;
                  this.fourth = this.third;
                  this.third = this.second;
                  this.second = this.first;
                  this.first = this.numClicks;
                  this.highscore = this.numClicks;
                }
                else {
                  this.fifth = this.fourth;
                  this.fourth = this.third;
                  this.third = this.second;
                  this.second = this.numClicks
                }
              }
              else {
                this.fifth = this.fourth;
                this.fourth = this.third;
                this.third = this.numClicks;
              }
            }
            else {
              this.fifth = this.fourth;
              this.fourth = this.numClicks;
            }
            
          }
          else {
            this.fifth = this.numClicks;
          }
        }
        if (this.numClicks < 10) {
          this.Finished = 'Seriously dude?';
        }
        else if (this.numClicks < 20) {
          this.Finished = 'Are you using your nose or something?';
        }
        else if (this.numClicks < 30) {
          this.Finished = 'Not too shabby... for my grandma!';
        }
        else if (this.numClicks < 40) {
          this.Finished = 'Come on, I think you can still do better!';
        }
        else if (this.numClicks < 50) {
          this.Finished = 'You did okay. B-.';
        }   
        else if (this.numClicks < 60) {
          this.Finished = 'Not too shabby!';
        }   
        else if (this.numClicks < 70) {
          this.Finished = 'Hmmm.. yeah I\'m a bit impressed';
        }   
        else if (this.numClicks < 80) {
          this.Finished = 'Holy smokes you\'ve got quite the finger!';
        }   
        else if (this.numClicks < 90) {
          this.Finished = 'You are the computer mouse god!';
        }   
        
    }
    this.updateScores();
}

 }, 1000);


  },

  created: function() {
    this.getItems();
  },
  
  methods: {
      updateCount: function () {
          if (this.secs != 0 ) {
          this.numClicks += 1; 
          }
          if (this.secs == 10) {
          this.active = true;   
          }
      },

      async getItems() {
        try {
          const response = await axios.get("/api/items");
          this.items = response.data;
          this.first = response.data[0].first;
          this.second = response.data[0].second;
          this.third = response.data[0].third;
          this.fourth = response.data[0].fourth;
          this.fifth = response.data[0].fifth;
        } catch (error) {
          console.log(error);
        }
      },

      async updateScores() {
        try {
          const response = axios.put("/api/items/", {
            id: 1,
            first: this.first, 
            second: this.second,
            third: this.third,
            fourth: this.fourth,
            fifth: this.fifth
          });
          this.getItems();
        } catch (error) {
          console.log(error);
        }
      },

      reset: function () {
        this.numClicks = 0;
        this.secs = 10;
        this.active = false;
        this.Finished = 'Good Luck!';
        this.GameOver = 'Click Here!';
      },

      startInterval: function () {
        setInterval(() => {
             this.secs += 1
        }, 1000);
  }
}

})