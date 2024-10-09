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
        <div className="flex flex-col items-center justify-center h-screen bg-blue-200 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center font-extrabold">Countdown Timer</h1>
                <div className="flex items-center mb-6">
                    <Input
                    type="number"
                    id="duration"
                    placeholder="Enter duration in seconds"
                    value={duration}
                    onChange={handleDurationChange} 
                    className="flex-2 mb-20 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 "/>

                    <div>
                    <Button
                    onClick={handleSetDuration}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200"
                    >set</Button>
                    <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button
                        onClick={handleStart}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200"
                        >
                            {isPaused ? "Resume" : "Start"}
                        </Button>

                            <Button 
                            onClick={handlePause}
                            variant="outline"
                            className="text-gray-800 dark:text-gray-200"
                            >pause
                        </Button>

                        <Button onClick={handleResert}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200"
                        >
                            reset
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default CountDown