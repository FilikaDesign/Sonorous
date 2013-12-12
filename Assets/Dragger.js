#pragma strict

function Start () {

}

function Update () {
	var mainCamera = Camera.main;
	var hit : RaycastHit;

	if (Input.GetMouseButtonDown (0)){
	
		if( Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit ) ) {
		
		
			
			
		    
		}
			
	
	}
	
	if (Input.GetMouseButton (0)){
	
		if( Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit ) ) {
			
			
				
			if(hit.rigidbody){
			
				Debug.Log("vurvur");
	 	 		hit.transform.position.x = 100;
				hit.transform.position.y = 100;
				hit.transform.position.z = 0;
		    	    	
				
	    	}
	   
		}
	}
	
	 
}

function OnCollisionEnter(collision : Collision) {
		// Debug-draw all contact points and normals
		Debug.Log("ju");

		
}
