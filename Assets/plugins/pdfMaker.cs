using UnityEngine;
using System.Collections;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp;
using System.IO;
using System;

public class pdfMaker : MonoBehaviour {

	//http://forum.unity3d.com/threads/190797-Creating-PDF-with-iTextSharp-on-IOS
	//http://answers.unity3d.com/questions/53170/using-drawing-package-like-systemdrawing.html
	
	private static string pdfName;
	private static PdfPCell cellLight;
	private static PdfPCell cellTitle;
	private static ArrayList parms;      
  	
	

	
	private static ArrayList sortedTable;    
	
	// Use this for initialization
	void Start () {
		
		
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public static float PixelsToPoints(float value,int dpi)
	{
	   return value / dpi * 72;
	}
	
	public static void pdfC(){
	
		
		tableSorter(parms);

		string desktopPath = (Environment.GetFolderPath(Environment.SpecialFolder.Desktop));

		pdfName = "Sonorous_";
		pdfName += DateTime.Now.Hour + "_" +DateTime.Now.Minute + "_" +DateTime.Now.Second;
		// create a texture to pass to encoding
        Texture2D texture = new Texture2D(Screen.width, Screen.height-120, TextureFormat.RGB24, false);
		
		// put buffer into texture
        texture.ReadPixels(new Rect(0, 0, Screen.width, Screen.height - 120), 0, 0);
        texture.Apply();
		
        byte[] bytes = texture.EncodeToPNG();
 
        // save our test image (could also upload to WWW)
        File.WriteAllBytes(Application.dataPath + "/" + "temp.png", bytes);
		
       
		Document doc = new Document();
		try

        {

            PdfWriter.GetInstance(doc, new FileStream(desktopPath + "/" + pdfName + ".pdf", FileMode.Create ));
	
        }

        catch(System.Exception e)

        {

          print(e.ToString());

        }  
		
	
		
		
		doc.Open();

		
		iTextSharp.text.Font regular = FontFactory.GetFont("C:\\Windows\\Fonts\\Arial.ttf", BaseFont.CP1252, BaseFont.EMBEDDED, 12, iTextSharp.text.Font.NORMAL, BaseColor.BLACK );
		
		
		Image header = Image.GetInstance(Application.streamingAssetsPath + "/sono_combi.jpg");
		
		header.ScalePercent(50f);
		
		
		doc.Add(header);
		
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
		
		
		//doc.Add(gif);
		Image mark = Image.GetInstance(Application.dataPath + "/temp.png");

		float ow = mark.Width;
		float oh = mark.Height;
		
		
		//print (PixelsToPoints(ow,110) + " " +PixelsToPoints(790,110));
		if(PixelsToPoints(ow,110) > PixelsToPoints(800,110)) {
			
			float ratio = ow / 800;
			
			if(ow > oh) {
				mark.ScaleAbsoluteWidth(PixelsToPoints(800,110));
				mark.ScaleAbsoluteHeight(PixelsToPoints(oh/ratio,110));
			}
			
			if(oh > ow ) {
				mark.ScaleAbsoluteWidth(PixelsToPoints(800,110));
				mark.ScaleAbsoluteHeight(PixelsToPoints(oh*ratio,110));
			}
		}
		
		if(PixelsToPoints(ow,110) < PixelsToPoints(800,110)){
			
			float ratio = 800 / ow;
		
			if(ow > oh) {
				mark.ScaleAbsoluteWidth(PixelsToPoints(800,110));
				mark.ScaleAbsoluteHeight(PixelsToPoints(oh/ratio,110));
			}
			
			if(oh > ow ) {
				mark.ScaleAbsoluteWidth(PixelsToPoints(800,110));
				mark.ScaleAbsoluteHeight(PixelsToPoints(oh*ratio,110));
			}
		}
			
		
		
		doc.Add(mark);
		
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
			

		
		for(int i = 0; i<sortedTable.Count; i++) {
			
			
			Hashtable ht = sortedTable[i] as Hashtable;
			int id = (int)ht["screenId"] + 1;
			doc.Add(new Phrase(id.ToString()+"- "+ht["code"].ToString().ToUpper(),regular));
			doc.Add(new Phrase("\n"));
			
		}
		
		
        doc.Close ();
		
		DestroyObject( texture );

			
	}
	
	
	
	
	public static void setRows(Hashtable par) {
		
		
		
		parms.Add(par);
		
		
	}
	
	public static void resetRows() {
		
		
		//parms.Clear();
		parms = new ArrayList();
		
	}
	
	
	public static void tableSorter(ArrayList _parms){
		
		
		
		sortedTable = new ArrayList();
		sortedTable.Clear();
		
		for(int i = 0; i<_parms.Count; i++) {
			
			Hashtable ht = parms[i] as Hashtable;
			
		
			int id = (int)ht["elementId"];
			string typo = ht["elementType"].ToString();
			
			
			if(typo == "EX"){
				sortedTable.Add(ht);
			}
			
		}
		
		for(int ii = 0; ii<_parms.Count; ii++) {
			
			Hashtable ht = parms[ii] as Hashtable;
			
		
			int id = (int)ht["elementId"];
			string typo = ht["elementType"].ToString();
			
			
			if(typo == "ED"){
				sortedTable.Add(ht);
			}
			
		}
		
		for(int j = 0; j< sortedTable.Count; j++) {
			
			Hashtable htNew = sortedTable[j] as Hashtable;
			//print (htNew["structure"].ToString());
			//print (htNew["elementType"].ToString());
		}
		
	}

}
