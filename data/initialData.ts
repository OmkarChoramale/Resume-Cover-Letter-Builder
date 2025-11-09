import type { Document } from '../types';

export const initialDocument: Document = {
  id: 'starter-doc-1',
  name: 'My First Resume',
  type: 'resume',
  lastModified: Date.now(),
  data: {
    personalInfo: {
      name: 'Jane Doe',
      title: 'Senior Frontend Developer',
      email: 'jane.doe@example.com',
      phone: '(123) 456-7890',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/janedoe',
      github: 'github.com/janedoe',
      website: 'janedoe.dev',
      profilePicture: null,
    },
    summary: 'Innovative Senior Frontend Developer with 8+ years of experience building and maintaining responsive web applications. Proficient in React, TypeScript, and modern JavaScript frameworks. Passionate about creating intuitive user interfaces and delivering exceptional user experiences.',
    coverLetter: `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the Frontend Developer position at [Company Name], which I saw advertised on [Platform]. With my extensive experience in building modern, responsive web applications with React and TypeScript, I am confident that I possess the skills and qualifications necessary to excel in this role and contribute significantly to your team.

In my previous role at Tech Solutions Inc., I led the development of a new customer-facing dashboard, resulting in a 20% increase in user engagement. This experience has equipped me with a strong foundation in creating intuitive user interfaces and a proven ability to collaborate effectively with designers and backend developers.

I am particularly drawn to [Company Name] because of its commitment to innovation and user experience. I am eager to bring my passion for clean code and my dedication to excellence to your talented team.

Thank you for considering my application. I have attached my resume for your review and would welcome the opportunity to discuss how my skills and experience can benefit [Company Name].

Sincerely,
Jane Doe`,
    experience: [
      {
        id: 'exp1',
        company: 'Tech Solutions Inc.',
        role: 'Senior Frontend Developer',
        startDate: 'Jan 2020',
        endDate: 'Present',
        description: '• Led the development of a new customer-facing dashboard using React and TypeScript, resulting in a 20% increase in user engagement.\n• Mentored junior developers and conducted code reviews to ensure high-quality standards.\n• Collaborated with UX/UI designers to implement complex, interactive features.',
      },
      {
        id: 'exp2',
        company: 'Web Innovators',
        role: 'Frontend Developer',
        startDate: 'Jun 2016',
        endDate: 'Dec 2019',
        description: '• Developed and maintained components for a large-scale e-commerce platform.\n• Improved website performance by optimizing loading times, achieving a 30% reduction in bounce rate.\n• Worked in an Agile team to deliver features on a bi-weekly sprint schedule.',
      },
    ],
    education: [
      {
        id: 'edu1',
        institution: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        startDate: 'Aug 2012',
        endDate: 'May 2016',
        gpa: '3.8/4.0',
      },
    ],
    skills: [
        { id: 'skill1', value: 'React' },
        { id: 'skill2', value: 'TypeScript' },
        { id: 'skill3', value: 'JavaScript (ES6+)' },
        { id: 'skill4', value: 'HTML5 & CSS3' },
        { id: 'skill5', value: 'Tailwind CSS' },
        { id: 'skill6', value: 'Next.js' },
        { id: 'skill7', value: 'Node.js' },
        { id: 'skill8', value: 'GraphQL' },
        { id: 'skill9', value: 'Jest' },
        { id: 'skill10', value: 'Webpack' }
    ],
    projects: [
      {
        id: 'proj1',
        name: 'Personal Portfolio Website',
        description: 'A responsive personal portfolio built with Next.js and deployed on Vercel, showcasing my projects and skills.',
        link: 'janedoe.dev',
      },
    ],
    certificates: [
      { id: 'cert1', name: 'React - The Complete Guide', issuer: 'Udemy', date: '2021' }
    ],
    achievements: [
        { id: 'ach1', description: 'Won the "Innovator of the Year" award at Tech Solutions Inc. in 2022.'}
    ],
    languages: [
        { id: 'lang1', name: 'English', proficiency: 'Native'},
        { id: 'lang2', name: 'Spanish', proficiency: 'Proficient'}
    ],
    hobbies: [
        { id: 'hob1', name: 'Hiking' },
        { id: 'hob2', name: 'Photography' }
    ],
  },
  customization: {
    template: 'modern',
    theme: {
      colors: {
        primary: '#1e293b',    // slate-800
        text: '#334155',       // slate-700
        accent: '#0ea5e9',     // sky-500
        background: '#ffffff',
      },
      fonts: {
        heading: {
          family: "'Inter', sans-serif",
          size: 28,
          weight: 700,
        },
        body: {
          family: "'Inter', sans-serif",
          size: 14,
          weight: 400,
        },
      }
    },
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certificates: true,
      achievements: false,
      languages: false,
      hobbies: false,
      personalInfo: true,
      coverLetter: true,
    },
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certificates', 'achievements', 'languages', 'hobbies'],
    canvasLayout: [],
  },
};