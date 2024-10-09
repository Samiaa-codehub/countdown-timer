"use client";


import { useState,useRef,useEffect,ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


function CountDown(){
    const [duration,setDuration] = useState<number |string>("");
    const [timeLeft,setTimeLeft] = useState<number>(0);
    const [isActive,setIsActive] = useState<boolean>(false);
    const [isPaused,setIsPaused] = useState<boolean>(false);
    const timerRef =useRef<NodeJS.Timeout | null>(null);


    const handleSetDuration =():void=>{
        if(typeof duration === "number" && duration>0){
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };
    const handleStart = ():void=>{
        if(timeLeft>0){
            setIsActive(true)
            setIsPaused(false)
        }
    };
    const handlePause=():void=>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };
    const handleResert=():void=>{
        setIsActive(false)
        setIsPaused(false)
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };
    useEffect(()=>{
        if(isActive && !isPaused){
            timerRef.current = setInterval(()=>{
                setTimeLeft((prevTime)=>{
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime-1;
                })
            },1000)
        }
        return()=>{
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        };

    },[isActive,isPaused])
    const formatTime = (time:number):string =>{
        const minutes = Math.floor(time/60);
        const second = time% 60;
        return `${String(minutes).padStart(2,"0")}:${String(second).padStart(2,"0")}`
    };
    const handleDurationChange =(e:ChangeEvent<HTMLInputElement>):void=>{
        setDuration(Number(e.target.value) || "");
    };
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-blue-100 dark:bg-blue-900">
            <div className="bg-white dark:gb-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">Countdown Timer</h1>
                <div className="flex items-center mb-6">
                    <Input
                    type="number"
                    id="duration"
                    placeholder="Enter duration in seconds"
                    value={duration}
                    onChange={handleDurationChange}
                    className="flex-1 mr-4 rounded-md border-gray-900 dark:gray-900 dark:dg-gray-700 dark:text-gray-500"
                    />
                    <Button
                    onClick={handleSetDuration}
                    variant="outline"
                    className="text-gray-900 dark:text-gray-500 border-gray-900">Set
                    </Button>
                </div>
                <div className="text-8xl font-bold text-gray-900 dark:text-gray-500 mb-8 text-center">
                    {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-5">
                    <Button
                    onClick={handleStart}
                    variant="outline"
                    className="text-gray-900 dark:text-gray-500 border-gray-900">Start</Button>
                    <Button
                    onClick={handlePause}
                    variant="outline"
                    className="text-gray-900 dark:text-gray-500 border-gray-900">Pause</Button>
                    <Button
                    onClick={handleResert}
                    variant="outline"
                    className="text-gray-900 dark:text-gray-500 border-gray-900">Reset</Button>
                </div>
            </div>
        </div>
    )
};
export default CountDown