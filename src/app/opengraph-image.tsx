import { ImageResponse } from "next/og";

export const alt =
  "DLMURAH — pusat informasi jual beli DL, BGL, dan akun melalui WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#050b35",
        color: "#f8fbff",
        padding: "70px 78px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "36px",
          border: "2px solid #1a2b77",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "540px",
          height: "540px",
          right: "-120px",
          top: "45px",
          transform: "rotate(45deg)",
          border: "2px solid rgba(87,236,245,.24)",
          background: "rgba(55,124,255,.08)",
          display: "flex",
        }}
      />

      <div
        style={{
          width: "68%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#57ecf5",
            fontSize: "24px",
            fontWeight: 800,
            letterSpacing: "5px",
          }}
        >
          <span
            style={{ width: "16px", height: "16px", background: "#57ecf5" }}
          />
          DLMURAH
        </div>
        <div
          style={{
            marginTop: "34px",
            fontSize: "68px",
            lineHeight: 1.02,
            fontWeight: 800,
            letterSpacing: "-4px",
          }}
        >
          Jual Beli DL, BGL, dan Akun
        </div>
        <div
          style={{
            marginTop: "28px",
            maxWidth: "700px",
            color: "#a8b9e8",
            fontSize: "28px",
            lineHeight: 1.4,
          }}
        >
          Pusat informasi dan jalur resmi menuju admin WhatsApp DLMURAH.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "120px",
          top: "154px",
          width: "190px",
          height: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "112px",
            height: "105px",
            border: "22px solid #bffaff",
            borderBottom: "0",
            borderRadius: "56px 56px 0 0",
            display: "flex",
          }}
        />
        <div
          style={{
            marginTop: "-4px",
            width: "190px",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#57ecf5",
            border: "14px solid #071044",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "62px",
              background: "#101d62",
              borderRadius: "24px 24px 6px 6px",
              display: "flex",
            }}
          />
        </div>
      </div>
    </div>,
    size,
  );
}
