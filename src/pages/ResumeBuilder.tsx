import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import MilitaryExperienceForm from '../components/resume/MilitaryExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import TargetJobForm from '../components/resume/TargetJobForm';
import ResumePreview from '../components/resume/ResumePreview';

const steps = [
  { id: 'personal', name: 'Personal Info' },
  { id: 'experience', name: 'Military Experience' },
  { id: 'education', name: 'Education' },
  { id: 'skills', name: 'Skills' },
  { id: 'target', name: 'Target Job' },
  { id: 'preview', name: 'Preview' },
];

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const updateFormData = (step: string, data: any) => {
    setFormData({
      ...formData,
      [step]: data,
    });
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would save the resume to a database
      // For MVP, we'll simulate a save and redirect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Resume created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep].id) {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Resume</h1>
        <p className="text-gray-600 mt-2">Enter your information to create a civilian-friendly resume</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <nav className="flex items-center justify-center" aria-label="Progress">
          <ol className="space-y-6 md:flex md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.id} className="md:flex-1">
                <button
                  onClick={() => setCurrentStep(index)}
                  className={`flex flex-col py-2 px-4 md:pl-0 md:pt-4 md:pb-0 w-full ${
                    index <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  disabled={index > currentStep}
                >
                  <span className="text-xs font-semibold tracking-wide uppercase">
                    Step {index + 1}
                  </span>
                  <span
                    className={`mt-1 text-sm font-medium ${
                      index === currentStep
                        ? 'text-blue-800'
                        : index < currentStep
                        ? 'text-gray-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  index === currentStep
                    ? 'bg-blue-800 text-white'
                    : index < currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index < currentStep ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {currentStep > 0 ? (
          <button
            onClick={prevStep}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md flex items-center"
          >
            <ChevronLeft size={18} className="mr-2" />
            Previous
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md flex items-center"
          >
            Next
            <ChevronRight size={18} className="ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md flex items-center ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <Save size={18} className="mr-2" />
            {isLoading ? 'Saving...' : 'Save Resume'}
          </button>
        )}
      </div>
    </div>
  );
}