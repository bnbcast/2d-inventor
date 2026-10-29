import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../src/shared/Breadcrumb.jsx";
import part from "./part.json";

const translations = {
  en: {
    nav: ["learning", "the part", "2D sketch", "3D viewer", "features", "specs", "interpretation", "source data", "built with"],
    title: "Learning Autodesk Inventor", subtitle: "a showcase of my first 3D parts",
    intro: "A showcase of what I’m learning in Autodesk Inventor: from a 2D sketch to a 3D solid. Rotate each part, pull it apart and read its geometry.",
    banner: "🎓 Learning in progress: this page is my learning log for Autodesk Inventor. Part 01 is my own model; Parts 02 and 03 are sample placeholders until I add more of my own.",
    learning: "A skill checklist. Green = shown with my own part, amber = covered by a sample placeholder, blue = next on the list.",
    sections: ["learning", "the part", "2D sketch", "3D viewer", "features", "specs", "interpretation", "source data", "built with"],
    learn: [["SHOWN", "2D sketch", "closed outline with dimensions · Part 01"], ["SHOWN", "Extrude", "10 mm solid from the sketch · Part 01"], ["SHOWN", "Cut-outs", "five rectangles removed · Part 01"], ["SAMPLE", "Revolve", "spin a profile around an axis · Part 02"], ["SAMPLE", "Holes & patterns", "four Ø8 holes · Part 03"], ["NEXT", "Fillet & chamfer", "round and break edges"], ["NEXT", "Assemblies", "join several parts"], ["NEXT", "Drawing sheets", "dimensioned .idw drawings"]],
    parts: [["Part 01 · Extruded plate", "My own part: a sketch, five cut-outs and a 10 mm extrude."], ["Part 02 · Stepped shaft", "Example of the revolve tool: a half-profile spun around an axis."], ["Part 03 · Mounting plate", "Example of an extrude with four Ø8 holes in an 80 × 50 plate."]],
    partDescription: "Part 01 · Plain-language summary: a flat plate with notches. Four steps take it from a drawing to a solid.",
    steps: ["STEP 1 · SKETCH", "STEP 2 · CUT-OUTS", "STEP 3 · DIMENSION", "STEP 4 · EXTRUDE"],
    stepCopy: ["Draw one closed outline on a plane: a 110 × 60 mm rectangle as the starting shape.", "Five rectangles (A–E) are removed from its edges: one notch, two slots, a corner cut and one wide slot.", "Every edge is horizontal or vertical, so each size is a simple length (22, 10, 12, 40 mm …).", "Pull the flat outline 10 mm straight out of the plane. The 2D area becomes a 3D solid."],
    sketchDescription: "Part 01 · The sketch before extruding. Dashed = the full rectangle. Red hatched = material removed. Blue = what remains.",
    sketchTitle: "profile.sketch — values in mm, red letters match the feature table",
    viewerDescription: "Drag to rotate. The sliders replay the modelling: grow the sketch into a solid, then lift the five cut-outs out of the plate.",
    hint: "drag = rotate · scroll = zoom · right-drag = pan",
    featureDescription: "Part 01 · The five removed pieces. Together they take away part of the rectangle.",
    featureNames: ["Top notch", "Slot 1 (left edge)", "Slot 2 (left edge)", "Corner cut", "Wide slot (right edge)"],
    featureHeaders: ["ID", "feature", "size (mm)", "position (mm)", "area (mm²)"],
    specDescription: "Part 01 · Computed from the 22 outline points and the 10 mm extrusion.",
    specs: ["bounding box", "outline area", "volume", "outline length", "centroid (x, y)", "topology"],
    observations: ["All 22 outline segments are axis-aligned and every corner is 90°. The sketch uses only horizontal and vertical lines.", "The top notch is centred in the 110 mm width.", "The cut-outs remove 575.1 mm² of the rectangular outline, leaving the model’s measured area.", "The left edge is a comb: three fingers separated by two equal 10 mm slots."],
    assumptions: ["The STEP file contains the final shape, not its Inventor feature history.", "The screenshot appears left–right mirrored, perhaps taken from the back face."],
    dataDescription: "What the STEP file contains: a faceted solid with a top face, a bottom face and 22 side walls.",
    tools: [["RENDER", "three.js r128 (WebGL)", "draws the 3D parts in the browser"], ["CONTROL", "OrbitControls", "drag to rotate, scroll to zoom, right-drag to pan"], ["DRAWING", "Inline SVG", "the dimensioned 2D sketch"], ["UI", "React · CSS", "sliders, part selector, EN/ID dictionary"], ["DATA", "Python (build time)", "reads the 22 outline points and checks the area"], ["SOURCE", "Autodesk Inventor → STEP", "the .ipt part exported as a STEP file"]],
  },
  id: {
    nav: ["belajar", "part", "sketsa 2D", "penampil 3D", "fitur", "spesifikasi", "interpretasi", "data sumber", "dibuat dengan"],
    title: "Belajar Autodesk Inventor", subtitle: "pameran part 3D pertama saya",
    intro: "Catatan belajar Autodesk Inventor: dari sketsa 2D menjadi solid 3D. Putar tiap part, pisahkan, dan lihat geometrinya.",
    banner: "🎓 Proses belajar: halaman ini adalah catatan belajar Autodesk Inventor. Part 01 adalah model saya; Part 02 dan 03 adalah contoh sementara.",
    learning: "Daftar keterampilan. Hijau = ditunjukkan dengan part sendiri, jingga = contoh, biru = berikutnya.",
    sections: ["belajar", "part", "sketsa 2D", "penampil 3D", "fitur", "spesifikasi", "interpretasi", "data sumber", "dibuat dengan"],
    learn: [["DITAMPILKAN", "Sketsa 2D", "garis tertutup berdimensi · Part 01"], ["DITAMPILKAN", "Extrude", "solid 10 mm dari sketsa · Part 01"], ["DITAMPILKAN", "Potongan", "lima persegi dihilangkan · Part 01"], ["CONTOH", "Revolve", "putar profil pada sumbu · Part 02"], ["CONTOH", "Lubang & pola", "empat lubang Ø8 · Part 03"], ["BERIKUTNYA", "Fillet & chamfer", "membulatkan dan mematahkan tepi"], ["BERIKUTNYA", "Assembly", "menggabungkan beberapa part"], ["BERIKUTNYA", "Gambar teknik", "gambar berdimensi .idw"]],
    parts: [["Part 01 · Pelat ekstrusi", "Part sendiri: sketsa, lima potongan, dan ekstrusi 10 mm."], ["Part 02 · Poros bertingkat", "Contoh fitur revolve: profil setengah diputar pada sumbu."], ["Part 03 · Pelat dudukan", "Contoh ekstrusi dengan empat lubang Ø8 pada pelat 80 × 50."]],
    partDescription: "Part 01 · Ringkasan sederhana: pelat datar dengan takikan, dibuat dari gambar menjadi solid dalam empat langkah.",
    steps: ["LANGKAH 1 · SKETSA", "LANGKAH 2 · POTONGAN", "LANGKAH 3 · DIMENSI", "LANGKAH 4 · EXTRUDE"],
    stepCopy: ["Gambar satu garis tertutup: persegi panjang 110 × 60 mm sebagai bentuk awal.", "Lima persegi (A–E) dihilangkan dari tepinya: takikan, dua slot, potongan sudut, dan slot lebar.", "Semua sisi horizontal atau vertikal, sehingga setiap ukuran adalah panjang sederhana.", "Tarik garis sketsa 10 mm keluar bidang untuk menghasilkan solid 3D."],
    sketchDescription: "Part 01 · Sketsa sebelum ekstrusi. Garis putus-putus = persegi panjang awal. Arsiran merah = material yang dihilangkan. Biru = bagian yang tersisa.",
    sketchTitle: "profile.sketch — nilai dalam mm, huruf merah sesuai tabel fitur",
    viewerDescription: "Seret untuk memutar. Slider menampilkan proses pemodelan: bentuk sketsa menjadi solid lalu angkat lima potongan.",
    hint: "seret = putar · scroll = zoom · seret kanan = geser",
    featureDescription: "Part 01 · Lima potongan yang dihilangkan dari persegi panjang.",
    featureNames: ["Takikan atas", "Slot 1 (tepi kiri)", "Slot 2 (tepi kiri)", "Potongan sudut", "Slot lebar (tepi kanan)"],
    featureHeaders: ["ID", "fitur", "ukuran (mm)", "posisi (mm)", "luas (mm²)"],
    specDescription: "Part 01 · Dihitung dari 22 titik kontur dan ekstrusi 10 mm.",
    specs: ["kotak pembatas", "luas kontur", "volume", "panjang kontur", "titik berat (x, y)", "topologi"],
    observations: ["Semua 22 segmen sejajar sumbu dan setiap sudut 90°. Sketsa hanya memakai garis horizontal dan vertikal.", "Takikan atas berada di tengah lebar 110 mm.", "Lima potongan mengurangi luas persegi panjang.", "Tepi kiri seperti sisir dengan tiga jari dan dua slot 10 mm."],
    assumptions: ["File STEP menyimpan bentuk akhir, bukan riwayat fitur Inventor.", "Gambar tampak terbalik kiri-kanan, mungkin diambil dari sisi belakang."],
    dataDescription: "Isi file STEP: solid berfaset dengan sisi atas, sisi bawah, dan 22 dinding samping.",
    tools: [["RENDER", "three.js r128 (WebGL)", "menggambar part 3D di browser"], ["KONTROL", "OrbitControls", "seret untuk memutar, scroll untuk zoom, seret kanan untuk geser"], ["GAMBAR", "SVG inline", "sketsa 2D berdimensi"], ["UI", "React · CSS", "slider, pemilih part, kamus EN/ID"], ["DATA", "Python (saat build)", "membaca 22 titik kontur dan memeriksa luas"], ["SUMBER", "Autodesk Inventor → STEP", "part .ipt diekspor sebagai file STEP"]],
  },
};
const densities = [7.85, 2.7, 8.5, 1.05, 4.51];
const densityNames = { en: ["Steel", "Aluminium", "Brass", "ABS plastic", "Titanium"], id: ["Baja", "Aluminium", "Kuningan", "Plastik ABS", "Titanium"] };
const featureSize = (voidFeature) => ({ width: voidFeature.x1 - voidFeature.x0, height: voidFeature.y1 - voidFeature.y0 });
const totalRemoved = part.voids.reduce((sum, item) => {
  const size = featureSize(item);
  return sum + size.width * size.height;
}, 0);
const scriptUrl = "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js";
const controlsUrl = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";

