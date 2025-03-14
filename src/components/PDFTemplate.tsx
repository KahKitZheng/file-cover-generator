import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import BlueBlob from "./page-background/BlueBlob";
import GreenBlob from "./page-background/GreenBlob";
import PinkBlob from "./page-background/PinkBlob";
import YellowBlob from "./page-background/YellowBlob";

const pageStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 60,
    height: "100%",
    width: "100%",
    position: "relative",
  },
});

const pageBackgroundStyles = StyleSheet.create({
  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -1,
  },
});

const contentStyles = StyleSheet.create({
  content: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  courseType: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.5,
  },
  fileNameContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  fileName: {
    fontSize: 44,
    fontWeight: "bold",
    lineHeight: 1,
  },
  underTitle: {
    fontSize: 20,
    marginTop: 32,
    color: "#ff6467",
  },
  date: {
    position: "absolute",
    bottom: 0,
    left: 0,
    fontSize: 10,
    opacity: 0.5,
    zIndex: 10,
  },
});

interface PDFTemplateProps {
  file: FileItem;
}

export const PDFTemplate: React.FC<PDFTemplateProps> = ({ file }) => (
  <Page size="A4" style={pageStyles.page}>
    <View style={pageBackgroundStyles.background}>
      <BlueBlob />
      <YellowBlob />
      <GreenBlob />
      <PinkBlob />
    </View>
    <View style={contentStyles.content}>
      <Text style={contentStyles.courseType}>COURSE_TYPE</Text>
      <View style={contentStyles.fileNameContainer}>
        {file.name.split(" ").map((word, index) => (
          <Text key={index} style={contentStyles.fileName}>
            {word}{" "}
          </Text>
        ))}
      </View>
      <Text style={contentStyles.underTitle}>
        {file.type.charAt(0).toUpperCase() + file.type.slice(1)}
        {file.order ? ` ${file.order}` : ""}
      </Text>
      <Text style={contentStyles.date}>
        Created at: {new Date().toLocaleDateString().replace(/\//g, "-")}
      </Text>
    </View>
  </Page>
);
