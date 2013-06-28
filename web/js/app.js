var stage;
var text;
var needRedraw = false;

var stage_view_x = 0;
var stage_view_y = 0;
var stage_drag = false;

var grid_spacing = 40;
var grid_spacingdiv2 = grid_spacing / 2;

// TODO
// Add backbone.js
// Start refactoring into logical elements


function drawGrid(canvas)
{

  bw = canvas.width;
  bh = canvas.height;

  context = canvas.getContext('2d');

  p = 0; //Padding


  //Horizontal
  for (var x = stage_view_x + grid_spacingdiv2; x <= bw; x += grid_spacing) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

//Vertical
    for (var y = stage_view_y + grid_spacingdiv2; y <= bh; y += grid_spacing) {
        context.moveTo(p, 0.5 + y + p);
        context.lineTo(bw + p, 0.5 + y + p);
    }

    context.strokeStyle = "black";
    context.stroke();
}

function resize_canvas()
{
            canvas = document.getElementById("canvas");
            menu = document.getElementById("menu");


            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight - menu.offsetHeight;




            text.x = canvas.width/2 - text.getMeasuredWidth()/2;
       	 	text.y = canvas.height/2 - text.getMeasuredHeight()/2;

}

function handleTick(event)
{
  if(!event.paused)
  {


    if(needRedraw)
    {
      redraw();
    }

  }

}

function startFullScreen() {

  element = document.documentElement;
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function stopFullScreen()
{

    if(document.cancelFullScreen)
    {
      document.cancelFullScreen();
    }
    else if(document.mozCancelFullScreen)
    {
      document.mozCancelFullScreen();
    }
    else if(document.webkitCancelFullScreen)
    {
      document.webkitCancelFullScreen();
    }
}

function toggleFullScreen()
{
  fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

  if(fullscreenElement)
  {
    stopFullScreen();
  }
  else
  {
    startFullScreen();
  }

}

function redraw()
{

  canvas = document.getElementById("canvas");

	stage.update();
  drawGrid(canvas);

	//FIXME the download data should be done when the button is clicked.
  updateDownloadLink();
	needRedraw = false;

}

function screenAreaChange()
{
  resize_canvas();
  needRedraw = true;
  redraw();
}

function fullscreenModeChange()
{

  fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

  if(fullscreenElement)
  {
      $("#fullscreenbtn").addClass("active");
  }
  else
  {
      $("#fullscreenbtn").removeClass("active");

  }
}

function updateDownloadLink()
{

  canvas = document.getElementById("canvas");

  downloadbutton = document.getElementById("download");

  downloadbutton.href = canvas.toDataURL("image/png");




}

function stageDrag(event)
{

}

function init()
{

  // disable click/drag for text highlight

  document.getElementById("canvas").onselectstart = function() {
      return false;
  };

  // Setup DOM event listners

  window.addEventListener('resize', screenAreaChange, false);
  window.addEventListener('orientationchange', screenAreaChange, false);

  $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange',fullscreenModeChange);



	// new stage
	stage = new createjs.Stage(document.getElementById("canvas"));
	stage.enableMouseOver();


	text = new createjs.Text("Drag and drop the shapes", "30px Arial", "#000000");

	stage.addChild(text);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);

  //createjs.Touch.enable(stage);

  stage.enableMouseOver(10);
  stage.mouseMoveOutside = true;

  stage.addEventListener("stagemousedown",function(evt)  {
      stage_drag = true;
  })

  stage.addEventListener("stagemouseup",function(evt){
      stage_drag = false;
  })


  stage.addEventListener("stagemousemove", function(evt){
          //stage_view_x += evt.stageX;
          //stage_view_y += evt.stageY;
          //stage.setTransform(stage_view_x,stage_view_y);
          //needRedraw=true;
  })


  screenAreaChange();

}



