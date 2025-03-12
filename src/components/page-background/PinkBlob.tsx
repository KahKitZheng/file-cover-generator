import { Svg, Path, StyleSheet } from "@react-pdf/renderer";

export default function PinkBlob() {
  const styles = StyleSheet.create({
    blob: {
      position: "absolute",
      bottom: -325,
      right: -500,
      width: 600,
      height: 600,
    },
  });

  return (
    <Svg style={styles.blob} fill="none">
      <Path
        d="M305.634 389.609C219.531 370.042 90.9897 260.481 108.888 176.323C126.787 92.1652 271.592 26.628 376.089 48.8524C480.586 71.0767 517.527 177.103 499.634 261.236C481.74 345.37 407.488 412.777 305.634 389.609Z"
        fill="#F9D2E1"
      />
      <Path
        d="M17.714 355.594C27.6364 333.146 65.6241 304.422 89.0074 314.347C112.391 324.273 124.097 367.896 112.495 395.23C100.892 422.565 68.4753 426.377 45.0991 416.454C21.7228 406.531 5.96999 382.148 17.714 355.594Z"
        fill="#FC9FC5"
      />
    </Svg>
  );
}
