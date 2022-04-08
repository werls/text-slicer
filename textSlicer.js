// textSlicer
// Werllen Castro, 2021
// github.com/werls
// —
// Originally made for Lâmina — MOSTRA AUDIOVISUAL PRETA
// http://mostralamina.com.br

class textSlicer {  
    constructor(txt, distortion) {
        this.txt = txt;
        this.c = 255;
        this.distortion = distortion; 
    }
    
    setupCanvas() {    
    this.mycanvas = createCanvas(windowWidth, windowHeight);
          
        if (windowWidth >= windowHeight) {
            this.txt_h = windowHeight / 5;
            this.div = 12;
        } else {
            this.txt_h = windowHeight / 10;
            this.div = 5;
        }
    }
  
    setupText(txt) {
      this.txt_w = this.getTextWidth(this.txt, myfont, this.txt_h);
      this.mod_w = width/this.div;
      this.pos = createVector(width / 2, height / 2);
          
      this.textCanvas = createGraphics(width + this.mod_w,height + this.mod_w);
      this.textCanvas.textAlign(CENTER,CENTER);
      this.textCanvas.fill(this.c);
      this.textCanvas.textFont(myfont);
      this.textCanvas.textSize(this.txt_h);
      this.textCanvas.textLeading(this.txt_h);
    }
    
    getWidth() {
        let txt = this.txt.split('\n');
        let txt_list = [];
        for (let i = 0; i < txt.length; i++) {
            txt_list.push(max(txt[i].length));
        }
        let txtSize = this.getTextWidth(txt[this.indexOfMax(txt_list)], myfont, this.txt_h);
        return txtSize;
    }
  
    show() {
        this.textCanvas.clear();
        this.textCanvas.text(this.txt,this.pos.x + this.mod_w / 2,this.pos.y);
        translate(0, 0);
        for (let i = 0; i < this.div + 1; i++) {
                
            // Thanks to Murilo Polese
            // for this snippet!
            // http://www.murilopolese.com/
            image(
                this.textCanvas,
                this.mod_w * i, 0, // position
                this.mod_w, height, // final size
                // crop origin
                map(
                    this.calculateSine(frameCount + i * this.distortion),
                    -1, 1,
                    this.mod_w * i, this.mod_w * i + this.mod_w
                    ), 0,
                    this.mod_w, height // crop size
                )
            //
        }
            
        let objWidth = this.getWidth();
        let objHeight = this.div * this.txt_h;
    }
    
    getTextWidth(txt, font, fontsize) {
        let myTextWidth;
        textFont(font);
        textSize(fontsize);
        myTextWidth = textWidth(txt);
        return myTextWidth;
    }
  
    isMobile() {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
  
    calculateSine(deg) {
        var radians = (Math.PI / 180) * deg;  
        return Math.sin(radians);
    } 
    
    indexOfMax(arr) {
      if (arr.length === 0) {
          return -1;
      }
      var max = arr[0];
      var maxIndex = 0;
      for (var i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
              maxIndex = i;
              max = arr[i];
          }
      }
      return maxIndex;
    }
  }