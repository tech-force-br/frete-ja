"use client";
import { useRef, useEffect } from "react";

interface OTPInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
}

export default function OTPInput({
    value,
    onChange,
    length = 6,
}: OTPInputProps) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const focusInput = (index: number) => {
        inputsRef.current[index]?.focus();
        inputsRef.current[index]?.select();
    };

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const handleChange = (index: number, val: string) => {
        if (!/^\d?$/.test(val)) return;

        const newValue =
            value.substring(0, index) + val + value.substring(index + 1);
        onChange(newValue);

        if (val && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace") {
            if (value[index]) {
                const newValue =
                value.substring(0, index) + "" + value.substring(index + 1);
                onChange(newValue);
            } else if (index > 0) {
                focusInput(index - 1);
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        onChange(pasted);
        focusInput(Math.min(pasted.length, length - 1));
    };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
            <input
                key={i}
                ref={(el) => {
                    inputsRef.current[i] = el
                }}
                value={value[i] || ""}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
        ))}
    </div>
  );
}