import { ScheduleEvent } from '@/lib/types';

export const mockSchedule: ScheduleEvent[] = [
  {
    day: 'Monday',
    date: '2026-03-10',
    events: [
      { time: '10:00', title: '마케팅팀 주간회의', type: 'normal' },
      { time: '14:00', title: '신제품 런칭 킥오프 미팅', type: 'normal' },
    ],
  },
  {
    day: 'Tuesday',
    date: '2026-03-11',
    events: [
      { time: '09:00', title: '인플루언서 협업 미팅', type: 'normal' },
      { time: '11:00', title: '프로모션 기획안 마감', type: 'urgent' },
      { time: '14:00', title: '제품 사진 촬영', type: 'normal' },
      { time: '19:00', title: '클로드 코드 워크숍', type: 'special' },
    ],
  },
  {
    day: 'Wednesday',
    date: '2026-03-12',
    events: [
      { time: '10:00', title: '인플루언서 미팅', type: 'normal' },
      { time: '13:00', title: '계약서 검토 회의', type: 'normal' },
      { time: '16:00', title: '영상 광고 검수', type: 'normal' },
    ],
  },
  {
    day: 'Thursday',
    date: '2026-03-13',
    events: [
      { time: '09:00', title: '영상 광고 촬영', type: 'normal' },
      { time: '11:00', title: 'A/B 테스트 분석회의', type: 'normal' },
      { time: '15:00', title: '신제품 리뷰', type: 'normal' },
    ],
  },
  {
    day: 'Friday',
    date: '2026-03-14',
    events: [
      { time: '10:00', title: '주간 보고 회의', type: 'normal' },
      { time: '13:00', title: '유튜브 채널 최종 검토', type: 'normal' },
      { time: '15:00', title: '팀 회의', type: 'normal' },
    ],
  },
];
