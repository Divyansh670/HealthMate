import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Building, Phone, Droplet, Calendar } from 'lucide-react';
import { HealthCardData } from './HealthCardForm';

interface HealthCardPreviewProps {
  data: HealthCardData;
}

const HealthCardPreview: React.FC<HealthCardPreviewProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 p-4">
        <h3 className="text-white font-semibold text-lg flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Health Card Preview
        </h3>
      </div>

      <div id="health-card-preview" className="p-6">
        {/* Card Design */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-l-4 border-blue-500">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">HealthMate</h4>
                <p className="text-sm text-gray-600">Digital Health ID</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Employee ID</p>
              <p className="font-semibold text-gray-900">{data.employeeId}</p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Full Name</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{data.fullName}</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Date of Birth</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{data.dateOfBirth}</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Droplet className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Blood Group</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{data.bloodGroup}</p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Building className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Company</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{data.companyName}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Contact</span>
                </div>
                <p className="text-sm text-gray-900">{data.contactNumber}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-gray-700">Emergency</span>
                </div>
                <p className="text-sm text-gray-900">{data.emergencyContactName}</p>
                <p className="text-sm text-gray-600">{data.emergencyContactNumber}</p>
              </div>
            </div>
          </div>

          {/* Insurance Info */}
          {data.insuranceProvider && (
            <div className="border-t pt-4 mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Insurance Information</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Provider</p>
                  <p className="text-sm font-semibold text-gray-900">{data.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Policy Number</p>
                  <p className="text-sm font-semibold text-gray-900">{data.policyNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HealthCardPreview;