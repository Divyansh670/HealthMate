import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HealthCardData } from './HealthCardForm';

interface DownloadPDFProps {
  data: HealthCardData;
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ data }) => {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const element = document.getElementById('health-card-preview');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(60, 60, 60);
      pdf.text('HealthMate - Digital Health Card', 10, imgHeight + 30);
      
      // Add generated date
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, imgHeight + 40);
      
      // Add footer
      pdf.text('Generated by HealthMate | Built by Divyansh Srivastav', 10, imgHeight + 50);
      
      pdf.save(`${data.fullName}-health-card.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-center mb-4">
        <FileText className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Download Options</h3>
      </div>
      
      <motion.button
        onClick={generatePDF}
        disabled={isGenerating}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        <Download className="w-5 h-5" />
        <span>{isGenerating ? 'Generating PDF...' : 'Download as PDF'}</span>
      </motion.button>
      
      <p className="text-sm text-gray-600 text-center mt-3">
        Download your health card as a PDF for easy sharing and printing
      </p>
    </motion.div>
  );
};

export default DownloadPDF;