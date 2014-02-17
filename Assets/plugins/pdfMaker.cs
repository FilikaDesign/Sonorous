using UnityEngine;
using System.Collections;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

public class pdfMaker : MonoBehaviour {

	//http://forum.unity3d.com/threads/190797-Creating-PDF-with-iTextSharp-on-IOS
	private static string pdf1 = "Deze PDF is gegenereerd vanuit Unity3D door Sebastiaan";
	private static string pdfName;
	
  
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public static void pdfC(){
	
		print("pdf yapiyorum abi");
		pdfName = "Test";
		// create a texture to pass to encoding
        Texture2D texture = new Texture2D(Screen.width, Screen.height, TextureFormat.RGB24, false);
		
		// put buffer into texture
        texture.ReadPixels(new Rect(0, 0, Screen.width, Screen.height - 100), 0, 0);
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
		
		
		print(Application.dataPath);
		
		
		doc.Open();

        doc.Add(new Paragraph(pdf1));
		doc.NewPage();
		
		
		//doc.Add(gif);
		Image mark = Image.GetInstance(Application.dataPath + "/Test.png");
		//Image ImageOne = new Bitmap(Application.dataPath + "/" + pdfName + ".png");
		doc.Add(mark);
		
		
  
		doc.Add(new Paragraph(pdf1));
		//iTextSharp.text.pdf.BaseFont bf = iTextSharp.text.pdf.BaseFont.CreateFont(iTextSharp.text.pdf.BaseFont.COURIER, iTextSharp.text.pdf.BaseFont.CP1252, iTextSharp.text.pdf.BaseFont.NOT_EMBEDDED);
        
		

        doc.Close ();
		
		// Added by Karl. - Tell unity to delete the texture, by default it seems to keep hold of it and memory crashes will occur after too many screenshots.
        DestroyObject( texture );
	}

}
