import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f4ead",
          color: "#ffffff",
          padding: "60px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 132,
            letterSpacing: 6,
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: 18,
          }}
        >
          IES
        </div>
        <div
          style={{
            fontSize: 64,
            letterSpacing: 10,
            fontWeight: 500,
          }}
        >
          ASSOCIATION
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
