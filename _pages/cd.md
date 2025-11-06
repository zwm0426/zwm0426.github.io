---
layout: page
title: "Countdowns"
permalink: /cd/
---

<style>
  body{ font-family:system-ui,-apple-system,"Segoe UI",sans-serif; text-align:center; }
  h1{ margin-bottom:16px; }
  .grid{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
    gap:16px; max-width:900px; margin:0 auto; padding:8px;
  }
  .card{
    background:#fff; border:1px solid #e5e7eb; border-radius:16px;
    box-shadow:0 4px 10px rgba(0,0,0,.05); padding:14px; text-align:left;
  }
  .title{ font-weight:700; font-size:15px; }
  .when{ color:#667085; font-size:12px; margin-top:4px; }
  .left{ font-size:26px; font-weight:800; color:#E63946; margin-top:10px; }
  .sub{ color:#667085; font-size:12px; margin-top:4px; }
  .bar{ height:8px; background:#f2f4f7; border-radius:999px; overflow:hidden; margin-top:10px; }
  .fill{ height:100%; width:0%; background:#E63946; transition:width .4s linear; }
  .note{ margin-top:12px; color:#667085; font-size:12px; }
</style>

<h1>⏳ Countdowns</h1>
<div id="wrap" class="grid"></div>
<p class="note">Last updated: <span id="now">—</span></p>

<script>
/* 只改这里 */
const events = [
  { title: "🎆 2026 New Year",        date: "2026-01-01T00:00:00+08:00", color: "#E63946" },
  { title: "🧠 AIGC Micro-Major 开学", date: "2026-03-01T09:00:00+08:00", color: "#22c55e" },
  { title: "🎓 毕业答辩",               date: "2026-06-20T14:00:00+08:00", color: "#3b82f6" },
  { title: "🧾 CHI 2026 截稿",          date: "2026-09-15T23:59:59+09:00", color: "#f59e0b" }
];

const wrap = document.getElementById("wrap");

function makeCard(ev, idx){
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="title">${ev.title}</div>
    <div class="when" id="w-${idx}"></div>
    <div class="left" id="t-${idx}">—</div>
    <div class="sub"  id="s-${idx}"></div>
    <div class="bar"><div class="fill" id="f-${idx}"></div></div>
  `;
  // 个性化颜色
  if (ev.color){
    card.style.borderColor = ev.color;
    card.querySelector(".left").style.color = ev.color;
    card.querySelector(".fill").style.background = ev.color;
  }
  wrap.appendChild(card);
}

events.forEach(makeCard);

function fmt(ms){
  if (ms <= 0) return "🎉 Time's up!";
  const d = Math.floor(ms/86400000);
  const h = Math.floor((ms/3600000)%24);
  const m = Math.floor((ms/60000)%60);
  const s = Math.floor((ms/1000)%60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

function update(){
  const now = new Date();
  document.getElementById("now").textContent = now.toLocaleString();
  events.forEach((ev,i)=>{
    const target = new Date(ev.date);
    const diff = target - now;

    const w = document.getElementById(`w-${i}`);
    const t = document.getElementById(`t-${i}`);
    const s = document.getElementById(`s-${i}`);
    const f = document.getElementById(`f-${i}`);

    w.textContent = target.toLocaleString();
    t.textContent = fmt(diff);
    s.textContent = diff>0 ? `剩余 ${(diff/3600000).toFixed(2)} 小时` : "";

    // 进度条：如提供 start 按 start→target 计算，否则用 30 天窗口粗略可视化
    let pct = 0;
    if (ev.start){
      const start = new Date(ev.start);
      const total = target - start;
      const done  = now - start;
      pct = Math.max(0, Math.min(100, (done/Math.max(total,1))*100));
    } else {
      pct = Math.max(0, Math.min(100, (1 - diff/(30*24*3600*1000))*100));
    }
    f.style.width = pct + "%";
  });
}

update();
setInterval(update, 1000);
</script>
