'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  colorIdx: number;
}

export function DataStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initPoints();
    };

    window.addEventListener('resize', handleResize);

    const isLightMode = () => document.documentElement.classList.contains('cds--white');

    let points: Point[] = [];
    const pointCount = Math.min(36, Math.max(18, Math.floor((width * height) / 24000)));

    function initPoints() {
      points = [];
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        points.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.8 + 1.0,
          pulsePhase: Math.random() * Math.PI * 2,
          colorIdx: Math.floor(Math.random() * 4),
        });
      }
    }

    initPoints();

    // Mouse tracker
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      const light = isLightMode();

      // Theme-based palette
      const darkColors = ['#33b1ff', '#0f62fe', '#a56eff', '#00b4a4'];
      const lightColors = ['#00629b', '#0f62fe', '#6929c4', '#007d79'];
      const activePalette = light ? lightColors : darkColors;

      const maxDist = 140;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];

        // Position update
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundaries
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Subtle mouse repulsion
        const dxMouse = mouse.x - p1.x;
        const dyMouse = mouse.y - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120) {
          const force = (120 - distMouse) / 120;
          p1.x -= (dxMouse / distMouse) * force * 1.2;
          p1.y -= (dyMouse / distMouse) * force * 1.2;
        }

        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            const lineAlpha = light ? factor * 0.12 : factor * 0.18;
            ctx.strokeStyle = light
              ? `rgba(15, 98, 254, ${lineAlpha})`
              : `rgba(51, 177, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Subtle animated data pulse
            const packetPos = (Math.sin(tick * 1.2 + i + j) + 1) / 2;
            const px = p1.x + (p2.x - p1.x) * packetPos;
            const py = p1.y + (p2.y - p1.y) * packetPos;

            ctx.fillStyle = light
              ? `rgba(15, 98, 254, ${lineAlpha * 1.5})`
              : `rgba(255, 255, 255, ${lineAlpha * 1.5})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.0, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw node
        const nodePulse = Math.sin(tick * 1.8 + p1.pulsePhase) * 0.3 + 1;
        const color = activePalette[p1.colorIdx];
        ctx.fillStyle = color;
        ctx.globalAlpha = light ? 0.35 : 0.65;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius * nodePulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
}
