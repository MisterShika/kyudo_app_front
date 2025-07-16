'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function TargetArea() {
    const [target, setTarget] = useState([]);
    const targetRef = useRef(null);

    const targetClick = (e) => {
    const rect = targetRef.current.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    console.log(`Clicked at X: ${x.toFixed(2)}%, Y: ${y.toFixed(2)}%`);
    }

    return (
        <div className="target-box h-full">
            <div className="top-target flex flex-col h-auto sm:h-[52%]">
                <div className="notice-area flex items-center justify-center h-8 bg-green-200">
                    Information
                </div>
                <div className="target-container flex-grow flex items-center justify-center">
                    <div ref={targetRef} onClick={targetClick} className="target-area relative flex items-end justify-center aspect-[9/5] w-full h-auto sm:w-auto sm:h-full bg-blue-300">
                        <div className="relative w-[28%] h-[50%] mb-[5%]">
                            <Image
                            src="/images/kyudoTarget.png"
                            alt="Kyudo Target"
                            fill
                            className="object-contain"
                            />
                        </div>
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