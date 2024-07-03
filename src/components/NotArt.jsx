import React, { useState, useEffect, useRef } from 'react';
import { constellationData, constellations } from './constellationData';
import './NotArt.css';

const STAR_SMALL = 4;
const STAR_LARGE = 7;
const ANIMATION_INTERVAL = 700;

function NotArt() {
  const [currentConstellation, setCurrentConstellation] = useState(null);
  const [stars, setStars] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const newConstellation = constellations[Math.floor(Math.random() * constellations.length)];
    setCurrentConstellation(newConstellation);
    setStars(constellationData[newConstellation].map(coord => ({ ...coord, active: false })));
    setConnections(constellationData[newConstellation + 'Connections']);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    
    const animate = () => {
      if (stars.length > 0) {
        drawConstellation(ctx, frameRef.current);
        frameRef.current++;
        animationRef.current = setTimeout(() => {
          requestAnimationFrame(animate);
        }, ANIMATION_INTERVAL);
      }
    };
    
    animate();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [stars, connections, isComplete]);

  const handleTap = () => {
    if (!isComplete) {
      const inactiveStars = stars.filter(star => !star.active);
      if (inactiveStars.length > 0) {
        const randomIndex = Math.floor(Math.random() * inactiveStars.length);
        const starToActivate = inactiveStars[randomIndex];
        
        setStars(prevStars => 
          prevStars.map(star => 
            star === starToActivate ? { ...star, active: true } : star
          )
        );

        if (inactiveStars.length === 1) {
          setIsComplete(true);
        }
      }
    }
  };

  const getRadius = (offset, frame) => {
    const modulus = STAR_LARGE - STAR_SMALL;
    const mod2 = modulus * 2;
    const starFrame = (offset + frame) % mod2;
    return starFrame > modulus 
      ? STAR_LARGE - ((offset + frame) % modulus) 
      : STAR_SMALL + starFrame;
  };

  const drawStar = (ctx, x, y, offset, frame) => {
    const rad = getRadius(offset, frame);
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawConstellation = (ctx, frame) => {
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#1aff1a';
    ctx.strokeStyle = '#1aff1a';
    ctx.lineWidth = 2;

    stars.forEach((star, index) => {
      if (star.active) {
        drawStar(ctx, star.x, star.y, index, frame);
      }
    });

    if (isComplete && connections) {
      ctx.beginPath();
      connections.forEach(([startIndex, endIndex]) => {
        const startStar = stars[startIndex];
        const endStar = stars[endIndex];
        if (startStar && endStar) {
          ctx.moveTo(startStar.x, startStar.y);
          ctx.lineTo(endStar.x, endStar.y);
        }
      });
      ctx.stroke();
    }
  };

  return (
    <div className="not-art-container" onClick={handleTap}>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300} 
        className="constellation-canvas"
      />
      {isComplete && <p className="pipboy-text">{currentConstellation}</p>}
    </div>
  );
}

export default NotArt;