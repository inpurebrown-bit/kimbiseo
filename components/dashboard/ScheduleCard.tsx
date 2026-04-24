import React from 'react';
import Card from '@/components/common/Card';
import { mockSchedule } from '@/lib/mockData';

// ==================== ScheduleCard 컴포넌트 ====================

export function ScheduleCard() {
  // 요일 한글 매핑
  const dayNames: { [key: string]: string } = {
    Monday: '월',
    Tuesday: '화',
    Wednesday: '수',
    Thursday: '목',
    Friday: '금',
  };

  // 칩 스타일 결정
  const getChipClass = (type?: string) => {
    switch (type) {
      case 'urgent':
        return 'chip chip-urgent';
      case 'special':
        return 'chip chip-special';
      default:
        return 'chip chip-normal';
    }
  };

  return (
    <Card
      title="📅 이번 주 일정"
      subtitle="Mon - Fri"
      contentClassName="space-y-3"
    >
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {mockSchedule.map((daySchedule) => (
          <div key={daySchedule.day} className="space-y-2">
            {/* 요일 제목 */}
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wide">
              {dayNames[daySchedule.day]} {daySchedule.date}
            </h3>

            {/* 해당 요일의 이벤트들 */}
            <div className="space-y-1.5 pl-2 border-l-2 border-primary/30">
              {daySchedule.events.map((event, idx) => (
                <div key={`${daySchedule.day}-${idx}`} className="text-sm">
                  <span className="font-medium text-muted">{event.time}</span>
                  <p className={`${getChipClass(event.type)} inline-block ml-2`}>
                    {event.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 통계 */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-muted">
          총 {mockSchedule.reduce((sum, day) => sum + day.events.length, 0)}개 일정
        </p>
      </div>
    </Card>
  );
}

export default ScheduleCard;
