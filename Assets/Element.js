#pragma strict

// Editted by alp
// 24.12.2013

var elementID		: int;
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
var w				:float;
var h				:float;
var depth			:float;

var xPos				: int = 0;
var yPos				: int = 0;
var params:Hashtable = {};

var isColliding			: int = 0;


function Start (){
    	

    		elementContainer = new GameObject("Element Container");
    		elementContainer.transform.parent = this.transform;
    		
    		elementID = params["elementId"];
			
			////
    		
    		h = params["h"];
			w = params["w"];
			depth = params["depth"];
			var x:float = params["x"];
			var y:float = params["y"];
			
			this.gameObject.transform.localPosition.y = h*0.5;


			//collider
			//Debug.Log(this.gameObject);
			
			var sc : BoxCollider;
			sc = this.gameObject.AddComponent ("BoxCollider");
			sc.center.x =  0.5;
			sc.center.y =  0;
			sc.center.z =  -1 * 0.5;
			sc.size.x = 0.9999999;
			sc.size.y = 0.9999999;
			
			
			
			//this.GetComponent("BoxCollider").transform.position.y = h * 0.5;
			
			
			
			sc.transform.localScale = Vector3(w,h,depth);
			
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
		    cubeFront.name = "cubeFront";
		    cubeFront.transform.localScale = Vector3(w-woodThickness * 2,h-woodThickness,woodThickness);
			cubeFront.transform.localPosition = Vector3(w*0.5, h * 0.5 - 0.5* woodThickness, -1 * depth + woodThickness*0.5);
			cubeFront.renderer.material.mainTexture = Resources.Load(Front, Texture2D);
			cubeFront.transform.parent = elementContainer.transform;
			var cubeFrontBoxCollider : BoxCollider = cubeFront.GetComponent("BoxCollider");
			cubeFrontBoxCollider.enabled = false;
			
			
			}else if(params["nFrontFace"] == 2){
			
			//things to do
			//FrontUp
		    cubeFrontUp  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeFrontUp.name = "cubeFrontUp";
		    cubeFrontUp.transform.localScale = Vector3(w-2*woodThickness,(h-woodThickness)*0.5,woodThickness);
			cubeFrontUp.transform.localPosition = Vector3(w*0.5,(h - woodThickness)*0.75, -1 * depth + woodThickness*0.5);
			cubeFrontUp.renderer.material.mainTexture = Resources.Load(FrontUp, Texture2D);
			cubeFrontUp.transform.parent = elementContainer.transform;
			var cubeFrontUpBoxCollider : BoxCollider = cubeFrontUp.GetComponent("BoxCollider");
			cubeFrontUpBoxCollider.enabled = false;
			
			//FrontDown
			cubeFrontDown  = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cubeFrontDown.name = "cubeFrontDown";
		    cubeFrontDown.transform.localScale = Vector3(w-2*woodThickness,(h-woodThickness)*0.5,woodThickness);
			cubeFrontDown.transform.localPosition = Vector3(w*0.5,(h - woodThickness)*0.25, -1 * depth + woodThickness*0.5);
			cubeFrontDown.renderer.material.mainTexture = Resources.Load(FrontDown, Texture2D);
			cubeFrontDown.transform.parent = elementContainer.transform;
			var cubeFrontDownBoxCollider : BoxCollider = cubeFrontDown.GetComponent("BoxCollider");
			cubeFrontDownBoxCollider.enabled = false;
			
			}
			
			//Back
		    cubeBack  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBack.name = "cubeBack";
		    cubeBack.transform.localScale = Vector3(w-woodThickness * 2,h-woodThickness * 2,woodThickness);
			cubeBack.transform.localPosition = Vector3(w*0.5,h * 0.5, -1 * woodThickness*0.5);
			cubeBack.renderer.material.mainTexture = Resources.Load(Back, Texture2D);
			cubeBack.transform.parent = elementContainer.transform;
			var cubeBackDownBoxCollider : BoxCollider = cubeBack.GetComponent("BoxCollider");
			cubeBackDownBoxCollider.enabled = false;
			
			//Left
		    cubeLeft  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeLeft.name = "cubeLeft";
		    cubeLeft.transform.localScale = Vector3(woodThickness,h,depth);
			cubeLeft.transform.localPosition = Vector3(0.5 * woodThickness, h * 0.5, -1 * depth * 0.5);
			cubeLeft.renderer.material.mainTexture = Resources.Load(Left, Texture2D);
			cubeLeft.transform.parent = elementContainer.transform;
			var cubeLeftBoxCollider : BoxCollider = cubeLeft.GetComponent("BoxCollider");
			cubeLeftBoxCollider.enabled = false;
			
			//Right
		    cubeRight  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeRight.name = "cubeRight";
		    cubeRight.transform.localScale = Vector3(woodThickness,h,depth);
			cubeRight.transform.localPosition = Vector3(w - woodThickness*0.5, h * 0.5, -1 * depth * 0.5);
			cubeRight.renderer.material.mainTexture = Resources.Load(Right, Texture2D);
			cubeRight.transform.parent = elementContainer.transform;
			var cubeRightBoxCollider : BoxCollider = cubeRight.GetComponent("BoxCollider");
			cubeRightBoxCollider.enabled = false;

			
			//Bottom
		    cubeBottom  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBottom.name = "cubeBottom";
		    cubeBottom.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,depth-woodThickness * 2);
			cubeBottom.transform.localPosition = Vector3(w*0.5,woodThickness*0.5, -1 * depth * 0.5);
			cubeBottom.renderer.material.mainTexture = Resources.Load(Bottom, Texture2D);
			cubeBottom.transform.parent = elementContainer.transform;
			var cubeBottomBoxCollider : BoxCollider = cubeBottom.GetComponent("BoxCollider");
			cubeBottomBoxCollider.enabled = false;

			
			//Top
		    cubeTop  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeTop.name = "cubeTop";
		    cubeTop.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,depth);
			cubeTop.transform.localPosition = Vector3(w*0.5,h-woodThickness*0.5, -1 * depth * 0.5);
			cubeTop.renderer.material.mainTexture = Resources.Load(Top, Texture2D);
			cubeTop.transform.parent = elementContainer.transform;
			var cubeTopBoxCollider : BoxCollider = cubeTop.GetComponent("BoxCollider");
			cubeTopBoxCollider.enabled = false;
			
							
			if(hole ==  1){
			//Hole
		    cubeHole  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeHole.name = "cubeHole";
		    cubeHole.transform.localScale = Vector3(10,0,3);
			cubeHole.transform.localPosition = Vector3(w*0.5,h+0.2,-1.8);
			cubeHole.renderer.material.color = Color.gray;
			cubeHole.transform.parent = elementContainer.transform;
			var cubeHoleBoxCollider : BoxCollider = cubeHole.GetComponent("BoxCollider");
			cubeHoleBoxCollider.enabled = false;
			
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

		
		xPos = collided.gameObject.transform.position.x;
		yPos = collided.gameObject.transform.position.y;

		isColliding = 1;	
		//Debug.Log(isColliding);
		
}

function OnTriggerStay (collided : Collider) {

		xPos = collided.gameObject.transform.position.x;
		yPos = collided.gameObject.transform.position.y;
		
		isColliding = 1;
		//Debug.Log(isColliding);
		/*
		var arr = new Array();
		arr.push(elementID);
		arr.push(this.gameObject.transform.position.x);
		arr.push(this.gameObject.transform.position.y);
		arr.push(wCol);
		arr.push(hCol);
		
		
		GameObject.Find("Main Camera").SendMessage("CollisionSnap",arr);
		*/
		
}

function OnTriggerExit (other : Collider) {
		
		isColliding = 0;

}

function createBase(size : int){
if(params["baseHeight"] == 0){
		//Debug.Log("Baza yarat");
		params["baseHeight"] = size;
		var baseElement: GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		baseElement.transform.localScale = Vector3(w,size,depth-2);
		baseElement.transform.position.x = elementContainer.transform.position.x + w * 0.5;
		baseElement.transform.position.z = elementContainer.transform.position.z - depth * 0.5 + 1;
		baseElement.renderer.material.color = Color.gray;
		baseElement.transform.parent = elementContainer.transform;
	}
}






  	
