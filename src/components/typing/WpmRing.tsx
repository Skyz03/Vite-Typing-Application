type WpmRingProps = {
    wpm: number;
    targetWpm?: number;
    size?: number;
    strokeWidth?: number;
}

export function WpmRing({
    wpm,
    targetWpm = 100,
    size = 120,
    strokeWidth = 10
}: WpmRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    // Calculate progress (clamp between 0 and 100%)
    const percentage = Math.min(Math.max((wpm / targetWpm) * 100, 0), 100);
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="rotate-[-90deg]">
                {/* Background Ring (Track) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-app-border/30"
                />
                {/* Progress Ring (Active) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="var(--color-type-primary)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: offset,
                        transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.5s ease'
                    }}
                    strokeLinecap="round"
                />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-txt-main text-3xl font-bold tracking-tighter tabular-nums">
                    {wpm}
                </span>
                <span className="text-txt-muted text-[10px] font-bold uppercase tracking-widest mt-1">
                    WPM
                </span>
            </div>
        </div>
    );
}