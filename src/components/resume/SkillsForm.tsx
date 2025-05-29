import { useState, useEffect } from 'react';
import { Award, X, Plus } from 'lucide-react';

interface Skills {
  technical: string[];
  soft: string[];
  certifications: string[];
}

interface SkillsFormProps {
  data: Skills;
  updateData: (data: Skills) => void;
}

export default function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skills>(data);
  const [newTechnical, setNewTechnical] = useState('');
  const [newSoft, setNewSoft] = useState('');
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    updateData(skills);
  }, [skills, updateData]);

  const addSkill = (type: keyof Skills, value: string) => {
    if (!value.trim()) return;
    
    setSkills(prev => ({
      ...prev,
      [type]: [...prev[type], value.trim()]
    }));
    
    // Reset input field
    switch (type) {
      case 'technical':
        setNewTechnical('');
        break;
      case 'soft':
        setNewSoft('');
        break;
      case 'certifications':
        setNewCertification('');
        break;
    }
  };

  const removeSkill = (type: keyof Skills, index: number) => {
    setSkills(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: keyof Skills, value: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(type, value);
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="mr-4 bg-blue-100 rounded-full p-2">
          <Award size={24} className="text-blue-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Skills & Certifications</h2>
          <p className="text-gray-600">Add your technical skills, soft skills, and certifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Skills</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter skills related to specific technologies, tools, or specialized knowledge
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.technical.map((skill, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill('technical', index)}
                  className="ml-2 text-blue-800 hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={newTechnical}
              onChange={(e) => setNewTechnical(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'technical', newTechnical)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Radio Communications"
            />
            <button
              type="button"
              onClick={() => addSkill('technical', newTechnical)}
              className="bg-blue-800 text-white px-4 py-2 rounded-r-md hover:bg-blue-900"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Soft Skills</h3>
          <p className="text-sm text-gray-600 mb-4">
            Enter interpersonal skills and character traits that make you effective
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.soft.map((skill, index) => (
              <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill('soft', index)}
                  className="ml-2 text-green-800 hover:text-green-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={newSoft}
              onChange={(e) => setNewSoft(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'soft', newSoft)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Leadership"
            />
            <button
              type="button"
              onClick={() => addSkill('soft', newSoft)}
              className="bg-green-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        {/* Certifications */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Certifications & Licenses</h3>
          <p className="text-sm text-gray-600 mb-4">
            Add any professional certifications, licenses, or specialized training
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.certifications.map((cert, index) => (
              <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
                <span>{cert}</span>
                <button
                  type="button"
                  onClick={() => removeSkill('certifications', index)}
                  className="ml-2 text-purple-800 hover:text-purple-900"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'certifications', newCertification)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., First Aid Certification"
            />
            <button
              type="button"
              onClick={() => addSkill('certifications', newCertification)}
              className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}