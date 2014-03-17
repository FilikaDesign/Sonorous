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
  	private static iTextSharp.text.Font regular = FontFactory.GetFont("DINPro-Bold 2", 7, iTextSharp.text.Font.NORMAL, BaseColor.DARK_GRAY);
	private static iTextSharp.text.Font title = FontFactory.GetFont("DINPro-Bold 2", 8, iTextSharp.text.Font.BOLD, BaseColor.DARK_GRAY);
	private static iTextSharp.text.Font maintitle;// = FontFactory.GetFont("Me Likey", 16, iTextSharp.text.Font.NORMAL, BaseColor.DARK_GRAY);
	

	
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
	
		
		FontFactory.RegisterDirectory("C:\\WINDOWS\\Fonts");
		
		
		
		maintitle = FontFactory.GetFont("Me Likey", 16, iTextSharp.text.Font.NORMAL, BaseColor.DARK_GRAY);
		
		
		
		pdfName = "Test";
		// create a texture to pass to encoding
        Texture2D texture = new Texture2D(Screen.width, Screen.height-100, TextureFormat.RGB24, false);
		
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
		
		
		//print(Application.dataPath);
		
		
		doc.Open();
		
		BaseFont customfont = BaseFont.CreateFont(Application.dataPath+"/resources/DINPro-Bold 2.otf", BaseFont.CP1252, BaseFont.EMBEDDED);
		iTextSharp.text.Font font = new iTextSharp.text.Font(customfont, 28);
		
		
		Paragraph heading = new Paragraph("SONOROUS", font);
		heading.Leading = 60f;
		doc.Add(heading);
		
		
		Chunk chkHeader = new Chunk("COMBINATION                                    ", font);
		chkHeader.SetUnderline(0.3f, -12f);
		Paragraph pHeader = new Paragraph(chkHeader);
		pHeader.Leading = 28f;
		pHeader.SpacingAfter = 200f;
		doc.Add(pHeader);
		
	
		
		
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
			
		
		
		BaseFont customfont2 = BaseFont.CreateFont(Application.dataPath+"/resources/DINPro-Regular 2.otf", BaseFont.CP1252, BaseFont.EMBEDDED);
		iTextSharp.text.Font font2 = new iTextSharp.text.Font(customfont2, 12);
		
		tableSorter(parms);
		
		for(int i = 0; i<sortedTable.Count; i++) {
			
			
			Hashtable ht = sortedTable[i] as Hashtable;
			int id = (int)ht["screenId"] + 1;
			doc.Add(new Phrase(id.ToString()+"-"+ht["code"].ToString().ToUpper(),font2));
			doc.Add(new Phrase("\n"));
			
		}
		
		/*
  		PdfPTable table = new PdfPTable(2);
		PdfPCell cell = new PdfPCell(new Phrase("BILL OF MODULS",maintitle));
		cell.Colspan = 2;
		cell.PaddingTop = 5;
		cell.PaddingBottom = 8;
		
		cell.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
		cell.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
		cell.BorderColor = BaseColor.LIGHT_GRAY;
		table.AddCell(cell);
		
		table.WidthPercentage = 100;
        float[] widths = new float[] { 1.2f, 2f};
        table.SetWidths(widths);
		
		table.HorizontalAlignment = 1;
		
		cellTitle = new PdfPCell(new Phrase("Id",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		
		cellTitle = new PdfPCell(new Phrase("Code",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		*/
		//cellTitle = new PdfPCell(new Phrase("Cover Num.",title));
		//setTitleStyleCell();
		//table.AddCell(cellTitle);
		/*
		cellTitle = new PdfPCell(new Phrase("Material",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		
		cellTitle = new PdfPCell(new Phrase("Mat. Front Up",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		
		cellTitle = new PdfPCell(new Phrase("Mat. Front Down",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);*/
		
		//cellTitle = new PdfPCell(new Phrase("Hole",title));
		//setTitleStyleCell();
		//table.AddCell(cellTitle);
		/*
		cellTitle = new PdfPCell(new Phrase("Width",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		
		cellTitle = new PdfPCell(new Phrase("Height",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		
		cellTitle = new PdfPCell(new Phrase("Depth",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		
		cellTitle = new PdfPCell(new Phrase("Base Height",title));
		setTitleStyleCell();
		table.AddCell(cellTitle);
		*/
		/*
		tableSorter(parms);
			
		for(int i = 0; i<sortedTable.Count; i++) {
			
			
			Hashtable ht = sortedTable[i] as Hashtable;
			
			// 1st column
			int id = (int)ht["screenId"] + 1;
			cellLight = new PdfPCell(new Phrase(id.ToString(),regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);
			
			// second column
			//table.AddCell(new Paragraph(ht["elementType"] as string,regular));
			cellLight = new PdfPCell(new Phrase(ht["code"].ToString().ToUpper(),regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);
			*/
			// third column
			//table.AddCell(new Paragraph(ht["nFrontFace"].ToString(),regular));
			/*cellLight = new PdfPCell(new Phrase(ht["nFrontFace"].ToString(),regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);

			
			if(ht["nFrontFace"].ToString() != "2") {
				// fourth column
				//table.AddCell(new Paragraph(ht["Front"] as string,regular));
				cellLight = new PdfPCell(new Phrase(ht["Front"].ToString(),regular));
				cellLight.PaddingTop = 5;
				cellLight.PaddingBottom = 8;
				if(i % 2 == 0)
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
				else
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
				cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
				cellLight.BorderColor = BaseColor.LIGHT_GRAY;
				table.AddCell(cellLight);
				
				// sixth column
				//table.AddCell(new Paragraph("-",regular));
				cellLight = new PdfPCell(new Phrase("-",regular));
				cellLight.PaddingTop = 5;
				cellLight.PaddingBottom = 8;
				if(i % 2 == 0)
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
				else
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
				cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
				cellLight.BorderColor = BaseColor.LIGHT_GRAY;
				table.AddCell(cellLight);
				
				// seventh column
				//table.AddCell(new Paragraph("-",regular));
				cellLight = new PdfPCell(new Phrase("-",regular));
				cellLight.PaddingTop = 5;
				cellLight.PaddingBottom = 8;
				if(i % 2 == 0)
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
				else
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
				cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
				cellLight.BorderColor = BaseColor.LIGHT_GRAY;
				table.AddCell(cellLight);
			}else{
				// fourth column
				//table.AddCell(new Paragraph("-",regular));
				cellLight = new PdfPCell(new Phrase("-",regular));
				cellLight.PaddingTop = 5;
				cellLight.PaddingBottom = 8;
				if(i % 2 == 0)
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
				else
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
				cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
				cellLight.BorderColor = BaseColor.LIGHT_GRAY;
				table.AddCell(cellLight);
				
				// fifth column
				//table.AddCell(new Paragraph(ht["FrontUp"] as string,regular));
				cellLight = new PdfPCell(new Phrase(ht["FrontUp"] as string,regular));
				cellLight.PaddingTop = 5;
				cellLight.PaddingBottom = 8;
				if(i % 2 == 0)
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
				else
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
				cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
				cellLight.BorderColor = BaseColor.LIGHT_GRAY;
				table.AddCell(cellLight);
				
				// sixth column
				//table.AddCell(new Paragraph(ht["FrontDown"] as string,regular));	
				cellLight = new PdfPCell(new Phrase(ht["FrontDown"] as string,regular));
				cellLight.PaddingTop = 5;
				cellLight.PaddingBottom = 8;
				if(i % 2 == 0)
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
				else
					cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
				cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
				cellLight.BorderColor = BaseColor.LIGHT_GRAY;
				table.AddCell(cellLight);	
			}
			*/
			// seventh column
			//table.AddCell(new Paragraph(ht["Hole"].ToString(),regular));
			/*cellLight = new PdfPCell(new Phrase(ht["Hole"].ToString(),regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);	*/
			
			// eigth column
			//table.AddCell(new Paragraph(ht["w"].ToString(),regular));
			/*cellLight = new PdfPCell(new Phrase(ht["w"].ToString()+" cm",regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);	
			
			// ninth column
			//table.AddCell(new Paragraph(ht["h"].ToString(),regular));
			cellLight = new PdfPCell(new Phrase(ht["h"].ToString()+" cm",regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);	
			
			// tenth column
			//table.AddCell(new Paragraph(ht["depth"].ToString(),regular));
			cellLight = new PdfPCell(new Phrase(ht["depth"].ToString()+" cm",regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);	
			
			// eleventh column
			//table.AddCell(new Paragraph(ht["baseHeight"].ToString(),regular));
			cellLight = new PdfPCell(new Phrase(ht["baseHeight"].ToString()+" cm",regular));
			cellLight.PaddingTop = 5;
			cellLight.PaddingBottom = 8;
			if(i % 2 == 0)
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
			else
				cellLight.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));
			cellLight.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
			cellLight.BorderColor = BaseColor.LIGHT_GRAY;
			table.AddCell(cellLight);*/
		/*}
		
		
		doc.Add(table);
		
		
		 */
        doc.Close ();
		
		DestroyObject( texture );

			
	}
	
	
	
	public static PdfPCell cell(string txt) {
		PdfPCell cellLighth = new PdfPCell(new Phrase(txt,regular));
		cellLighth.PaddingTop = 5;
		cellLighth.PaddingBottom = 8;
		cellLighth.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#CCCCCC"));
		cellLighth.HorizontalAlignment = 1; //0=Left, 1=Centre, 2=Right
		cellLighth.BorderColor = BaseColor.LIGHT_GRAY;
		
		return cellLighth;
	}
	
	public static void setTitleStyleCell() {
		cellTitle.PaddingTop = 5;
		cellTitle.PaddingBottom = 8;
		cellTitle.HorizontalAlignment = 1;
		cellTitle.BorderColor = BaseColor.LIGHT_GRAY;
		cellTitle.BackgroundColor = new BaseColor(System.Drawing.ColorTranslator.FromHtml("#FFFFFF"));	
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
			//print (htNew["elementId"].ToString());
			//print (htNew["elementType"].ToString());
		}
		
	}

}
