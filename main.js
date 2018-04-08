var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize()

listenToMouse(yyy)

var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
	actions.className = 'actions x'
}
brush.onclick = function(){
	eraserEnabled = false
	actions.className = 'actions'
}
	/*********/
function listenToMouse(canvas){
	function drawCircle(x,y,radius){
		context.beginPath()
		context.arc(x,y,2,0,Math.PI*2);
		context.fill()
	}
	var using = false
	var lastPoint = {x:undefined, y:undefined}
	canvas.onmousedown = function(aaa){
		var x = aaa.clientX
		var y = aaa.clientY
		using = true
		if(eraserEnabled){
			context.clearRect(x-5,y-5,10,10)
		}else{
			lastPoint = {"x":x,"y":y}
			drawCircle(x,y,2)
		}
	}
	canvas.onmousemove = function(aaa){
		var x = aaa.clientX
		var y = aaa.clientY
		if(!using){ return }
		if(eraserEnabled){
				context.clearRect(x-5,y-5,10,10)			
		}else{
				var newPoint = {"x":x,"y":y}
				drawCircle(x,y,2)
				drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
				lastPoint = newPoint
		}
	}
	canvas.onmouseup = function(aaa){
		using = false
	}
}
function drawLine(x1, y1, x2, y2){
	context.beginPath()
	context.moveTo(x1,y1)
	context.lineWidth = 4
	context.lineTo(x2,y2)
	context.stroke()
	context.closePath()
}
function autoSetCanvasSize(canvas){
	sizeFlow()

  window.onresize = function(){
    sizeFlow()
  }
  function sizeFlow(){
	  var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    yyy.width = pageWidth
    yyy.height = pageHeight
  }
}