import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Flower from './Sunflower';

const FLOWER_TYPES = ['rose', 'cherry', 'daisy', 'tulip', 'sunflower'];

/**
 * Epic multi-flower burst (Roses, Cherry Blossoms, Pink Daisies, Tulips, Sunflowers)
 * Staggered physics spring animations bursting from the center box.
 */
export default function SunflowerBurst({
  isActive = false,
  messageVisible = false,
  partFlowers = false,
  herName = "You",
}) {
  const flowers = useMemo(() => {
    const list = [];
    const count = 72;

    for (let i = 0; i < count; i++) {
      const angle = i * 2.39996; // Golden ratio spiral
      const radiusPct = Math.pow(i / count, 0.58) * 68;

      const targetX = Math.cos(angle) * (radiusPct * 1.15);
      const targetY = Math.sin(angle) * radiusPct;

      const size = 80 + ((i * 19) % 85); // 80px - 165px
      const rotation = ((i * 47) % 360) - 180;
      const delay = Math.min(1.5, 0.04 + (i * 0.016));
      const swayDelay = (i % 6) * 0.35;
      const type = FLOWER_TYPES[i % FLOWER_TYPES.length];

      list.push({
        id: i,
        type,
        targetX,
        targetY,
        size,
        rotation,
        delay,
        swayDelay,
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
      {/* Bursting flowers */}
      {isActive && flowers.map((flower, idx) => {
        const partX = flower.targetX > 0 ? flower.targetX + 65 : flower.targetX - 65;
        const partY = flower.targetY > 0 ? flower.targetY + 65 : flower.targetY - 65;

        return (
          <motion.div
            key={flower.id}
            className="absolute will-change-transform"
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 0,
              rotate: 0,
            }}
            animate={
              partFlowers
                ? {
                    x: `${partX}vw`,
                    y: `${partY}vh`,
                    scale: 0.5,
                    opacity: 0,
                    transition: { duration: 1.3, ease: [0.4, 0, 0.2, 1], delay: (idx % 12) * 0.025 }
                  }
                : {
                    x: `${flower.targetX}vw`,
                    y: `${flower.targetY}vh`,
                    scale: 1,
                    opacity: 1,
                    rotate: flower.rotation,
                    transition: {
                      type: 'spring',
                      damping: 13,
                      stiffness: 70,
                      mass: 0.7,
                      delay: flower.delay,
                    }
                  }
            }
          >
            <Flower
              type={flower.type}
              size={flower.size}
              sway={true}
              delay={flower.swayDelay}
              className="filter drop-shadow-lg"
            />
          </motion.div>
        );
      })}

      {/* Floating pink petals & sparkles */}
      {isActive && !partFlowers && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => {
            const left = (i * 11) % 96;
            const top = (i * 17) % 92;
            const animDelay = (i % 5) * 0.5;
            const icons = ['🌸', '✨', '💖', '🌺', '🌷', '💕'];
            return (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-xl sm:text-2xl select-none"
                style={{ left: `${left}%`, top: `${top}%` }}
                initial={{ opacity: 0, scale: 0, y: 30 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1.3, 0.9],
                  y: [-10, -70],
                  rotate: [0, 45, 90],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  delay: 0.4 + animDelay,
                  ease: "easeInOut"
                }}
              >
                {icons[i % icons.length]}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Transition Message Card */}
      <AnimatePresence>
        {messageVisible && (
          <motion.div
            className="relative z-40 max-w-sm sm:max-w-md mx-4 p-6 sm:p-8 rounded-3xl bg-cream-50/95 backdrop-blur-md border border-blush-rose/50 shadow-polaroid-lg text-center"
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20, transition: { duration: 0.8 } }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 90,
              delay: 0.2
            }}
          >
            {/* Washi tape topper */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rounded-sm rotate-1 shadow-sm" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl mb-2"
            >
              🌸
            </motion.div>

            <h2 className="font-script text-3xl sm:text-4xl text-warmBrown font-bold tracking-wide mb-2">
              For You, {herName} 🌸
            </h2>

            <p className="font-sans text-sm sm:text-base text-warmBrown/80 font-medium leading-relaxed">
              Hope this brings a smile to your day.
            </p>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-warmBrown-light font-bold">
              <span>Unwrapping your flowers</span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
