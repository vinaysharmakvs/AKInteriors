(() => {
  const root = document.querySelector('[data-design-calculator]');
  if (!root) return;

  const pricing = {
    '2': { label: '2 BHK', baseArea: 1500, essential: [35000, 40000], complete: [60000, 70000], premium: [90000, 105000] },
    '3': { label: '3 BHK', baseArea: 1800, essential: [50000, 60000], complete: [85000, 100000], premium: [125000, 145000] },
    '4': { label: '4 BHK', baseArea: 2200, essential: [65000, 75000], complete: [110000, 125000], premium: [160000, 180000] },
    villa: { label: 'Villa / Duplex', baseArea: 3000, essential: [80000, 95000], complete: [140000, 165000], premium: [190000, 225000] }
  };
  const packageNames = { essential: 'Essential Design', complete: 'Complete Design', premium: 'Premium Design' };
  const packageDetails = {
    essential: { visits: 3, views: 8, elevations: 6, drawings: 6, revisions: 2 },
    complete: { visits: 5, views: 14, elevations: 10, drawings: 10, revisions: 3 },
    premium: { visits: 8, views: 20, elevations: 15, drawings: 15, revisions: 4 }
  };
  const kitchenDeliverables = ['Site measurement', '2D kitchen layout', 'Two 3D views', 'Electrical drawing', 'Plumbing drawing', 'Two elevations', 'Two revision rounds', 'Electrical / plumbing point marking'];
  const money = value => `₹${Math.round(value).toLocaleString('en-IN')}`;

  function selected(name) {
    return root.querySelector(`input[name="${name}"]:checked`)?.value;
  }

  function areaFactor(area, benchmark) {
    if (area < benchmark * .8) return .90;
    if (area < benchmark) return .95;
    if (area > benchmark * 1.4) return 1.18;
    if (area > benchmark * 1.15) return 1.10;
    if (area > benchmark) return 1.05;
    return 1;
  }

  function areaMessage(area, benchmark) {
    if (area < benchmark * .8) return `Smaller than the typical ${benchmark.toLocaleString('en-IN')} sq.ft. benchmark`;
    if (area > benchmark * 1.4) return 'Large project — a complexity allowance is included';
    if (area === benchmark) return 'At the standard area benchmark';
    if (area > benchmark) return 'Area adjustment added for the larger home size';
    return 'Area adjustment applied for the home size';
  }

  function homeDeliverables(packageKey) {
    const detail = packageDetails[packageKey];
    const items = [
      'Space planning & furniture layout',
      'Electrical + plumbing layout',
      'Ceiling + flooring layout',
      'Kitchen design',
      `3D views: ${detail.views}`,
      `Wall elevations: ${detail.elevations}`,
      `Working drawings: ${detail.drawings}`,
      `Revision rounds: ${detail.revisions}`,
      `Site visits: ${detail.visits}`
    ];
    if (packageKey !== 'essential') items.push('Material / colour concept');
    if (packageKey === 'premium') items.push('Material selection + coordination');
    return items;
  }

  function updateSelectedCards() {
    root.querySelectorAll('.design-choice,.design-package').forEach(card => {
      card.classList.toggle('active', Boolean(card.querySelector('input:checked')));
    });
    root.querySelectorAll('.design-addon').forEach(card => {
      card.classList.toggle('active', Boolean(card.querySelector('input:checked')));
    });
  }

  function calculate() {
    updateSelectedCards();
    const scope = selected('designScope') || 'home';
    const isKitchen = scope === 'kitchen';
    root.querySelector('[data-home-details]').hidden = isKitchen;
    root.querySelector('[data-package-section]').hidden = isKitchen;
    root.querySelector('[data-kitchen-section]').hidden = !isKitchen;
    root.querySelector('[data-addons-step]').textContent = isKitchen ? '3' : '4';

    let minimum = 10000;
    let maximum = 10000;
    let summary = 'Kitchen Design · Focused package';
    let areaNote = 'Fixed starting package';
    let deliverables = [...kitchenDeliverables];
    let calculationDescription = 'Kitchen Design Package';

    if (!isKitchen) {
      const propertyKey = root.querySelector('[data-property-type]').value;
      const property = pricing[propertyKey];
      const packageKey = selected('designPackage') || 'essential';
      const rawArea = Number(root.querySelector('[data-built-area]').value) || property.baseArea;
      const area = Math.max(500, Math.min(10000, rawArea));
      const factor = areaFactor(area, property.baseArea);
      minimum = property[packageKey][0] * factor;
      maximum = property[packageKey][1] * factor;
      summary = `${packageNames[packageKey]} · ${property.label} · ${area.toLocaleString('en-IN')} sq.ft.`;
      areaNote = areaMessage(area, property.baseArea);
      deliverables = homeDeliverables(packageKey);
      calculationDescription = `${summary}; benchmark ${property.baseArea.toLocaleString('en-IN')} sq.ft.; area factor ${factor.toFixed(2)}`;
    }

    const selectedAddons = [];
    root.querySelectorAll('[data-addon]:checked').forEach(input => {
      const cost = Number(input.dataset.cost);
      minimum += cost;
      maximum += cost;
      selectedAddons.push(`${input.dataset.addon} (${money(cost)})`);
    });

    const estimate = minimum === maximum ? money(minimum) : `${money(minimum)} – ${money(maximum)}`;
    root.querySelector('[data-design-estimate]').textContent = estimate;
    root.querySelector('[data-design-summary]').textContent = summary;
    root.querySelector('[data-area-note]').textContent = areaNote;
    root.querySelector('[data-deliverables]').innerHTML = deliverables.map(item => `<span>✓ ${item}</span>`).join('');
    root.querySelector('[data-design-budget]').value = estimate;
    root.querySelector('[data-design-lead-summary]').value = [
      'Interior Design Fee Calculator estimate',
      calculationDescription,
      `Indicative fee: ${estimate}`,
      `Area note: ${areaNote}`,
      `Included: ${deliverables.join('; ')}`,
      `Optional services: ${selectedAddons.length ? selectedAddons.join('; ') : 'None selected'}`,
      'Final pricing is subject to the actual project, site conditions and design requirements.'
    ].join('\n');
  }

  root.addEventListener('change', calculate);
  root.querySelector('[data-built-area]').addEventListener('input', calculate);
  calculate();
})();
