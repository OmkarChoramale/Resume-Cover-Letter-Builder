import React, { type FC, type SVGProps } from 'react';
// FIX: Import useResumeStore hook and Document type.
import { useResumeStore } from '../hooks/useResumeStore';
import type { Document } from '../types';
import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};


const Dashboard = () => {
    const store = useResumeStore();
    
    const handleCreateNew = (type: 'resume' | 'cover-letter') => {
        store.createNewDocument(type, type === 'resume' ? 'canvas' : 'modern-cl');
    };
    
    const handleSelect = (id: string) => {
        store.selectDocument(id);
    };
    
    return (
        <div className="min-h-screen p-4 sm:p-8 overflow-y-auto">
            <motion.div 
                className="max-w-7xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.header variants={itemVariants} className="flex justify-between items-center mb-10">
                     <h1 className="text-3xl font-bold text-white">Elegance<span style={{color: 'var(--accent)'}}>AI</span></h1>
                    <button className="font-semibold text-gray-300 hover:text-white transition-colors">Logout</button>
                </motion.header>

                <motion.section variants={itemVariants} className="mb-12">
                    <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-cyan-900/50 border border-[var(--border-color)] shadow-2xl shadow-purple-500/10 text-white">
                        <h2 className="text-4xl font-bold">Welcome Back!</h2>
                        <p className="mt-2 text-purple-200 max-w-2xl">Ready to land your dream job? Let's craft the perfect application.</p>
                    </div>
                </motion.section>
                
                <motion.section variants={itemVariants} className="mb-12">
                     <h2 className="text-3xl font-semibold text-gray-200 mb-6">Start a New Document</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <NewDocumentCard
                            title="Create a New Resume"
                            description="Use our free-form Canvas or choose an elegant template to build your professional resume."
                            icon={ResumeIcon}
                            onClick={() => handleCreateNew('resume')}
                        />
                        <NewDocumentCard
                            title="Create a New Cover Letter"
                            description="Craft a compelling cover letter that complements your resume and application."
                            icon={CoverLetterIcon}
                            onClick={() => handleCreateNew('cover-letter')}
                        />
                    </div>
                </motion.section>

                <motion.section variants={itemVariants}>
                    <h2 className="text-3xl font-semibold text-gray-200 mb-6">Recent Documents</h2>
                    <div className="bg-black/30 backdrop-blur-xl border border-[var(--border-color)] rounded-2xl shadow-lg p-6">
                        {store.documents.length > 0 ? (
                             <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                                {store.documents.map((doc) => (
                                    <DocumentListItem 
                                        key={doc.id} 
                                        doc={doc} 
                                        onSelect={handleSelect} 
                                        onDelete={store.deleteDocument} />
                                ))}
                            </motion.ul>
                        ) : (
                            <div className="text-center text-gray-400 py-12">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-200">No documents</h3>
                                <p className="mt-1 text-sm text-gray-400">Get started by creating a new document.</p>
                            </div>
                        )}
                    </div>
                </section>
            </motion.div>
        </div>
    );
};

const NewDocumentCard = ({ title, description, icon: Icon, onClick }: { title: string; description: string; icon: FC<SVGProps<SVGSVGElement>>; onClick: () => void;}) => (
    <motion.button 
        onClick={onClick}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="bg-black/30 backdrop-blur-xl border border-[var(--border-color)] p-6 rounded-2xl shadow-lg hover:shadow-[var(--accent)]/10 text-left group flex items-start gap-5"
    >
         <div className="bg-gradient-to-br from-cyan-400/20 to-purple-400/20 text-cyan-300 p-4 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <Icon className="w-8 h-8" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-gray-100">{title}</h3>
            <p className="text-gray-400 mt-1 text-sm">{description}</p>
        </div>
    </motion.button>
);

// FIX: Define props interface for DocumentListItem to fix TypeScript error with `key` prop.
interface DocumentListItemProps {
    doc: Document;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
}

const DocumentListItem: FC<DocumentListItemProps> = ({ doc, onSelect, onDelete }) => (
    <motion.li variants={itemVariants} className="flex items-center justify-between p-4 bg-black/40 hover:bg-black/50 border border-[var(--border-color)] rounded-xl shadow-md transition-all hover:border-[var(--accent)]/50">
        <div className="flex items-center">
             <div className="mr-4 text-cyan-400">{doc.type === 'resume' ? <ResumeIcon className="w-6 h-6" /> : <CoverLetterIcon className="w-6 h-6" />}</div>
            <div>
                <p className="font-semibold text-gray-200">{doc.name}</p>
                <p className="text-sm text-gray-400">Last modified: {new Date(doc.lastModified).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={() => onSelect(doc.id)} className="font-semibold text-[var(--accent)] hover:brightness-110 transition-colors">Edit</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(doc.id); }} className="text-gray-500 hover:text-red-500 transition-colors p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
            </button>
        </div>
    </motion.li>
);

const ResumeIcon = (props: SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const CoverLetterIcon = (props: SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

export default Dashboard;