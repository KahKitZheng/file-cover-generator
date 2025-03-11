import { PDFViewer } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

interface PDFGeneratorProps {
  file: FileItem;
}

export const PDFGenerator = ({ file }: PDFGeneratorProps) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }} showToolbar={false}>
      <PDFDocument file={file} />
    </PDFViewer>
  );
};

export default PDFGenerator;
