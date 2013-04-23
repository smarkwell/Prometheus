
var stage;
var text;

function resize_canvas()
{
            canvas = document.getElementById("canvas");
            
                canvas.width  = window.innerWidth;
            

                canvas.height = window.innerHeight;
            
            
            text.x = canvas.width/2 - text.getMeasuredWidth()/2;
       	 	text.y = canvas.height/2 - text.getMeasuredHeight()/2;

}

function redraw()
{
	resize_canvas();
	stage.update();
	
}

function init()
{
	 //new stage
	 stage = new createjs.Stage(document.getElementById("canvas"));
	 stage.enableMouseOver();
	 
	 
	 text = new createjs.Text("Drag and drop the shapes", "30px Arial", "#000000");
	 
	 stage.addChild(text);
	 
	 redraw();
}