import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Edit, Download, Trash2, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockResumes } from '../utils/mockData';
import { ResumeType } from '../types';

export default function Dashboard() {
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch resumes from an API
    // For the MVP, we'll use mock data
    const loadResumes = () => {
      setTimeout(() => {
        setResumes(mockResumes);
        setIsLoading(false);
      }, 800);
    };

    loadResumes();
  }, [currentUser]);

  const handleDeleteResume = (id: string) => {
    // In a real app, this would call an API to delete the resume
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  const filteredResumes = resumes.filter(resume => 
    resume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.targetPosition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
        <p className="text-gray-600 mt-2">Manage and edit your created resumes</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search resumes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <Link
          to="/resume/new"
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center justify-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Create New Resume
        </Link>
      </div>

      {filteredResumes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          {searchTerm ? (
            <div>
              <p className="text-lg text-gray-700 mb-4">No resumes found matching "{searchTerm}"</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="text-blue-800 hover:text-blue-900 underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 mb-4">
                <FileText size={32} className="text-blue-800" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Create your first resume</h2>
              <p className="text-gray-600 mb-6">Let's create your first military-to-civilian resume translation</p>
              <Link
                to="/resume/new"
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md inline-flex items-center"
              >
                <PlusCircle size={18} className="mr-2" />
                Create Resume
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <div key={resume.id} className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="bg-blue-800 text-white px-4 py-3 flex justify-between items-center">
                <h3 className="font-medium truncate">{resume.title}</h3>
                <span className="text-xs bg-blue-700 rounded-full px-2 py-1">
                  {new Date(resume.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Target Position:</p>
                <p className="text-gray-900 mb-4">{resume.targetPosition}</p>
                
                <p className="text-sm font-medium text-gray-700 mb-1">Industry:</p>
                <p className="text-gray-900 mb-2">{resume.industry}</p>
                
                <div className="flex mt-6 justify-between">
                  <Link
                    to={`/resume/${resume.id}`}
                    className="text-blue-800 hover:text-blue-900 flex items-center text-sm"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Link>
                  <button
                    className="text-blue-800 hover:text-blue-900 flex items-center text-sm"
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="text-red-600 hover:text-red-700 flex items-center text-sm"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}