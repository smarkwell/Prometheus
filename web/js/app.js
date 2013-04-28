var stage;
var text;
var needRedraw = false;

// TODO
// Add backbone.js
// Start refactoring into logical elements

function resize_canvas()
{
            canvas = document.getElementById("canvas");
            download = document.getElementById("download");
            
                canvas.width  = window.innerWidth;
                canvas.height = window.innerHeight - download.offsetHeight;
            
            
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
  downloadarea = document.getElementById("download");
  canvas = document.getElementById("canvas");
  
  downloadarea.innerHTML = '<a href="' + canvas.toDataURL("image/png") + '" download="YourDownloadSir.png">Download</a>';
  
  
}

function init()
{
	// new stage
	stage = new createjs.Stage(document.getElementById("canvas"));
	stage.enableMouseOver();
	 
	 
	text = new createjs.Text("Drag and drop the shapes", "30px Arial", "#000000");
	 
	stage.addChild(text);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);
  
   needRedraw = true;
   initCircleMenu();
}

function initCircleMenu()
{
   $('circle-test').circleMenu({
      item_diameter: 40,
      circle_radius: 100,
      direction: 'bottom-right'
   });
   
}

