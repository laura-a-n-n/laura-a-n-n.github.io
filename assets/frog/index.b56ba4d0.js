class GUIWindow{constructor(t,i,s,h,e,x,n){this.x=t,this.y=i,this.w=s,this.h=h,this.margin=e,this.title=x,this.message=n}draw(t){push(),tint(255,t),image(gfx.questBox,this.x,this.y),fill(255,t),textSize(32),textFont(pixelFont),textAlign(CENTER),text(this.title,this.x+this.w/2,this.y+4*this.margin),stroke(0,t),textSize(30),text(this.message,this.x+this.w/2,this.y+this.h/3+2*this.margin),pop()}}
//# sourceMappingURL=index.b56ba4d0.js.map
