---
layout: page
title: "Countdowns"
permalink: /cd/
---

<style>
  body {font-family: system-ui, -apple-system, "Segoe UI", sans-serif; text-align:center;}
  h1 {margin-bottom: 20px;}
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    max-width: 900px;
    margin: 0 auto;
    padding: 10px;
  }
  .card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    padding: 18px;
  }
  .circle {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  .circle svg { transform: rotate(-90deg); }
  .circle circle {
    fill: none;
    stroke-width: 10;
    stroke-linecap: round;
  }
  .circle .bg { stroke: #e5e7eb; }
  .circle .progress { transition: stroke-dashoffset 0.5s linear; }
  .circle .text {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 1.2em;
  }
  .label {font-weight:700; margin-top:10px; font-size:1em;}
  .when {color:#666; font-size:0.8em;}
  .note {margin-top:15px; color:#666; font-size:0.9em;}
</style>

<h1>⏳ Countdowns</h1>
<div class="grid" id="container"></div>
<p class="note">Last updated: <span id="now"></span></p>

<script>
const events = [
  { title: "🎆 2026 New Year", date: "2026-01-01T00:00:00+08:00", color: "#E63946" },
  { title: "🧠 AIGC Micro-Major 开学", date: "2026-03-01T09:00:00+08:00", color: "#22c55e" },
  { title: "🎓 毕业答辩", date: "2026-06-20T14:00:00+08:00", color: "#3b82f6" },
  { title: "🧾 CHI 2026 截稿", date: "2026-09-15T23:59:59+09:00", color: "#f59e0b" }
];

const container = document.getElementById("container");
events.forEach((ev, i) => {
  container.innerHTML += `
    <div class="card">
      <div class="circle">
        <svg width="120" height="120">
          <circle class="bg" cx="60" cy="60" r="50" />
          <circle class="progress" id="p-${i}" cx="60" cy="60" r="50" stroke="${ev.color}" stroke-dasharray="314" stroke-dashoffset="314" />
        </svg>
        <div class="text" id="t-${i}">--</div>
      </div>
      <div class="label">${ev.title}</div>
      <div class="when" id="w-${i}"></div>
    </div>`;
});

function update() {
  const now = new Date();
  document.getElementById("now").textContent = now.toLocaleString();
  events.forEach((ev, i) => {
    const target = new Date(ev.date);
    const diff = target - now;
    const total = 1000 * 60 * 60 * 24 * 365; // 1年为参考
    const pct = Math.max(0, Math.min(1, 1 - diff / total));

    const p = document.getElementById(`p-${i}`);
    const t = document.getElementById(`t-${i}`);
    const w = document.getElementById(`w-${i}`);

    const dashoffset = 314 * (1 - pct);
    p.style.strokeDashoffset = dashoffset;

    if (diff <= 0) {
      t.textContent = "🎉";
      w.textContent = target.toLocaleString();
    } else {
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      t.textContent = `${d}d`;
      w.textContent = `${h}h ${m}m left`;
    }
  });
}
update();
setInterval(update, 1000);
</script>
