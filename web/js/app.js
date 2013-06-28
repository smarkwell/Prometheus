var stage;
var text;
var needRedraw = false;

var stage_view_x = 0;
var stage_view_y = 0;
var stage_drag = false;

// TODO
// Add backbone.js
// Start refactoring into logical elements

function resize_canvas()
{
            canvas = document.getElementById("canvas");
            download = document.getElementById("download");

//                canvas.width  = window.innerWidth;
//                canvas.height = window.innerHeight - download.offsetHeight;


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

function redraw()
{
	resize_canvas();

	stage.update();
	//FIXME the download data should be done when the button is clicked.
  updateDownloadLink();
	needRedraw = false;

}

function screenAreaChange()
{
  needRedraw = true;
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
          needRedraw=true;
  })



  needRedraw = true;

}



