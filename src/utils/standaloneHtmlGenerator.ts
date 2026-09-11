import { DEPARTMENT_HERO_CDN_IMAGE } from '../data/zoologyData';

export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Department of Zoology - Banaras Hindu University</title>
  <meta name="description" content="Student resource hub and academic portal for MSc Zoology at Banaras Hindu University, featuring 2018 revised syllabus, study materials, and research archives." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..800&family=Work+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --sage: #DCE5D3;
      --parchment: #F6F1E7;
      --clay: #C67A3D;
      --deep-rust: #8F4E26;
      --forest-ink: #223629;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Work Sans', sans-serif;
      background-color: var(--parchment);
      color: var(--forest-ink);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4, h5, .font-heading {
      font-family: 'Fraunces', serif;
    }
    /* Scroll Progress */
    #scroll-progress {
      position: fixed; top: 0; left: 0; height: 5px;
      background: linear-gradient(90deg, var(--clay), var(--deep-rust), var(--forest-ink));
      z-index: 1000; width: 0%; transition: width 0.1s ease;
    }
    /* Claymorphism */
    .clay-card {
      background: #F8F5EE;
      border-radius: 20px;
      border: 1px solid rgba(198, 122, 61, 0.15);
      box-shadow: 8px 8px 20px rgba(34, 54, 41, 0.08), -6px -6px 16px rgba(255, 255, 255, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.8);
      transition: all 0.25s ease;
    }
    .clay-card:hover {
      transform: translateY(-4px);
      box-shadow: 12px 14px 28px rgba(34, 54, 41, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.95);
    }
    .clay-btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 12px 24px; border-radius: 14px; font-weight: 600; cursor: pointer;
      text-decoration: none; border: none; transition: all 0.2s ease;
    }
    .clay-btn-primary {
      background: linear-gradient(135deg, var(--clay) 0%, var(--deep-rust) 100%);
      color: #FCF9F3;
      box-shadow: 5px 5px 12px rgba(143, 78, 38, 0.35), inset 1px 1px 2px rgba(255, 255, 255, 0.4);
    }
    .clay-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 7px 8px 16px rgba(143, 78, 38, 0.45);
    }
    .clay-btn-secondary {
      background: #EBF1E6; color: var(--forest-ink);
      border: 1px solid rgba(34, 54, 41, 0.15);
      box-shadow: 4px 4px 10px rgba(34, 54, 41, 0.08);
    }
    .clay-badge {
      background: rgba(246, 241, 231, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 6px 6px 16px rgba(0, 0, 0, 0.2), inset 1px 1px 2px rgba(255, 255, 255, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
    /* Hero */
    .hero-banner {
      position: relative;
      height: 85vh;
      min-height: 580px;
      display: flex;
      align-items: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0; width: 100%; height: 120%;
      background-image: url('${DEPARTMENT_HERO_CDN_IMAGE}');
      background-size: cover; background-position: center;
      will-change: transform;
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(90deg, rgba(23, 36, 28, 0.85) 0%, rgba(34, 54, 41, 0.65) 60%, rgba(23, 36, 28, 0.45) 100%);
    }
    .container {
      max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 10;
    }
    /* Navbar */
    header {
      position: fixed; top: 0; left: 0; width: 100%; z-index: 900;
      background: rgba(246, 241, 231, 0.95); backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(198, 122, 61, 0.15); padding: 14px 0;
    }
    .nav-inner { display: flex; align-items: center; justify-content: space-between; }
    /* Sections */
    section { padding: 80px 0; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    @media (max-width: 900px) {
      .hero-banner { height: 65vh; }
      .grid-2, .grid-4, .grid-3 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div id="scroll-progress"></div>

  <header>
    <div class="container nav-inner">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="font-heading" style="font-size: 20px; font-weight: bold; color: var(--forest-ink);">Dept. of Zoology</span>
        <span style="background: var(--sage); padding: 2px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">BHU</span>
      </div>
      <div>
        <a href="#semesters" class="clay-btn clay-btn-primary" style="padding: 8px 16px; font-size: 12px;">Explore Semesters</a>
      </div>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="hero-banner" id="hero">
    <div class="hero-bg" id="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="container" style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%; padding-top: 60px;">
      <div style="max-width: 680px; color: #FCF9F3;">
        <span style="background: rgba(198,122,61,0.85); padding: 4px 12px; border-radius: 6px; font-size: 11px; font-weight: bold; text-transform: uppercase;">Centre of Advanced Study (UGC-CAS)</span>
        <h1 style="font-size: clamp(36px, 5vw, 64px); line-height: 1.1; margin-top: 12px;">Department of Zoology</h1>
        <h3 style="font-size: clamp(20px, 3vw, 28px); color: var(--sage); margin-top: 8px;">Banaras Hindu University</h3>
        <p style="margin: 16px 0 28px 0; font-size: 18px; opacity: 0.9;">Exploring Biodiversity • Advancing Life Sciences • Inspiring Research</p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <a href="#semesters" class="clay-btn clay-btn-primary">Explore Semesters</a>
          <a href="#about" class="clay-btn clay-btn-secondary">Browse Study Materials</a>
        </div>
      </div>
      <div class="clay-badge" style="color: var(--forest-ink); max-width: 280px;">
        <h4 style="font-size: 18px; color: var(--deep-rust);">MSc Zoology</h4>
        <p style="font-size: 12px; font-weight: bold; margin-top: 4px;">Student Resource Hub</p>
        <p style="font-size: 11px; opacity: 0.8; margin-top: 8px;">Since 2018 Curriculum • 96 Credits CBCS Scheme</p>
      </div>
    </div>
  </section>

  <!-- Visitor Ribbon -->
  <div class="container" style="margin-top: -30px; position: relative; z-index: 20;">
    <div class="clay-card" style="padding: 20px; display: flex; justify-content: space-around; flex-wrap: wrap; gap: 16px;">
      <div><strong>Visitor Counter:</strong> <span id="visitor-val">14,821</span> scholars</div>
      <div><strong>Curriculum:</strong> 24 MSc Papers</div>
      <div><strong>Research Units:</strong> 6 Dedicated Labs</div>
      <div><strong>Accreditation:</strong> UGC-CAS & DST-FIST</div>
    </div>
  </div>

  <!-- About Section -->
  <section id="about">
    <div class="container">
      <h2 style="font-size: 36px; text-align: center; margin-bottom: 40px;">About the Department</h2>
      <div class="grid-2">
        <div class="clay-card" style="padding: 32px;">
          <h3 style="color: var(--deep-rust); margin-bottom: 12px;">Legacy of Excellence</h3>
          <p>Founded under Mahamana Pandit Madan Mohan Malaviya, the Department of Zoology is one of the premier centers of biological learning in Asia, recognized as a UGC Centre of Advanced Study with historic Chitrangada laboratories and museum.</p>
        </div>
        <div class="clay-card" style="padding: 32px;">
          <h3 style="color: var(--deep-rust); margin-bottom: 12px;">2018 Revised Curriculum</h3>
          <p>Adopted under the Choice Based Credit System (CBCS). Synchronizes classical zoology with modern genomics, bioinformatics, neurobiology, and specialized dissertation tracks across 96 credit points.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer style="background: #EDE5D5; border-top: 1px solid rgba(198,122,61,0.2); padding: 40px 0; text-align: center; font-size: 13px;">
    <div class="container">
      <p><strong>Department of Zoology</strong> • Institute of Science, Banaras Hindu University, Varanasi - 221005</p>
      <p style="margin-top: 8px; opacity: 0.8;">Developed by Vikramaditya • Copyright © Banaras Hindu University</p>
    </div>
  </footer>

  <script>
    // Parallax
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const heroBg = document.getElementById('hero-bg');
      if (heroBg && scrollY < 800) {
        heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
      }
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        document.getElementById('scroll-progress').style.width = ((scrollY / totalHeight) * 100) + '%';
      }
    });
  </script>
</body>
</html>`;
}
