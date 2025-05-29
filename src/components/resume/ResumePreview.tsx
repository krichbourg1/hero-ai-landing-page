import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';

interface FormData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    linkedin: string;
  };
  experience: Array<{
    id: string;
    title: string;
    branch: string;
    startDate: string;
    endDate: string;
    responsibilities: string;
    achievements: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    certifications: string[];
  };
  target: {
    title: string;
    industry: string;
    summary: string;
  };
}

interface ResumePreviewProps {
  formData: FormData;
}

export default function ResumePreview({ formData }: ResumePreviewProps) {
  const [translatedExperiences, setTranslatedExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would call an API to get AI translations
    // For the MVP, we'll simulate AI translations
    const simulateTranslation = () => {
      setTimeout(() => {
        const translated = formData.experience.map(exp => {
          // Simple mock translations
          let translatedTitle = exp.title;
          let translatedResponsibilities = exp.responsibilities;
          let translatedAchievements = exp.achievements;
          
          // Military rank translations (very simplified)
          if (exp.title.includes('Squad Leader')) {
            translatedTitle = 'Team Leader';
            translatedResponsibilities = exp.responsibilities.replace(
              'tactical operations',
              'team operations and coordination'
            );
          } else if (exp.title.includes('Sergeant')) {
            translatedTitle = 'Operations Manager';
          } else if (exp.title.includes('Lieutenant')) {
            translatedTitle = 'Project Manager';
          } else if (exp.title.includes('Officer')) {
            translatedTitle = 'Security Specialist';
          }
          
          return {
            ...exp,
            translatedTitle,
            translatedResponsibilities,
            translatedAchievements,
          };
        });
        
        setTranslatedExperiences(translated);
        setIsLoading(false);
      }, 1500);
    };
    
    simulateTranslation();
  }, [formData.experience]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Translating Your Experience</h2>
        <p className="text-gray-600">Our AI is converting your military/first responder experience into civilian terms...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="mr-4 bg-blue-100 rounded-full p-2">
            <FileText size={24} className="text-blue-800" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
            <p className="text-gray-600">Review your civilian-friendly resume</p>
          </div>
        </div>
        
        <button
          className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Download size={18} className="mr-2" />
          Download PDF
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
        {/* Header / Contact Information */}
        <div className="text-center mb-6 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formData.personal.firstName} {formData.personal.lastName}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
            {formData.personal.email && (
              <span className="flex items-center">
                <span className="mr-1">📧</span> {formData.personal.email}
              </span>
            )}
            {formData.personal.phone && (
              <span className="flex items-center">
                <span className="mr-1">📱</span> {formData.personal.phone}
              </span>
            )}
            {(formData.personal.city || formData.personal.state) && (
              <span className="flex items-center">
                <span className="mr-1">📍</span> 
                {formData.personal.city}{formData.personal.city && formData.personal.state ? ', ' : ''}{formData.personal.state}
              </span>
            )}
            {formData.personal.linkedin && (
              <span className="flex items-center">
                <span className="mr-1">🔗</span> LinkedIn: {formData.personal.linkedin}
              </span>
            )}
          </div>
        </div>
        
        {/* Professional Summary */}
        {formData.target.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2 pb-1 border-b border-gray-200">
              Professional Summary
            </h2>
            <p className="text-gray-700">
              {formData.target.summary}
            </p>
          </div>
        )}
        
        {/* Experience */}
        {translatedExperiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
              Professional Experience
            </h2>
            
            {translatedExperiences.map((exp, index) => (
              <div key={exp.id} className={`${index > 0 ? 'mt-5' : ''}`}>
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.translatedTitle || exp.title}
                    </h3>
                    <p className="text-gray-700">{exp.branch}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || 'Present'}
                  </p>
                </div>
                
                {exp.responsibilities && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Responsibilities:</p>
                    <p className="text-gray-700">
                      {exp.translatedResponsibilities || exp.responsibilities}
                    </p>
                  </div>
                )}
                
                {exp.achievements && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700">Achievements:</p>
                    <p className="text-gray-700">
                      {exp.translatedAchievements || exp.achievements}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Education */}
        {formData.education.some(edu => edu.school) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
              Education
            </h2>
            
            {formData.education.filter(edu => edu.school).map((edu, index) => (
              <div key={edu.id} className={`${index > 0 ? 'mt-3' : ''}`}>
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                    <p className="text-gray-700">
                      {edu.degree}{edu.degree && edu.fieldOfStudy ? ', ' : ''}{edu.fieldOfStudy}
                    </p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-sm text-gray-600">
                      {formatDate(edu.startDate)}{edu.startDate && edu.endDate ? ' - ' : ''}{formatDate(edu.endDate)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {(formData.skills.technical.length > 0 || formData.skills.soft.length > 0 || formData.skills.certifications.length > 0) && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200">
              Skills & Certifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.skills.technical.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-1">Technical Skills</h3>
                  <p className="text-gray-700">
                    {formData.skills.technical.join(', ')}
                  </p>
                </div>
              )}
              
              {formData.skills.soft.length > 0 && (
                <div>
                  <h3 className="text-md font-semibold text-gray-800 mb-1">Soft Skills</h3>
                  <p className="text-gray-700">
                    {formData.skills.soft.join(', ')}
                  </p>
                </div>
              )}
            </div>
            
            {formData.skills.certifications.length > 0 && (
              <div className="mt-3">
                <h3 className="text-md font-semibold text-gray-800 mb-1">Certifications & Licenses</h3>
                <p className="text-gray-700">
                  {formData.skills.certifications.join(', ')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="text-md font-medium text-blue-800 mb-2">AI Translation Note</h3>
        <p className="text-sm text-gray-700">
          This preview shows how your military/first responder experience has been translated to civilian terminology. 
          The AI has focused on highlighting transferable skills and achievements that are relevant to your target position 
          in the {formData.target.industry} industry.
        </p>
      </div>
    </div>
  );
}