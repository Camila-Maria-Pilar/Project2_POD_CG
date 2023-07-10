import React from 'react';
import QRCode from 'qrcode.react';

const QrCodeGenerator = ({ podData }) => {
  const dataString = `${podData.date} - ${podData.client} - ${podData.description}`;

  return (
    <div>
      {podData.date && (
        <div>
          <h2>QR Code</h2>
          <QRCode value={dataString} />
        </div>
      )}
    </div>
  );
};

export default QrCodeGenerator;
