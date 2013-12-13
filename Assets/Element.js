#pragma strict

// Editted on mac mini filika tasarim
// 12.10.2013

var elementContainer: GameObject;
var cubeFront 		: GameObject;
var cubeFrontUp		: GameObject;
var cubeFrontDown	: GameObject;
var cubeBack 		: GameObject;
var cubeLeft 		: GameObject;
var cubeRight 		: GameObject;
var cubeBottom 		: GameObject;
var cubeTop 		: GameObject;
var cubeHole 		: GameObject;
var woodThickness 	: float = 1;

var xPos				: int = 0;
var yPos				: int = 0;
var params:Hashtable = {};

var isColliding			: int = 0;

function Start (){
    	

    		elementContainer = new GameObject("Element Container");
    		elementContainer.transform.parent = this.transform;
    		
			
			////
    		
    		var h:float = params["h"];
			var w:float = params["w"];
			var depth:float = params["depth"];
			var x:float = params["x"];
			var y:float = params["y"];
			
			//this.gameObject.transform.localPosition.y = h*0.5;


			//collider
			//Debug.Log(this.gameObject);
			
			var sc : BoxCollider;
			sc = this.gameObject.AddComponent ("BoxCollider");
			
			this.GetComponent("BoxCollider").transform.position.y = h * 0.5;
			
			
			sc.transform.localScale = Vector3(w,h*1.1,depth);
			
			sc.isTrigger = true;
			//sc.convex = true;
			
			var Front:String = params["Front"]; 
			var FrontUp:String = params["FrontUp"]; 
			var FrontDown:String = params["FrontDown"]; 
			var Back:String = params["Back"]; 
			var Left:String = params["Left"]; 
			var Right:String = params["Right"];
			var Bottom:String = params["Bottom"];
			var Top:String = params["Top"];
			var hole:int = params["Hole"];
			var isRigid:int =  params["isRigid"];
			
			if(isRigid == 1) {
				this.gameObject.AddComponent(Rigidbody);
				this.gameObject.rigidbody.isKinematic = true;
				this.gameObject.rigidbody.useGravity = false;
				this.gameObject.rigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
			}
			
			
			if(params["nFrontFace"] == 1){
			
			
			
			//Front
		    cubeFront  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeFront.transform.localScale = Vector3(w-woodThickness * 2,h-woodThickness,woodThickness);
			cubeFront.transform.localPosition = Vector3(0, h * 0.5 - 0.5* woodThickness, -1 * depth * 0.5 + woodThickness*0.5);
			cubeFront.renderer.material.mainTexture = Resources.Load(Front, Texture2D);
			cubeFront.transform.parent = elementContainer.transform;
			
			
			}else if(params["nFrontFace"] == 2){
			
			//things to do
			//FrontUp
		    cubeFrontUp  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeFrontUp.transform.localScale = Vector3(w,h*0.5-woodThickness*0.2,woodThickness);
			cubeFrontUp.transform.localPosition = Vector3(0,h * 0.75, -1 * depth * 0.5 + woodThickness*0.5);
			cubeFrontUp.renderer.material.mainTexture = Resources.Load(FrontUp, Texture2D);
			cubeFrontUp.transform.parent = elementContainer.transform;
			//FrontDown
			cubeFrontDown  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeFrontDown.transform.localScale = Vector3(w,h*0.5-woodThickness*0.2,woodThickness);
			cubeFrontDown.transform.localPosition = Vector3(0,h * 0.25, -1 * depth * 0.5 + woodThickness*0.5);
			cubeFrontDown.renderer.material.mainTexture = Resources.Load(FrontDown, Texture2D);
			cubeFrontDown.transform.parent = elementContainer.transform;
			
			}
			
			//Back
		    cubeBack  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBack.transform.localScale = Vector3(w-woodThickness * 2,h-woodThickness * 2,woodThickness);
			cubeBack.transform.localPosition = Vector3(0,h * 0.5, depth * 0.5 - woodThickness*0.5);
			cubeBack.renderer.material.mainTexture = Resources.Load(Back, Texture2D);
			cubeBack.transform.parent = elementContainer.transform;
			
			//Left
		    cubeLeft  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeLeft.transform.localScale = Vector3(woodThickness,h,depth);
			cubeLeft.transform.localPosition = Vector3(-1 * w * 0.5 + 0.5*woodThickness, h * 0.5, 0);
			cubeLeft.renderer.material.mainTexture = Resources.Load(Left, Texture2D);
			cubeLeft.transform.parent = elementContainer.transform;
			
			//Right
		    cubeRight  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeRight.transform.localScale = Vector3(woodThickness,h,depth);
			cubeRight.transform.localPosition = Vector3(w * 0.5 - woodThickness*0.5, h * 0.5, 0);
			cubeRight.renderer.material.mainTexture = Resources.Load(Right, Texture2D);
			cubeRight.transform.parent = elementContainer.transform;
			
			
			
			
			
			
			
			
			//Bottom
		    cubeBottom  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBottom.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,depth-woodThickness * 2);
			cubeBottom.transform.localPosition = Vector3(0,woodThickness*0.5, 0);
			cubeBottom.renderer.material.mainTexture = Resources.Load(Bottom, Texture2D);
			cubeBottom.transform.parent = elementContainer.transform;
			
			
			
			
			
			
			//Top
		    cubeTop  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeTop.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,depth);
			cubeTop.transform.localPosition = Vector3(0,h-woodThickness*0.5, 0);
			cubeTop.renderer.material.mainTexture = Resources.Load(Top, Texture2D);
			cubeTop.transform.parent = elementContainer.transform;
			
							
			if(hole ==  1){
			//Hole
		    cubeHole  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeHole.transform.localScale = Vector3(10,0,3);
			cubeHole.transform.localPosition = Vector3(0,h+1, depth*0.5-1.8);
			cubeHole.renderer.material.color = Color.gray;
			cubeHole.transform.parent = elementContainer.transform;
			
			}
			
			Place(x,y + h * 0.5);
			
    	}
    	
    	
    	
function Place (_xPos : int, _yPos : int)
{
	 	xPos = _xPos;
 		yPos = _yPos;
 		this.gameObject.transform.localPosition = Vector3(xPos,yPos, 0);
 		

}


function Update ()
{


	
}

function OnTriggerEnter (collided : Collider) {

		//Debug.Log(collided.gameObject.name);
		
		xPos = collided.gameObject.transform.position.x;
		
		yPos = collided.gameObject.transform.position.y;
		
		//Debug.Log(xPos);
		
		isColliding = 1;
}

function OnTriggerExit (other : Collider) {
		
		isColliding = 0;

}

function OnTriggerStay (other : Collider) {

		isColliding = 1;
		
}
  


  	
