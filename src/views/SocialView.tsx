import React, { useState } from 'react';
import { Language } from '../types';
import { LEADERBOARD_USERS } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';

interface SocialViewProps {
  lang: Language;
}

export const SocialView: React.FC<SocialViewProps> = ({ lang }) => {
  const isRtl = lang === 'ar';
  const { showToast } = useToast();
  const [cheeredUsers, setCheeredUsers] = useState<Record<number, boolean>>({});

  const toggleCheer = (rank: number, name: string) => {
    const nextState = !cheeredUsers[rank];
    setCheeredUsers((prev) => ({ ...prev, [rank]: nextState }));

    if (nextState) {
      showToast({
        title: isRtl ? '⚡ تم تشجيع البطل!' : '⚡ Athlete Cheered!',
        message: isRtl ? `أرسلت الطاقة إلى ${name}` : `Sent high voltage hype to ${name}`,
      });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="primary" size="sm" hasDot>
            COMMUNITY & LEADERBOARD
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black font-headline text-on-surface mt-1">
            {isRtl ? 'منطقة الحافز والمجتمع' : 'Hype Zone & Leaderboard'}
          </h1>
          <p className="text-xs md:text-sm text-on-surface-variant font-medium mt-0.5">
            {isRtl
              ? 'تنافس مع أبطال Apex Elite وشارك إنجازاتك الرياضية'
              : 'Compete with elite athletes, cheer progress, and dominate weekly rankings.'}
          </p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
        {/* Rank 2 */}
        <Card variant="glass" padding="md" className="flex flex-col items-center justify-end text-center space-y-2">
          <img
            src={LEADERBOARD_USERS[1].avatar}
            alt="Rank 2"
            className="w-12 h-12 rounded-full object-cover border-2 border-primary-fixed"
          />
          <p className="text-xs font-bold text-on-surface truncate max-w-full">
            {LEADERBOARD_USERS[1].name}
          </p>
          <span className="text-[10px] font-black text-primary-fixed font-headline">
            {LEADERBOARD_USERS[1].points.toLocaleString()} PTS
          </span>
          <div className="w-full bg-surface-container-high py-1.5 rounded-xl text-xs font-black text-on-surface">
            #2
          </div>
        </Card>

        {/* Rank 1 */}
        <Card variant="highlight" padding="md" className="flex flex-col items-center justify-end text-center space-y-2 -translate-y-3">
          <span
            className="material-symbols-outlined text-primary-fixed text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
          <img
            src={LEADERBOARD_USERS[0].avatar}
            alt="Rank 1"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary-fixed shadow-lg"
          />
          <p className="text-xs font-black text-primary-fixed truncate max-w-full">
            {LEADERBOARD_USERS[0].name}
          </p>
          <span className="text-[10px] font-black text-primary-fixed font-headline">
            {LEADERBOARD_USERS[0].points.toLocaleString()} PTS
          </span>
          <div className="w-full bg-primary-fixed text-on-primary-fixed py-1.5 rounded-xl text-xs font-black shadow-md">
            #1
          </div>
        </Card>

        {/* Rank 3 */}
        <Card variant="glass" padding="md" className="flex flex-col items-center justify-end text-center space-y-2">
          <img
            src={LEADERBOARD_USERS[2].avatar}
            alt="Rank 3"
            className="w-12 h-12 rounded-full object-cover border-2 border-outline-variant"
          />
          <p className="text-xs font-bold text-on-surface truncate max-w-full">
            {LEADERBOARD_USERS[2].name}
          </p>
          <span className="text-[10px] font-extrabold text-on-surface-variant font-headline">
            {LEADERBOARD_USERS[2].points.toLocaleString()} PTS
          </span>
          <div className="w-full bg-surface-container-high py-1.5 rounded-xl text-xs font-black text-on-surface">
            #3
          </div>
        </Card>
      </div>

      {/* Full Leaderboard List */}
      <Card variant="glass" padding="md" className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-primary-fixed">
          {isRtl ? 'ترتيب الرياضيين الأسبوعي' : 'WEEKLY ATHLETE LEADERBOARD'}
        </h3>

        <div className="space-y-2">
          {LEADERBOARD_USERS.map((usr) => {
            const isCheered = cheeredUsers[usr.rank];
            return (
              <motion.div
                key={usr.rank}
                whileHover={{ scale: 1.005 }}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  usr.isCurrentUser
                    ? 'bg-primary-fixed/15 border-primary-fixed shadow-md'
                    : 'bg-surface-container-high border-outline-variant/60 hover:border-primary-fixed/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-primary-fixed w-6">#{usr.rank}</span>
                  <img
                    src={usr.avatar}
                    alt={usr.name}
                    className="w-9 h-9 rounded-full object-cover border border-primary-fixed/40"
                  />
                  <div>
                    <h4 className="text-xs font-extrabold text-on-surface">{usr.name}</h4>
                    <span className="text-[10px] text-on-surface-variant font-medium">
                      Hypertrophy Tier
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-primary-fixed font-headline">
                    {usr.points.toLocaleString()} PTS
                  </span>
                  <Button
                    variant={isCheered ? 'primary' : 'secondary'}
                    size="sm"
                    icon="bolt"
                    onClick={() => toggleCheer(usr.rank, usr.name)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
