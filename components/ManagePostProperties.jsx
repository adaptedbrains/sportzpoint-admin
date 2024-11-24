'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import RestOfPostEdit from './RestOfPostEdit';
import ArticlePostEditComponent from './ArticlePostEditComponent';
import LiveBlogEditComponent from './LiveBlogEditComponent';

function ManagePostProperties() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'article';
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const EditComponent = type === 'live-blog' ? LiveBlogEditComponent : ArticlePostEditComponent;

  const handlePublish = async () => {
    try {
      console.log('Publishing...');
    } catch (error) {
      console.error('Error publishing:', error);
    }
  };

  const handleSendForApproval = async () => {
    try {
      console.log('Sending for approval...');
    } catch (error) {
      console.error('Error sending for approval:', error);
    }
  };

  const handleSchedule = async () => {
    if (!scheduledDate || !scheduledTime) {
      alert('Please select both date and time');
      return;
    }
    try {
      const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
      console.log('Scheduling for:', scheduledDateTime);
      setIsScheduleModalOpen(false);
    } catch (error) {
      console.error('Error scheduling:', error);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      {/* Action Buttons - Simplified */}
      <div className="flex items-center gap-4 py-2">
        <button
          onClick={handlePublish}
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          Publish
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          Schedule
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={handleSendForApproval}
          className="text-sm text-gray-700 hover:text-gray-900"
        >
          Send for Approval
        </button>
        <span className="ml-4 text-sm text-gray-500">
          Status: <span className="text-gray-700">Draft</span>
        </span>
      </div>

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schedule Post</h2>
              <button 
                onClick={() => setIsScheduleModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedule}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors duration-200"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EditComponent />
      <div className='bg-white rounded'>
        <RichTextEditor />
      </div>
      <RestOfPostEdit />
    </div>
  );
}

export default ManagePostProperties;