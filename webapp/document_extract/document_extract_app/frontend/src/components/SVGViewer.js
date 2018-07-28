import React from "react";
import SVGPage from "./SVGPage";
import SVGViwerStyles from "./SVGViewer.css"

export default class SVGViewer extends React.Component {
  getPages = (texts) => {
    const pages = {}
    texts.reduce((pages, ocr_text) => {
      const text = ocr_text.text;
      const x = ocr_text.left;
      const y = ocr_text.top;
      const width = ocr_text.width;
      const height = ocr_text.height;
      const pageNo = ocr_text.pageNumber;
      const pageWidth = ocr_text.pageWidth;
      const pageHeight = ocr_text.pageHeight;
      const fontSize = ocr_text.fontSize;
      const fontFamily = ocr_text.fontFamily;
      const fontColor = ocr_text.fontColor;

      if (!pages[pageNo]) {
        pages[pageNo] = {
          texts: [],
          pageNo,
          width: pageWidth,
          height: pageHeight
        }
      }
      pages[pageNo].texts.push({text, x, y, width, height, fontSize, fontColor, fontFamily})
      return pages;
    }, pages);
    return Object.values(pages);
  }

  render() {
    const {ocrJson} = this.props;
    const pages = this.getPages(ocrJson.texts);
    return <div className={SVGViwerStyles.svg_viewer}>
      <div className={SVGViwerStyles.svg_pages}>
        {pages.map(page => <div className={SVGViwerStyles.svg_page} key={page.pageNo}>
          <SVGPage page={page}/>
        </div>)}
      </div>
    </div>
  }
}
