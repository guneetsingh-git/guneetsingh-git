import { useRef, useEffect, useCallback } from "react";

// ─── 3D ENGINE CONFIG ─────────────────────────────────────────────────────────
// Tweak these values to change the appearance and physics of the 3D shapes.
const CONFIG = {
  fov: 400,           // field of view depth
  shapeCount: 6,      // number of floating shapes
  rotationSpeed: 0.008,
  dragSensitivity: 0.005,
  glowColor: "#7cf7c8",
  wireColor: "rgba(124,247,200,",
  bgColor: "#0d0f14",
};

type Vec3 = [number, number, number];
type Face = number[];

interface Shape3D {
  vertices: Vec3[];
  edges: [number, number][];
  faces: Face[];
  rx: number; ry: number; rz: number;
  dRx: number; dRy: number; dRz: number;
  x: number; y: number; z: number;
  scale: number;
  color: string;
}

// Build a cube's geometry
function makeCube(s: number): { vertices: Vec3[]; edges: [number, number][]; faces: Face[] } {
  const h = s / 2;
  const v: Vec3[] = [
    [-h,-h,-h],[h,-h,-h],[h,h,-h],[-h,h,-h],
    [-h,-h,h],[h,-h,h],[h,h,h],[-h,h,h],
  ];
  const edges: [number,number][] = [
    [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],
  ];
  const faces: Face[] = [[0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[0,3,7,4],[1,2,6,5]];
  return { vertices: v, edges, faces };
}

// Build an octahedron
function makeOctahedron(s: number): { vertices: Vec3[]; edges: [number, number][]; faces: Face[] } {
  const h = s;
  const v: Vec3[] = [[0,h,0],[0,-h,0],[h,0,0],[-h,0,0],[0,0,h],[0,0,-h]];
  const edges: [number,number][] = [
    [0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,4],[4,3],[3,5],[5,2],
  ];
  const faces: Face[] = [[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,4,2],[1,3,4],[1,5,3],[1,2,5]];
  return { vertices: v, edges, faces };
}

// Build a tetrahedron
function makeTetrahedron(s: number): { vertices: Vec3[]; edges: [number, number][]; faces: Face[] } {
  const a = s;
  const v: Vec3[] = [
    [a, a, a],[-a,-a,a],[-a,a,-a],[a,-a,-a],
  ];
  const edges: [number,number][] = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
  const faces: Face[] = [[0,1,2],[0,1,3],[0,2,3],[1,2,3]];
  return { vertices: v, edges, faces };
}

function project(v: Vec3, fov: number, cx: number, cy: number, z_offset: number): [number, number, number] {
  const z = v[2] + z_offset;
  const scale = fov / (fov + z);
  return [v[0] * scale + cx, v[1] * scale + cy, scale];
}

function rotateX(v: Vec3, a: number): Vec3 {
  return [v[0], v[1]*Math.cos(a)-v[2]*Math.sin(a), v[1]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rotateY(v: Vec3, a: number): Vec3 {
  return [v[0]*Math.cos(a)+v[2]*Math.sin(a), v[1], -v[0]*Math.sin(a)+v[2]*Math.cos(a)];
}
function rotateZ(v: Vec3, a: number): Vec3 {
  return [v[0]*Math.cos(a)-v[1]*Math.sin(a), v[0]*Math.sin(a)+v[1]*Math.cos(a), v[2]];
}

// Compute face normal (for back-face culling & depth sort)
function faceNormal(pts: [number, number, number][]): [number,number,number] {
  const ax = pts[1][0]-pts[0][0], ay = pts[1][1]-pts[0][1], az = pts[1][2]-pts[0][2];
  const bx = pts[2][0]-pts[0][0], by = pts[2][1]-pts[0][1], bz = pts[2][2]-pts[0][2];
  return [ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx];
}

export function CanvasViewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape3D[]>([]);
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 });
  const globalRotRef = useRef({ x: 0.3, y: 0 });
  const animFrameRef = useRef<number>(0);

  // Build initial shapes on mount
  useEffect(() => {
    const geometries = [
      makeCube(38),
      makeOctahedron(38),
      makeTetrahedron(38),
      makeCube(26),
      makeOctahedron(26),
      makeTetrahedron(32),
    ];
    // Spread shapes across the canvas area
    const positions: [number, number, number][] = [
      [-110, -60, 0],
      [110, -50, 20],
      [0, 50, -10],
      [-60, 60, 30],
      [70, 60, -20],
      [-10, -70, 20],
    ];
    const colors = [
      "rgba(124,247,200,",
      "rgba(100,180,255,",
      "rgba(200,150,255,",
      "rgba(124,247,200,",
      "rgba(255,200,100,",
      "rgba(100,220,255,",
    ];
    shapesRef.current = geometries.map((g, i) => ({
      ...g,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      dRx: (Math.random() - 0.5) * CONFIG.rotationSpeed,
      dRy: (Math.random() - 0.5) * CONFIG.rotationSpeed + 0.006,
      dRz: (Math.random() - 0.5) * CONFIG.rotationSpeed * 0.5,
      x: positions[i][0],
      y: positions[i][1],
      z: positions[i][2],
      scale: 1,
      color: colors[i],
    }));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    // Clear
    ctx.fillStyle = CONFIG.bgColor;
    ctx.fillRect(0, 0, W, H);

    // Draw subtle grid
    ctx.strokeStyle = "rgba(124,247,200,0.04)";
    ctx.lineWidth = 1;
    const gridStep = 28;
    for (let x = 0; x < W; x += gridStep) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += gridStep) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Draw corner markers
    const markerColor = "rgba(124,247,200,0.25)";
    const ml = 16;
    [[0,0],[W,0],[0,H],[W,H]].forEach(([mx,my]) => {
      ctx.strokeStyle = markerColor;
      ctx.lineWidth = 1.5;
      const sx = mx === 0 ? 1 : -1, sy = my === 0 ? 1 : -1;
      ctx.beginPath(); ctx.moveTo(mx+sx*ml,my); ctx.lineTo(mx,my); ctx.lineTo(mx,my+sy*ml); ctx.stroke();
    });

    // Axis label
    ctx.font = "9px JetBrains Mono, monospace";
    ctx.fillStyle = "rgba(124,247,200,0.35)";
    ctx.fillText("X", 12, cy - 5);
    ctx.fillText("Y", cx + 5, 14);

    // Update & draw shapes
    const gx = globalRotRef.current.x;
    const gy = globalRotRef.current.y;

    shapesRef.current.forEach((shape) => {
      // Increment local rotation
      shape.rx += shape.dRx;
      shape.ry += shape.dRy;
      shape.rz += shape.dRz;

      // Transform vertices: local rotation → global drag rotation → project
      const projected: [number, number, number][] = shape.vertices.map((v) => {
        let p: Vec3 = [...v];
        p = rotateX(p, shape.rx);
        p = rotateY(p, shape.ry);
        p = rotateZ(p, shape.rz);
        p = rotateX(p, gx);
        p = rotateY(p, gy);
        p = [p[0] + shape.x, p[1] + shape.y, p[2] + shape.z];
        return project(p, CONFIG.fov, cx, cy, 300);
      });

      // Draw faces (with depth sort for basic painter's algorithm)
      const facesWithDepth = shape.faces.map((face) => {
        const pts = face.map((i) => projected[i]);
        const avgZ = pts.reduce((s, p) => s + p[2], 0) / pts.length;
        return { face, pts, avgZ };
      });
      facesWithDepth.sort((a, b) => a.avgZ - b.avgZ);

      facesWithDepth.forEach(({ face, pts }) => {
        const raw3d = face.map((i) => {
          let p: Vec3 = [...shape.vertices[i]];
          p = rotateX(p, shape.rx);
          p = rotateY(p, shape.ry);
          p = rotateZ(p, shape.rz);
          return p;
        });
        const normal = faceNormal(raw3d);
        // Back-face culling
        if (normal[2] > 0) {
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          pts.slice(1).forEach((pt) => ctx.lineTo(pt[0], pt[1]));
          ctx.closePath();
          ctx.fillStyle = shape.color + "0.04)";
          ctx.fill();
        }
      });

      // Draw edges with glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = CONFIG.glowColor;
      shape.edges.forEach(([a, b]) => {
        const pa = projected[a], pb = projected[b];
        const depth = (pa[2] + pb[2]) / 2;
        const alpha = Math.max(0.15, Math.min(0.9, depth * 0.9));
        ctx.beginPath();
        ctx.moveTo(pa[0], pa[1]);
        ctx.lineTo(pb[0], pb[1]);
        ctx.strokeStyle = shape.color + alpha + ")";
        ctx.lineWidth = Math.max(0.5, depth * 1.2);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // Draw vertex dots
      projected.forEach(([px, py, pscale]) => {
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, pscale * 2.5), 0, Math.PI * 2);
        ctx.fillStyle = shape.color + "0.7)";
        ctx.fill();
      });
    });

    // HUD overlay text
    ctx.font = "9px JetBrains Mono, monospace";
    ctx.fillStyle = "rgba(124,247,200,0.5)";
    ctx.fillText("ENGINE_VIEWPORT // LIVE_3D_RENDER", 12, H - 22);
    ctx.fillStyle = "rgba(124,247,200,0.25)";
    ctx.fillText("drag to rotate • " + CONFIG.shapeCount + " objects", 12, H - 10);

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  // Resize handler
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { active: true, lastX: e.clientX, lastY: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    globalRotRef.current.y += dx * CONFIG.dragSensitivity;
    globalRotRef.current.x += dy * CONFIG.dragSensitivity;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  };
  const onPointerUp = () => {
    dragRef.current.active = false;
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-[#7cf7c8]/15 bg-[#0d0f14]">
      {/* Corner label */}
      <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-[#7cf7c8]/50 tracking-widest pointer-events-none">
        ENGINE_VIEWPORT
      </div>
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7cf7c8] animate-pulse" />
        <span className="font-mono text-[9px] text-[#7cf7c8]/50 tracking-widest">LIVE</span>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </div>
  );
}
