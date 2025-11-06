---
layout: page
title: "Countdowns"
permalink: /cd/
# 只改下面这个 events 列表即可（支持任意多条）
events:
  - label: "AIGC Micro-Major 开学"
    date:  "2026-03-01T09:00:00+08:00"
    color: "#22c55e"
  - label: "CHI 2026 投稿截止"
    date:  "2026-09-15T23:59:59+09:00"
    color: "#f59e0b"
  - label: "毕业答辩"
    date:  "2026-06-20T14:00:00+08:00"
    color: "#3b82f6"
---

<style>
  :root { --card-bg:#0b1222; --card-fg:#e5e7eb; --muted:#9ca3af; --ring:#6366f1; }
  .cd-wrap{max-width:900px;margin:0 auto;padding:24px}
  .cd-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
  .cd-card{background:var(--card-bg);color:var(--card-fg);border-radius:16px;padding:16px;border:1px solid #1f2937}
  .cd-head{display:flex;align-items:center;gap:8px;margin-bottom:8px}
  .cd-dot{width:10px;height:10px;border-radius:999px;flex:0 0 10px;outline:2px solid var(--ring);outline-offset:2px}
  .cd-title{font-weight:700;line-height:1.2}
  .cd-when{font-size:12px;color:var(--muted)}
  .cd-left{font-size:28px;font-weight:800;margin:6px 0}
  .cd-sub{font-size:12px;color:var(--muted)}
  .cd-bar{height:8px;background:#111827;border-radius:999px;overflow:hidden;margin-top:10px}
  .cd-fill{height:100%;width:0%}
  .cd-empty{color:var(--muted);text-align:center;margin-top:24px}
</style>

<div class="cd-wrap">
  <h1>⏳ Countdowns</h1>
  <div id="cd-grid" class="cd-grid"></div>
  <div id="cd-empty" class="cd-empty" style="display:none;">没有待办事件</div>
</div>

<!-- 把 front-matter 的 events 变成 JSON 供 JS 读取 -->
<script id="cd-data" type="application/json">
  {{ page.events | jsonify }}
</script>

<script>
(function () {
  const container = document.getElementById('cd-grid');
  const data = JSON.parse(document.getElementById('cd-data').textContent || '[]');

  if (!data.length) {
    document.getElementById('cd-empty').style.display = 'block';
    return;
  }

  // 生成卡片
  function makeCard(ev, idx) {
    const card = document.createElement('div');
    card.className = 'cd-card';
    card.innerHTML = `
      <div class="cd-head">
        <div class="cd-dot" id="dot-${idx}"></div>
        <div>
          <div class="cd-title">${ev.label}</div>
          <div class="cd-when" id="when-${idx}"></div>
        </div>
      </div>
      <div class="cd-left" id="left-${idx}">—</div>
      <div class="cd-sub" id="sub-${idx}"></div>
      <div class="cd-bar"><div class="cd-fill" id="fill-${idx}"></div></div>
    `;
    // 色点 & 进度色
    const dot = card.querySelector(`#dot-${idx}`);
    const fill = card.querySelector(`#fill-${idx}`);
    if (ev.color) {
      dot.style.background = ev.color;
      fill.style.background = ev.color;
    } else {
      dot.style.background = '#10b981';
      fill.style.background = '#10b981';
    }
    return card;
  }

  // 渲染所有
  data.forEach((ev, i) => container.appendChild(makeCard(ev, i)));

  // 可选：按剩余时间排序（最近的在前）
  function sortCards() {
    const items = Array.from(container.children);
    items.sort((a, b) => {
      const i = +a.querySelector('[id^="left-"]').id.split('-')[1];
      const j = +b.querySelector('[id^="left-"]').id.split('-')[1];
      const ta = new Date(data[i].date) - new Date();
      const tb = new Date(data[j].date) - new Date();
      return ta - tb;
    });
    items.forEach(el => container.appendChild(el));
  }

  // 计算并刷新显示
  function update() {
    const now = new Date();
    data.forEach((ev, i) => {
      const target = new Date(ev.date);
      const diff = target - now;

      const whenEl = document.getElementById(`when-${i}`);
      const leftEl = document.getElementById(`left-${i}`);
      const subEl  = document.getElementById(`sub-${i}`);
      const fillEl = document.getElementById(`fill-${i}`);

      // 目标时间文本
      whenEl.textContent = target.toLocaleString();

      if (diff <= 0) {
        leftEl.textContent = "🎉 Time's up!";
        subEl.textContent  = "";
        fillEl.style.width = "100%";
        return;
      }

      const d = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff / (1000*60*60)) % 24);
      const m = Math.floor((diff / (1000*60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      leftEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
      subEl.textContent  = `剩余：${(diff/3600000).toFixed(2)} 小时`;

      // 进度（如果提供 start，可显示从 start→target 的百分比；否则基于“剩余≤30天”的反向进度）
      if (ev.start) {
        const start = new Date(ev.start);
        const total = target - start;
        const done = now - start;
        const pct = Math.max(0, Math.min(100, (done/total)*100));
        fillEl.style.width = pct + "%";
      } else {
        // 没提供 start：用 “还剩多少/30天” 粗略可视化
        const pct = Math.max(0, Math.min(100, (1 - diff/(30*24*3600*1000))*100));
        fillEl.style.width = pct + "%";
      }
    });

    // 可选：动态排序（每 10 秒排一次）
    if ((Math.floor(Date.now()/1000)) % 10 === 0) sortCards();
  }

  update();
  setInterval(update, 1000);
})();
</script>
