'use client';

import { useState } from 'react';

export default function TargetArea() {
    const [target, setTarget] = useState([]);

    return (
        <div className="target-box h-full">
            <div className="top-target flex flex-col h-[52%] min-h-[264px]">
                <div className="notice-area flex items-center justify-center h-8 bg-green-200">
                    Information
                </div>
                <div className="target-container flex-grow flex items-center justify-center">
                    <div className="target-area aspect-[18/10] h-full max-w-[100%] bg-blue-300">
                        
                    </div>
                </div>
                <div className="confirmation-rect flex items-center justify-center h-8 bg-purple-200">
                    Confirmation Rectangle
                </div>
            </div>
            <div className="bottom-target h-[48%]">
                <div className="shot-list">Shot List</div>
            </div>
        </div>
    );
}