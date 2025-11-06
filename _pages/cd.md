---
layout: page
title: "Countdowns"
permalink: /cd/
events:
  - label: "AIGC Micro-Major 开学"
    date:  "2026-03-01T09:00:00+08:00"
    color: "#22c55e"
  - label: "CHI 2026 截稿"
    date:  "2026-09-15T23:59:59+09:00"
    color: "#f59e0b"
  - label: "毕业答辩"
    date:  "2026-06-20T14:00:00+08:00"
    color: "#3b82f6"
---

<style>
  .cd-wrap{max-width:900px;margin:0 auto;padding:24px}
  .cd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
  .cd-card{background:#0b1222;color:#e5e7eb;border-radius:16px;padding:16px;border:1px solid #1f2937}
  .cd-head{display:flex;align-items:center;gap:8px;margin-bottom:8px}
  .cd-dot{width:10px;height:10px;border-radius:999px;flex:0 0 10px;outline:2px solid #6366f1;outline-offset:2px}
  .cd-title{font-weight:700;line-height:1.2}
  .cd-when{font-size:12px;color:#9ca3af}
  .cd-left{font-size:28px;font-weight:800;margin:6px 0}
  .cd-sub{font-size:12px;color:#9ca3af}
  .cd-bar{height:8px;background:#111827;border-radius:999px;overflow:hidden;margin-top:10px}
  .cd-fill{height:100%;width:0%}
  .cd-empty{color:#666;text-align:center;margin-top:24px}
</style>

<div class="cd-wrap">
  <h1>⏳ Countdowns</h1>
  <div id="cd-grid" class="cd-grid"></div>
  <div id="cd-empty" class="cd-empty" style="display:none;">没有待办事件</div>
  <div id="cd-debug" class="cd-empty"></div>
</div>

<!-- Liquid 输出 YAML 数据为 JSON -->
<script id="cd-data" type="application/json">{{ page.events | jsonify }}</script>

<script>
(function () {
  const container = document.getElementById('cd-grid');
  const jsonRaw = document.getElementById('cd-data').textContent || '[]';
  let data = [];
  try { data = JSON.parse(jsonRaw) || []; } catch(e) { data = []; }

  // 简单显示调试信息（看到 "events: N" 就说明拿到数据了）
  document.getElementById('cd-debug').textContent = 'events: ' + data.length;

  if (!data.length) {
    document.getElementById('cd-empty').style.display = 'block';
    return;
  }

  function makeCard(ev, i) {
    const card = document.createElement('div');
    card.className = 'cd-card';
    card.innerHTML = `
      <div class="cd-head">
        <div class="cd-dot" id="dot-${i}"></div>
        <div>
          <div class="cd-title">${ev.label}</div>
          <div class="cd-when" id="when-${i}"></div>
        </div>
      </div>
      <div class="cd-left" id="left-${i}">—</div>
      <div class="cd-sub" id="sub-${i}"></div>
      <div class="cd-bar"><div class="cd-fill" id="fill-${i}"></div></div>
    `;
    const dot = card.querySelector(`#dot-${i}`);
    const fill = card.querySelector(`#fill-${i}`);
    const color = ev.color || '#10b981';
    dot.style.background = color;
    fill.style.background = color;
    return card;
  }

  data.forEach((ev, i) => container.appendChild(makeCard(ev, i)));

  function update() {
    const now = new Date();
    data.forEach((ev, i) => {
      const target = new Date(ev.date);
      const diff = target - now;

      const whenEl = document.getElementById(`when-${i}`);
      const leftEl = document.getElementById(`left-${i}`);
      const subEl  = document.getElementById(`sub-${i}`);
      const fillEl = document.getElementById(`fill-${i}`);

      whenEl.textContent = target.toLocaleString();

      if (diff <= 0) {
        leftEl.textContent = "🎉 Time's up!";
        subEl.textContent  = "";
        fillEl.style.width = "100%";
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);

      leftEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
      subEl.textContent  = `剩余：${(diff/3600000).toFixed(2)} 小时`;

      // 粗略进度（以 30 天窗口可视化）
      const pct = Math.max(0, Math.min(100, (1 - diff/(30*24*3600*1000))*100));
      fillEl.style.width = pct + "%";
    });
  }

  update();
  setInterval(update, 1000);
})();
</script>
