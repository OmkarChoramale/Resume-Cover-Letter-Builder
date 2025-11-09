import React, { type FC } from 'react';
// FIX: Import correct store hook and types
import { useResumeStore } from '../../hooks/useResumeStore';
import { fonts, fontWeights, fontFamilies } from '../../data/templates';
import Accordion from '../ui/Accordion';
import Input from '../ui/Input';
import ColorInput from '../ui/ColorInput';
import type { Theme } from '../../types';

const themePresets: { name: string; colors: Theme['colors'] }[] = [
    {
        name: 'Midnight Slate',
        colors: { primary: '#1e293b', accent: '#0ea5e9', text: '#334155', background: '#ffffff' },
    },
    {
        name: 'Forest Emerald',
        colors: { primary: '#064e3b', accent: '#34d399', text: '#1f2937', background: '#f9fafb' },
    },
    {
        name: 'Crimson Gold',
        colors: { primary: '#991b1b', accent: '#f59e0b', text: '#171717', background: '#ffffff' },
    },
    {
        name: 'Royal Indigo',
        colors: { primary: '#4338ca', accent: '#a78bfa', text: '#1e1b4b', background: '#f5f3ff' },
    },
];

const StyleEditor: FC = () => {
    const store = useResumeStore();
    const theme = store.activeDocument?.customization.theme;

    if (!theme) return null;

    const handleThemeChange = (path: string, value: unknown) => {
        store.updateTheme({ path, value });
    };

    const handlePresetClick = (colors: Theme['colors']) => {
        store.updateTheme({ colors });
    };
    
    const getFontName = (family: string) => {
        const entry = Object.entries(fontFamilies).find(([, f]) => f === family);
        return entry ? entry[0] : 'inter';
    }

    return (
        <div className="space-y-6">
            <Accordion title="Theme Presets">
                <p className="text-xs text-gray-400 mb-3">Select a pre-defined theme to get started.</p>
                <div className="grid grid-cols-2 gap-3">
                    {themePresets.map(preset => (
                        <div 
                            key={preset.name} 
                            onClick={() => handlePresetClick(preset.colors)} 
                            className="cursor-pointer p-2 border border-white/20 rounded-lg hover:border-[var(--accent)] transition-colors"
                        >
                            <div className="flex h-8 w-full rounded overflow-hidden mb-1">
                                <div style={{ backgroundColor: preset.colors.primary }} className="w-1/4 h-full"></div>
                                <div style={{ backgroundColor: preset.colors.accent }} className="w-1/4 h-full"></div>
                                <div style={{ backgroundColor: preset.colors.text }} className="w-1/4 h-full"></div>
                                <div style={{ backgroundColor: preset.colors.background, border: '1px solid #333' }} className="w-1/4 h-full"></div>
                            </div>
                            <p className="text-xs text-center text-gray-300">{preset.name}</p>
                        </div>
                    ))}
                </div>
            </Accordion>
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
                        <select 
                            value={getFontName(theme.fonts.heading.family)} 
                            onChange={e => handleThemeChange('fonts.heading.family', fontFamilies[e.target.value])} 
                            className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition"
                            style={{ fontFamily: theme.fonts.heading.family, fontSize: '1rem' }}
                        >
                            {fonts.map(font => {
                                const fontFamilyKey = font.name.toLowerCase().replace(/ /g, '');
                                const fontFamilyValue = fontFamilies[fontFamilyKey];
                                return (
                                    <option 
                                        key={font.name} 
                                        value={fontFamilyKey} 
                                        style={{ fontFamily: fontFamilyValue, fontSize: '1rem' }}
                                    >
                                        {font.name}
                                    </option>
                                );
                            })}
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
                        <select 
                            value={getFontName(theme.fonts.body.family)} 
                            onChange={e => handleThemeChange('fonts.body.family', fontFamilies[e.target.value])} 
                            className="w-full p-2 border border-[var(--border-color)] rounded-lg bg-black/30 text-white focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition"
                            style={{ fontFamily: theme.fonts.body.family, fontSize: '1rem' }}
                        >
                             {fonts.map(font => {
                                const fontFamilyKey = font.name.toLowerCase().replace(/ /g, '');
                                const fontFamilyValue = fontFamilies[fontFamilyKey];
                                return (
                                    <option 
                                        key={font.name} 
                                        value={fontFamilyKey} 
                                        style={{ fontFamily: fontFamilyValue, fontSize: '1rem' }}
                                    >
                                        {font.name}
                                    </option>
                                );
                            })}
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
