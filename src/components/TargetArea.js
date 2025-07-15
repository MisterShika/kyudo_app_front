'use client';

import { useState } from 'react';

export default function TargetArea() {
    const [target, setTarget] = useState([]);

    return (
        <div className="target-box">
            <div className="target-area">
                Target Area Here
            </div>
            <div className="confirmation-rect">
                Confirmation Rectangle
            </div>
            <div className="shot-list">
                Shot List
            </div>
        </div>
    );
}