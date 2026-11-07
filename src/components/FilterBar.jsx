import React from 'react';
import { photoFilters, photoFrames } from '../data/filters';

export default function FilterBar({
  selectedFilter,
  onSelectFilter,
  selectedFrame,
  onSelectFrame,
}) {
  return (
    <div className="w-full flex flex-col gap-2.5 my-2 select-none">
      {/* Filters Row */}
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-warmBrown/70 uppercase tracking-wider mb-1.5 px-1">
          Filters ✨
        </span>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 px-1 scrollbar-none">
          {photoFilters.map((filter) => {
            const isSelected = selectedFilter.id === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onSelectFilter(filter)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-sunflower/25 border-sunflower-dark shadow-sm scale-105'
                    : 'bg-cream-100/80 hover:bg-cream-200 border-warmBrown/15'
                }`}
              >
                {/* Visual Thumbnail */}
                <div
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-cream-300 to-kraft-light border border-warmBrown/20 flex items-center justify-center overflow-hidden shadow-inner"
                  style={{ filter: filter.cssFilter }}
                >
                  <span className="text-xl select-none">🌻</span>
                </div>
                {/* Filter Name */}
                <span className={`text-[10px] font-bold px-1 whitespace-nowrap ${isSelected ? 'text-warmBrown-deep' : 'text-warmBrown/80'}`}>
                  {filter.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Decorative Overlays Row */}
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-warmBrown/70 uppercase tracking-wider mb-1 px-1">
          Frames 🌻
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 px-1">
          {photoFrames.map((frame) => {
            const isSelected = selectedFrame.id === frame.id;
            return (
              <button
                key={frame.id}
                type="button"
                onClick={() => onSelectFrame(frame)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-sage text-cream-50 border-sage-deep shadow-sm scale-105'
                    : 'bg-cream-100 hover:bg-cream-200 text-warmBrown/80 border-warmBrown/20'
                }`}
              >
                <span>{frame.icon}</span>
                <span>{frame.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
