#pragma strict

public class Base 
{
		private var Base			: GameObject;
		public var xPos				: int = 0;
		public var yPos				: int = 0;
		

		public function Base(bWidth : int, bHeight : int, bDepth : int) 
    	{
			
			Base  = GameObject.CreatePrimitive(PrimitiveType.Cube);
			Base.name = "Base";
			Base.transform.localScale = Vector3(bWidth,bHeight,bDepth);
	 		Base.transform.localPosition = Vector3(0, 4, 2);
			Base.renderer.material.color = Color(0.3,0.3,0.3);

    	}
    	
    	function Place (_xPos : int, _yPos : int)
    	{
       		 	xPos = _xPos;
       	 		yPos = _yPos;
       	 		Base.transform.localPosition = Vector3(xPos,yPos + 4, 2);
       	 		
        
    	}
    	
    	function Start ()
    	{
        
    	}
    
    	function Update ()
    	{
    		
        	
    	}
    	
    	
    	
    

    
    
}