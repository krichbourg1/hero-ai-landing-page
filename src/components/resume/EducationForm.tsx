import { useState, useEffect } from 'react';
import { GraduationCap, PlusCircle, Trash2 } from 'lucide-react';

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface EducationFormProps {
  data: Education[];
  updateData: (data: Education[]) => void;
}

export default function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(data);

  useEffect(() => {
    updateData(educations);
  }, [educations, updateData]);

  const handleChange = (id: string, field: keyof Education, value: string) => {
    setEducations(prevEducations =>
      prevEducations.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    };
    setEducations([...educations, newEducation]);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter(edu => edu.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="mr-4 bg-blue-100 rounded-full p-2">
          <GraduationCap size={24} className="text-blue-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          <p className="text-gray-600">Add your educational background and training</p>
        </div>
      </div>

      {educations.map((education, index) => (
        <div key={education.id} className="mb-8 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Education {index + 1}
            </h3>
            {educations.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(education.id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <Trash2 size={18} className="mr-1" />
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor={`school-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                School/Institution Name*
              </label>
              <input
                type="text"
                id={`school-${education.id}`}
                value={education.school}
                onChange={(e) => handleChange(education.id, 'school', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., University name, Military academy, Technical school"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`degree-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Degree/Certificate*
              </label>
              <input
                type="text"
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => handleChange(education.id, 'degree', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Bachelor's, Associate's, Certificate"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`fieldOfStudy-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                id={`fieldOfStudy-${education.id}`}
                value={education.fieldOfStudy}
                onChange={(e) => handleChange(education.id, 'fieldOfStudy', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Business Administration, Criminal Justice"
              />
            </div>
            
            <div>
              <label htmlFor={`startDate-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="month"
                id={`startDate-${education.id}`}
                value={education.startDate}
                onChange={(e) => handleChange(education.id, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor={`endDate-${education.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                End Date (or Expected)
              </label>
              <input
                type="month"
                id={`endDate-${education.id}`}
                value={education.endDate}
                onChange={(e) => handleChange(education.id, 'endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addEducation}
        className="flex items-center text-blue-800 hover:text-blue-900 font-medium"
      >
        <PlusCircle size={18} className="mr-2" />
        Add Another Education
      </button>
      
      <p className="text-sm text-gray-500 mt-4">* Required fields</p>
    </div>
  );
}