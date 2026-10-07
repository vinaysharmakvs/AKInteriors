(() => {
  const root = document.querySelector('[data-curtain-calculator]');
  if (!root) return;

  const collectionPrices = {
    elegant: { label: 'Elegant', min: 799, max: 999 },
    premium: { label: 'Premium', min: 1199, max: 1799 },
    luxury: { label: 'Luxury', min: 1799, max: 4999 }
  };
  const curtainTypes = {
    rod: { label: 'Rod Curtains – Eyelet', short: 'Rod / Eyelet', door: 2, maxPanels: 6, windows: { 1: 1, 2: 2, 3: 4, 4: 4, 5: 6, 6: 6 } },
    ripple: { label: 'Ripple Fold', short: 'Ripple Fold', door: 2, maxPanels: 5, windows: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 } },
    channel: { label: 'Channel / Pleated', short: 'Channel / Pleated', door: 3, maxPanels: 6, windows: { 1: 2, 2: 2, 3: 4, 4: 5, 5: 6, 6: 7 } }
  };
  const roomNames = ['Living Room', 'Bedroom', 'Dining Room', 'Guest Room', 'Study / Office', 'Other Area'];
  let nextRoomId = 2;
  let state = {
    collection: 'premium',
    rooms: [{ id: 1, name: 'Bedroom', type: 'rod', doors: 1, windows: [{ panels: 4 }] }]
  };

  const roomsContainer = root.querySelector('[data-rooms]');
  const money = value => `₹${Math.round(value).toLocaleString('en-IN')}`;
  const windowPieces = (type, panels) => curtainTypes[type].windows[panels] || 0;
  const roomPieces = room => room.doors * curtainTypes[room.type].door + room.windows.reduce((sum, window) => sum + windowPieces(room.type, window.panels), 0);
  const totalPieces = (forcedType = null) => state.rooms.reduce((sum, room) => {
    const type = forcedType || room.type;
    return sum + room.doors * curtainTypes[type].door + room.windows.reduce((windowSum, window) => {
      const panels = Math.min(window.panels, curtainTypes[type].maxPanels);
      return windowSum + windowPieces(type, panels);
    }, 0);
  }, 0);

  function roomOptions(selected) {
    return roomNames.map(name => `<option${name === selected ? ' selected' : ''}>${name}</option>`).join('');
  }

  function typeOptions(selected) {
    return Object.entries(curtainTypes).map(([value, type]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${type.label}</option>`).join('');
  }

  function renderRoom(room, index) {
    const type = curtainTypes[room.type];
    const doors = Array.from({ length: room.doors }, (_, doorIndex) => `<div class="calculator-item"><strong>Door ${doorIndex + 1}</strong><span></span><span class="calculator-item-result">${type.door} pcs minimum</span><button class="calculator-remove" type="button" data-remove-door="${doorIndex}">Remove</button></div>`).join('');
    const windows = room.windows.map((window, windowIndex) => {
      const panels = Math.min(window.panels, type.maxPanels);
      const width = panels * 1.25;
      return `<div class="calculator-item window"><strong>Window ${windowIndex + 1}</strong><input type="number" min="1" max="${type.maxPanels}" step="1" value="${panels}" aria-label="Panels for window ${windowIndex + 1}" data-window-panels="${windowIndex}"/><span class="calculator-item-result">${Number.isInteger(width) ? width : width.toFixed(2)} ft · ${windowPieces(room.type, panels)} pcs</span><button class="calculator-remove" type="button" data-remove-window="${windowIndex}">Remove</button></div>`;
    }).join('');
    const pieces = roomPieces(room);
    const equation = [room.doors ? `Door${room.doors > 1 ? 's' : ''} ${room.doors * type.door} pcs` : '', ...room.windows.map((window, windowIndex) => `Window ${windowIndex + 1} ${windowPieces(room.type, window.panels)} pcs`)].filter(Boolean).join(' + ');
    return `<article class="calculator-room" data-room-id="${room.id}"><header class="calculator-room-head"><strong>▱ &nbsp;${room.name}</strong>${state.rooms.length > 1 ? '<button class="calculator-remove-room" type="button" data-remove-room>Remove Room</button>' : ''}</header><div class="calculator-room-body"><div class="calculator-room-controls"><label class="field">Room / Area<select data-room-name>${roomOptions(room.name)}</select></label><label class="field">Curtain Type<select data-curtain-type>${typeOptions(room.type)}</select></label></div><div class="curtain-type-hints"><span class="${room.type === 'rod' ? 'active' : ''}"><b>Rod / Eyelet</b>Actual door minimum: 2 pcs</span><span class="${room.type === 'ripple' ? 'active' : ''}"><b>Ripple Fold</b>Actual door minimum: 2 pcs</span><span class="${room.type === 'channel' ? 'active' : ''}"><b>Channel / Pleated</b>Actual door minimum: 3 pcs</span></div><div class="calculator-subsection"><div class="calculator-subsection-head"><strong>Actual Doors</strong><small>Rod/Ripple = 2 pcs minimum. Channel/Pleated = 3 pcs minimum.</small></div>${doors || '<p class="room-total">No actual doors added.</p>'}<button class="calculator-add" type="button" data-add-door>＋ Add Door</button></div><div class="calculator-subsection"><div class="calculator-subsection-head"><strong>Windows</strong><small>Each panel = 1.25 ft. Enter the panels for each individual window.</small></div>${windows || '<p class="room-total">No windows added.</p>'}<button class="calculator-add" type="button" data-add-window>＋ Add Window</button></div><p class="room-total"><strong>Room total: ${pieces} curtain pcs</strong>${equation ? `${equation} = ${pieces} curtain pcs` : 'Add a door or window to calculate this room.'}</p></div></article>`;
  }

  function summaryText() {
    const collection = collectionPrices[state.collection];
    const pieces = totalPieces();
    const roomLines = state.rooms.map((room, index) => {
      const type = curtainTypes[room.type];
      const windows = room.windows.map((window, windowIndex) => `Window ${windowIndex + 1}: ${window.panels} panels (${window.panels * 1.25} ft), ${windowPieces(room.type, window.panels)} pcs`).join('; ');
      return `${index + 1}. ${room.name} — ${type.label}; ${room.doors} actual door(s) = ${room.doors * type.door} pcs; ${windows || 'No windows'}; room total ${roomPieces(room)} pcs`;
    });
    return [`Curtain Cost Calculator estimate`, `Collection: ${collection.label}`, ...roomLines, `Total curtain pieces: ${pieces}`, `Indicative estimate: ${money(pieces * collection.min)} – ${money(pieces * collection.max)}`, `Final price is subject to exact measurements, fabric, fullness, stitching/pleating, lining, hardware and installation.`].join('\n');
  }

  function updateResults() {
    if (root.dataset.service === 'blinds') return;
    const collection = collectionPrices[state.collection];
    const pieces = totalPieces();
    root.querySelector('[data-result-collection]').textContent = `${collection.label} Collection`;
    root.querySelector('[data-total-pieces]').textContent = pieces;
    root.querySelector('[data-estimate]').textContent = `${money(pieces * collection.min)} – ${money(pieces * collection.max)}`;
    const leadCollection = root.querySelector('[data-lead-collection]');
    const leadSummary = root.querySelector('[data-lead-summary]');
    const leadService = root.querySelector('[data-lead-service]');
    if (leadService) leadService.value = 'Curtains';
    if (leadCollection) leadCollection.value = `${collection.label} Collection`;
    if (leadSummary) leadSummary.value = summaryText();
  }

  function render() {
    roomsContainer.innerHTML = state.rooms.map(renderRoom).join('');
    updateResults();
  }

  root.addEventListener('change', event => {
    if (event.target.matches('input[name="collection"]')) {
      state.collection = event.target.value;
      updateResults();
      return;
    }
    const roomElement = event.target.closest('[data-room-id]');
    if (!roomElement) return;
    const room = state.rooms.find(item => item.id === Number(roomElement.dataset.roomId));
    if (!room) return;
    if (event.target.matches('[data-room-name]')) room.name = event.target.value;
    if (event.target.matches('[data-curtain-type]')) {
      room.type = event.target.value;
      room.windows.forEach(window => { window.panels = Math.min(window.panels, curtainTypes[room.type].maxPanels); });
    }
    if (event.target.matches('[data-window-panels]')) {
      const index = Number(event.target.dataset.windowPanels);
      const value = Math.max(1, Math.min(curtainTypes[room.type].maxPanels, Number(event.target.value) || 1));
      room.windows[index].panels = value;
    }
    render();
  });

  root.addEventListener('click', event => {
    const roomElement = event.target.closest('[data-room-id]');
    const room = roomElement ? state.rooms.find(item => item.id === Number(roomElement.dataset.roomId)) : null;
    if (event.target.closest('[data-add-room]')) {
      state.rooms.push({ id: nextRoomId++, name: 'Living Room', type: 'rod', doors: 0, windows: [{ panels: 2 }] });
      render();
      return;
    }
    if (!room) return;
    if (event.target.closest('[data-remove-room]') && state.rooms.length > 1) state.rooms = state.rooms.filter(item => item.id !== room.id);
    else if (event.target.closest('[data-add-door]')) room.doors += 1;
    else if (event.target.closest('[data-remove-door]')) room.doors = Math.max(0, room.doors - 1);
    else if (event.target.closest('[data-add-window]')) room.windows.push({ panels: 2 });
    else if (event.target.closest('[data-remove-window]')) room.windows.splice(Number(event.target.closest('[data-remove-window]').dataset.removeWindow), 1);
    else return;
    render();
  });

  root.addEventListener('calculator:curtain', updateResults);

  render();
})();

(() => {
  const root = document.querySelector('[data-curtain-calculator]');
  if (!root) return;

  const rates = {
    vertical: { label: 'Vertical', collections: { Elegant: [100, 150], Premium: [150, 250], Luxury: [250, 450] } },
    roller: { label: 'Roller', collections: { Elegant: [155, 255], Premium: [255, 355], Luxury: [355, 495] } },
    combi: { label: 'Combi', collections: { Elegant: [245, 295], Premium: [295, 395], Luxury: [395, 699] } },
    aluminium: { label: 'Aluminium Venetian', collections: { Premium: [499, 555], Luxury: [555, 595] } },
    wooden: { label: 'Wooden Venetian', collections: { Premium: [755, 855], Luxury: [855, 999] } },
    motorized: { label: 'Motorized', collections: {} }
  };
  let nextId = 2;
  let blinds = [{ id: 1, type: 'vertical', collection: 'Elegant', width: 4, height: 5 }];
  const items = root.querySelector('[data-blind-items]');
  const money = value => `₹${Math.round(value).toLocaleString('en-IN')}`;
  const isMotorized = blind => blind.type === 'motorized';
  const actualArea = blind => Math.max(0, blind.width) * Math.max(0, blind.height);
  const billableArea = blind => Math.max(actualArea(blind), 11);

  function typeOptions(selected) {
    return Object.entries(rates).map(([value, item]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${item.label}</option>`).join('');
  }

  function collectionOptions(blind) {
    if (isMotorized(blind)) return '<option>Price on Request</option>';
    return Object.keys(rates[blind.type].collections).map(value => `<option${value === blind.collection ? ' selected' : ''}>${value}</option>`).join('');
  }

  function blindRange(blind) {
    if (isMotorized(blind)) return null;
    const rate = rates[blind.type].collections[blind.collection];
    const area = billableArea(blind);
    return [area * rate[0], area * rate[1]];
  }

  function renderBlind(blind, index) {
    const range = blindRange(blind);
    return `<article class="blind-item" data-blind-id="${blind.id}"><header><strong>Window / Blind ${index + 1}</strong>${blinds.length > 1 ? '<button type="button" data-remove-blind>Remove</button>' : ''}</header><div class="blind-fields"><label class="field">Blind Type<select data-blind-type>${typeOptions(blind.type)}</select></label><label class="field">Collection<select data-blind-collection${isMotorized(blind) ? ' disabled' : ''}>${collectionOptions(blind)}</select></label><label class="field">Width (ft)<input type="number" min="0.5" step="0.5" value="${blind.width}" data-blind-width/></label><label class="field">Height (ft)<input type="number" min="0.5" step="0.5" value="${blind.height}" data-blind-height/></label></div><div class="blind-area-row"><span>Actual area: <b>${actualArea(blind).toFixed(2)} sq.ft.</b></span><span>Billable area: <b>${billableArea(blind).toFixed(2)} sq.ft.</b></span></div><p class="blind-line-estimate">Estimated blind cost <strong>${range ? `${money(range[0])} – ${money(range[1])}` : 'Price on Request'}</strong></p></article>`;
  }

  function blindSummary() {
    const hasMotor = blinds.some(isMotorized);
    const installation = blinds.length ? 500 + (blinds.length - 1) * 100 : 0;
    let minimum = 0;
    let maximum = 0;
    const lines = blinds.map((blind, index) => {
      const range = blindRange(blind);
      if (range) { minimum += range[0]; maximum += range[1]; }
      return `${index + 1}. ${rates[blind.type].label} — ${isMotorized(blind) ? 'Price on Request' : blind.collection}; ${blind.width} ft × ${blind.height} ft; actual ${actualArea(blind).toFixed(2)} sq.ft.; billable ${billableArea(blind).toFixed(2)} sq.ft.${range ? `; ${money(range[0])}–${money(range[1])}` : ''}`;
    });
    return [`Blinds Estimate Calculator`, ...lines, `Installation: ${money(installation)}`, hasMotor ? 'Estimated investment: Price on Request' : `Estimated investment: ${money(minimum + installation)} – ${money(maximum + installation)}`, `Final pricing is confirmed after site measurement and material selection.`].join('\n');
  }

  function update() {
    const hasMotor = blinds.some(isMotorized);
    const installation = blinds.length ? 500 + (blinds.length - 1) * 100 : 0;
    let minimum = 0;
    let maximum = 0;
    let area = 0;
    blinds.forEach(blind => {
      area += billableArea(blind);
      const range = blindRange(blind);
      if (range) { minimum += range[0]; maximum += range[1]; }
    });
    root.querySelector('[data-blind-count]').textContent = blinds.length;
    root.querySelector('[data-blind-area]').textContent = `${area.toFixed(2)} sq.ft.`;
    root.querySelector('[data-blind-investment]').textContent = hasMotor ? 'Price on Request' : `${money(minimum)} – ${money(maximum)}`;
    root.querySelector('[data-blind-installation]').textContent = money(installation);
    root.querySelector('[data-blind-estimate]').textContent = hasMotor ? 'Price on Request' : `${money(minimum + installation)} – ${money(maximum + installation)}`;
    if (root.dataset.service === 'blinds') {
      root.querySelector('[data-lead-service]').value = 'Blinds';
      root.querySelector('[data-lead-collection]').value = 'Blinds Calculator';
      root.querySelector('[data-lead-summary]').value = blindSummary();
    }
  }

  function render() {
    items.innerHTML = blinds.map(renderBlind).join('');
    update();
  }

  function selectService(service) {
    root.dataset.service = service;
    root.querySelectorAll('[data-service-choice]').forEach(button => {
      const selected = button.dataset.serviceChoice === service;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    root.querySelectorAll('[data-curtain-panel]').forEach(panel => { panel.hidden = service !== 'curtains'; });
    root.querySelector('[data-curtain-result]').hidden = service !== 'curtains';
    root.querySelector('[data-blind-panel]').hidden = service !== 'blinds';
    root.querySelector('[data-blind-result]').hidden = service !== 'blinds';
    const eyebrow = document.querySelector('[data-calculator-eyebrow]');
    const title = document.querySelector('[data-calculator-title]');
    const copy = document.querySelector('[data-calculator-copy]');
    if (service === 'blinds') {
      eyebrow.textContent = 'Blinds Cost Calculator';
      title.innerHTML = 'Plan your blinds with<br/>a clearer cost idea.';
      copy.textContent = 'Add each window and choose the blind type and collection. Your estimate updates as you plan.';
      document.title = 'Blinds Cost Calculator | AK Interiors';
    } else {
      eyebrow.textContent = 'Curtain Cost Calculator';
      title.innerHTML = 'Plan your curtains with<br/>a clearer cost idea.';
      copy.textContent = 'Add each room, door and window. Your estimate updates as you plan.';
      document.title = 'Curtain Cost Calculator | AK Interiors';
    }
    if (service === 'blinds') update();
    else root.dispatchEvent(new CustomEvent('calculator:curtain'));
  }

  root.addEventListener('click', event => {
    const service = event.target.closest('[data-service-choice]');
    if (service) { selectService(service.dataset.serviceChoice); return; }
    if (event.target.closest('[data-add-blind]')) { blinds.push({ id: nextId++, type: 'roller', collection: 'Premium', width: 4, height: 5 }); render(); return; }
    const element = event.target.closest('[data-blind-id]');
    if (element && event.target.closest('[data-remove-blind]') && blinds.length > 1) {
      blinds = blinds.filter(blind => blind.id !== Number(element.dataset.blindId));
      render();
    }
  });

  root.addEventListener('change', event => {
    const element = event.target.closest('[data-blind-id]');
    if (!element) return;
    const blind = blinds.find(item => item.id === Number(element.dataset.blindId));
    if (!blind) return;
    if (event.target.matches('[data-blind-type]')) {
      blind.type = event.target.value;
      blind.collection = Object.keys(rates[blind.type].collections)[0] || 'Price on Request';
    } else if (event.target.matches('[data-blind-collection]')) blind.collection = event.target.value;
    else if (event.target.matches('[data-blind-width]')) blind.width = Math.max(.5, Number(event.target.value) || .5);
    else if (event.target.matches('[data-blind-height]')) blind.height = Math.max(.5, Number(event.target.value) || .5);
    else return;
    render();
  });

  root.dataset.service = 'curtains';
  render();
})();
