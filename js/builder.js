Builder=(function(){
  var state={
      editing:false,
      $node:false,
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
      },
    mouse={
     prevX:false,
     prevY:false,
     activeFunction:false
    },
    handlers,
    redrawTimeout,
    $controls;

  handlers.move=function(x,y){
      state.data.x+=x;
      state.data.y+=y;
  };
  handlers.scale=function(x,y){
      state.scale+=y;
  };
  handlers.rotate=function(x){
      state.rotate+=x;
  };
  

  function init(conf){
    config=$.extend(config,conf);
    
    
    $controls=$('<div></div>');
    $('<div></div>').text('move').appendTo($controls);
    $('<div></div>').text('rotate').appendTo($controls);
    $('<div></div>').text('scale').appendTo($controls);
    
    $controls.on('mousedown','div',function(){
        mouse.activeFunction=handlers[$(this).text()];
        loadData();
        $(document).on('mousemove.handler1',handleMouseMove);
        });
    $controls.on('mouseup','div',function(){
        mouse.activeFunction=false;
        $(document).off('mousemove.handler1');
        });
    
    $('body').on('mouseenter','.step',function(){
      //show controls
      state.$node=$(this);
      showControls(state.$node);
    });
  }
  
  function showControls(where){
    $controls.offset(where.offset());
  }
  
  
  function loadData(){
    state.data.x=state.$node.attr('data-x') || defaults.x;   
    state.data.y=state.$node.attr('data-y') || defaults.y;   
    state.data.scale=state.$node.attr('data-scale') || defaults.scale;   
    state.data.rotate=state.$node.attr('data-rotate') || defaults.rotate;   
  }
  
  function redraw(){
    clearTimeout(redrawTimeout);
    redrawTimeout=setTimeout(function(){
        state.$node.attr('data-x',state.data.x);   
        state.$node.attr('data-y',state.data.y);
        state.$node.attr('data-scale',state.data.scale);   
        state.$node.attr('data-rotate',state.data.rotate);
        window['--drawSlideGlobalHandler'](state.$node[0]);
    },200);
  }
  
  function handleMouseMove(e){
    var x=e.pageX-mouse.prevX,
        y=e.pageY-mouse.prevY;
        
        mouse.prevX=e.pageX;
        mouse.prevY=e.pageY;
    if(mouse.activeFunction){
        mouse.activeFunction(x,y);
        redraw();
    }
  }
  
  return {
      init:init
  };

})();
