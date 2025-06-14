import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

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
      localTime.current += delta * speed;
      if (fade < 1) {
        setFade((f) => Math.min(f + delta * 1.5, 1));
      }

      materialRef.current.uniforms.uOpacity.value = fade * opacity;
      (materialRef.current as THREE.ShaderMaterial).uniforms.uTime.value = localTime.current;
      materialRef.current.needsUpdate = true;
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
  const { mouse} = useThree();
  const [hovered, setHovered] = useState(false);

  const connectionDistance = 0.3;
  const mouseInfluence = 0.2;
  const [fadeInProgress, setFadeInProgress] = useState(0);

  // Generate initial positions with more organic distribution
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    random.inSphere(positions, { radius: 2.5 });

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += Math.sin(positions[i3] * 2) * 0.2;
      positions[i3 + 1] += Math.cos(positions[i3 + 1] * 2) * 0.2;
      positions[i3 + 2] += Math.sin(positions[i3 + 2] * 2) * 0.2;
    }
    return positions;
  }, [count]);

  const connections = useMemo(() => {
    const lines: number[][] = [];
    const positionsArray = Array.from(positions);
    const spatialHash = new Map<string, number[]>();
    const maxTotalLines = count;

    // Create spatial hash for faster neighbor lookup
    for (let i = 0; i < count; i++) {
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
    for (let i = 0; i < count; i++) {
      const x = positionsArray[i * 3];
      const y = positionsArray[i * 3 + 1];
      const z = positionsArray[i * 3 + 2];
      let neighbors: { j: number; dist: number }[] = [];
      
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dz = -1; dz <= 1; dz++) {
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
      for (let k = 0; k < Math.min(maxConnectionsPerPoint, neighbors.length); k++) {
        if (lines.length >= maxTotalLines) break;
        lines.push([i, neighbors[k].j]);
      }
      if (lines.length >= maxTotalLines) break;
    }
    return lines;
  }, [positions, count, maxConnectionsPerPoint]);

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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (ref.current) {
        ref.current.rotation.x += y * 0.005;
        ref.current.rotation.y += x * 0.005;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Consolidated useFrame hook for better performance
  useFrame((state, delta) => {
    // Handle fade in
    if (fadeInProgress < 1) {
      setFadeInProgress((p) => Math.min(p + delta * 1.2, 1));
    }

    // Handle rotation and scaling
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;

      const mouseX = mouse.x * mouseInfluence;
      const mouseY = mouse.y * mouseInfluence;

      ref.current.rotation.x += mouseY * 0.005;
      ref.current.rotation.y += mouseX * 0.005;

      const time = state.clock.getElapsedTime();
      ref.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.02);
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
          size={0.003}
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
          opacity={0.05}
          speed={isVisible ? beamSpeed : 0}
        />
      </lineSegments>
    </group>
  );
}
