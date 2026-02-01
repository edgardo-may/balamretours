import React from 'react';
import Counter from '../Ui/Counter';

const StatsSection: React.FC = () => {
  const stats = [
    { 
      id: 1, 
      end: 12, 
      suffix: '+', 
      label: 'Unique Routes',
      duration: 1500 
    },
    { 
      id: 2, 
      end: 5000, 
      suffix: '+', 
      label: 'Happy Travelers',
      duration: 1800 
    },
    { 
      id: 3, 
      end: 100, 
      suffix: '%', 
      label: 'Local Guides',
      duration: 1000 
    },
    { 
      id: 4, 
      end: 4.9, 
      suffix: '', 
      label: 'Average Rating',
      duration: 1200,
      start: 0 
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {stats.map((stat) => (
        <div key={stat.id}>
          <Counter 
            end={stat.end}
            suffix={stat.suffix}
            duration={stat.duration}
            label={stat.label}
            start={stat.start}
          />
        </div>
      ))}
    </div>
  );
};

export default StatsSection;