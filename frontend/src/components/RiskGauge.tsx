import React from 'react';

interface RiskGaugeProps {
  score: number;
  severity: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, severity, color, size = 'md' }) => {
  const radius = size === 'sm' ? 36 : size === 'lg' ? 68 : 50;
  const stroke = size === 'sm' ? 6 : size === 'lg' ? 10 : 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-all duration-700 ease-out"
      >
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={`font-['Outfit'] font-extrabold text-white leading-none ${
          size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-4xl' : 'text-2xl'
        }`}>
          {score}
        </span>
        <span className={`text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5`}>
          / 100
        </span>
      </div>
    </div>
  );
};
