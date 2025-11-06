---
layout: page
title: "Countdowns"
permalink: /cd/
---

<style>
  body {
    text-align: center;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  .countdown {
    font-size: 2.2em;
    margin-top: 20px;
    color: #E63946;
    font-weight: bold;
  }
  h2 {
    margin-top: 40px;
    margin-bottom: 8px;
  }
  .note {
    margin-top: 6px;
    color: #666;
    font-size: 0.9em;
  }
</style>

<h1>⏳ Countdowns</h1>
<div id="container"></div>
<p class="note">Last updated: <span id="now"></span></p>

<script>
/* 只需在这里增删事件 */
const events = [
  { title: "🎆 2026 New Year", date: "2026-01-01T00:00:00+08:00" },
  { title: "🧠 AIGC Micro-Major 开学", date: "2026-03-01T09:00:00+08:00" },
  { title: "🎓 毕业答辩", date: "2026-06-20T14:00:00+08:00" },
  { title: "🧾 CHI 2026 截稿", date: "2026-09-15T23:59:59+09:00" },
];

const container = document.getElementById("container");

function makeCard(ev) {
  const div = document.createElement("div");
  div.innerHTML = `
    <h2>${ev.title}</h2>
    <div id="cd-${ev.title}" class="countdown">Loading...</div>
  `;
  container.appendChild(div);
}

events.forEach(makeCard);

function update() {
  const now = new Date();
  document.getElementById("now").textContent = now.toLocaleString();

  events.forEach((ev) => {
    const target = new Date(ev.date);
    const diff = target - now;
    const el = document.getElementById(`cd-${ev.title}`);
    if (!el) return;

    if (diff <= 0) {
      el.textContent = "🎉 Time's up!";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    el.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  });
}

update();
setInterval(update, 1000);
</script>
