"use client";
import { FaNewspaper, FaGoogle, FaBell, FaSearch, FaShareAlt } from 'react-icons/fa';

const ConfigurationPage = () => {
  const modules = [
    {
      title: 'Newsletter',
      description: 'Configure email newsletter settings and templates',
      icon: FaNewspaper,
      status: 'Active'
    },
    {
      title: 'Google News',
      description: 'Manage Google News publication settings',
      icon: FaGoogle,
      status: 'Inactive'
    },
    {
      title: 'Push Notifications',
      description: 'Configure web push notification settings',
      icon: FaBell,
      status: 'Active'
    },
    {
      title: 'SEO',
      description: 'Search engine optimization settings',
      icon: FaSearch,
      status: 'Active'
    },
    {
      title: 'Social Media',
      description: 'Manage social media integration',
      icon: FaShareAlt,
      status: 'Active'
    }
  ];

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 pt-20 pb-6">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Modules</h1>
          <p className="text-sm text-gray-600 mt-1">Configure various modules and integrations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-500 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-blue-600">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                  Configure Settings →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage; 