import type { FC } from "react";

export const TourSkeletonCard: FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
    <div className="h-64 bg-slate-200" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-slate-200 rounded w-3/4" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
      <div className="pt-4 border-t border-slate-50 flex justify-between">
        <div className="h-8 bg-slate-200 rounded w-20" />
        <div className="h-8 bg-slate-200 rounded w-24" />
      </div>
    </div>
  </div>
);

export const TourSkeletonList: FC = () => (
  <div className="bg-white rounded-xl p-4 flex gap-6 animate-pulse border border-slate-100 mb-4">
    <div className="w-48 h-32 bg-slate-200 rounded-lg flex-shrink-0" />
    <div className="flex-grow space-y-3 py-2">
      <div className="h-6 bg-slate-200 rounded w-1/3" />
      <div className="h-4 bg-slate-200 rounded w-1/2" />
      <div className="h-4 bg-slate-200 rounded w-1/4" />
    </div>
    <div className="w-32 flex flex-col justify-center items-end space-y-3">
      <div className="h-4 bg-slate-200 rounded w-16" />
      <div className="h-8 bg-slate-200 rounded w-full" />
    </div>
  </div>
);
