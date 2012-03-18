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
      rotateStep:1,
      scaleStep:0.1,
      visualScaling:10,
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
    $controls,$overview,$impress;

  handlers.move=function(x,y){
      console.log(x,state.data.x);
      state.data.x= ~~(state.data.x)+x*config.visualScaling;
      state.data.y= ~~(state.data.y)+y*config.visualScaling;
  };
  handlers.scale=function(x){
      state.data.scale-= -x * config.scaleStep*config.visualScaling/10;
  };
  handlers.rotate=function(x){
      console.log(state.rotate);
      state.data.rotate-= -x*config.rotateStep;
  };
  
  //hackity hacky hack hack
  window['--omgWhatAHack']=function(x){
      config.visualScaling=x;
      alert(x);
      }
  

  function init(conf){
    config=$.extend(config,conf);
    
    $impress=$('#impress');
    
    $controls=$('<div></div>').hide().css({
        padding:'5px',
        background: '#222',
        color: '#fff',
        width: '40px',
        'text-align': 'center'
        });
    
    $('<div></div>').text('M').data('func','move').appendTo($controls);
    $('<div></div>').text('R').data('func','rotate').appendTo($controls);
    $('<div></div>').text('S').data('func','scale').appendTo($controls);
    
    $('<span></span>').text('E').appendTo($controls).click(function() {
        var $t = $(this);
        if(state.editing){
            state.editing=false;
            state.$node.html($t.parent().find('textarea').val());
            $t.parent().find('textarea').remove();
        }else{
            state.edititng=true;
            $t.after($('<textarea>').val(state.$node.html()));
        }
    });
    
    var showTimer;
    
    $controls.appendTo('body').on('mousedown','div',function(e){
        e.preventDefault();
        mouse.activeFunction=handlers[$(this).data('func')];
        loadData();
        mouse.prevX=e.pageX;
        mouse.prevY=e.pageY;
        $(document).on('mousemove.handler1',handleMouseMove);
        return false;
        }).on('mouseenter',function(){
            clearTimeout(showTimer);
        });
    $(document).on('mouseup',function(){
        mouse.activeFunction=false;
        $(document).off('mousemove.handler1');
        });
    
    $('body').on('mouseenter','.step',function(){
        var $t=$(this);
        showTimer=setTimeout(function(){
            if(!mouse.activeFunction){
            //show controls
            state.$node=$t;
            showControls(state.$node);
            }
        },1000);
        $t.data('showTimer',showTimer);
    }).on('mouseleave','.step',function(){
        //not showing when not staying
        clearTimeout($(this).data('showTimer'));
    });
    
    /*
    $overview=$('<div></div>').attr({id:'builderOverAll','class':'step','data-x':"3000", 'data-y':"1500", 'data-scale':"10"}).prependTo('#impress');
    config.redrawFunction($overview[0]);
        //this doesnt seem to work. I'll have to update impress to a version that has API already
        $overview.trigger('click');
    */
    
  }
  
  function showControls($where){
    var pos=$where.offset();
    $controls.offset({top:pos.top+100/config.visualScaling,left:pos.left+100/config.visualScaling}).show();
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
        showControls(state.$node);
        //console.log(['redrawn',state.$node[0].dataset]);
    },50);
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
