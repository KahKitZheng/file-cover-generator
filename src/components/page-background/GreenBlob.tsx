import { Svg, Path, G, StyleSheet } from "@react-pdf/renderer";

export default function GreenBlob() {
  const styles = StyleSheet.create({
    blob: {
      position: "absolute",
      top: 350,
      left: -350,
      width: 400,
      height: 400,
    },
  });

  return (
    <Svg style={styles.blob} viewBox="0 0 881.073 948.562">
      <G transform="translate(0 -1795.66)">
        <Path
          d="M.039,463.986C2.443,291,160.02,0,328.6,0S681.8,250.8,681.8,460.122,493.663,783.455,325.132,783.455-2.847,668.628.039,463.986Z"
          transform="translate(229.06 1795.66) rotate(17)"
          fill="#c3edd6"
        />
        <Path
          d="M.678,150.646C1.652,95.432,65.455,2.55,133.716,2.55S276.727,82.6,276.727,149.413s-76.179,103.2-144.418,103.2S-.49,215.964.678,150.646Z"
          transform="translate(482.654 1962.379)"
          fill="#80e8aa"
        />
        <Path
          d="M0,18.26C.167,11.452,10.938,0,22.462,0S46.605,9.87,46.605,18.108,33.745,30.833,22.225,30.833-.195,26.314,0,18.26Z"
          transform="matrix(0.391, 0.921, -0.921, 0.391, 764.468, 2214.993)"
          fill="#80e8aa"
        />
      </G>
    </Svg>
  );
}
