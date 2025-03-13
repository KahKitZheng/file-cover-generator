import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  info: {
    fontSize: 12,
    marginBottom: 10,
  },
});

interface PDFDocumentProps {
  file: FileItem;
}

export const PDFDocument = ({ file }: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{file.name}</Text>
      <View>
        {/* <Text style={styles.info}>
          Generated at: {new Date().toLocaleString()}
        </Text> */}
        <Text style={styles.info}>Type: {file.type}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
