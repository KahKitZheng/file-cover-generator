import { Svg, Path, G, StyleSheet } from "@react-pdf/renderer";

export default function BlueBlob() {
  const styles = StyleSheet.create({
    blob: {
      position: "absolute",
      top: -80,
      left: -200,
      width: 300,
      height: 300,
    },
  });

  return (
    <Svg style={styles.blob} viewBox="0 0 355.472 376.48">
      <G transform="translate(-525.6 -616.504)">
        <Path
          d="M.014,167.009C.879,104.744,57.6,0,118.279,0S245.412,90.275,245.412,165.618,177.691,282,117.029,282-1.025,240.669.014,167.009Z"
          transform="matrix(0.391, 0.921, -0.921, 0.391, 785.183, 645.896)"
          fill="#7d87e3"
        />
        <Path
          d="M.672,87.845c.561-31.8,37.308-85.3,76.622-85.3s82.367,46.106,82.367,84.585-43.875,59.439-83.177,59.439S0,125.465.672,87.845Z"
          transform="translate(652.586 613.954)"
          fill="#3e45bb"
        />
        <Path
          d="M0,18.26C.167,11.452,10.938,0,22.462,0S46.605,9.87,46.605,18.108,33.745,30.833,22.225,30.833-.195,26.314,0,18.26Z"
          transform="matrix(0.391, 0.921, -0.921, 0.391, 752.852, 938.036)"
          fill="#a0afef"
        />
      </G>
    </Svg>
  );
}
