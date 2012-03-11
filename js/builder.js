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
    handlers={},
    redrawTimeout,
    $controls;

  handlers.move=function(x,y){
      console.log(x,state.data.x);
      state.data.x= ~~(state.data.x)+x*10;
      state.data.y= ~~(state.data.y)+y*10;
  };
  handlers.scale=function(x,y){
      state.scale-= -y;
  };
  handlers.rotate=function(x){
      state.rotate-= -x;
  };
  

  function init(conf){
    config=$.extend(config,conf);
    
    
    $controls=$('<div></div>').hide();
    
    $('<div></div>').text('M').data('func','move').appendTo($controls);
    $('<div></div>').text('R').data('func','rotate').appendTo($controls);
    $('<div></div>').text('S').data('func','scale').appendTo($controls);
    
    $controls.appendTo('body').on('mousedown','div',function(e){
        mouse.activeFunction=handlers[$(this).data('func')];
        loadData();
        mouse.prevX=e.pageX;
        mouse.prevY=e.pageY;
        $(document).on('mousemove.handler1',handleMouseMove);
        });
    $(document).on('mouseup',function(){
        mouse.activeFunction=false;
        $(document).off('mousemove.handler1');
        });
    
    $('body').on('mouseenter','.step',function(){
        if(!mouse.activeFunction){
        //show controls
        state.$node=$(this);
        showControls(state.$node);
        }
    });
  }
  
  function showControls(where){
    $controls.offset(where.offset()).show();
    //$controls.prependTo(where).show();
  }
  
  
  function loadData(){
      console.log('load',state.$node[0].dataset.x);
    //state.data=state.$node[0].dataset;
    //add defaults
    
    
    state.data.x=state.$node[0].dataset.x || defaults.x;   
    state.data.y=state.$node[0].dataset.y || defaults.y;   
    state.data.scale=state.$node[0].dataset.scale || defaults.scale;   
    state.data.rotate=state.$node[0].dataset.rotate || defaults.rotate;   
    
  }
  
  function redraw(){
    clearTimeout(redrawTimeout);
    redrawTimeout=setTimeout(function(){
        //state.$node[0].dataset=state.data;
        
        state.$node[0].dataset.scale=state.data.scale;
        state.$node[0].dataset.rotate=state.data.rotate;
        state.$node[0].dataset.x=state.data.x;
        state.$node[0].dataset.y=state.data.y;
        /**/
        console.log(state.data,state.$node[0].dataset,state.$node[0].dataset===state.data);
        
        config.redrawFunction(state.$node[0]);
        showControls();
        //console.log(['redrawn',state.$node[0].dataset]);
    },200);
  }
  
  function handleMouseMove(e){
      e.preventDefault();
      e.stopPropagation();
      
      
    var x=e.pageX-mouse.prevX,
        y=e.pageY-mouse.prevY;
        
        mouse.prevX=e.pageX;
        mouse.prevY=e.pageY;
    if(mouse.activeFunction){
        mouse.activeFunction(x,y);
        redraw();
    }
    
    return false;
  }
  
  return {
      init:init
  };

})();
