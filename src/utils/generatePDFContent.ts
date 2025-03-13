import { pdf, Document } from "@react-pdf/renderer";
import { PDFTemplate } from "../components/PDFTemplate";
import React from "react";

export async function generatePDFContent(file: FileItem): Promise<Blob> {
  return await pdf(
    React.createElement(
      Document,
      {},
      React.createElement(PDFTemplate, { file }),
    ),
  ).toBlob();
}
