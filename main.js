var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 3;
autoSetCanvasSize()

listenToUser(yyy)

var eraserEnabled = false
pen.onclick = function(){
	eraserEnabled = false;
	pen.classList.add("active")
	eraser.classList.remove("active")
	clear.classList.remove("active")	
}
eraser.onclick = function(){
	eraserEnabled = true
	eraser.classList.add("active")
	pen.classList.remove("active")
	clear.classList.remove("active")
}
clear.onclick = function(){
	context.clearRect(0, 0,yyy.width,yyy.height);
	clear.classList.add("active")
	pen.classList.remove("active")
	eraser.classList.remove("active")
}
download.onclick = function(){
	var url = yyy.toDataURL("image/png")
	var a = document.createElement('a')
	document.body.appendChild(a)
	a.href = url
	a.download = '未标题'
	a.target = '_blank'
	a.click()
}
black.onclick = function(){
	context.fillStyle = 'black'
	black.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
	red.classList.remove('active')
	yellow.classList.remove('active')
}
red.onclick = function (){
	context.fillStyle = 'red'
	context.strokeStyle = 'red'
	red.classList.add('active')
	green.classList.remove('active')
	blue.classList.remove('active')
	black.classList.remove('active')
	yellow.classList.remove('active')
}
blue.onclick = function (){
	context.fillStyle = 'blue'
	context.strokeStyle = 'blue'
	blue.classList.add('active')
	red.classList.remove('active')
	green.classList.remove('active')
	black.classList.remove('active')
	yellow.classList.remove('active')
}
green.onclick = function (){
	context.fillStyle = 'green'
	context.strokeStyle = 'green'
	green.classList.add('active')
	red.classList.remove('active')
	blue.classList.remove('active')
	black.classList.remove('active')
	yellow.classList.remove('active')
}
yellow.onclick = function(){
	context.fillStyle = 'yellow'
	context.strokeStyle = 'yellow'
	yellow.classList.add('active')
	red.classList.remove('active')
	blue.classList.remove('active')
	black.classList.remove('active')
	green.classList.remove('active')
}


thin.onclick = function(){
	lineWidth = 3
	thin.classList.add('active')
	thick.classList.remove('active')
	board.classList.remove('active')
}
thick.onclick = function(){
	lineWidth = 4
	thick.classList.add('active')
	board.classList.remove('active')
	thin.classList.remove('active')
}
board.onclick = function(){
	lineWidth = 5
	board.classList.add('active')
	thick.classList.remove('active')
	thin.classList.remove('active')
}
	/*********/
function listenToUser(canvas){
	function drawCircle(x,y,radius){
		context.beginPath()
		context.arc(x,y,lineWidth/2,0,Math.PI*2);
		context.fill()		
	}
	var using = false
	var lastPoint = {x:undefined, y:undefined}
	//特性检测
	if(document.body.ontouchstart !== undefined){
		//触屏
		canvas.ontouchstart = function(aaa){
			var x = aaa.touches[0].clientX
			var y = aaa.touches[0].clientY
			console.log(x,y)
			using = true
			if(eraserEnabled){
				context.clearRect(x-5,y-5,10,10)
			}else{
				lastPoint = {"x":x,"y":y}
				drawCircle(x,y,2)
			}
		}
		canvas.ontouchmove = function(aaa){
			var x = aaa.touches[0].clientX
			var y = aaa.touches[0].clientY
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
		canvas.ontouchend = function(){
			using = false
		}
	}else{
		//非触屏
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
}
function drawLine(x1, y1, x2, y2){
	context.beginPath()
	context.moveTo(x1,y1)
	context.lineWidth = lineWidth
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