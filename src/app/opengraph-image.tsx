import { ImageResponse } from "next/og";

export const alt = "OM Media — Video Production & Digital Strategy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "#000000",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          OM Media
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#a3a3a3",
          }}
        >
          We don&apos;t just market. We dominate.
        </div>
      </div>
    ),
    { ...size },
  );
}
