
import React, { type FC } from 'react';
import { useResumeStore } from '../../hooks/useResumeStore';
import { fonts, fontWeights, fontFamilies } from '../../data/templates';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import ColorInput from '../ui/ColorInput';

const StyleEditor: FC = () => {
    const store = useResumeStore();
    const theme = store.activeDocument?.customization.theme;

    if (!theme) return null;

    const handleThemeChange = (path: string, value: unknown) => {
        store.updateTheme({ path, value });
    };
    
    const getFontName = (family: string) => {
        const entry = Object.entries(fontFamilies).find(([, f]) => f === family);
        return entry ? entry[0] : 'inter';
    }

    return (
        <div className="space-y-6">
            <Accordion title="Colors">
                <div className="grid grid-cols-2 gap-4">
                    <ColorInput label="Primary/Headings" value={theme.colors.primary} onChange={e => handleThemeChange('colors.primary', e.target.value)} />
                    <ColorInput label="Accent" value={theme.colors.accent} onChange={e => handleThemeChange('colors.accent', e.target.value)} />
                    <ColorInput label="Body Text" value={theme.colors.text} onChange={e => handleThemeChange('colors.text', e.target.value)} />
                    <ColorInput label="Background" value={theme.colors.background} onChange={e => handleThemeChange('colors.background', e.target.value)} />
                </div>
            </Accordion>
            <Accordion title="Typography">
                 <div>
                    <h4 className="text-md font-semibold mb-2 text-gray-300">Headings</h4>
                    <div className="space-y-3 p-3 bg-black/20 rounded-lg">
                        <select value={getFontName(theme.fonts.heading.family)} onChange={e => handleThemeChange('fonts.heading.family', fontFamilies[e.target.value])} className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition">
                            {fonts.map(font => <option key={font.name} value={font.name.toLowerCase().replace(' ', '')}>{font.name}</option>)}
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                             <Input label="Size (px)" type="number" value={theme.fonts.heading.size} onChange={e => handleThemeChange('fonts.heading.size', parseInt(e.target.value))} />
                             <div className="mb-4">
                               <label className="block text-sm font-medium text-gray-300 mb-1">Weight</label>
                               <select value={theme.fonts.heading.weight} onChange={e => handleThemeChange('fonts.heading.weight', parseInt(e.target.value))} className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition">
                                  {fontWeights.map(w => <option key={w} value={w}>{w}</option>)}
                               </select>
                            </div>
                        </div>
                    </div>
                </div>
                 <div>
                    <h4 className="text-md font-semibold mt-4 mb-2 text-gray-300">Body Text</h4>
                     <div className="space-y-3 p-3 bg-black/20 rounded-lg">
                        <select value={getFontName(theme.fonts.body.family)} onChange={e => handleThemeChange('fonts.body.family', fontFamilies[e.target.value])} className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition">
                            {fonts.map(font => <option key={font.name} value={font.name.toLowerCase().replace(' ', '')}>{font.name}</option>)}
                        </select>
                         <div className="grid grid-cols-2 gap-2">
                            <Input label="Size (px)" type="number" value={theme.fonts.body.size} onChange={e => handleThemeChange('fonts.body.size', parseInt(e.target.value))} />
                             <div className="mb-4">
                               <label className="block text-sm font-medium text-gray-300 mb-1">Weight</label>
                               <select value={theme.fonts.body.weight} onChange={e => handleThemeChange('fonts.body.weight', parseInt(e.target.value))} className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition">
                                  {fontWeights.map(w => <option key={w} value={w}>{w}</option>)}
                               </select>
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion>
        </div>
    );
};

export default StyleEditor;