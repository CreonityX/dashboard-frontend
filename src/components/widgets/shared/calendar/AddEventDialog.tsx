"use client";

import { useState } from "react";
import { X, Calendar, Clock, MapPin, Users, Link as LinkIcon, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddEventDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const EVENT_TYPES = [
    { id: 'deadline', label: 'Deadline', color: 'bg-red-500' },
    { id: 'milestone', label: 'Milestone', color: 'bg-blue-500' },
    { id: 'meeting', label: 'Meeting', color: 'bg-[#a3e635]' },
    { id: 'publishing', label: 'Publishing', color: 'bg-purple-500' },
    { id: 'payment', label: 'Payment', color: 'bg-yellow-500' },
    { id: 'reminder', label: 'Reminder', color: 'bg-zinc-500' },
];

export function AddEventDialog({ isOpen, onClose }: AddEventDialogProps) {
    const [selectedType, setSelectedType] = useState('meeting');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">New Event</h3>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 overflow-y-auto">

                    {/* Event Type Selector */}
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                        {EVENT_TYPES.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedType(type.id)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase whitespace-nowrap transition-all",
                                    selectedType === type.id
                                        ? "bg-white/10 border-white/20 text-white shadow-sm"
                                        : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700"
                                )}
                            >
                                <div className={cn("w-2 h-2 rounded-full", type.color)} />
                                {type.label}
                            </button>
                        ))}
                    </div>

                    {/* Title Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Event Title"
                            className="w-full bg-transparent text-2xl font-bold text-white placeholder:text-zinc-600 focus:outline-none border-b border-zinc-800 focus:border-purple-500 pb-2 transition-colors"
                            autoFocus
                        />
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</label>
                            <input type="date" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</label>
                            <input type="time" className="w-full bg-zinc-800/50 border border-zinc-700 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500" />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <LinkIcon className="w-4 h-4 text-zinc-600" />
                            <select className="flex-1 bg-transparent border-b border-zinc-800 text-sm text-zinc-400 py-1 focus:outline-none focus:border-purple-500 appearance-none">
                                <option>Link to Gig / Project...</option>
                                <option>Samsung S26 Review</option>
                                <option>Nike Summer Campaign</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-zinc-600" />
                            <input
                                type="text"
                                placeholder="Add Attendees (email)"
                                className="flex-1 bg-transparent border-b border-zinc-800 text-sm text-white placeholder:text-zinc-600 py-1 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-zinc-600" />
                            <input
                                type="text"
                                placeholder="Location or Video Link"
                                className="flex-1 bg-transparent border-b border-zinc-800 text-sm text-white placeholder:text-zinc-600 py-1 focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <textarea
                        className="w-full h-24 bg-zinc-800/30 border border-zinc-800 rounded-sm p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 resize-none"
                        placeholder="Add notes or description..."
                    />
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-white/5 bg-zinc-900 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white uppercase transition-colors">Cancel</button>
                    <button onClick={onClose} className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold uppercase rounded-sm shadow-lg shadow-purple-500/20 transition-all">Save Event</button>
                </div>
            </div>
        </div>
    );
}
