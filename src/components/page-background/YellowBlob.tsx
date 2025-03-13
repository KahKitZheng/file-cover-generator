import { Svg, Path, G, StyleSheet } from "@react-pdf/renderer";

export default function YellowBlob() {
  const styles = StyleSheet.create({
    blob: {
      position: "absolute",
      top: -200,
      right: -500,
      width: 700,
      height: 700,
    },
  });

  return (
    <Svg style={styles.blob} viewBox="0 0 960.166 1642.829">
      <G transform="translate(-2299.761 0)">
        <Path
          d="M.717,695.309C4.1,437.03,226.015,2.55,463.428,2.55s497.4,374.464,497.4,686.99S695.875,1172.3,458.537,1172.3-3.346,1000.852.717,695.309Z"
          transform="translate(2299.099 -2.55)"
          fill="#ffbc00"
        />
        <Path
          d="M.678,180.277C1.626,114.016,63.743,2.55,130.2,2.55S269.432,98.619,269.432,178.8s-74.166,123.851-140.6,123.851S-.459,258.664.678,180.277Z"
          transform="matrix(0.485, -0.875, 0.875, 0.485, 2306.81, 1385.598)"
          fill="#ffd550"
        />
        <Path
          d="M.666,42.213C.878,27.426,14.741,2.55,29.572,2.55S60.644,23.99,60.644,41.883s-16.552,27.64-31.378,27.64S.412,59.707.666,42.213Z"
          transform="translate(2468.054 1555.138) rotate(23)"
          fill="#ffd550"
        />
      </G>
    </Svg>
  );
}
