---
layout: page
title: "Countdowns"
permalink: /cd/
---

<style>
  body{ text-align:center; font-family:system-ui,-apple-system,"Segoe UI",sans-serif; }
  h1{ margin-bottom:8px; }
  .wrap{ max-width:900px; margin:0 auto; padding:10px 16px 40px; }
  .grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; margin-top:10px; }
  .card{ border:2px solid #e5e7eb; border-radius:14px; padding:14px; text-align:left; background:#fff; }
  .label{ font-weight:700; font-size:16px; }
  .when{ color:#666; font-size:12px; margin-top:2px; }
  .left{ font-size:26px; font-weight:800; color:#E63946; margin-top:10px; }
  .sub{ color:#666; font-size:12px; margin-top:4px; }
  .bar{ height:8px; background:#f1f5f9; border-radius:999px; overflow:hidden; margin-top:10px; }
  .fill{ height:100%; width:0%; background:#E63946; }
  .note{ margin-top:14px; color:#666; font-size:12px; }
</style>

<div class="wrap">
  <h1>⏳ Countdowns</h1>
  <div class="note">Last updated: <span id="now">—</span></div>

  <div id="list" class="grid"></div>
</div>

<script>
/* 只改这里的事件列表即可 —— 每条支持 label / date / color（可选）/ start（可选用于进度条百分比） */
const events = [
  { label: "To 2026 New Year 🎉",          date: "2026-01-01T00:00:00+08:00", color: "#E63946" },
  { label: "AIGC Micro-Major 开学",        date: "2026-03-01T09:00:00+08:00", color: "#22c55e" },
  { label: "毕业答辩",                      date: "2026-06-20T14:00:00+08:00", color: "#3b82f6" },
  { label: "CHI 2026 截稿",                 date: "2026-09-15T23:59:59+09:00", color: "#f59e0b" }
];

function fmtLeft(ms){
  if (ms <= 0) return "🎉 Time's up!";
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms / 3600000) % 24);
  const m = Math.floor((ms / 60000) % 60);
  const s = Math.floor((ms / 1000) % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

function cardHTML(ev, i){
  const color = ev.color || "#E63946";
  return `
    <div class="card" style="border-color:${color}">
      <div class="label">${ev.label}</div>
      <div class="when" id="w-${i}"></div>
      <div class="left" id="t-${i}">—</div>
      <div class="sub"  id="s-${i}"></div>
      <div class="bar"><div class="fill" id="f-${i}" style="background:${color}"></div></div>
    </div>
  `;
}

const list = document.getElementById("list");
list.innerHTML = events.map(cardHTML).join("");

function update(){
  const now = new Date();
  document.getElementById("now").textContent = now.toLocaleString();

  events.forEach((ev, i) => {
    const target = new Date(ev.date);
    const diff = target - now;

    const w = document.getElementById(`w-${i}`);
    const t = document.getElementById(`t-${i}`);
    const s = document.getElementById(`s-${i}`);
    const f = document.getElementById(`f-${i}`);

    w.textContent = target.toLocaleString();
    t.textContent = fmtLeft(diff);
    s.textContent = diff > 0 ? `剩余 ${(diff/3600000).toFixed(2)} 小时` : "";

    // 进度条：
    // 若提供 ev.start，则按 start→target 真实百分比；否则用“30天窗口”做粗略可视化。
    let pct = 0;
    if (ev.start){
      const start = new Date(ev.start);
      const total = target - start;
      const done  = now - start;
      pct = Math.max(0, Math.min(100, (done/Math.max(total,1)) * 100));
    } else {
      pct = Math.max(0, Math.min(100, (1 - diff/(30*24*3600*1000))*100));
    }
    f.style.width = pct + "%";
  });

  // 可选：每 10 秒按剩余时间升序排序一次
  if ((Math.floor(Date.now()/1000)) % 10 === 0){
    const cards = Array.from(list.children);
    cards.sort((a,b)=>{
      const ia = +a.querySelector(".left").id.split("-")[1];
      const ib = +b.querySelector(".left").id.split("-")[1];
      return (new Date(events[ia].date) - now) - (new Date(events[ib].date) - now);
    });
    cards.forEach(c => list.appendChild(c));
  }
}

update();
setInterval(update, 1000);
</script>
