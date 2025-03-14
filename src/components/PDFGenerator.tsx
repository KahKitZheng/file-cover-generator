import { PDFViewer } from "@react-pdf/renderer";
import { PDFTemplate } from "./PDFTemplate";

interface PDFGeneratorProps {
  file: FileItem;
}

export const PDFGenerator = ({ file }: PDFGeneratorProps) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }} showToolbar={false}>
      <PDFTemplate file={file} />
    </PDFViewer>
  );
};

export default PDFGenerator;
