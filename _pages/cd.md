---
layout: page
title: "Countdown"
permalink: /cd/
---

<style>
  body {
    text-align: center;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  }
  #countdown {
    font-size: 2.5em;
    margin-top: 40px;
    color: #E63946;
    font-weight: bold;
  }
  .note {
    margin-top: 10px;
    color: #666;
  }
</style>

<h1>⏳ Countdown</h1>
<p id="target">To 2026 New Year 🎉</p>
<div id="countdown">Loading...</div>
<p class="note">Last updated: <span id="now"></span></p>

<script>
const target = new Date("2026-01-01T00:00:00+08:00");

function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "🎉 Time's up!";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById("countdown").innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
  document.getElementById("now").textContent = now.toLocaleString();
}

updateCountdown();
setInterval(updateCountdown, 1000);
</script>
