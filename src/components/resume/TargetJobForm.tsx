import { useState, useEffect } from 'react';
import { Target } from 'lucide-react';

interface TargetJob {
  title: string;
  industry: string;
  summary: string;
}

interface TargetJobFormProps {
  data: TargetJob;
  updateData: (data: TargetJob) => void;
}

export default function TargetJobForm({ data, updateData }: TargetJobFormProps) {
  const [formData, setFormData] = useState<TargetJob>(data);

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Common civilian industries
  const industries = [
    "Select an industry",
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Construction",
    "Transportation",
    "Hospitality",
    "Marketing",
    "Government",
    "Nonprofit",
    "Security",
    "Logistics",
    "Human Resources",
    "Legal",
    "Consulting",
    "Energy",
    "Other"
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="mr-4 bg-blue-100 rounded-full p-2">
          <Target size={24} className="text-blue-800" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Target Job Information</h2>
          <p className="text-gray-600">Tell us about the civilian job you're targeting</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Target Job Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Project Manager, Operations Director, Security Specialist"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            The civilian job position you're applying for
          </p>
        </div>
        
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
            Target Industry*
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          >
            {industries.map((industry) => (
              <option key={industry} value={industry === "Select an industry" ? "" : industry}>
                {industry}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            The industry in which you're seeking employment
          </p>
        </div>
        
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary*
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Briefly describe your career goals and how your military/first responder experience has prepared you for this role..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Our AI will help refine this summary for your target job
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-md font-medium text-blue-800 mb-2">AI Translation Preview</h3>
          <p className="text-sm text-gray-700 mb-3">
            Our AI will translate your military/first responder experience into civilian-friendly terminology tailored to your target job and industry.
          </p>
          <div className="flex items-start">
            <div className="bg-white rounded p-3 border border-blue-200 text-sm text-gray-800">
              <p className="italic">
                {formData.title && formData.industry ? 
                  `Your experience will be translated to match skills and competencies valued in the ${formData.industry} industry for ${formData.title} positions.` : 
                  "Fill in your target job details to see a translation preview."}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">* Required fields</p>
    </div>
  );
}