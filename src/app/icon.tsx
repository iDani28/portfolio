import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#050505",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "#00f5ff",
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "monospace",
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          {">"}
        </span>
      </div>
    ),
    { ...size }
  );
}
