import React from "react";
import { styled } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import { forwardRef } from "react";
import CryptoJS from "crypto-js";

const BoxContainer = styled("div")`
  ${({ theme, width, height }) => `
    width: ${width}px;
    height: ${height}px;
    border: none;
    position: relative;
    background: #0002;
    `}
`;

const Signature = styled("div")`
  ${({ theme, top, left, size }) => `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    top: ${Math.round(top * 3.779527559055)}px;
    left: ${Math.round(left * 3.779527559055)}px;
    `}
`;

const QrcodePage = forwardRef(({ settings, signature, data }, ref) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_SECRETE_KEY
  ).toString();

  return (
    <BoxContainer
      ref={ref}
      width={Math.round(settings.paperWidth * 3.779527559055)}
      height={Math.round(settings.paperHeight * 3.779527559055)}
    >
      <Signature
        top={settings.qrCodeTop}
        left={settings.qrCodeLeft}
        size={Math.round(settings.qrCodeSize * 3.779527559055)}
      >
        <QRCodeSVG
          size={Math.round(settings.qrCodeSize * 3.779527559055)}
          includeMargin={false}
          bgColor={settings.qrCodebackground}
          value={`${signature}@${ciphertext}`}
          level="M" //L M Q H
        />
      </Signature>
    </BoxContainer>
  );
});

export default React.memo(QrcodePage);
