"use strict";

var canvas;
var canvas2;
var gl;
var gl2;

var theta = 0.0;
var theta2 = 0.0;
var thetaLoc;
var thetaLoc2;
var direction = 1;
var direction2 = 1;
var speed = 50;
var speed2 = 100;

function changeDir(){
	direction *= -1;
}

function changeDir2(){
	direction2 *= -1;
}
function initRotSquare(){
	canvas = document.getElementById( "rot-canvas" );
	gl = WebGLUtils.setupWebGL( canvas, "experimental-webgl" );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl, "rot-v-shader", "rot-f-shader" );
	gl.useProgram( program );

	var vertices = [
		 0,  1,  0,
		-1,  0,  0,
		 0,  -1,  0,
		 1,  0,  0,
		
 	];

	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation( program, "theta" );

	// document.getElementById( "speedcon" ).onchange = function( event ){
	// 	speed = 100-event.target.value;
	// 	initRotSquare();
	// }
	
	queding.onclick = function(){
		speed = 100-speedcon.value;
	}
	init();
	renderSquare();
	
}

function init(){
	canvas2 = document.getElementById( "canvas2" );
	gl2 = WebGLUtils.setupWebGL( canvas2, "experimental-webgl" );
	if( !gl2 ){
		alert( "WebGL isn't available" );
	}

	gl2.viewport( 0, 0, canvas2.width, canvas2.height );
	gl2.clearColor( 1.0, 1.0, 1.0, 1.0 );

	var program = initShaders( gl2, "rot-v-shader2", "rot-f-shader2" );
	gl2.useProgram( program );

	var vertices2 = [
		
		0.6,0.0,0,
		 0.6,1,0,
		 -0.6,1,0,
		 -0.6,0.0,0,
		 
		 -0.2,0,0,
		 -0.2,-1,0,
		 0.2,-1,0,
		 0.2,0,0,
		 
		 -1.0,-0.7,0,
		 -1,-1,0,
		 1,-1,0,
		 1,-0.7,0,
	
			
		//  0,  1,  0,
		// -1,  0,  0,
		//  0,  -1,  0,
		//  1,  0,  0,
		 
 	]; 

	var bufferId = gl2.createBuffer();
	gl2.bindBuffer( gl2.ARRAY_BUFFER, bufferId );
	gl2.bufferData( gl2.ARRAY_BUFFER, new Float32Array( vertices2 ), gl2.STATIC_DRAW );

	var vPosition = gl2.getAttribLocation( program, "vPosition" );
	gl2.vertexAttribPointer( vPosition, 3, gl2.FLOAT, false, 0, 0 );
	gl2.enableVertexAttribArray( vPosition );

	thetaLoc2 = gl2.getUniformLocation( program, "theta2" );

	// document.getElementById( "speedcon" ).onchange = function( event ){
	// 	speed = 100-event.target.value;
	// 	initRotSquare();
	// }
	
	queding2.onclick = function(){
		speed2 = 1000/speedcon2.value;
	}
	render();
}
function renderSquare(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta += direction * 0.1;
	
	gl.uniform1f( thetaLoc, theta );

	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4);

	// update and render
	setTimeout( function(){ requestAnimFrame( renderSquare ); }, speed );
}

function render(){
	gl2.clear( gl2.COLOR_BUFFER_BIT );
	
	// set uniform values
	theta2 += direction2 * 0.1;
		
	gl2.uniform1f( thetaLoc2, theta2 );
	
	gl2.drawArrays( gl2.TRIANGLE_FAN, 0, 4);
	gl2.drawArrays( gl2.TRIANGLE_FAN, 4, 4);
	gl2.drawArrays( gl2.TRIANGLE_FAN, 8, 4);
	
	
	// update and render
	setTimeout( function(){ requestAnimFrame( init ); }, speed2 );
}
