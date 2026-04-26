(function () {
  function renderStats() {
    const el = document.getElementById("statsStrip");
    if (!el) return;
    el.innerHTML = CONFIG.stats
      .map(
        (s) => `
      <div class="stat-cell">
        <div class="stat-n"${s.countable ? ` data-count="${s.count}" data-prefix="${s.prefix}" data-suffix="${s.suffix}"` : ""}>${s.value}</div>
        <div class="stat-l">${s.label}</div>
        <div class="stat-s">${s.sub}</div>
      </div>`,
      )
      .join("");
  }

  function renderTracks() {
    const el = document.getElementById("tracksGrid");
    if (!el) return;
    el.innerHTML = CONFIG.tracks
      .map(
        (t) => `
      <div class="taped-card" style="transform:rotate(${t.rotation})">
        <div class="tape"></div>
        <div class="track-card">
          <div class="track-meta">
            <span class="track-num mono">TRACK № ${t.num}</span>
            <div class="stamp" style="width:56px;height:56px;font-size:10px;transform:rotate(-8deg)">OPEN</div>
          </div>
          <div class="track-name${t.accent ? " accent-col" : ""}">${t.short}</div>
          <div class="track-full hand">${t.full}</div>
          <ul>${t.items.map((i) => `<li><span class="tick">✗</span> ${i}</li>`).join("")}</ul>
        </div>
      </div>`,
      )
      .join("");
  }

  function renderSideshows() {
    const el = document.getElementById("sideshowsGrid");
    if (!el) return;
    const w = CONFIG.workshop;
    const workshopHTML = `
      <div class="workshop-card">
        <div class="ws-top">
          <span class="ws-label mono">${w.label}</span>
          <span class="ws-time mono">${w.time}</span>
        </div>
        <div class="ws-title">${w.title}</div>
        <div class="ws-sub hand">${w.sub}</div>
        <div class="ws-body">${w.body}</div>
        <div class="ws-footer mono">${w.footer}</div>
      </div>`;
    const miniHTML = CONFIG.miniEvents
      .map(
        (me) => `
      <div class="mini-event-card">
        <div class="me-row-top">
          <div class="me-num">${me.num}</div>
          <span class="me-badge mono">MINI</span>
        </div>
        <div class="me-title">${me.title}</div>
        <div class="me-time mono">${me.time}</div>
        <div class="me-body">${me.body}</div>
      </div>`,
      )
      .join("");
    el.innerHTML = workshopHTML + miniHTML;
  }

  function renderTimeline() {
    const el = document.getElementById("timelineTrack");
    if (!el) return;
    let prevDay = null;
    el.innerHTML = CONFIG.timeline
      .map((row) => {
        const day = row.time.startsWith("DAY 1") ? "1" : "2";
        const sep =
          day !== prevDay && prevDay !== null
            ? `<div class="tl-day-sep"><span>§ DAY TWO</span></div>`
            : "";
        prevDay = day;
        const content = `<div class="tl-content"><div class="tl-time">${row.time}</div><div class="tl-head">${row.head}</div><div class="tl-desc">${row.desc}</div></div>`;
        if (row.side === "left") {
          return (
            sep +
            `<div class="tl-item tl-above" data-day="${day}">${content}<div class="tl-stem"></div><div class="tl-dot"></div><div class="tl-void"></div></div>`
          );
        }
        return (
          sep +
          `<div class="tl-item tl-below" data-day="${day}"><div class="tl-void"></div><div class="tl-dot"></div><div class="tl-stem"></div>${content}</div>`
        );
      })
      .join("");
  }

  function renderJudges() {
    const el = document.getElementById("judgesGrid");
    if (!el) return;
    el.innerHTML = CONFIG.judges
      .map(
        (j) => `
      <div class="polaroid" style="transform:rotate(${j.rotation})">
        <div class="placeholder-img polaroid-img" data-src="${j.image}"></div>
        <div class="pol-name hand">${j.name}</div>
        <div class="pol-role mono">${j.role}</div>
      </div>`,
      )
      .join("");
    applyImages();
  }

  function renderScorecard() {
    const el = document.getElementById("scorecardRows");
    if (!el) return;
    el.innerHTML = CONFIG.scorecard
      .map(
        (row, i) => `
      <div class="sc-row"${i === CONFIG.scorecard.length - 1 ? ' style="border-bottom:none"' : ""}>
        <div class="sc-criterion">${row.criterion}</div>
        <div class="sc-weight">${row.weight}</div>
        <div class="sc-desc">${row.desc}</div>
      </div>`,
      )
      .join("");
  }

  function renderFaq() {
    const el = document.getElementById("faqList");
    if (!el) return;
    el.innerHTML = CONFIG.faq
      .map(
        (item) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          <span class="plus">+</span>
          <span class="q-text">${item.q}</span>
        </button>
        <div class="faq-a">${item.a}</div>
      </div>`,
      )
      .join("");
  }

  function renderTeam() {
    const el = document.getElementById("orgPeople");
    if (!el) return;
    el.innerHTML = CONFIG.team
      .map(
        (p) => `
      <div class="org-person" style="transform:rotate(${p.rotation})">
        <div class="placeholder-img person-img" data-src="${p.image}"${p.facePosition ? ` data-bg-position="${p.facePosition}"` : ""}></div>
        <div class="person-role mono">${p.role}</div>
        <div class="person-name">${p.name}</div>
        <div class="person-sub">${p.sub}</div>
      </div>`,
      )
      .join("");
    applyImages();
  }

  function renderFooterPinboard() {
    const el = document.querySelector(".footer-pinboard");
    if (!el) return;
    el.innerHTML = CONFIG.team.map((p) => {
      const rot = p.rotation || "0deg";
      return `
        <div class="fp-note" style="transform:rotate(${rot})">
          <div class="fp-pin"></div>
          <div class="fp-role">${p.role}</div>
          <div class="fp-name">${p.name.split(",")[0]}</div>
          <div class="fp-msg">${p.note || ""}</div>
        </div>`;
    }).join("");
  }

  function renderOrgChat() {
    const el = document.getElementById("orgChat");
    if (!el) return;
    el.innerHTML = CONFIG.team
      .map((p, i) => {
        const side = i % 2 === 0 ? "chat-left" : "chat-right";
        const initials = p.name
          .split(/[\s,]+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0].toUpperCase())
          .join("");
        const rot = (Math.random() * 4 - 2).toFixed(2);
        return `
      <div class="chat-msg ${side}">
        <button class="chat-avatar" data-person="${i}" aria-label="View ${p.name}'s profile">
          <span class="chat-initials">${initials}</span>
        </button>
        <div class="chat-content">
          <div class="chat-name">${p.name}</div>
          <div class="chat-bubble" style="transform:rotate(${rot}deg)">
            <span class="chat-role mono">${p.role}</span>
            <span class="chat-sub">${p.sub}</span>
          </div>
        </div>
      </div>`;
      })
      .join("");

    el.querySelectorAll(".chat-avatar[data-person]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openPersonCard(CONFIG.team[+btn.dataset.person]);
      });
    });
  }

  function openPersonCard(p) {
    const overlay = document.getElementById("personCardOverlay");
    const card = document.getElementById("personCard");
    if (!overlay || !card) return;
    card.innerHTML = `
      <div class="pc-tape"></div>
      <button class="pc-close" aria-label="Close">✕</button>
      <div class="pc-photo placeholder-img" data-src="${p.image}"${p.facePosition ? ` data-bg-position="${p.facePosition}"` : ""}></div>
      <div class="pc-info">
        <div class="pc-role mono">${p.role}</div>
        <div class="pc-name">${p.name}</div>
        <div class="pc-sub hand">${p.sub}</div>
      </div>`;
    overlay.classList.remove("hidden");
    applyImages();
    card.querySelector(".pc-close").addEventListener("click", () => overlay.classList.add("hidden"));
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.add("hidden"); }, { once: true });
  }

  function applyImages() {
    document.querySelectorAll(".placeholder-img[data-src]").forEach((el) => {
      const src = el.dataset.src;
      const img = new Image();
      img.onload = () => {
        el.style.backgroundImage = `url('${src}')`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = el.dataset.bgPosition || "center";
        el.classList.add("has-image");
      };
      img.src = src;
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((el) => {
          el.classList.remove("open");
          el.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          const navH = document.getElementById("navbar")?.offsetHeight || 0;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - navH,
            behavior: "smooth",
          });
        }
      });
    });
  }

  function initNavbar() {
    const nav = document.getElementById("navbar");
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    const overlay = document.getElementById("navOverlay");

    function closeNav() {
      links.classList.remove("open");
      toggle?.classList.remove("active");
      toggle?.setAttribute("aria-expanded", "false");
      overlay?.classList.remove("active");
      document.body.style.overflow = "";
    }

    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      },
      { passive: true },
    );

    toggle?.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", String(open));
      overlay?.classList.toggle("active", open);
      document.body.style.overflow = open ? "hidden" : "";
    });

    overlay?.addEventListener("click", closeNav);

    document.querySelectorAll("#navLinks a").forEach((a) => {
      a.addEventListener("click", closeNav);
    });
  }

  function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navAs = document.querySelectorAll('#navLinks a[href^="#"]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navAs.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === `#${id}`),
            );
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
  }

  function initScrollReveal() {
    const sels = [
      { sel: "#event .event-inner", stagger: false },
      { sel: ".event-grid > *", stagger: true },
      { sel: ".stats-strip .stat-cell", stagger: true },
      { sel: ".supply-box", stagger: true },
      { sel: "#tracks .tracks-header", stagger: false },
      { sel: ".track-card", stagger: true },
      { sel: ".sideshows-header", stagger: false },
      { sel: ".workshop-card", stagger: false },
      { sel: ".mini-event-card", stagger: true },
      { sel: "#timeline .timeline-header", stagger: false },
      { sel: ".tl-item", stagger: true },
      { sel: ".judges-title", stagger: false },
      { sel: ".judges-panel", stagger: false },
      { sel: ".scorecard-panel", stagger: false },
      { sel: ".polaroid", stagger: true },
      { sel: "#faq .faq-header", stagger: false },
      { sel: ".faq-item", stagger: true },
      {
        sel: "#registration .reg-eyebrow, #registration h2, .reg-banner",
        stagger: true,
      },
      { sel: ".reg-step", stagger: true },
      { sel: ".reg-doc-card", stagger: true },
      { sel: "#downloads .downloads-header", stagger: false },
      { sel: ".download-card", stagger: true },
      { sel: "#organisers .org-header", stagger: false },
      { sel: ".org-host", stagger: false },
      { sel: ".org-person", stagger: true },
    ];
    const delays = [
      "reveal-delay-1",
      "reveal-delay-2",
      "reveal-delay-3",
      "reveal-delay-4",
      "reveal-delay-5",
    ];
    sels.forEach(({ sel, stagger }) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add("reveal");
        if (stagger) el.classList.add(delays[i % delays.length]);
      });
    });
    document.querySelectorAll(".section-title").forEach((el) => {
      const wrap = document.createElement("span");
      wrap.className = "section-title-wrap";
      el.parentNode.insertBefore(wrap, el);
      wrap.appendChild(el);
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal, .section-title-wrap")
      .forEach((el) => obs.observe(el));
  }

  function initCountUp() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const count = parseFloat(el.dataset.count);
          const pre = el.dataset.prefix || "";
          const suf = el.dataset.suffix || "";
          const isFloat = count % 1 !== 0;
          const start = performance.now();
          (function step(now) {
            const p = Math.min((now - start) / 580, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val = isFloat
              ? (count * ease).toFixed(1)
              : Math.round(count * ease);
            el.textContent = pre + val + suf;
            if (p < 1) requestAnimationFrame(step);
          })(start);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    document
      .querySelectorAll(".stat-n[data-count]")
      .forEach((el) => obs.observe(el));
  }

  function initScrollHint() {
    const hint = document.querySelector(".scroll-indicator");
    if (!hint) return;
    window.addEventListener(
      "scroll",
      () => {
        hint.style.opacity = window.scrollY > 80 ? "0" : "";
      },
      { passive: true },
    );
  }

  function initTypewriter() {
    const el = document.getElementById("heroSubtitle");
    if (!el) return;
    const text = CONFIG.event.edition;
    let i = 0;
    setTimeout(function tick() {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, 65);
      }
    }, 950);
  }

  function initParticles() {
    const container = document.getElementById("paper-particles");
    if (!container) return;
    const chars = ["·", "—", "✦", "·", "·", "∘", "·"];
    for (let i = 0; i < 16; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.textContent = chars[Math.floor(Math.random() * chars.length)];
      p.style.cssText = `left:${Math.random() * 100}%;--dur:${5 + Math.random() * 7}s;--delay:-${Math.random() * 12}s;font-size:${7 + Math.random() * 9}px`;
      container.appendChild(p);
    }
  }

  function initAirplane() {
    const plane = document.getElementById("paper-airplane");
    if (!plane) return;

    plane.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">CAUGHT IT.</div>
        <div class="em-trans">Not many people manage that.</div>
        <div class="em-note">You have very good reflexes. That'll come in handy during the hackathon. Now go — it has places to be.</div>
        <div class="em-credit">— the paper airplane</div>
      </div>`);
    });

    const DURATION = 13500;
    const LOOP_R = 44;
    const LOOP_DUR = 0.13;
    let animId = null;
    let lastTrailTs = 0;

    function spawnTrailDot(x, y) {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const dot = document.createElement("div");
      dot.className = "plane-trail";
      dot.style.left = x + "px";
      dot.style.top = y + "px";
      hero.appendChild(dot);
      setTimeout(() => dot.remove(), 750);
    }

    function fly() {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      const hero = document.getElementById("hero");
      if (!hero) return;
      const heroH = hero.offsetHeight;
      const heroW = hero.offsetWidth;
      const startY = 120 + Math.random() * (heroH - 260);
      const endDrift = (Math.random() - 0.5) * 80;

      const loopCount = Math.random() < 0.4 ? 1 : Math.random() < 0.65 ? 2 : 0;
      const loopStarts = [];
      if (loopCount >= 1) loopStarts.push(0.18 + Math.random() * 0.22);
      if (loopCount >= 2)
        loopStarts.push(loopStarts[0] + 0.28 + Math.random() * 0.1);

      function getXY(rawT) {
        let x = -50 + rawT * (heroW + 110);
        let y =
          startY +
          endDrift * rawT +
          50 * Math.sin(rawT * Math.PI * 2.3) +
          16 * Math.sin(rawT * Math.PI * 5.8 + 1.2);
        for (const ls of loopStarts) {
          if (rawT >= ls && rawT <= ls + LOOP_DUR) {
            const lt = (rawT - ls) / LOOP_DUR;
            const ang = lt * Math.PI * 2;
            x += LOOP_R * Math.sin(ang);
            y += -LOOP_R * (1 - Math.cos(ang));
          }
        }
        return { x, y };
      }

      let ts0 = null;
      let prevX = -50,
        prevY = startY;
      let smoothAngle = 0;

      function frame(ts) {
        if (!ts0) ts0 = ts;
        const rawT = Math.min((ts - ts0) / DURATION, 1);
        const { x, y } = getXY(rawT);

        const dx = x - prevX,
          dy = y - prevY;
        let delta = Math.atan2(dy, dx) * (180 / Math.PI) - smoothAngle;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        smoothAngle += delta * 0.13;

        const opacity =
          rawT < 0.05
            ? (rawT / 0.05) * 0.62
            : rawT > 0.9
              ? ((1 - rawT) / 0.1) * 0.62
              : 0.62;

        plane.style.left = x + "px";
        plane.style.top = y + "px";
        plane.style.opacity = opacity;
        plane.style.transform = `rotate(${smoothAngle}deg)`;
        plane.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
        plane.style.cursor = "pointer";

        if (ts - lastTrailTs > 90) {
          spawnTrailDot(x + 14, y + 14);
          lastTrailTs = ts;
        }

        prevX = x;
        prevY = y;
        if (rawT < 1) {
          animId = requestAnimationFrame(frame);
        } else {
          plane.style.opacity = "0";
          plane.style.pointerEvents = "none";
        }
      }

      plane.style.opacity = "0";
      plane.style.pointerEvents = "none";
      plane.style.left = "-50px";
      plane.style.top = startY + "px";
      animId = requestAnimationFrame(frame);
    }

    setTimeout(fly, 2500);
    setInterval(fly, 30000);
  }

  function initCursorTrail() {
    let last = 0;
    document.addEventListener(
      "mousemove",
      (e) => {
        const now = Date.now();
        if (now - last < 120) return;
        if (Math.random() > 0.72) {
          last = now;
          const dot = document.createElement("div");
          dot.className = "cursor-dot";
          dot.style.left = e.clientX + "px";
          dot.style.top = e.clientY + "px";
          document.body.appendChild(dot);
          setTimeout(() => dot.remove(), 900);
        }
      },
      { passive: true },
    );
  }

  function showEaster(html) {
    const overlay = document.getElementById("easter-overlay");
    const content = document.getElementById("easterContent");
    if (!overlay || !content) return;
    content.innerHTML = html;
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeEaster() {
    document.getElementById("easter-overlay")?.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function initEasterClose() {
    document
      .getElementById("easterClose")
      ?.addEventListener("click", closeEaster);
    document
      .getElementById("easter-overlay")
      ?.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeEaster();
      });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeEaster();
    });
  }

  function initKonami() {
    const SEQ = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let idx = 0;
    document.addEventListener("keydown", (e) => {
      idx = e.key === SEQ[idx] ? idx + 1 : e.key === SEQ[0] ? 1 : 0;
      if (idx === SEQ.length) {
        idx = 0;
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        showEaster(`<div class="easter-motto">
          <div class="em-latin">YOU KNOW WHAT THIS IS.</div>
          <div class="em-trans">We're never gonna give you up.</div>
          <div class="em-note">Whatever you're building this July — we're rooting for you. Every single one of you.</div>
          <div class="em-credit">— The Organising Team</div>
        </div>`);
      }
    });
  }

  function initCrestEgg() {
    const img = document.getElementById("crestImg");
    if (!img) return;
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">${CONFIG.organizer.mottoLine1}<br>${CONFIG.organizer.mottoLine2}</div>
        <div class="em-trans">${CONFIG.organizer.motto}.</div>
        <div class="em-credit">Motto of ${CONFIG.organizer.school} · Est. 1937</div>
        <div class="em-note">Carry it into the hackathon.</div>
      </div>`);
    });
  }

  function initTypingEgg() {
    let buf = "";
    document.addEventListener("keydown", (e) => {
      if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
      buf = (buf + e.key.toLowerCase()).slice(-8);

      if (buf.endsWith("hack")) {
        buf = "";
        document.querySelectorAll(".section-title").forEach((el) => {
          el.classList.add("ink-splat");
          setTimeout(() => el.classList.remove("ink-splat"), 1200);
        });
      }
      if (buf.endsWith("welham")) {
        buf = "";
        const crest = document.getElementById("crestImg");
        if (crest) {
          crest.style.transition = "filter 0.4s, box-shadow 0.4s";
          crest.style.filter =
            "sepia(0) saturate(2) hue-rotate(0deg) contrast(1.2) brightness(1.4)";
          crest.style.boxShadow = "0 0 40px 12px rgba(168,98,47,0.5)";
          setTimeout(() => {
            crest.style.filter = "";
            crest.style.boxShadow = "";
          }, 2000);
        }
      }
      if (buf.endsWith("debug")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">QUACK.</div>
          <div class="em-trans">I'm listening.</div>
          <div class="em-note">Explain your bug out loud. Start from the beginning. You'll find it before you finish the sentence — you always do.</div>
          <div class="em-credit">— your rubber duck</div>
        </div>`);
      }
      if (buf.endsWith("sleep")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">NOT YET.</div>
          <div class="em-trans">The best ideas arrive at 3am.</div>
          <div class="em-note">Sleep after the hackathon. You have the rest of the year for that. Tonight, build.</div>
          <div class="em-credit">— your future self</div>
        </div>`);
      }
      if (buf.endsWith("coffee")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">ONE MORE.</div>
          <div class="em-trans">Your next good idea is one cup away.</div>
          <div class="em-note">Stay hydrated. Eat something. The code will still be there in five minutes.</div>
          <div class="em-credit">— the organising team (who also need coffee)</div>
        </div>`);
      }
      if (buf.endsWith("team")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">YOUR PEOPLE.</div>
          <div class="em-trans">Find them. Trust them.</div>
          <div class="em-note">The best thing you'll take home from this hackathon isn't the certificate. It's the people you built something with at 2am.</div>
          <div class="em-credit">— everyone who's done this before</div>
        </div>`);
      }
      if (buf.endsWith("build")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">THERE IT IS.</div>
          <div class="em-trans">That's the spirit.</div>
          <div class="em-note">A half-finished thing you actually built is worth ten perfect ideas you kept in your head. Ship the thing.</div>
          <div class="em-credit">— hack.welham · first edition</div>
        </div>`);
      }
      if (buf.endsWith("git")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">COMMIT.</div>
          <div class="em-trans">Early. Often. With a real message.</div>
          <div class="em-note">"fixed stuff" is not a commit message. Your future self at 3am will be very confused. Be kind to that person.</div>
          <div class="em-credit">— your workshop mentor</div>
        </div>`);
      }
      if (buf.endsWith("help")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">ASK.</div>
          <div class="em-trans">There are no stupid questions here.</div>
          <div class="em-note">The mentors are here for exactly this. So are your teammates. So are we. You don't have to figure it out alone.</div>
          <div class="em-credit">— the whole organising team</div>
        </div>`);
      }
      if (buf.endsWith("lost")) {
        buf = "";
        showEaster(`<div class="easter-motto">
          <div class="em-latin">THAT'S OKAY.</div>
          <div class="em-trans">Everyone is a little lost at the start.</div>
          <div class="em-note">Pick one small thing. Build that. Then pick the next thing. The path appears as you walk it.</div>
          <div class="em-credit">— someone who was also lost once</div>
        </div>`);
      }
    });
  }

  function initLogoEgg() {
    const logo = document.getElementById("navLogo");
    if (!logo) return;
    let clicks = 0,
      timer;
    logo.addEventListener("click", () => {
      clicks++;
      clearTimeout(timer);
      timer = setTimeout(() => {
        clicks = 0;
      }, 600);
      if (clicks >= 3) {
        clicks = 0;
        clearTimeout(timer);
        showEaster(`<div class="easter-motto">
          <div class="em-latin">HELLO.</div>
          <div class="em-trans">We've been waiting for you.</div>
          <div class="em-note">hack.welham is a 24-hour space built by students, for students. Wherever you're from, whatever your level — you belong here.</div>
          <div class="em-credit">${CONFIG.organizer.school} · ${CONFIG.event.date}</div>
        </div>`);
      }
    });
  }

  function initClickEggs() {
    // Click the 24 HR stamp
    document.querySelector(".stamp.stamp-sm")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">24 HOURS.</div>
        <div class="em-trans">Not a minute more. Not a minute less.</div>
        <div class="em-note">Twenty-four hours sounds like a long time until it isn't. Sleep is optional. Shipping is not. Use the time well.</div>
        <div class="em-credit">— the clock</div>
      </div>`);
    });

    // Click the footer motto
    document
      .querySelector(".footer-bottom [data-cfg='organizer.motto']")
      ?.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
        <div class="em-latin">${CONFIG.organizer.mottoLine1}<br>${CONFIG.organizer.mottoLine2}</div>
        <div class="em-trans">${CONFIG.organizer.motto}.</div>
        <div class="em-note">These words have been on the Welham gates since 1937. They fit a hackathon rather well, we think.</div>
        <div class="em-credit">${CONFIG.organizer.school} · Est. 1937</div>
      </div>`);
      });

    // Click the countdown label
    document.querySelector(".cd-label-top")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">TICK TOCK.</div>
        <div class="em-trans">Every second brings the reveal closer.</div>
        <div class="em-note">The theme drops one hour before kick-off. Whatever it is — you can build something with it. We know you can.</div>
        <div class="em-credit">— hack.welham</div>
      </div>`);
    });

    // Click the registration CTA button 4 times
    let regClicks = 0,
      regTimer;
    document.querySelector(".btn-primary")?.addEventListener("click", (e) => {
      regClicks++;
      clearTimeout(regTimer);
      regTimer = setTimeout(() => {
        regClicks = 0;
      }, 800);
      if (regClicks >= 4) {
        regClicks = 0;
        e.preventDefault();
        showEaster(`<div class="easter-motto">
          <div class="em-latin">SO EAGER.</div>
          <div class="em-trans">We love the energy.</div>
          <div class="em-note">Registration opens soon. In the meantime — read the guidelines, form your team, and get excited. This one's going to be good.</div>
          <div class="em-credit">— hack.welham · first edition</div>
        </div>`);
      }
    });
  }

  function initMoreClickEggs() {
    // Scroll indicator ↓
    document
      .querySelector(".scroll-indicator")
      ?.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
        <div class="em-latin">NOTED.</div>
        <div class="em-trans">You could have just scrolled.</div>
        <div class="em-note">But we respect the commitment to clicking every single thing on the page. Carry on.</div>
        <div class="em-credit">— the scroll wheel</div>
      </div>`);
      });

    // Click "§ THEME REVEAL" label
    document.querySelector(".theme-label")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">PATIENCE.</div>
        <div class="em-trans">It's coming. We promise.</div>
        <div class="em-note">The theme drops one hour before kick-off. Whatever it is — we picked it carefully. You'll like it.</div>
        <div class="em-credit">— the person who chose the theme</div>
      </div>`);
    });

    // Click the tape on the crest card
    document
      .querySelector(".crest-card .tape")
      ?.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
        <div class="em-latin">DON'T.</div>
        <div class="em-trans">This holds the whole thing together.</div>
        <div class="em-note">Some things work precisely because nobody asks why. Leave the tape alone.</div>
        <div class="em-credit">— the tape</div>
      </div>`);
      });

    // Click the supply divider "&"
    document.querySelector(".supply-divider")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">BOTH.</div>
        <div class="em-trans">You need both. No exceptions.</div>
        <div class="em-note">Bring your own enthusiasm. We'll bring everything else. Neither side works without the other.</div>
        <div class="em-credit">— a mutual agreement</div>
      </div>`);
    });

    // Click "BUILT BY STUDENTS, FOR STUDENTS" badge
    document.querySelector(".badge")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">REALLY.</div>
        <div class="em-trans">Students built this. For you.</div>
        <div class="em-note">The website, the event, the judging system, the whole thing. A group of teenagers thought it would be nice to run a hackathon. And then they did.</div>
        <div class="em-credit">— a group of very enthusiastic students at ${CONFIG.organizer.school}</div>
      </div>`);
    });

    // Click any ✗ bullet in track cards
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("tick")) {
        e.target.textContent = "✓";
        setTimeout(() => {
          e.target.textContent = "✗";
        }, 1800);
        showEaster(`<div class="easter-motto">
          <div class="em-latin">THAT'S THE ONE.</div>
          <div class="em-trans">Mark it. Own it. Build it.</div>
          <div class="em-note">You just picked your focus. Now don't second-guess it. The teams that commit to one thing and do it well always surprise everyone.</div>
          <div class="em-credit">— every mentor, ever</div>
        </div>`);
      }
    });

    // Click a track number label
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("track-num")) {
        showEaster(`<div class="easter-motto">
          <div class="em-latin">GOOD CHOICE.</div>
          <div class="em-trans">That's the one.</div>
          <div class="em-note">Every track leads to the same place — a working demo, a panel of judges, and a story worth telling. The track is just the door. What matters is what you build inside it.</div>
          <div class="em-credit">— the judging criteria</div>
        </div>`);
      }
    });

    // Click the footer copyright
    document
      .querySelector(".footer-bottom span:first-child")
      ?.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
        <div class="em-latin">MMXXVI.</div>
        <div class="em-trans">2026, in Roman numerals.</div>
        <div class="em-note">First edition. Everything that follows starts here. Welcome to the beginning of something.</div>
        <div class="em-credit">— hack.welham</div>
      </div>`);
      });

    // Click the crest label below the hero crest
    document.querySelector(".crest-label")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">EST. 1937.</div>
        <div class="em-trans">Nearly ninety years of making people better.</div>
        <div class="em-note">The school has been sending students into the world for almost a century. This hackathon is just the newest way of doing exactly that.</div>
        <div class="em-credit">${CONFIG.organizer.school}</div>
      </div>`);
    });

    // Click the "§ three tracks, one night" meta in hero
    document
      .querySelector(".hero-meta span:last-child")
      ?.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
        <div class="em-latin">THREE TRACKS.</div>
        <div class="em-trans">One night. Zero excuses.</div>
        <div class="em-note">AI. Web. Cloud. Pick the one that makes you most nervous. That's probably the right one.</div>
        <div class="em-credit">— a friendly challenge</div>
      </div>`);
      });
  }

  function initEvenMoreEggs() {
    // Click the hero ribbon
    document.querySelector(".ribbon")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">FIRST EDITION.</div>
        <div class="em-trans">There will be others. But this one is the one.</div>
        <div class="em-note">Every great thing starts as a first edition. Years from now people will say they were here for this one.</div>
        <div class="em-credit">— hack.welham · 2026</div>
      </div>`);
    });

    // Click "OPEN" stamp on a track card
    document.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("stamp") &&
        e.target.textContent.trim() === "OPEN"
      ) {
        showEaster(`<div class="easter-motto">
          <div class="em-latin">OPEN.</div>
          <div class="em-trans">For everyone. No prerequisites. No gatekeeping.</div>
          <div class="em-note">If you have an idea and the will to build it, that's all the qualification you need. The rest you'll figure out on the way.</div>
          <div class="em-credit">— the registration form</div>
        </div>`);
      }
    });

    // Click the HOST label in organisers
    document.querySelector(".host-label")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">HOST.</div>
        <div class="em-trans">We take that word seriously.</div>
        <div class="em-note">A good host makes everyone feel like they belong. That's the only brief we gave ourselves when designing this event.</div>
        <div class="em-credit">— ${CONFIG.organizer.school}</div>
      </div>`);
    });

    // Click mini event numbers
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("me-num")) {
        showEaster(`<div class="easter-motto">
          <div class="em-latin">${e.target.textContent}.</div>
          <div class="em-trans">A small detour. Worth taking.</div>
          <div class="em-note">The mini events are optional. But the teams that take breaks, laugh a little, and do the silly things — they tend to build better. Trust the process.</div>
          <div class="em-credit">— the events team</div>
        </div>`);
      }
    });

    // Click countdown separators ":"
    document.querySelectorAll(".cd-sep").forEach((sep) => {
      sep.style.cursor = "pointer";
      sep.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
          <div class="em-latin">TICK.</div>
          <div class="em-trans">Every second is already gone.</div>
          <div class="em-note">You just spent a second clicking a colon on a countdown. We respect that energy. Now imagine what you could build with 86,400 of them.</div>
          <div class="em-credit">— time, probably</div>
        </div>`);
      });
    });

    // Click "§ KEY FACTS" label in hero notice
    document.querySelector(".hn-label")?.addEventListener("click", () => {
      showEaster(`<div class="easter-motto">
        <div class="em-latin">THE FACTS.</div>
        <div class="em-trans">Just the important ones.</div>
        <div class="em-note">Everything else is noise. Date, time, format, deadline, fee. That's all you need to decide. The rest figures itself out once you say yes.</div>
        <div class="em-credit">— a minimalist</div>
      </div>`);
    });

    // Triple-click a polaroid in judges section
    let polaroidClicks = 0,
      polaroidTimer = null;
    document.addEventListener("click", (e) => {
      if (e.target.closest(".polaroid")) {
        polaroidClicks++;
        clearTimeout(polaroidTimer);
        polaroidTimer = setTimeout(() => {
          polaroidClicks = 0;
        }, 700);
        if (polaroidClicks >= 3) {
          polaroidClicks = 0;
          clearTimeout(polaroidTimer);
          showEaster(`<div class="easter-motto">
            <div class="em-latin">THE PANEL.</div>
            <div class="em-trans">They were once where you are.</div>
            <div class="em-note">Every judge was a beginner once. They're not here to catch you out — they're here to see what you made and tell you it's good. Or how to make it better.</div>
            <div class="em-credit">— the judging committee</div>
          </div>`);
        }
      }
    });

    // Click the FAQ section title
    document
      .querySelector("#faq .section-title")
      ?.addEventListener("click", () => {
        showEaster(`<div class="easter-motto">
        <div class="em-latin">F. A. Q.</div>
        <div class="em-trans">Frequently. Asked. Questions.</div>
        <div class="em-note">If your question isn't in there, email us. We wrote this list by actually reading every message we got. There are no silly questions.</div>
        <div class="em-credit">— ${CONFIG.event.email}</div>
      </div>`);
      });

    // Click reg step numbers
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("step-num")) {
        const n = parseInt(e.target.textContent);
        const lines = [
          "One step at a time. That's all it takes.",
          "Two. The team is the foundation. Choose wisely.",
          "One school, one shot. Make it count.",
          "Read it first. Seriously. It's four pages.",
          "Three working days. We're quick.",
          "The briefing call is the secret weapon. Come prepared.",
          "This is the moment. Everything before it was just prep.",
        ];
        showEaster(`<div class="easter-motto">
          <div class="em-latin">STEP ${e.target.textContent}.</div>
          <div class="em-trans">${lines[(n - 1) % lines.length]}</div>
          <div class="em-note">You're closer than you think. Most people stop before step one. You're reading step ${e.target.textContent}.</div>
          <div class="em-credit">— the registration guide</div>
        </div>`);
      }
    });

    // Click the workshop card footer "→ LED BY MENTOR · TBA"
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("ws-footer")) {
        showEaster(`<div class="easter-motto">
          <div class="em-latin">TBA.</div>
          <div class="em-trans">To be announced. Not to be forgotten.</div>
          <div class="em-note">The mentor for this workshop is someone who actually does this for a living. They agreed to spend an hour with a room full of teenagers. That says something nice about them.</div>
          <div class="em-credit">— the workshop team</div>
        </div>`);
      }
    });

    // Typed words
    const typedWords = {
      idea: `<div class="easter-motto">
        <div class="em-latin">THAT ONE.</div>
        <div class="em-trans">The one you just thought of. Use that one.</div>
        <div class="em-note">The first idea is usually not the best. But it's the one that gets you started. And starting is the only thing that actually matters.</div>
        <div class="em-credit">— every good project ever</div>
      </div>`,
      panic: `<div class="easter-motto">
        <div class="em-latin">BREATHE.</div>
        <div class="em-trans">Everyone panics. This is normal.</div>
        <div class="em-note">If you're panicking at 3am during a hackathon, you're doing it exactly right. The panic means you care. And caring is the most important ingredient.</div>
        <div class="em-credit">— someone who has been there</div>
      </div>`,
      night: `<div class="easter-motto">
        <div class="em-latin">THE NIGHT.</div>
        <div class="em-trans">This is when the real work happens.</div>
        <div class="em-note">The best commits happen between midnight and 4am. Something about the quiet makes the ideas clearer. Embrace it.</div>
        <div class="em-credit">— git log --since="00:00"</div>
      </div>`,
      done: `<div class="easter-motto">
        <div class="em-latin">SHIP IT.</div>
        <div class="em-trans">Done is better than perfect. Always.</div>
        <div class="em-note">The judges will never see the features you didn't build. They'll only see what you submitted. A working simple thing beats a broken ambitious one every single time.</div>
        <div class="em-credit">— the submission portal</div>
      </div>`,
      idea2: "",
      stuck: `<div class="easter-motto">
        <div class="em-latin">WALK AWAY.</div>
        <div class="em-trans">For ten minutes. Seriously.</div>
        <div class="em-note">Get water. Look out the window. Tell someone unrelated what you're trying to do. The answer usually arrives before you get back to your chair.</div>
        <div class="em-credit">— the break room</div>
      </div>`,
      ship: `<div class="easter-motto">
        <div class="em-latin">LAUNCH.</div>
        <div class="em-trans">The world doesn't know about it until you do.</div>
        <div class="em-note">Every great thing was once just a file on someone's laptop that they were too scared to show anyone. Be the brave one. Press submit.</div>
        <div class="em-credit">— your deploy button</div>
      </div>`,
      win: `<div class="easter-motto">
        <div class="em-latin">ALREADY.</div>
        <div class="em-trans">You're already winning.</div>
        <div class="em-note">Most people your age aren't spending their weekends building things. You are. That matters more than the result, and it will matter more and more as the years go on.</div>
        <div class="em-credit">— future you</div>
      </div>`,
      why: `<div class="easter-motto">
        <div class="em-latin">GOOD QUESTION.</div>
        <div class="em-trans">Ask it again. And again.</div>
        <div class="em-note">Every feature you add should survive "why does this exist?" If it can't answer that question, cut it. The best projects have a very clear why.</div>
        <div class="em-credit">— product thinking 101</div>
      </div>`,
    };

    let typeBuf = "";
    document.addEventListener("keydown", (e2) => {
      if (e2.key.length !== 1 || e2.ctrlKey || e2.metaKey || e2.altKey) return;
      typeBuf = (typeBuf + e2.key.toLowerCase()).slice(-6);
      Object.entries(typedWords).forEach(([word, html]) => {
        if (html && typeBuf.endsWith(word)) {
          typeBuf = "";
          showEaster(html);
        }
      });
    });
  }

  function initHeroGlitch() {
    const title = document.getElementById("heroTitle");
    if (!title) return;
    title.addEventListener("dblclick", () => {
      title.classList.add("glitch");
      setTimeout(() => title.classList.remove("glitch"), 800);
    });
  }

  function populateStatics() {
    document.querySelectorAll("[data-cfg]").forEach((el) => {
      const path = el.dataset.cfg.split(".");
      let val = CONFIG;
      for (const k of path) val = val != null ? val[k] : null;
      if (val != null) el.textContent = String(val);
    });
    document.querySelectorAll("[data-cfg-href]").forEach((el) => {
      const path = el.dataset.cfgHref.split(".");
      let val = CONFIG;
      for (const k of path) val = val != null ? val[k] : null;
      if (val != null) el.href = String(val);
    });
  }

  function initDotPulse() {
    document.querySelectorAll(".tl-item").forEach((item, i) => {
      const dot = item.querySelector(".tl-dot");
      if (dot) dot.style.setProperty("--dot-delay", i * 0.26 + "s");
    });
  }

  function revealTheme(animate) {
    const encoded = CONFIG.event && CONFIG.event.themeEncoded;
    if (!encoded) return;
    let theme;
    try {
      theme = atob(encoded);
    } catch (e) {
      return;
    }

    const banner = document.getElementById("theme-announce");
    if (!banner || banner.classList.contains("theme-revealed")) return;

    function doReveal() {
      banner.classList.add("theme-revealed");
      const text = banner.querySelector(".theme-text");
      const when = banner.querySelector(".theme-when");
      const label = banner.querySelector(".cd-label-top");
      const cdRow = banner.querySelector(".cd-row");
      if (text) text.innerHTML = "The theme for this year's hackathon is —";
      if (when) when.style.display = "none";
      if (label) {
        label.textContent = "§ THE THEME";
        label.classList.add("theme-reveal-label");
      }
      if (cdRow) cdRow.innerHTML = `<div class="theme-word">${theme}</div>`;
    }

    if (animate) {
      banner.classList.add("theme-reveal-flash");
      setTimeout(doReveal, 600);
    } else {
      doReveal();
    }
  }

  function initCountdown() {
    const target = CONFIG.event.themeRevealUTC;

    if (Date.now() >= target) {
      revealTheme(false);
      return;
    }

    const days = document.getElementById("cd-days");
    const hours = document.getElementById("cd-hours");
    const mins = document.getElementById("cd-mins");
    const secs = document.getElementById("cd-secs");
    if (!days || !hours || !mins || !secs) return;
    function pad(n) {
      return String(n).padStart(2, "0");
    }
    let revealed = false;
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        if (!revealed) {
          revealed = true;
          revealTheme(true);
        }
        return;
      }
      days.textContent = pad(Math.floor(diff / 86400000));
      hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
      mins.textContent = pad(Math.floor((diff % 3600000) / 60000));
      secs.textContent = pad(Math.floor((diff % 60000) / 1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  function initHtlNav() {
    const scroll = document.getElementById("htlScroll");
    if (!scroll) return;
    const prev = document.getElementById("htlPrev");
    const next = document.getElementById("htlNext");
    const step = 440;
    prev?.addEventListener("click", () =>
      scroll.scrollBy({ left: -step, behavior: "smooth" }),
    );
    next?.addEventListener("click", () =>
      scroll.scrollBy({ left: step, behavior: "smooth" }),
    );
    let isDown = false,
      startX,
      scrollLeft;
    scroll.addEventListener("mousedown", (e) => {
      isDown = true;
      scroll.classList.add("grabbing");
      startX = e.pageX - scroll.offsetLeft;
      scrollLeft = scroll.scrollLeft;
    });
    scroll.addEventListener("mouseleave", () => {
      isDown = false;
      scroll.classList.remove("grabbing");
    });
    scroll.addEventListener("mouseup", () => {
      isDown = false;
      scroll.classList.remove("grabbing");
    });
    scroll.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      scroll.scrollLeft =
        scrollLeft - (e.pageX - scroll.offsetLeft - startX) * 1.2;
    });
  }

  function initScrollTop() {
    const btn = document.getElementById("scrollTop");
    if (!btn) return;
    const hero = document.getElementById("hero");
    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle(
          "visible",
          window.scrollY > (hero?.offsetHeight || 500),
        );
      },
      { passive: true },
    );
    btn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }

  function init() {
    renderStats();
    renderTracks();
    renderSideshows();
    renderTimeline();
    renderJudges();
    renderScorecard();
    renderFaq();
    renderTeam();
    renderOrgChat();
    renderFooterPinboard();

    initFaq();
    initSmoothScroll();
    initNavbar();
    initActiveNav();
    initScrollReveal();
    initCountUp();
    initScrollHint();
    initTypewriter();
    initParticles();
    initAirplane();
    initCursorTrail();
    initKonami();
    initCrestEgg();
    initTypingEgg();
    initLogoEgg();
    initHeroGlitch();
    initClickEggs();
    initMoreClickEggs();
    initEvenMoreEggs();
    initScrollTop();
    initEasterClose();
    initDotPulse();
    initCountdown();
    initHtlNav();
    populateStatics();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
