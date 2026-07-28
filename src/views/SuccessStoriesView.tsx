import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';

export const SuccessStoriesView: React.FC = () => {
  const { isRtl, stories, addStory, role } = useApp();
  const { showToast } = useToast();

  const [showAddModal, setShowAddModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [durationWeeks, setDurationWeeks] = useState(12);
  const [prevWeight, setPrevWeight] = useState(95);
  const [currWeight, setCurrWeight] = useState(80);
  const [reviewEn, setReviewEn] = useState('');
  const [reviewAr, setReviewAr] = useState('');

  const handleAddStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    addStory({
      clientName,
      beforeImage:
        beforeImage ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAwLtHg1unKBJUrXCE5Xii89g0DtVIZlniVGzBOWfFJGVSmuM1NjhD_0z1JUxmwWnSndZTLe_kfjUNy9CpfMkS4ZVUKbFwThTHaSZinNtaalbgFJNGOPA0f7bGsAhiRA5Me66E1P9RYrJ7mp8jRm69qU_Xdz9kltTys0m0ZDJ8HTPCZT3AAtUWo4UL5aKZCw_7GybI-uYIZbb9G13UB8Wp_-8l2Ini2ab1PeEwFn87xAW6tCSC0IAFL',
      afterImage:
        afterImage ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAtfwS-F3wltvPN4HTuXsQcFIjy-i2kumCFVrxYZbxGZFj4Ak0Rvvjyec5ogyQkSuZBTR8f4V_b44oUTUOEI1xTPA9EYFDJQ2g2sZBsmWyeVxGfJfXamKXRhX0MMLqhqMwpk1sgrbrFL-ZyLEDoQT2T6CnnwdOj1ekXR8E_zN0WKo5gcg_NcKlBCyusGS4Wlx5yW030cuXWE_7IbTMYMJnHyQnVlU0D8DTIDQZ9YrFRTS5J20PJQdX3',
      durationWeeks,
      improvementPercent: 90,
      prevWeightKg: prevWeight,
      currWeightKg: currWeight,
      bodyFatPercent: 12,
      muscleGainedKg: 4,
      reviewText: reviewEn || 'Incredible transformation program!',
      reviewTextAr: reviewAr || 'برنامج تحول خيالي وغير مجرى حياتي الرياضية!',
      rating: 5,
    });

    setShowAddModal(false);
    showToast({
      title: isRtl ? 'تمت إضافة قصة النجاح' : 'Success Story Published',
      message: isRtl ? 'تم بنجاح نشر قصة التحول للمشتركين' : 'New transformation story added.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Banner */}
      <Card variant="highlight" padding="lg" className="border-2 border-primary-fixed/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed text-2xl">auto_awesome</span>
              <h1 className="text-xl md:text-2xl font-black text-on-surface font-headline">
                {isRtl ? 'قصص التحول وإنجازات المتدربين (Success Stories)' : 'Hall of Transformations & Success Stories'}
              </h1>
            </div>
            <p className="text-xs text-on-surface-variant font-medium">
              {isRtl
                ? 'نتائج حقيقية لمتدربين عبر تتبع الحركة البيوميكانيكية والتغذية الدقيقة'
                : 'Real, measurable results from athletes following APEX biomechanics protocols.'}
            </p>
          </div>

          {(role === 'admin' || role === 'moderator') && (
            <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)} icon="add">
              {isRtl ? 'إضافة قصة تحول جديدة' : 'Add Transformation'}
            </Button>
          )}
        </div>
      </Card>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Card key={story.id} padding="lg" className="space-y-4 border border-outline-variant/60 hover:border-primary-fixed/40 transition-all">
            {/* Before / After Images Comparison Header */}
            <div className="grid grid-cols-2 gap-2 relative rounded-2xl overflow-hidden border border-outline-variant/60">
              <div className="relative group">
                <img src={story.beforeImage} alt="Before" className="w-full h-48 md:h-56 object-cover" />
                <span className="absolute bottom-2 left-2 text-[10px] font-black bg-black/70 text-white px-2 py-0.5 rounded-md uppercase">
                  BEFORE ({story.prevWeightKg} kg)
                </span>
              </div>
              <div className="relative group">
                <img src={story.afterImage} alt="After" className="w-full h-48 md:h-56 object-cover" />
                <span className="absolute bottom-2 right-2 text-[10px] font-black bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-md uppercase primary-glow">
                  AFTER ({story.currWeightKg} kg)
                </span>
              </div>
            </div>

            {/* Client Info & Metrics */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black text-on-surface">{story.clientName}</h3>
                <div className="flex items-center gap-1 text-amber-400">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span className="text-xs font-black">{story.rating}.0</span>
                </div>
              </div>

              {/* Stats pill badges */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container-high rounded-xl text-center">
                <div>
                  <span className="block text-[9px] text-on-surface-variant font-bold uppercase">{isRtl ? 'مدة البرنامج' : 'Duration'}</span>
                  <span className="text-xs font-black text-primary-fixed">{story.durationWeeks} {isRtl ? 'أسبوع' : 'Weeks'}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant font-bold uppercase">{isRtl ? 'خسارة الوزن' : 'Weight Delta'}</span>
                  <span className="text-xs font-black text-green-400">-{story.prevWeightKg - story.currWeightKg} kg</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant font-bold uppercase">{isRtl ? 'بناء عضلات' : 'Muscle Gain'}</span>
                  <span className="text-xs font-black text-amber-400">+{story.muscleGainedKg} kg</span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs text-on-surface-variant leading-relaxed italic border-r-2 border-primary-fixed pr-3">
                "{isRtl ? story.reviewTextAr : story.reviewText}"
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Story Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={isRtl ? 'قصة تحول جديدة' : 'Add Transformation'}>
        <form onSubmit={handleAddStorySubmit} className="space-y-4 pt-2">
          <Input label="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Previous Weight (kg)" type="number" value={prevWeight} onChange={(e) => setPrevWeight(Number(e.target.value))} />
            <Input label="Current Weight (kg)" type="number" value={currWeight} onChange={(e) => setCurrWeight(Number(e.target.value))} />
          </div>
          <Input label="Duration (Weeks)" type="number" value={durationWeeks} onChange={(e) => setDurationWeeks(Number(e.target.value))} />
          <Input label="Review (English)" value={reviewEn} onChange={(e) => setReviewEn(e.target.value)} />
          <Input label="Review (Arabic)" value={reviewAr} onChange={(e) => setReviewAr(e.target.value)} />
          <Button variant="primary" size="md" type="submit" className="w-full">
            {isRtl ? 'نشر القصة' : 'Publish Story'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
