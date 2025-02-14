const calculateNextNodePos = (unitId, lastUnitPos) => {
    // example: '695bf13d6f3e', { x: 100, y: 100 }
    const idPrefix = parseInt(unitId.substring(0, 2), 16);
    const centerY = window.innerHeight / 2;
    const yOffset = lastUnitPos.y - centerY;
    const maxRange = 90;
    const minRange = 20;
    const biasFactor = Math.min(1, Math.abs(yOffset) /
   150);
    const dynamicRange = maxRange - biasFactor * (maxRange
   - minRange);
   const clampedRange = Math.max(minRange, dynamicRange);
   const bias = (yOffset > 0 ? -1 : 1) * biasFactor * 30;
   const angle = (idPrefix / 255) * (clampedRange * 2) -
  clampedRange + bias;
   const baseRadius = window.innerWidth / 8;
   const radius = baseRadius - biasFactor * 50;
   const newX = Math.round(lastUnitPos.x + radius *
  Math.cos((angle * Math.PI) / 180));
   const newY = Math.round(lastUnitPos.y + radius *
  Math.sin((angle * Math.PI) / 180));
   return { x: newX, y: newY };
  };

    export { calculateNextNodePos };