/* Carey Harwoods — calendar page behavior.
   Renders a month grid from window.CH_EVENTS and sorts the pre-rendered
   event cards into Upcoming / Past. Everything degrades gracefully:
   without JS, the full sorted event list is still visible. */
(function () {
  "use strict";

  var events = window.CH_EVENTS || [];
  var todayStr = localISO(new Date());

  function localISO(d) {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  /* ---- Upcoming / past split of the server-rendered cards ---- */
  var upcomingList = document.querySelector("[data-cal-upcoming]");
  var pastList = document.querySelector("[data-cal-past]");
  var pastHead = document.querySelector("[data-past-head]");
  var emptyNote = document.querySelector("[data-empty-note]");

  if (upcomingList && pastList) {
    var cards = Array.prototype.slice.call(
      upcomingList.querySelectorAll(".event-card")
    );
    var pastCards = [];
    cards.forEach(function (card) {
      if (card.getAttribute("data-date") < todayStr) {
        pastCards.push(card);
      }
    });
    // Most recent past event first
    pastCards.reverse().forEach(function (card) {
      card.classList.add("is-past");
      pastList.appendChild(card);
    });
    if (pastCards.length && pastHead) pastHead.hidden = false;
    if (upcomingList.querySelectorAll(".event-card").length === 0 && emptyNote) {
      emptyNote.hidden = false;
    }
  }

  /* ---- Month grid ---- */
  var wrap = document.querySelector("[data-calendar]");
  if (!wrap) return;
  wrap.hidden = false;

  var grid = wrap.querySelector("[data-cal-grid]");
  var title = wrap.querySelector("[data-cal-title]");
  var current = new Date();
  current.setDate(1);

  wrap.querySelector("[data-cal-prev]").addEventListener("click", function () {
    current.setMonth(current.getMonth() - 1);
    render();
  });
  wrap.querySelector("[data-cal-next]").addEventListener("click", function () {
    current.setMonth(current.getMonth() + 1);
    render();
  });

  function eventsOn(dateStr) {
    return events.filter(function (e) {
      var end = e.end || e.start;
      return e.start <= dateStr && dateStr <= end;
    });
  }

  function render() {
    var year = current.getFullYear();
    var month = current.getMonth();
    title.textContent = current.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    grid.innerHTML = "";
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(function (d) {
      var el = document.createElement("div");
      el.className = "cal-dow";
      el.textContent = d;
      grid.appendChild(el);
    });

    var firstDow = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    for (var i = 0; i < firstDow; i++) {
      var pad = document.createElement("div");
      pad.className = "cal-cell is-empty";
      grid.appendChild(pad);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var cell = document.createElement("div");
      cell.className = "cal-cell";
      var dateStr =
        year +
        "-" +
        String(month + 1).padStart(2, "0") +
        "-" +
        String(day).padStart(2, "0");
      if (dateStr === todayStr) cell.classList.add("is-today");

      var num = document.createElement("span");
      num.textContent = day;
      cell.appendChild(num);

      var todays = eventsOn(dateStr);
      if (todays.length) {
        cell.classList.add("has-event");
        todays.forEach(function (e) {
          var chip = document.createElement("span");
          chip.className = "cal-event";
          chip.textContent = e.title;
          chip.title = e.title + (e.time ? " · " + e.time : "") + (e.location ? " · " + e.location : "");
          cell.appendChild(chip);
        });
      }
      grid.appendChild(cell);
    }
  }

  render();
})();
