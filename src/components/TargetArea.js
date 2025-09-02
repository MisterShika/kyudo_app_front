'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { KyudoButton } from "@/components/ui/KyudoButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function TargetArea({ userId, sessionId }) {
    const [dots, setDots] = useState([]);
    const [currentDot, setCurrentDot] = useState();
    const targetRef = useRef(null);

    //For sure a better way to set up the target boundaries but this was all I can think of for now.
    const hitArea = {
        xPercent: 49.9062683069713, // %
        yPercent: 66.13592028259609, // %
        radiusPercent: (69 / 533.44) * 100, // radius converted from your test size to %
    };

    const resizeCanvas = () => {
        const canvas = targetRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        drawDots();
    };

    const clearCurrent = () => {
        setCurrentDot();
    }

    const confirmCurrent = async () => {
        const shot = currentDot;

        //Add shot to database
        try {
            const response = await fetch('http://localhost:3000/shots/addshot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    userId: userId,
                    x: shot.xPercent,
                    y: shot.yPercent,
                    hit: shot.hit,
                    kinteki: false
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add shot');
            }

        } catch (error) {
            console.error('Error adding shot:', error);
        }

        clearCurrent();

        // Clear current shot and then retrieve most
        // recent shot (the one added in this function)
        // and add it to the displayed shots
        // so you're not puling every single shot on submission
        try {
            const addedShot = await getRecentShot(sessionId);
            setDots((prev) => [...prev, addedShot.shot]);
        } catch (error) {
            console.error('Error retrieving most recent shot:', error);
        }
    }

    const deleteArrowFromList = (arrowId) => {
        console.log(`Deleted ID is : ${arrowId}`);
    }

    const getShots = async (sessionId) => {
        const shots = await fetch(`http://localhost:3000/shots/getShotsFromSession/${sessionId}`);
        if (!shots.ok) {
            throw new Error(`Failed to fetch shots: ${shots.status}`);
        }
        return shots.json();
    }

    const getRecentShot = async (sessionId) => {
        const shot = await fetch(`http://localhost:3000/shots/getMostRecentShot/${sessionId}`);
        if (!shot.ok) {
            throw new Error(`Failed to fetch shot: ${shot.status}`);
        }
        return shot.json();
    }

    const drawDots = () => {
        const canvas = targetRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentDot) {
            const { xPercent, yPercent, hit } = currentDot;

            const x = (xPercent / 100) * canvas.width;
            const y = (yPercent / 100) * canvas.height;
            // const color = hit == true ? 'blue' : 'red';
            const color = 'gold';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        dots.forEach(({ x, y, hit }) => {
            
            console.log(`x: ${x}, y: ${y}, hit: ${hit}`);
            const xPercent = (x / 100) * canvas.width;
            const yPercent = (y / 100) * canvas.height;
            const color = hit == true ? 'blue' : 'red';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(xPercent, yPercent, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const targetClick = (e) => {
        const rect = targetRef.current.getBoundingClientRect();

        // Click position in %
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

        // Circle center & radius in px
        const cx = (hitArea.xPercent / 100) * rect.width;
        const cy = (hitArea.yPercent / 100) * rect.height;
        const r = (hitArea.radiusPercent / 100) * rect.width;

        // Click in px
        const clickX = (xPercent / 100) * rect.width;
        const clickY = (yPercent / 100) * rect.height;

        const dist = Math.sqrt((clickX - cx) ** 2 + (clickY - cy) ** 2);

        const hit = dist <= r ? true : false;

        setCurrentDot({ xPercent, yPercent, hit });
    }


    useEffect(() => {
        if (!sessionId) return;

        const fetchDots = async () => {
            try {
                const shotsFromDb = await getShots(sessionId);
                setDots(shotsFromDb.shots);
            } catch (err) {
                console.error("Failed to fetch dots:", err);
            }
        };
        fetchDots();
    }, [sessionId]);

    useEffect(() => {
        console.log('Draw Dots Fired');
        drawDots();
    }, [dots, currentDot]);


    return (
        <div className="target-box h-full">
            <div className="top-target flex flex-col h-auto sm:h-[52%]">
                <div className="notice-area flex items-center justify-center h-8 bg-green-200">
                    Information
                </div>
                <div className="target-container flex-grow flex items-center justify-center">
                    <div className="target-area relative flex items-end justify-center aspect-[9/5] w-full h-auto sm:w-auto sm:h-full bg-blue-300">
                        <div className="relative w-[28%] h-[50%] mb-[5%]">
                            <Image
                            src="/images/kyudoTarget.png"
                            alt="Kyudo Target"
                            fill
                            className="object-contain"
                            />
                        </div>
                        <canvas ref={targetRef} onClick={targetClick} className="targetCanvas absolute top-0 left-0 w-full h-full">

                        </canvas>
                    </div>
                </div>
                <div className="confirmation-rect flex items-center justify-center h-8 bg-purple-200">
                    {currentDot ? (
                        <div>
                            <KyudoButton onClick={confirmCurrent}>
                                Confirm
                            </KyudoButton>
                            <KyudoButton onClick={clearCurrent}>
                                Clear
                            </KyudoButton>
                        </div>
                    ) : (
                        <div><button>Finish session</button></div>
                    )}
                </div>
            </div>
            <div className="bottom-target h-[48%] overflow-y-auto">
                <div className="shot-list">
                    <ul>
                        {dots
                            .slice()
                            .reverse()
                            .map((dot, index) => (
                                <li key={index}>
                                    <div>{index}</div>
                                    <div>
                                        {dot.hit ? (
                                            <FontAwesomeIcon icon={faCircle} className="text-blue-500 w-5 h-5" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} className="text-red-500 w-5 h-5" />
                                        )}
                                    </div>
                                    <div>Tags</div>
                                    <div>
                                        <KyudoButton onClick={() => deleteArrowFromList(index)}>
                                            Delete
                                        </KyudoButton>
                                    </div>
                                </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}