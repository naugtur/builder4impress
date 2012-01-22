Builder=(function(){
  var state={
      editing:false,
      node:false,
      data:{
        x:0,
        y:0,
        rotate:0,
        scale:0
        }
      },
    config={
      rotateStep:3,
      scaleStep:1,
      moveStep:50,
      redrawFunction:false
      },
    defaults={
      x:0,
      y:0,
      rotate:0,
      scale:1
      };
      
  function init(conf){
    config=$.extend(config,conf);
    
    $('body').on('mouseenter','.step',function(e){
      //show controls
    }
  }
  

})();
