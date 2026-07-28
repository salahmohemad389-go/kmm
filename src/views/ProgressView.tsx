import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';

export const ProgressView: React.FC = () => {
  const { isRtl, progressLogs, addProgressLog } = useApp();
  const { showToast } = useToast();

  const [showLogModal, setShowLogModal] = useState(false);
  const [weightKg, setWeightKg] = useState(88);
  const [bodyFat, setBodyFat] = useState(14.5);
  const [chestCm, setChestCm] = useState(110);
  const [waistCm, setWaistCm] = useState(82);
  const [armsCm, setArmsCm] = useState(41);
  const [benchLbs, setBenchLbs] = useState(205);
  const [squatLbs, setSquatLbs] = useState(275);
  const [notes, setNotes] = useState('');

  const latestLog = progressLogs[progressLogs.length - 1];

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProgressLog({
      date: new Date().toISOString().split('T')[0],
      weightKg,
      bodyFatPercent: bodyFat,
      chestCm,
      waistCm,
      armsCm,
      benchPressLbs: benchLbs,
      squatLbs,
      notes,
    });

    setShowLogModal(false);
    showToast({
      title: isRtl ? 'تم تسجيل البيانات!' : 'Progress Log Saved!',
      message: isRtl ? 'تم تحديث الرسم البياني للتقدم + 100 نقطة مكافأة!' : 'Body stats saved. +100 Elite Points awarded!',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <Card variant="highlight" padding="lg" className="border-2 border-primary-fixed/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed text-2xl">monitoring</span>
              <h1 className="text-xl md:text-2xl font-black text-on-surface font-headline">
                {isRtl ? 'سجل التقدم والقياسات الجسدية (Progress Timeline)' : 'Body Metrics & Progress Tracker'}
              </h1>
            </div>
            <p className="text-xs text-on-surface-variant font-medium">
              {isRtl
                ? 'تتبع تطور وزنك، نسبة الدهون، قياسات العضلات وقوة الرفع مع الوقت'
                : 'Track body mass, fat %, muscle circumferences and compound lift maxes over time.'}
            </p>
          </div>

          <Button variant="primary" size="md" onClick={() => setShowLogModal(true)} icon="add">
            {isRtl ? 'تسجيل قياسات اليوم (+100 نقطة)' : 'Log New Stats (+100 PTS)'}
          </Button>
        </div>
      </Card>

      {/* Latest Metrics Stat Cards */}
      {latestLog && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card padding="md" className="space-y-1 border-l-4 border-l-primary-fixed">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">{isRtl ? 'الوزن الحالي' : 'Current Weight'}</span>
            <p className="text-2xl font-black text-on-surface font-headline">{latestLog.weightKg} kg</p>
            <span className="text-[10px] font-bold text-primary-fixed">Last logged {latestLog.date}</span>
          </Card>

          <Card padding="md" className="space-y-1 border-l-4 border-l-amber-500">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">{isRtl ? 'نسبة الدهون' : 'Body Fat'}</span>
            <p className="text-2xl font-black text-on-surface font-headline">{latestLog.bodyFatPercent}%</p>
            <span className="text-[10px] font-bold text-amber-400">Lean athletic state</span>
          </Card>

          <Card padding="md" className="space-y-1 border-l-4 border-l-blue-500">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">{isRtl ? 'محيط الذراعين' : 'Arm Circumference'}</span>
            <p className="text-2xl font-black text-on-surface font-headline">{latestLog.armsCm} cm</p>
            <span className="text-[10px] font-bold text-blue-400">+2.5 cm total gain</span>
          </Card>

          <Card padding="md" className="space-y-1 border-l-4 border-l-purple-500">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">{isRtl ? 'بنش بريس' : 'Bench Press 1RM'}</span>
            <p className="text-2xl font-black text-on-surface font-headline">{latestLog.benchPressLbs} lbs</p>
            <span className="text-[10px] font-bold text-purple-300">Peak strength</span>
          </Card>
        </div>
      )}

      {/* Timeline Table */}
      <Card padding="lg" className="space-y-4 border border-outline-variant/60">
        <h3 className="text-sm font-black text-on-surface font-headline uppercase">
          {isRtl ? 'السجل الزمني التاريخي (History Log)' : 'Historical Log'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-container-high text-on-surface-variant uppercase font-black text-[10px]">
              <tr>
                <th className="p-3">{isRtl ? 'التاريخ' : 'Date'}</th>
                <th className="p-3">{isRtl ? 'الوزن (kg)' : 'Weight'}</th>
                <th className="p-3">{isRtl ? 'نسبة الدهون' : 'Body Fat'}</th>
                <th className="p-3">{isRtl ? 'الصدر' : 'Chest'}</th>
                <th className="p-3">{isRtl ? 'الخصر' : 'Waist'}</th>
                <th className="p-3">{isRtl ? 'الذراع' : 'Arm'}</th>
                <th className="p-3">{isRtl ? 'Bench Press' : 'Bench'}</th>
                <th className="p-3">{isRtl ? 'Squat' : 'Squat'}</th>
                <th className="p-3">{isRtl ? 'ملاحظات' : 'Notes'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40">
              {progressLogs.map((log) => (
                <tr key={log.id} className="hover:bg-surface-container-high/50 font-bold text-on-surface">
                  <td className="p-3 text-primary-fixed">{log.date}</td>
                  <td className="p-3">{log.weightKg} kg</td>
                  <td className="p-3">{log.bodyFatPercent}%</td>
                  <td className="p-3">{log.chestCm} cm</td>
                  <td className="p-3">{log.waistCm} cm</td>
                  <td className="p-3">{log.armsCm} cm</td>
                  <td className="p-3">{log.benchPressLbs} lbs</td>
                  <td className="p-3">{log.squatLbs} lbs</td>
                  <td className="p-3 text-on-surface-variant font-medium text-[11px]">{log.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      <Modal isOpen={showLogModal} onClose={() => setShowLogModal(false)} title={isRtl ? 'سجل جديد' : 'New Log Entry'}>
        <form onSubmit={handleAddLogSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <Input label="Weight (kg)" type="number" step="0.1" value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} required />
            <Input label="Body Fat %" type="number" step="0.1" value={bodyFat} onChange={(e) => setBodyFat(Number(e.target.value))} />
            <Input label="Chest (cm)" type="number" value={chestCm} onChange={(e) => setChestCm(Number(e.target.value))} />
            <Input label="Waist (cm)" type="number" value={waistCm} onChange={(e) => setWaistCm(Number(e.target.value))} />
            <Input label="Arms (cm)" type="number" value={armsCm} onChange={(e) => setArmsCm(Number(e.target.value))} />
            <Input label="Bench Press (lbs)" type="number" value={benchLbs} onChange={(e) => setBenchLbs(Number(e.target.value))} />
            <Input label="Squat (lbs)" type="number" value={squatLbs} onChange={(e) => setSquatLbs(Number(e.target.value))} />
          </div>
          <Input label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Felt strong during chest workout" />
          <Button variant="primary" size="md" type="submit" className="w-full">
            {isRtl ? 'حفظ القياسات (+100 نقطة)' : 'Save Log (+100 PTS)'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
