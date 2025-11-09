import type { ResumeData } from '../types';

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Frontend Developer',
    email: 'jane.doe@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    github: 'github.com/janedoe',
    website: 'janedoe.dev',
    profilePicture: null,
  },
  summary: 'A passionate Frontend Developer with experience in building responsive and user-friendly web applications using modern technologies like React and TypeScript.',
  experience: [
    {
      id: 'exp1',
      company: 'Tech Solutions Inc.',
      role: 'Frontend Developer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '• Developed and maintained web applications using React and TypeScript.\n• Collaborated with designers and backend developers to create seamless user experiences.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      startDate: 'Aug 2016',
      endDate: 'May 2020',
      gpa: '3.8/4.0',
    },
  ],
  skills: [
      { id: 'skill1', value: 'React' },
      { id: 'skill2', value: 'TypeScript' },
      { id: 'skill3', value: 'JavaScript (ES6+)' },
      { id: 'skill4', value: 'HTML & CSS' },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Portfolio Website',
      description: 'A personal portfolio website to showcase my skills and projects.',
      link: 'janedoe.dev',
    },
  ],
  // FIX: Added missing fields to initial data.
  certificates: [],
  achievements: [],
  languages: [],
  hobbies: [],
  coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the [Job Title] position at [Company Name], which I saw advertised on [Platform, e.g., LinkedIn]. With my background in [Your Field] and my experience in [mention a key skill or technology], I am confident that I possess the skills and qualifications necessary to excel in this role and contribute significantly to your team.

In my previous role at [Previous Company], I was responsible for [mention a key responsibility]. One of my proudest achievements was [mention a specific accomplishment and quantify it if possible, e.g., "increasing user engagement by 15% by redesigning the main dashboard"]. This experience has honed my abilities in [mention relevant skills].

I have long admired [Company Name]'s commitment to [mention something specific about the company, e.g., innovation, user experience, a specific product] and I am eager to bring my passion for [Your Field] to a company that shares my values.

Thank you for considering my application. I have attached my resume for your review and would welcome the opportunity to discuss how my skills and experience can benefit [Company Name].

Sincerely,
[Your Name]`,
};
