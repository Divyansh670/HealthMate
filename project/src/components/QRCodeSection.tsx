import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode } from 'lucide-react';
import { HealthCardData } from './HealthCardForm';

interface QRCodeSectionProps {
  data: HealthCardData;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ data }) => {
  const qrData = JSON.stringify({
    name: data.fullName,
    employeeId: data.employeeId,
    bloodGroup: data.bloodGroup,
    contact: data.contactNumber,
    emergency: data.emergencyContactNumber,
    company: data.companyName,
    generated: new Date().toISOString()
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-center mb-4">
        <QrCode className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">QR Code</h3>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <QRCodeSVG
            value={qrData}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
            includeMargin={true}
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-600 text-center">
        Scan this QR code to quickly access health information
      </p>
    </motion.div>
  );
};

export default QRCodeSection;