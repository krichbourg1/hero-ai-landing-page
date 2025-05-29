import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChevronLeft, Save, Download, Trash2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { mockResumes } from '../utils/mockData';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import MilitaryExperienceForm from '../components/resume/MilitaryExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import TargetJobForm from '../components/resume/TargetJobForm';
import ResumePreview from '../components/resume/ResumePreview';

export default function ResumeEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      linkedin: '',
    },
    experience: [
      {
        id: '1',
        title: '',
        branch: '',
        startDate: '',
        endDate: '',
        responsibilities: '',
        achievements: '',
      },
    ],
    education: [
      {
        id: '1',
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
      },
    ],
    skills: {
      technical: [''],
      soft: [''],
      certifications: [''],
    },
    target: {
      title: '',
      industry: '',
      summary: '',
    },
  });

  useEffect(() => {
    // In a real app, this would fetch the resume data from an API
    // For the MVP, we'll use mock data
    const loadResume = () => {
      setTimeout(() => {
        const resume = mockResumes.find(r => r.id === id);
        
        if (resume) {
          // In a real app, we would load the full resume data
          // For MVP, we'll just use the mock resume title and industry
          setFormData(prev => ({
            ...prev,
            target: {
              ...prev.target,
              title: resume.targetPosition,
              industry: resume.industry
            }
          }));
        }
        
        setIsLoading(false);
      }, 800);
    };

    if (id) {
      loadResume();
    }
  }, [id]);

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, this would save the resume to a database
      // For MVP, we'll simulate a save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Resume updated successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resume? This action cannot be undone.')) {
      try {
        // In a real app, this would delete the resume from a database
        // For MVP, we'll simulate deletion
        await new Promise(resolve => setTimeout(resolve, 500));
        
        toast.success('Resume deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting resume:', error);
        toast.error('Failed to delete resume. Please try again.');
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm 
            data={formData.personal} 
            updateData={(data) => updateFormData('personal', data)} 
          />
        );
      case 'experience':
        return (
          <MilitaryExperienceForm 
            data={formData.experience} 
            updateData={(data) => updateFormData('experience', data)} 
          />
        );
      case 'education':
        return (
          <EducationForm 
            data={formData.education} 
            updateData={(data) => updateFormData('education', data)} 
          />
        );
      case 'skills':
        return (
          <SkillsForm 
            data={formData.skills} 
            updateData={(data) => updateFormData('skills', data)} 
          />
        );
      case 'target':
        return (
          <TargetJobForm 
            data={formData.target} 
            updateData={(data) => updateFormData('target', data)} 
          />
        );
      case 'preview':
        return (
          <ResumePreview formData={formData} />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-800 hover:text-blue-900 inline-flex items-center mb-2"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Resume</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center ${
              isSaving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Save size={18} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download
          </button>
          
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 px-4 py-2 rounded-md border border-red-300 hover:border-red-500 flex items-center"
          >
            <Trash2 size={18} className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'personal'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'experience'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'education'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            Education
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'skills'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => setActiveTab('target')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'target'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            Target Job
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'preview'
                ? 'text-blue-800 border-b-2 border-blue-800'
                : 'text-gray-600 hover:text-blue-800'
            }`}
          >
            Preview
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}