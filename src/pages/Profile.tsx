import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="text-blue-800 hover:text-blue-900 inline-flex items-center mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to Dashboard
      </button>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-blue-800 text-white p-6">
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="mt-1">Manage your account information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email address cannot be changed</p>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-blue-800 text-white px-6 py-2 rounded-md flex items-center ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-900'
              }`}
            >
              <Save size={18} className="mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
        
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Password</h3>
            <button
              type="button"
              className="text-blue-800 hover:text-blue-900 text-sm font-medium"
            >
              Change Password
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Account Deletion</h3>
            <p className="text-sm text-gray-600 mb-2">
              Permanently delete your account and all associated data.
            </p>
            <button
              type="button"
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}