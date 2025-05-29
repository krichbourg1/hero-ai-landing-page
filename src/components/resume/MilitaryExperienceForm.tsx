import { useState, useEffect } from 'react';
import { Briefcase, PlusCircle, Trash2 } from 'lucide-react';

interface MilitaryExperience {
  id: string;
  title: string;
  branch: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  achievements: string;
}

interface MilitaryExperienceFormProps {
  data: MilitaryExperience[];
  updateData: (data: MilitaryExperience[]) => void;
}

export default function MilitaryExperienceForm({ data, updateData }: MilitaryExperienceFormProps) {
  const [experiences, setExperiences] = useState<MilitaryExperience[]>(data);

  useEffect(() => {
    updateData(experiences);
  }, [experiences, updateData]);

  const handleChange = (id: string, field: keyof MilitaryExperience, value: string) => {
    setExperiences(prevExperiences =>
      prevExperiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const addExperience = () => {
    const newExperience: MilitaryExperience = {
      id: `exp-${Date.now()}`,
      title: '',
      branch: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      achievements: '',
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="mr-4 bg-blue-100 rounded-full p-2">
          <Briefcase size={24} className="text-blue-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Military or First Responder Experience</h2>
          <p className="text-gray-600">Add your service details and key responsibilities</p>
        </div>
      </div>

      {experiences.map((experience, index) => (
        <div key={experience.id} className="mb-8 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Experience {index + 1}
            </h3>
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(experience.id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <Trash2 size={18} className="mr-1" />
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor={`title-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Position/Rank*
              </label>
              <input
                type="text"
                id={`title-${experience.id}`}
                value={experience.title}
                onChange={(e) => handleChange(experience.id, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Squad Leader, Firefighter, Police Officer"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`branch-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Branch/Department*
              </label>
              <input
                type="text"
                id={`branch-${experience.id}`}
                value={experience.branch}
                onChange={(e) => handleChange(experience.id, 'branch', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., US Army, Fire Department, Police Department"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`startDate-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="month"
                id={`startDate-${experience.id}`}
                value={experience.startDate}
                onChange={(e) => handleChange(experience.id, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor={`endDate-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="month"
                id={`endDate-${experience.id}`}
                value={experience.endDate}
                onChange={(e) => handleChange(experience.id, 'endDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Present if still serving"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor={`responsibilities-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Primary Responsibilities*
              </label>
              <textarea
                id={`responsibilities-${experience.id}`}
                value={experience.responsibilities}
                onChange={(e) => handleChange(experience.id, 'responsibilities', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Describe your day-to-day responsibilities and duties"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use military/first responder terminology - our AI will translate this to civilian terms
              </p>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor={`achievements-${experience.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Key Achievements*
              </label>
              <textarea
                id={`achievements-${experience.id}`}
                value={experience.achievements}
                onChange={(e) => handleChange(experience.id, 'achievements', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="List your accomplishments, awards, or notable outcomes"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Include metrics when possible (e.g., led team of 12, improved efficiency by 20%)
              </p>
            </div>
          </div>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addExperience}
        className="flex items-center text-blue-800 hover:text-blue-900 font-medium"
      >
        <PlusCircle size={18} className="mr-2" />
        Add Another Experience
      </button>
      
      <p className="text-sm text-gray-500 mt-4">* Required fields</p>
    </div>
  );
}