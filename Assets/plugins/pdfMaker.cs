using UnityEngine;
using System.Collections;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp;
using System.IO;


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
		
		//FontFactory.RegisterDirectory("C:\\Windows\\Fonts");

		//print (Application.streamingAssetsPath);
		
		pdfName = "Test";
		// create a texture to pass to encoding
        Texture2D texture = new Texture2D(Screen.width, Screen.height-120, TextureFormat.RGB24, false);
		
		// put buffer into texture
        texture.ReadPixels(new Rect(0, 0, Screen.width, Screen.height - 120), 0, 0);
        texture.Apply();
		
        byte[] bytes = texture.EncodeToPNG();
 
        // save our test image (could also upload to WWW)
        File.WriteAllBytes(Application.dataPath + "/" + pdfName + ".png", bytes);
		
       
		Document doc = new Document();
		try

        {

            PdfWriter.GetInstance(doc, new FileStream(Application.dataPath + "/" + pdfName + ".pdf", FileMode.Create ));
			
			
			
        }

        catch(System.Exception e)

        {

          print(e.ToString());

        }  
		
		
		//print(Application.dataPath);
		
		
		doc.Open();
		
		//iTextSharp.text.Font regular = FontFactory.GetFont("C:\\Windows\\Fonts\\Antipasto.ttf", 28, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
		//print (regular.Familyname);
		
		iTextSharp.text.Font regular = FontFactory.GetFont("C:\\Windows\\Fonts\\Arial.ttf", BaseFont.CP1252, BaseFont.EMBEDDED, 12, iTextSharp.text.Font.NORMAL, BaseColor.BLACK );
		
		//BaseFont customfont = BaseFont.CreateFont("C:\\Windows\\Fonts\\DINPro-Regular 2.otf", BaseFont.CP1252, BaseFont.EMBEDDED);
		//iTextSharp.text.Font font = new iTextSharp.text.Font(customfont, 28);
		
		
		/*
		Paragraph heading = new Paragraph("SONOROUS",regular);
		
		heading.Leading = 60f;
		doc.Add(heading);
		
		
		Chunk chkHeader = new Chunk("COMBINATION                                    ",regular);
		chkHeader.SetUnderline(0.3f, -12f);
		
		Paragraph pHeader = new Paragraph(chkHeader);
		
		pHeader.Leading = 28f;
		pHeader.SpacingAfter = 150f;
		doc.Add(pHeader);
		*/
		Image header = Image.GetInstance(Application.streamingAssetsPath + "/sono_combi.jpg");
		
		header.ScalePercent(50f);
		
		
		doc.Add(header);
		
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
		doc.Add(new Phrase("\n"));
		
		
		//doc.Add(gif);
		Image mark = Image.GetInstance(Application.dataPath + "/Test.png");
		//Image ImageOne = new Bitmap(Application.dataPath + "/" + pdfName + ".png");
		/*
		mark.Rotation = Mathf.PI / 2;
		mark.RotationDegrees = 90f;
		
		mark.ScaleToFit(doc.PageSize.Width,doc.PageSize.Height-20);
		*/
		
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
			
		/*
		
		BaseFont customfont2 = BaseFont.CreateFont("C:\\Windows\\Fonts\\DINPro-Regular 2.otf", BaseFont.CP1252, BaseFont.EMBEDDED);
		iTextSharp.text.Font font2 = new iTextSharp.text.Font(customfont2, 12);
		
		*/
		
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
