"use strict";

var gl;

var redValue= 0.0;
var blueValue= 0.0;
var greenValue= 0.0;
var theta = 0.0;
var xTrans = 0.0;
var yTrans = 0.0;
var scaleValue = 1.0;

var redLoc;
var greenLoc;
var blueLoc;
var thetaLoc;
var translationLoc;
var ScaleLoc;

var delay = 60;


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    gl.clearColor( 0.7, 0.7, 0.7, 1.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram(program);

    

    var vertices = [
        vec2(  -1.0 , -0.7 ), 
        vec2(  -0.8 , -0.7),   //  A SOL
        vec2( -0.7 , 0.7 ),
        
        vec2( -0.7 , 0.7 ),
        vec2(  -0.5 , 0.7 ), // A SOL
        vec2(  -0.8 , -0.7),

        vec2( -0.7 , 0.7 ),
        vec2(  -0.5 , 0.7 ),  // A SAG
        vec2( -0.4 , -0.7 ),

        vec2( -0.4 , -0.7 ),
        vec2(  -0.2 , -0.7), // A SAG
        vec2(  -0.5 , 0.7 ),

        vec2(  -0.8 , -0.2),
        vec2(  -0.4 , -0.2 ), // A CIZ
        vec2( -0.4 , -0.4 ),

        vec2( -0.4 , -0.4 ),
        vec2(  -0.8 , -0.2), // A CIZ
        vec2(  -0.8 , -0.4 ),
         
        vec2(  0.2 , -0.7 ),
        vec2(  0.4 , -0.7 ), // N SOL
        vec2(  0.2 , 0.7 ),

        vec2(  0.2 , 0.7 ),
        vec2(  0.4 , 0.7 ), // N SOL
        vec2(  0.4 , -0.7 ),

        vec2(  0.2 , 0.7 ),
        vec2(  0.4 , 0.7 ), // N PARALEL
        vec2(  0.8 , -0.7 ),

        vec2(  0.4 , 0.7 ),
        vec2(  0.8 , -0.7 ), // N PARALEL
        vec2(  1.0 , -0.7 ),

        vec2(  0.8 , -0.7 ),
        vec2(  1.0 , -0.7 ), // N SAG
        vec2(  0.8 , 0.7 ),

        vec2(  0.8 , 0.7 ),
        vec2(  1 , 0.7 ),  // N SAG
        vec2(  1, -0.7 ),
       

      ];


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    thetaLoc = gl.getUniformLocation( program, "theta" );
    ScaleLoc = gl.getUniformLocation( program, "scale" );
    redLoc = gl.getUniformLocation(program, "red");
    greenLoc = gl.getUniformLocation(program, "green");
    blueLoc = gl.getUniformLocation(program, "blue");
    translationLoc = gl.getUniformLocation(program, 'translation');
    
    
  document.getElementById("Colors" ).onclick = function(event) {
    switch( event.target.index ) {
        case 0:
          redValue+=0.1;
          break;
        case 1:
          greenValue+=0.1;  
          break;
        case 2:
          blueValue+=0.1;
          break;
        case 3:
          blueValue=0.0;
          redValue=0.0;
          greenValue=0.0;
          break;
    }
  };

  document.getElementById("Dondurme" ).onclick = function(event) {
        switch( event.target.index ) {
          case 0:
            theta -= 0.2;
            break;
          case 1:
            theta += 0.2;
            break;
         
        }
  };

  document.getElementById("Oteleme" ).onclick = function(event) {
    switch( event.target.index ) {
      case 0:
        xTrans += 0.1;
        break;
      case 1:
        xTrans -= 0.1;
        break;
      case 2:
        yTrans += 0.1;
        break;
      case 3:
        yTrans -= 0.1;
        break;
      
    }
  };

  document.getElementById("Scale" ).onclick = function(event) {
    switch( event.target.index ) {
      case 0:
        scaleValue += 0.1;
        break;
      case 1:
        scaleValue -= 0.1;
        break;
    }
  };
    
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '87') {
      yTrans += 0.1; // up 
    }
    else if (e.keyCode == '83') {
      yTrans -= 0.1;// down 
    }
    else if (e.keyCode == '65') {
      xTrans -= 0.1; // left 
    }
    else if (e.keyCode == '68') {
      xTrans += 0.1;// right 
    }
    else if (e.keyCode == '107') {
      scaleValue += 0.1;// +
    }
    else if (e.keyCode == '109') {
      scaleValue -= 0.1;// -
    }
    else if (e.keyCode == '82') {
      redValue += 0.1;// red
    }
    else if (e.keyCode == '71') {
      greenValue += 0.1;// green
    }
    else if (e.keyCode == '66') {
      blueValue += 0.1;// blue
    }
    else if (e.keyCode == '84') {
      redValue = 0.0;// sıfırlama
      greenValue = 0.0;
      blueValue = 0.0;
    }
    else if (e.keyCode == '69') {
      theta -= 0.2;// sağ
    }
    else if (e.keyCode == '81') {
      theta += 0.2;// sol
    }
    

}


    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

    
    gl.uniform1f(thetaLoc, theta);
    gl.uniform1f(ScaleLoc, scaleValue);
    gl.uniform2f(translationLoc, xTrans, yTrans);
    gl.uniform1f(redLoc, redValue);
    gl.uniform1f(greenLoc, greenValue);
    gl.uniform1f(blueLoc, blueValue);
    
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}
