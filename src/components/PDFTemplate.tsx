import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  section: {
    fontSize: 12,
    marginBottom: 10,
  },
});

interface PDFTemplateProps {
  file: FileItem;
}

function getDisplayName(file: FileItem): string {
  switch (file.type) {
    case "course-wide":
      return `${file.name} - Course Wide`;
    case "chapter":
      return `${file.name} - Chapter ${file.order}`;
    case "tile":
      return `${file.name} - Tile ${file.order}`;
    default:
      return file.name;
  }
}

export const PDFTemplate: React.FC<PDFTemplateProps> = ({ file }) => (
  <Page size="A4" style={styles.page}>
    <View>
      <Text style={styles.header}>{getDisplayName(file)}</Text>
      <Text style={styles.section}>Type: {file.type}</Text>
      <Text style={styles.section}>
        Created at: {new Date().toLocaleString()}
      </Text>
    </View>
  </Page>
);