function injectScript(src) {
  return new Promise((resolve, reject) => {
    if (window.THREE && (src.includes("three.min.js") || window.THREE.OrbitControls)) return resolve();
    const tag = document.querySelector(`script[src="${src}"]`) || document.createElement("script");
    if (tag.dataset.loaded === "true") return resolve();
    if (!tag.src) {
      tag.src = src;
      tag.async = true;
      document.head.appendChild(tag);
    }
    tag.addEventListener("load", () => { tag.dataset.loaded = "true"; resolve(); }, { once: true });
    tag.addEventListener("error", reject, { once: true });
  });
}

export default function InventorShowcase() {
  const [language, setLanguage] = useState("en");
  const [currentPart, setCurrentPart] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [highlight, setHighlight] = useState("");
  const [extrude, setExtrude] = useState(100);
  const [cutLift, setCutLift] = useState(0);
  const [revolveAngle, setRevolveAngle] = useState(360);
  const [exaggerate, setExaggerate] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [material, setMaterial] = useState(0);
  const [threeReady, setThreeReady] = useState(false);
  const [threeFailed, setThreeFailed] = useState(false);
  const viewerRef = useRef(null);
  const controlsRef = useRef(null);
  const sceneOptionsRef = useRef({});
  const animationProgressRef = useRef(0);
  const t = translations[language];
  const isOwnPart = currentPart === 0;
  sceneOptionsRef.current = { extrude, cutLift, revolveAngle, exaggerate, wireframe, playing };
  const volume = part.m.A * part.t;
  const mass = volume / 1000 * densities[material];

  useEffect(() => { document.documentElement.lang = language; }, [language]);
  useEffect(() => {
    let active = true;
    injectScript(scriptUrl).then(() => injectScript(controlsUrl)).then(() => { if (active) setThreeReady(true); }).catch(() => { if (active) setThreeFailed(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const container = viewerRef.current;
    const THREE = window.THREE;
    if (!container || !THREE || !threeReady) return undefined;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 1000);
    camera.position.set(145, 110, 150);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(100, 160, 100);
    scene.add(light);
    const group = new THREE.Group();
    scene.add(group);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x9ca3aa, metalness: 0.15, roughness: 0.48, wireframe });
    const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x1f2328 });
    const cutMeshes = [];
    let extrudedBody;
    let shaftBody;
    let shaftEdges;
    let shaftProfile;
    let lastRevolveAngle = revolveAngle;
    if (currentPart === 0) {
      const shape = new THREE.Shape(part.v.map(([x, y]) => new THREE.Vector2(x - 55, y - 20)));
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: part.t, bevelEnabled: false });
      extrudedBody = new THREE.Mesh(geometry, bodyMaterial);
      extrudedBody.position.z = -part.t / 2;
      group.add(extrudedBody);
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 30), edgeMaterial));
      part.voids.forEach((voidFeature) => {
        const { width, height } = featureSize(voidFeature);
        const cut = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.1, width - 0.12), Math.max(0.1, height - 0.12), part.t), new THREE.MeshStandardMaterial({ color: 0xcf222e, transparent: true, opacity: 0.58, wireframe }));
        cut.position.set((voidFeature.x0 + voidFeature.x1) / 2 - 55, (voidFeature.y0 + voidFeature.y1) / 2 - 20, 0);
        group.add(cut);
        cutMeshes.push(cut);
      });
    } else if (currentPart === 1) {
      shaftProfile = [new THREE.Vector2(10, -28), new THREE.Vector2(10, 24), new THREE.Vector2(17, 24), new THREE.Vector2(17, 36), new THREE.Vector2(10, 36), new THREE.Vector2(10, 44), new THREE.Vector2(6, 44), new THREE.Vector2(6, 32), new THREE.Vector2(2, 32), new THREE.Vector2(2, 18), new THREE.Vector2(6, 18), new THREE.Vector2(6, -28), new THREE.Vector2(10, -28)];
      const lathe = new THREE.LatheGeometry(shaftProfile, 40, 0, Math.PI * revolveAngle / 180);
      shaftBody = new THREE.Mesh(lathe, bodyMaterial);
      shaftEdges = new THREE.LineSegments(new THREE.EdgesGeometry(lathe, 35), edgeMaterial);
      group.add(shaftBody);
      group.add(shaftEdges);
    } else {
      const plateGeometry = new THREE.BoxGeometry(80, 8, 50);
      const plate = new THREE.Mesh(plateGeometry, bodyMaterial);
      group.add(plate);
      group.add(new THREE.LineSegments(new THREE.EdgesGeometry(plateGeometry), edgeMaterial));
      [[-27, -13], [27, -13], [-27, 13], [27, 13]].forEach(([x, z]) => {
        const hole = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 8.2, 24), new THREE.MeshBasicMaterial({ color: 0x3f454d }));
        hole.rotation.x = Math.PI / 2;
        hole.position.set(x, 0, z);
        group.add(hole);
      });
    }
    group.rotation.x = -0.15;
    let controls;
    if (THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = playing;
      controls.autoRotateSpeed = 1.3;
      controls.saveState();
      controlsRef.current = controls;
    }
    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const animate = () => {
      const options = sceneOptionsRef.current;
      const depthScale = Math.max(0.01, options.extrude / 100) * (options.exaggerate ? 2.5 : 1);
      if (shaftBody && shaftEdges && options.revolveAngle !== lastRevolveAngle) {
        const geometry = new THREE.LatheGeometry(shaftProfile, 40, 0, Math.PI * options.revolveAngle / 180);
        shaftBody.geometry.dispose();
        shaftEdges.geometry.dispose();
        shaftBody.geometry = geometry;
        shaftEdges.geometry = new THREE.EdgesGeometry(geometry, 35);
        lastRevolveAngle = options.revolveAngle;
      }
      if (extrudedBody) {
        extrudedBody.scale.z = depthScale;
        extrudedBody.position.z = -part.t * depthScale / 2;
      } else group.scale.z = depthScale;
      cutMeshes.forEach((cut) => {
        cut.scale.z = depthScale;
        cut.position.z = options.cutLift * 0.14;
        if (cut.material.wireframe !== options.wireframe) {
          cut.material.wireframe = options.wireframe;
          cut.material.needsUpdate = true;
        }
      });
      if (bodyMaterial.wireframe !== options.wireframe) {
        bodyMaterial.wireframe = options.wireframe;
        bodyMaterial.needsUpdate = true;
      }
      if (controls) controls.autoRotate = options.playing;
      else if (options.playing) group.rotation.y += 0.01;
      controls?.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    let frame = requestAnimationFrame(animate);
    resize();
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      controls?.dispose();
      controlsRef.current = null;
      group.traverse((child) => {
        child.geometry?.dispose();
        if (Array.isArray(child.material)) child.material.forEach((item) => item.dispose());
        else child.material?.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [threeReady, currentPart]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      const progress = animationProgressRef.current + 2;
      if (progress <= 100) {
        animationProgressRef.current = progress;
        setExtrude(progress);
        setCutLift(0);
      } else if (progress <= 200) {
        animationProgressRef.current = progress;
        setExtrude(100);
        setCutLift(progress - 100);
      } else {
        animationProgressRef.current = 0;
        setExtrude(0);
        setCutLift(0);
      }
    }, 40);
    return () => window.clearInterval(timer);
  }, [playing]);

  const togglePlay = () => {
    if (!playing) {
      animationProgressRef.current = 0;
      setExtrude(0);
      setCutLift(0);
    }
    setPlaying((current) => !current);
  };
  const sx = (x) => 40 + x * 6;
  const sy = (y) => 30 + (part.ymax - y) * 6;
  const shapePath = part.v.map(([x, y], index) => `${index ? "L" : "M"}${sx(x)},${sy(y)}`).join(" ") + " Z";
  const currentSketch = currentPart === 0 ? t.sketchDescription : currentPart === 1
    ? "Part 02 (sample) · A half-profile is spun 360° around the red axis to make a stepped shaft."
    : "Part 03 (sample) · An 80 × 50 mm rectangle with four Ø8 holes, extruded 8 mm.";

  return <>
    <nav><b>~/inventor-part</b>{t.sections.map((name, index) => <a key={name} href={`#${["learn", "part", "sketch", "view", "feat", "specs", "ins", "data", "tech"][index]}`}>{name}</a>)}
      <div className="lang"><button className={language === "en" ? "on" : ""} onClick={() => setLanguage("en")}>EN</button><button className={language === "id" ? "on" : ""} onClick={() => setLanguage("id")}>ID</button></div></nav>
    <main>
      <Breadcrumb current="Autodesk Inventor Part Showcase" />
      <section className="hero"><div className="c">$ cat part.step</div><h1>{t.title}<br /><span className="g">{t.subtitle}</span></h1><p className="c" style={{ maxWidth: 680 }}>{t.intro}</p>
        <div className="kv">{[["tool", "Autodesk Inventor"], ["status", language === "en" ? "learning in progress" : "proses belajar"], ["parts", "3 (1 mine, 2 samples)"], ["format", "STEP (.step)"], ["viewer", "three.js"]].map(([label, value]) => <span key={label}><i>{label}:</i> {value}</span>)}</div>
        <div className="learn"><strong>🎓 {language === "en" ? "Learning in progress:" : "Proses belajar:"}</strong> {language === "en" ? "this page is my learning log for Autodesk Inventor. Part 01 is my own model; Parts 02 and 03 are sample placeholders until I add more of my own." : "halaman ini adalah catatan belajar Autodesk Inventor. Part 01 adalah model saya; Part 02 dan 03 adalah contoh sementara."}</div>
      </section>
      <section id="learn"><h2>{t.sections[0]}</h2><p className="sub">{t.learning}</p><div className="cards">{t.learn.map(([badge, name, desc], index) => <div className="card" key={name}><span className={`lbl ${index < 3 ? "o" : index < 5 ? "w" : ""}`}>{badge}</span><div className="n">{name}</div><div>{desc}</div></div>)}</div></section>
      <section id="part"><h2>{t.sections[1]}</h2><p className="sub">{t.partDescription}</p><div className="cards">{t.parts.map(([title, desc], index) => <button key={title} className={`card part-card ${currentPart === index ? "selected" : ""}`} onClick={() => { setCurrentPart(index); setHighlight(""); }}><span className={`lbl ${index === 0 ? "o" : "w"}`}>{index === 0 ? (language === "en" ? "MY PART (.ipt)" : "PART SAYA (.ipt)") : (language === "en" ? "SAMPLE · PLACEHOLDER" : "CONTOH · PLACEHOLDER")}</span><div className="n">{title}</div><div>{desc}</div></button>)}</div>
        <div className="cards" style={{ marginTop: 12 }}>{t.steps.map((title, index) => <div className="card" key={title}><span className={`lbl ${index === 3 ? "o" : ""}`}>{title}</span><div>{t.stepCopy[index]}</div></div>)}</div></section>
      <section id="sketch"><h2>{t.sections[2]}</h2><p className="sub">{currentSketch}</p><div className="win"><div className="bar">{currentPart === 0 ? t.sketchTitle : `sample-${currentPart + 1}.sketch — mm`}</div><div style={{ padding: 8 }}><svg id="sk" viewBox="0 0 740 480" role="img" aria-label="Dimensioned part sketch">
        {currentPart === 0 ? <><defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#cf222e" strokeWidth="2" opacity=".55" /></pattern></defs><rect x={sx(0)} y={sy(part.ymax)} width={part.xmax * 6} height={(part.ymax - part.ymin) * 6} fill="none" stroke="#8b949e" strokeDasharray="6 4" /><path d={shapePath} fill="#ddf4ff" stroke="#0969da" strokeWidth="2.5" />
          {part.voids.map((feature) => { const { width, height } = featureSize(feature); const selected = highlight === feature.id; return <g className={`v ${selected ? "hl" : ""}`} key={feature.id} onMouseEnter={() => setHighlight(feature.id)} onMouseLeave={() => setHighlight("")} onClick={() => setHighlight(feature.id)}><rect className="vd" x={sx(feature.x0)} y={sy(feature.y1)} width={width * 6} height={height * 6} fill="url(#hatch)" stroke="#cf222e" strokeWidth={selected ? 3 : 1.5} /><text x={sx((feature.x0 + feature.x1) / 2)} y={sy((feature.y0 + feature.y1) / 2)} textAnchor="middle" style={{ fill: "#cf222e", fontWeight: 700 }}>{feature.id}</text></g>; })}
          {showPoints && part.v.map(([x, y], index) => <g key={`${x}-${y}-${index}`}><circle cx={sx(x)} cy={sy(y)} r="3.5" fill="#1a7f37" /><text x={sx(x) + 5} y={sy(y) - 5} style={{ fill: "#1a7f37", fontSize: 9 }}>{index + 1}</text></g>)}
          <line x1={sx(0)} x2={sx(part.xmax)} y1={sy(part.ymin) + 24} y2={sy(part.ymin) + 24} stroke="#1f2328" /><text x={sx(part.xmax / 2)} y={sy(part.ymin) + 42} textAnchor="middle">110 mm</text>
          <line x1={sx(part.xmax) + 24} x2={sx(part.xmax) + 24} y1={sy(part.ymax)} y2={sy(part.ymin)} stroke="#1f2328" /><text x={sx(part.xmax) + 40} y={sy((part.ymax + part.ymin) / 2)} transform={`rotate(90 ${sx(part.xmax) + 40} ${sy((part.ymax + part.ymin) / 2)})`} textAnchor="middle">60 mm</text></> :
          currentPart === 1 ? <><rect x="220" y="130" width="300" height="220" fill="none" stroke="#8b949e" strokeDasharray="6 4" /><path d="M470 130 L470 350 L420 350 L420 300 L300 300 L300 270 L360 270 L360 230 L300 230 L300 190 L420 190 L420 130 Z" fill="#ddf4ff" stroke="#0969da" strokeWidth="3" /><line x1="455" x2="455" y1="115" y2="365" stroke="#cf222e" strokeDasharray="8 4" strokeWidth="2" /><text x="465" y="120" fill="#cf222e">{language === "en" ? "axis" : "sumbu"}</text></> :
            <><rect x="170" y="125" width="400" height="250" fill="#ddf4ff" stroke="#0969da" strokeWidth="3" />{[[240,190],[500,190],[240,310],[500,310]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="25" fill="url(#hatch)" stroke="#cf222e" strokeWidth="2" />)}<text x="370" y="405" textAnchor="middle">80 mm × 50 mm · 4 × Ø8</text></>}
      </svg></div><div className="ctl"><label><input type="checkbox" checked={showPoints} onChange={(event) => setShowPoints(event.target.checked)} /><span>{language === "en" ? "show points" : "tampilkan titik"}</span></label><span className="c">{currentPart === 0 ? (language === "en" ? "Hover a red area or feature row to link them." : "Arahkan ke area merah atau baris fitur untuk menghubungkan.") : "Sample sketch"}</span></div></div></section>
      <section id="view"><h2>{t.sections[3]}</h2><p className="sub">{t.viewerDescription}</p><div className="ctl" style={{ border: 0, padding: "0 0 10px" }}><span>{language === "en" ? "Part:" : "Part:"}</span>{t.parts.map(([title], index) => <button key={title} className={currentPart === index ? "on" : ""} onClick={() => setCurrentPart(index)}>{`0${index + 1}`}</button>)}</div>
        <div className="win"><div id="gl" ref={viewerRef}><div className="hint">{threeFailed ? "Three.js could not load; check your connection and reload." : threeReady ? t.hint : "Loading 3D viewer…"}</div></div>
          <div className="ctl">{currentPart === 1 ? <label><span>revolve angle {revolveAngle}°</span><input type="range" min="30" max="360" value={revolveAngle} onChange={(event) => setRevolveAngle(Number(event.target.value))} /></label> : <label><span>{isOwnPart ? "extrude" : "model"} {extrude}%</span><input type="range" min="0" max="100" value={extrude} onChange={(event) => setExtrude(Number(event.target.value))} /></label>}{isOwnPart && <label><span>lift cut-outs {cutLift}%</span><input type="range" min="0" max="100" value={cutLift} onChange={(event) => setCutLift(Number(event.target.value))} /></label>}
            <label><input type="checkbox" checked={exaggerate} onChange={(event) => setExaggerate(event.target.checked)} /><span>exaggerate depth ×2.5</span></label><label><input type="checkbox" checked={wireframe} onChange={(event) => setWireframe(event.target.checked)} /><span>wireframe</span></label>
            <button onClick={togglePlay}>{playing ? "❚❚ pause" : "▶ play"}</button><button onClick={() => { setPlaying(false); setExtrude(100); setCutLift(0); setRevolveAngle(360); controlsRef.current?.reset(); }}>reset view</button><b className="g">{exaggerate ? "depth ×2.5 (visual only)" : "depth 10 mm"}</b></div></div></section>
      <section id="feat"><h2>{t.sections[4]}</h2><p className="sub">{t.featureDescription}</p><div className="sc win"><table><thead><tr>{t.featureHeaders.map((name) => <th key={name}>{name}</th>)}</tr></thead><tbody>{part.voids.map((feature, index) => { const { width, height } = featureSize(feature); return <tr className={`f ${highlight === feature.id ? "hl" : ""}`} key={feature.id} onMouseEnter={() => setHighlight(feature.id)} onMouseLeave={() => setHighlight("")} onClick={() => setHighlight(feature.id)}><td><b className="r">{feature.id}</b></td><td>{t.featureNames[index]}</td><td>{width.toFixed(2)} × {height.toFixed(2)}</td><td>x {feature.x0}–{feature.x1}, y {feature.y0}–{feature.y1}</td><td>{(width * height).toFixed(2)}</td></tr>; })}<tr><td /><td><b>Σ</b></td><td /><td /><td><b>{totalRemoved.toFixed(2)}</b></td></tr></tbody></table></div></section>
      <section id="specs"><h2>{t.sections[5]}</h2><p className="sub">{t.specDescription}</p><div className="cards">{[`${part.xmax} × ${(part.ymax - part.ymin).toFixed(2)} × ${part.t} mm`, `${part.m.A.toFixed(2)} mm²`, `${(volume / 1000).toFixed(2)} cm³`, `${part.m.per.toFixed(2)} mm`, `${part.m.cx.toFixed(2)}, ${part.m.cy.toFixed(2)}`, "22 points · 24 faces · 66 edges"].map((value, index) => <div className="card" key={value}><div className="c">{t.specs[index]}</div><div className="n">{value}</div></div>)}</div>
        <p style={{ marginTop: 14 }}>{language === "en" ? "Material (not stored in the file, pick one):" : "Material (tidak tersimpan di file):"} <select value={material} onChange={(event) => setMaterial(Number(event.target.value))}>{densityNames[language].map((name, index) => <option value={index} key={name}>{name} ({densities[index]} g/cm³)</option>)}</select> <b className="g">≈ {mass.toFixed(1)} g — {language === "en" ? "estimated mass" : "perkiraan massa"}</b></p></section>
      <section id="ins"><h2>{t.sections[6]}</h2><p className="sub">What the geometry shows. Tagged as an observation (from the file) or an assumption.</p><ul className="ins">{t.observations.map((text, index) => <li className="card" key={text}><span className="lbl o">{language === "en" ? "OBSERVATION" : "OBSERVASI"}</span><div>{text}</div></li>)}{t.assumptions.map((text) => <li className="card" key={text}><span className="lbl w">{language === "en" ? "ASSUMPTION" : "ASUMSI"}</span><div>{text}</div></li>)}</ul></section>
      <section id="data"><h2>{t.sections[7]}</h2><p className="sub">{t.dataDescription}</p><div className="win"><div className="bar">Gambar1.step</div><pre style={{ margin: 0, padding: 12, whiteSpace: "pre-wrap", fontSize: 12 }}>{`ISO-10303-21;
FILE_SCHEMA(('AUTOMOTIVE_DESIGN { 1 0 10303 214 1 1 1 1 }'));   /* AP214 */
LENGTH_UNIT = MILLI METRE
FACETED_BREP('Gambar1 (2)') → CLOSED_SHELL of 24 FACE_SURFACE
  2 × planar cap, 22-point POLY_LOOP at z = 0 and z = 10
  22 × rectangular side wall (4-point POLY_LOOP)
COLOUR_RGB(0.75, 0.75, 0.75)`}</pre></div>
        <details><summary>{language === "en" ? "show the 22 outline points (x, y)" : "tampilkan 22 titik kontur (x, y)"}</summary><div className="sc win" style={{ marginTop: 8, maxHeight: 300, overflow: "auto" }}><table><thead><tr><th>#</th><th>x</th><th>y</th></tr></thead><tbody>{part.v.map(([x, y], index) => <tr key={index}><td>{index + 1}</td><td>{x.toFixed(2)}</td><td>{y.toFixed(2)}</td></tr>)}</tbody></table></div></details></section>
      <section id="tech"><h2>{t.sections[8]}</h2><p className="sub">{language === "en" ? "The tools behind this page and the original source model." : "Teknologi di balik halaman ini dan model sumber."}</p><div className="cards">{t.tools.map(([kind, name, desc]) => <div className="card" key={kind}><span className="lbl">{kind}</span><div className="n">{name}</div><div>{desc}</div></div>)}</div></section>
    </main>
    <footer>Autodesk Inventor → STEP → React (three.js) · <span className="g">status: online</span></footer>
  </>;
}
