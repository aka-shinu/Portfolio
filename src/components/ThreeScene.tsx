import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

// Performance detection for low-end devices
const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for low-end device indicators
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
  const hasLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  
  return isMobile && (hasLowMemory || hasLowCores);
};

// Custom shader material for animated beam effect
const BeamLineMaterial = ({
  color = "#60a5fa",
  opacity = 0.15,
  speed = 1,
  ...props
}) => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const localTime = useRef(0);
  const [fade, setFade] = useState(0);

  useFrame((_, delta) => {
    if (materialRef.current) {
      // Ensure smooth time progression
      localTime.current += delta * speed;
      
      if (fade < 1) {
        setFade((f) => Math.min(f + delta * 1.5, 1));
      }

      // Update uniforms efficiently
      const uniforms = materialRef.current.uniforms;
      uniforms.uOpacity.value = fade * opacity;
      uniforms.uTime.value = localTime.current;
      
      // Only update if necessary
      if (uniforms.uOpacity.value !== fade * opacity || uniforms.uTime.value !== localTime.current) {
        materialRef.current.needsUpdate = true;
      }
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      args={[
        {
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uOpacity: { value: opacity },
            uSpeed: { value: speed },
          },
          vertexShader: `
            varying float vLinePos;
            void main() {
              vLinePos = position.x;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform float uTime;
            uniform vec3 uColor;
            uniform float uOpacity;
            uniform float uSpeed;
            varying float vLinePos;
            void main() {
              float beam = smoothstep(0.0, 0.15, abs(fract(vLinePos + uTime * uSpeed) - 0.5));
              float alpha = uOpacity + (1.0 - beam) * 0.45;
              gl_FragColor = vec4(uColor, alpha);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
        },
      ]}
      {...props}
    />
  );
};

interface ThreeSceneProps {
  isVisible?: boolean;
  beamSpeed?: number;
  maxConnectionsPerPoint?: number;
  count?: number;
  onCreated: () => void;
}

export default function ThreeScene({
  onCreated,
  isVisible = true,
  beamSpeed = 0.5,
  maxConnectionsPerPoint = 4,
  count = 1500,
}: ThreeSceneProps) {
  const ref = useRef<THREE.Points>(null);
  const pointMaterialRef = useRef<THREE.PointsMaterial>(null);
  const { mouse } = useThree();
  const [hovered, setHovered] = useState(false);

  // Adaptive settings for low-end devices
  const isLowEnd = useMemo(() => isLowEndDevice(), []);
  const adaptiveCount = isLowEnd ? Math.min(count, 300) : count;
  const adaptiveConnections = isLowEnd ? Math.min(maxConnectionsPerPoint, 2) : maxConnectionsPerPoint;
  const connectionDistance = isLowEnd ? 0.4 : 0.3; // Larger distance = fewer connections
  const mouseInfluence = isLowEnd ? 0.1 : 0.2; // Less mouse influence for smoother performance
  const [fadeInProgress, setFadeInProgress] = useState(0);

  // Generate initial positions with more organic distribution
  const positions = useMemo(() => {
    const positions = new Float32Array(adaptiveCount * 3);
    random.inSphere(positions, { radius: 2.5 });

    for (let i = 0; i < adaptiveCount; i++) {
      const i3 = i * 3;
      positions[i3] += Math.sin(positions[i3] * 2) * 0.2;
      positions[i3 + 1] += Math.cos(positions[i3 + 1] * 2) * 0.2;
      positions[i3 + 2] += Math.sin(positions[i3 + 2] * 2) * 0.2;
    }
    return positions;
  }, [adaptiveCount]);

  const connections = useMemo(() => {
    const lines: number[][] = [];
    const positionsArray = Array.from(positions);
    const spatialHash = new Map<string, number[]>();
    const maxTotalLines = isLowEnd ? Math.min(adaptiveCount, 200) : adaptiveCount; // Limit total lines on low-end

    // Create spatial hash for faster neighbor lookup
    for (let i = 0; i < adaptiveCount; i++) {
      const x = positionsArray[i * 3];
      const y = positionsArray[i * 3 + 1];
      const z = positionsArray[i * 3 + 2];
      const hash = `${Math.floor(x / connectionDistance)},${Math.floor(
        y / connectionDistance
      )},${Math.floor(z / connectionDistance)}`;
      if (!spatialHash.has(hash)) {
        spatialHash.set(hash, []);
      }
      spatialHash.get(hash)!.push(i);
    }

    // Find connections using spatial hash
    for (let i = 0; i < adaptiveCount; i++) {
      const x = positionsArray[i * 3];
      const y = positionsArray[i * 3 + 1];
      const z = positionsArray[i * 3 + 2];
      let neighbors: { j: number; dist: number }[] = [];
      
      // Reduce search area for low-end devices
      const searchRange = isLowEnd ? 1 : 2;
      for (let dx = -searchRange; dx <= searchRange; dx++) {
        for (let dy = -searchRange; dy <= searchRange; dy++) {
          for (let dz = -searchRange; dz <= searchRange; dz++) {
            const hash = `${Math.floor(x / connectionDistance) + dx},${
              Math.floor(y / connectionDistance) + dy
            },${Math.floor(z / connectionDistance) + dz}`;
            const cellNeighbors = spatialHash.get(hash) || [];
            for (const j of cellNeighbors) {
              if (i >= j) continue;
              const x2 = positionsArray[j * 3];
              const y2 = positionsArray[j * 3 + 1];
              const z2 = positionsArray[j * 3 + 2];
              const distance = Math.sqrt(
                Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2) + Math.pow(z2 - z, 2)
              );
              if (distance < connectionDistance) {
                neighbors.push({ j, dist: distance });
              }
            }
          }
        }
      }
      
      neighbors.sort((a, b) => a.dist - b.dist);
      for (let k = 0; k < Math.min(adaptiveConnections, neighbors.length); k++) {
        if (lines.length >= maxTotalLines) break;
        lines.push([i, neighbors[k].j]);
      }
      if (lines.length >= maxTotalLines) break;
    }
    return lines;
  }, [positions, adaptiveCount, adaptiveConnections, connectionDistance, isLowEnd]);

  // Optimized: Single geometry for all lines
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positionsArray = Array.from(positions);
    const linePositions = new Float32Array(connections.length * 6);
    
    connections.forEach(([start, end], index) => {
      const i = index * 6;
      linePositions[i] = positionsArray[start * 3];
      linePositions[i + 1] = positionsArray[start * 3 + 1];
      linePositions[i + 2] = positionsArray[start * 3 + 2];
      linePositions[i + 3] = positionsArray[end * 3];
      linePositions[i + 4] = positionsArray[end * 3 + 1];
      linePositions[i + 5] = positionsArray[end * 3 + 2];
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, [connections, positions]);

  // Throttled mouse movement for better performance
  const mouseMoveRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Throttle mouse updates for low-end devices
      if (!isLowEnd || Math.abs(mouseMoveRef.current.x - x) > 0.01 || Math.abs(mouseMoveRef.current.y - y) > 0.01) {
        mouseMoveRef.current = { x, y };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLowEnd]);

  // Optimized useFrame hook with better performance for low-end devices
  const frameCount = useRef(0);
  useFrame((state, delta) => {
    frameCount.current++;
    
    // Handle fade in
    if (fadeInProgress < 1) {
      setFadeInProgress((p) => Math.min(p + delta * 1.2, 1));
    }

    // Handle rotation and scaling
    if (ref.current) {
      const rotationSpeed = isLowEnd ? 0.5 : 1; // Slower rotation for low-end
      ref.current.rotation.x -= (delta / 30) * rotationSpeed;
      ref.current.rotation.y -= (delta / 40) * rotationSpeed;

      const mouseX = mouseMoveRef.current.x * mouseInfluence;
      const mouseY = mouseMoveRef.current.y * mouseInfluence;

      ref.current.rotation.x += mouseY * 0.005;
      ref.current.rotation.y += mouseX * 0.005;

      const time = state.clock.getElapsedTime();
      const scaleIntensity = isLowEnd ? 0.01 : 0.02; // Reduced scale animation
      ref.current.scale.setScalar(1 + Math.sin(time * 0.5) * scaleIntensity);
    }

    // Handle material updates
    if (pointMaterialRef.current) {
      pointMaterialRef.current.opacity = fadeInProgress * 0.8;
    }
  });

  useEffect(() => {
    onCreated();
  }, [onCreated]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.geometry?.dispose();
        // Handle material disposal properly
        const material = ref.current.material;
        if (Array.isArray(material)) {
          material.forEach(mat => mat.dispose());
        } else if (material) {
          material.dispose();
        }
      }
      lineGeometry.dispose();
    };
  }, [lineGeometry]);

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[-2, -2, -2]} intensity={0.3} color="#0ea5e9" />

      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          color={hovered ? "#60a5fa" : "#0ea5e9"}
          size={isLowEnd ? 0.005 : 0.003} // Larger points for better visibility on low-end
          sizeAttenuation={true}
          depthWrite={false}
          ref={pointMaterialRef}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Single line geometry for all connections */}
      <lineSegments geometry={lineGeometry}>
        <BeamLineMaterial
          color={hovered ? "#60a5fa" : "#9bdcfa"}
          opacity={isLowEnd ? 0.08 : 0.05} // Higher opacity for better visibility
          speed={isVisible ? (isLowEnd ? beamSpeed * 0.5 : beamSpeed) : 0} // Slower animation on low-end
        />
      </lineSegments>
    </group>
  );
}
