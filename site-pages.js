const A = 'assets/';

const pageNames = {
  services: 'Services', curtains: 'Curtains & Blinds', wardrobes: 'Wardrobes & Storage', kitchens: 'Modular Kitchens',
  'full-home': 'Full Home Interiors & Renovation', 'other-services': 'Other Home Services', materials: 'Materials & Finishes',
  'plan-home': 'Plan Your Home', 'curtains-planner': 'Curtains & Blinds Planner', 'wardrobe-planner': 'Wardrobe Planner',
  'project-planner': 'Home Project Planner', estimate: 'Your Plan & Estimate', commitment: 'Our Service Commitment', journey: 'How We Work',
  projects: 'Projects & Client Stories', 'project-story': 'Individual Project Story', advice: 'Home Advice & Guides', guide: 'Damp Walls Guide',
  'article-curtains': 'Curtains or Blinds Guide', 'article-privacy': 'Privacy and Natural Light Guide', 'article-small-wardrobes': 'Small Bedroom Wardrobe Guide',
  'article-hinged-sliding': 'Hinged or Sliding Wardrobe Guide', 'article-quotation': 'Interior Quotation Guide', 'article-advance': 'Installer Advance Guide',
  about: 'About AK Interiors', faqs: 'Frequently Asked Questions', 'start-project': 'Start Your Project', received: 'Enquiry Received',
  contact: 'Contact & Service Areas', privacy: 'Privacy Policy', terms: 'Terms & Consultation Policy', dashboard: 'Enquiry Dashboard', detail: 'Enquiry Detail', track: 'Track Your Request'
};

const header = () => `
  <header class="site-header">
    <a class="brand" href="index.html"><span class="brand-mark">AK<span>✦</span></span><span class="brand-copy"><strong>AK INTERIORS</strong><small>Designing Dream Spaces</small></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
    <nav id="primary-nav" class="main-nav" aria-label="Primary navigation">
      <a href="services.html">Services</a><a href="plan-your-home.html">Plan Your Home</a><a href="service-commitment.html">Our Commitment</a><a href="projects.html">Projects</a><a href="home-advice.html">Home Advice</a><a href="track-request.html">Track Request</a>
    </nav>
    <a class="button button-small header-cta" href="start-project.html">Start Your Project <span>→</span></a>
  </header>`;

const footer = () => `
  <footer class="site-footer">
    <a class="brand footer-brand" href="index.html"><span class="brand-mark">AK<span>✦</span></span><span class="brand-copy"><strong>AK INTERIORS</strong><small>Designing Dream Spaces</small></span></a>
    <nav aria-label="Footer navigation"><a href="contact.html">Contact</a><span>|</span><a href="track-request.html">Track Request</a><span>|</span><a href="faqs.html">FAQs</a><span>|</span><a href="privacy.html">Privacy</a></nav>
    <p>Website Strategy, Design &amp; Development by <strong>Tivoro</strong></p>
  </footer>`;

const shell = content => `${header()}<main class="inner-page">${content}</main>${footer()}`;
const hero = ({eyebrow,title,copy,image=A+'hero-living-room.png'}) => `<section class="inner-hero"><img src="${image}" alt=""/><div class="container"><div class="inner-hero-copy"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${copy}</p></div></div></section>`;
const cta = (title='Ready to begin?',copy='Tell us about your home and we’ll help you plan the next step.') => `<section class="page-section"><div class="container"><div class="page-cta"><div><h2>${title}</h2><p>${copy}</p></div><a class="button button-light" href="start-project.html">Start Your Project →</a></div></div></section>`;
const imgCard = (img,title,copy,href='#',link='Explore') => `<article class="content-card"><img src="${img}" alt="${title}"/><div class="content-card-body"><h3>${title}</h3><p>${copy}</p><a href="${href}">${link} →</a></div></article>`;
const options = items => `<div class="option-grid">${items.map(([img,title,copy])=>`<article class="option-card"><img src="${img}" alt="${title}"/><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>`;

const serviceConfig = {
  curtains:{eyebrow:'Curtains & Blinds',title:'Control Light.<br>Create Ambience.<br>Enhance Privacy.',copy:'A wide range of curtains and blinds to suit your style, space and lifestyle.',image:A+'curtains-room.png',section:'Compare popular options',items:[['Sheer curtains','Soft daylight and privacy'],['Blackout curtains','Restful rooms and light control'],['Roller blinds','Clean and practical'],['Roman blinds','Tailored and premium']]},
  wardrobes:{eyebrow:'Wardrobes & Storage',title:'Organised Living<br>for Everyday Life',copy:'Thoughtfully designed wardrobes and storage solutions that make the most of your space.',image:A+'wardrobe-room.png',section:'Popular storage layouts',items:[['Hinged wardrobes','Classic and timeless'],['Sliding wardrobes','Space-saving design'],['Walk-in storage','Flexible organisation'],['Specialised storage','Purpose-built solutions']]},
  kitchens:{eyebrow:'Modular Kitchens',title:'A Kitchen<br>for Real Life',copy:'Designed for your cooking style, space and storage needs.',image:A+'full-home-room.png',section:'Choose a layout',items:[['L-shape kitchen','Efficient use of space'],['U-shape kitchen','Maximum storage'],['Straight kitchen','Simple and efficient'],['Island kitchen','Social and spacious']]},
  'full-home':{eyebrow:'Full Home Interiors & Renovation',title:'A More Beautiful<br>Way to Live',copy:'End-to-end design and execution for new homes and home renovations.',image:A+'full-home-room.png',section:'Typically included',items:[['Space planning','Thoughtful layouts for daily life'],['Modular furniture','Coordinated kitchen and storage'],['Lighting & ceilings','Balanced ambience'],['On-site supervision','A coordinated execution']]},
  'other-services':{eyebrow:'Other Home Services',title:'Complete Your Home<br>with Expert Solutions',copy:'From doors and furniture to flooring, ceilings and lighting, we help you bring every detail together.',image:A+'hero-living-room.png',section:'Explore home services',items:[['Doors','Stylish and durable'],['Furniture','Custom and ready furniture'],['Flooring','Warm and practical finishes'],['Ceilings & lighting','The right ambience']]},
  materials:{eyebrow:'Materials & Finishes',title:'Beautiful Surfaces.<br>Lasting Homes.',copy:'A curated range of materials and finishes to suit your style, performance needs and everyday living.',image:A+'wardrobe-room.png',section:'Explore popular materials',items:[['Laminates','Durable and versatile'],['Veneers','Natural wood beauty'],['Acrylic','Modern and sleek'],['Tiles & flooring','Practical, lasting finishes']]}
};

function servicesOverview(){
  const cards=[
    [A+'curtains-room.png','Curtains & Blinds','Light control, privacy and style for every home.','curtains-blinds.html'],
    [A+'wardrobe-room.png','Wardrobes & Storage','Smart storage for organised living.','wardrobes-storage.html'],
    [A+'full-home-room.png','Modular Kitchens','Functional, elegant and built for everyday life.','modular-kitchens.html'],
    [A+'full-home-room.png','Full Home Interiors','End-to-end design and execution.','full-home-interiors.html'],
    [A+'hero-living-room.png','Other Home Services','Doors, furniture, flooring, ceilings and more.','other-home-services.html'],
    [A+'wardrobe-room.png','Materials & Finishes','Curated finishes for a beautiful and durable home.','materials-finishes.html']
  ];
  return shell(hero({eyebrow:'Our Services',title:'Beautiful Homes<br>Built Around You',copy:'From single spaces to complete homes, we design and create interiors that are functional, elegant and lasting.',image:A+'hero-living-room.png'})+`<section class="page-section"><div class="container"><h2>Choose a Service</h2><p class="section-intro">Explore our interior services and find the right solution for your home.</p><div class="content-grid">${cards.map(c=>imgCard(...c,'Explore Service')).join('')}</div></div></section>`+cta());
}

function servicePage(key){ const c=serviceConfig[key]; return shell(hero(c)+`<section class="page-section"><div class="container"><div class="feature-row"><article><span class="line-icon">◉</span><h3>Thoughtful Design</h3><p>Solutions shaped around your space and daily life.</p></article><article><span class="line-icon">◇</span><h3>Clear Material Choices</h3><p>Compare practical options before you decide.</p></article><article><span class="line-icon">✓</span><h3>Coordinated Installation</h3><p>Planning and execution with clear checks.</p></article></div></div></section><section class="page-section tint"><div class="container"><h2>${c.section}</h2><p class="section-intro">Understand the possibilities before you start planning.</p>${options(c.items.map((x,i)=>[i%2?c.image:A+'curtains-room.png',x[0],x[1]]))}</div></section>`+cta('Plan your space with confidence.','Share your requirements and we’ll help you choose the right next step.'));
}

function planHome(){ return shell(hero({eyebrow:'Plan Your Home',title:'Take the First Step<br>Towards Your Dream Home',copy:'Use our guided tools to understand your needs and create a more personalised experience.',image:A+'hero-living-room.png'})+`<section class="page-section"><div class="container"><h2>Choose a Tool</h2><p class="section-intro">Start with the space you want to improve.</p><div class="content-grid">${imgCard(A+'curtains-room.png','Curtains & Blinds Planner','Find the right style and light control.','curtains-planner.html','Start Planner')}${imgCard(A+'wardrobe-room.png','Wardrobe Planner','Plan your wardrobe and storage needs.','wardrobe-planner.html','Start Planner')}${imgCard(A+'full-home-room.png','Home Project Planner','Share your full-home requirements.','home-project-planner.html','Start Planner')}</div></div></section><section class="page-section tint"><div class="container"><h2>What You Need</h2><div class="feature-row"><article><span class="line-icon">1</span><h3>Photos</h3><p>Share current photos of your space.</p></article><article><span class="line-icon">2</span><h3>Approximate Dimensions</h3><p>Approximate room size or key wall dimensions.</p></article><article><span class="line-icon">3</span><h3>Budget</h3><p>Your preferred range, where known.</p></article></div></div></section>`); }

const stepper=(labels,active=0)=>`<ol class="full-stepper">${labels.map((x,i)=>`<li class="${i===active?'active':''}"><span>${i+1}</span>${x}</li>`).join('')}</ol>`;
const field=(label,control)=>`<label class="field">${label}${control}</label>`;

function curtainsPlanner(){ return plannerShell(10,'Curtains & Blinds Planner',stepper(['Room','Measurements','Preferences','Budget'])+`<div class="planner-content"><div class="form-stack">${field('Select Room','<select name="room"><option>Living Room</option><option>Bedroom</option><option>Dining Room</option></select>')}<div><strong>Window Type</strong><div class="choice-grid"><label class="choice"><input type="radio" name="window" value="Standard window" checked/> Standard</label><label class="choice"><input type="radio" name="window" value="Bay window"/> Bay Window</label><label class="choice"><input type="radio" name="window" value="Corner window"/> Corner Window</label></div></div>${field('Privacy Level','<input type="range" name="privacy" min="1" max="3" value="2"/>')}<div><strong>Light Control</strong><div class="choice-grid"><label class="choice"><input type="radio" name="light" value="Sheer"/> Sheer</label><label class="choice"><input type="radio" name="light" value="Filter" checked/> Filter</label><label class="choice"><input type="radio" name="light" value="Block"/> Block</label></div></div>${field('Budget Range','<select name="budget"><option>Under ₹2 lakh</option><option>₹2–5 lakh</option><option>₹5 lakh+</option><option>Not decided</option></select>')}</div><div><img src="${A}curtains-room.png" alt="Curtain planning preview" style="width:100%;height:350px;object-fit:cover;border-radius:10px"/><div class="form-grid" style="margin-top:15px">${field('Width (cm)','<input name="width" value="300"/>')}${field('Height (cm)','<input name="height" value="240"/>')}</div></div></div>`,'your-plan-estimate.html','Review My Plan','curtains'); }

function wardrobePlanner(){ return plannerShell(11,'Wardrobe Planner',stepper(['Configuration','Dimensions','Storage','Finish','Budget'])+`<div class="planner-content"><div><strong>Wardrobe Type</strong><div class="choice-grid"><label class="choice visual-choice"><input type="radio" name="type" value="Hinged doors" checked/><img src="${A}wardrobe-room.png" alt="Hinged wardrobe"/><strong>Hinged Doors</strong></label><label class="choice visual-choice"><input type="radio" name="type" value="Sliding doors"/><img src="${A}wardrobe-room.png" alt="Sliding wardrobe"/><strong>Sliding Doors</strong></label></div><h3>Storage Options</h3><div class="choice-grid"><label class="choice"><input type="checkbox" name="storage" value="Hanging rails" checked/> Hanging Rails</label><label class="choice"><input type="checkbox" name="storage" value="Shoe storage"/> Shoe Storage</label><label class="choice"><input type="checkbox" name="storage" value="Shelves" checked/> Shelves</label><label class="choice"><input type="checkbox" name="storage" value="Drawers" checked/> Drawers</label></div>${field('Budget Range','<select name="budget"><option>Under ₹2 lakh</option><option>₹2–5 lakh</option><option>₹5 lakh+</option><option>Not decided</option></select>')}</div><div><img src="${A}wardrobe-room.png" alt="Wardrobe preview" style="width:100%;height:300px;object-fit:cover;border-radius:10px"/><div class="form-grid" style="margin-top:15px">${field('Width (cm)','<input name="width" value="240"/>')}${field('Height (cm)','<input name="height" value="240"/>')}${field('Depth (cm)','<input name="depth" value="60"/>')}${field('Finish / Colour','<select name="finish"><option>Light Oak</option><option>Walnut</option><option>Ivory</option></select>')}</div></div></div>`,'your-plan-estimate.html','Review My Plan','wardrobe'); }

function projectPlanner(){ return plannerShell(12,'Home Project Planner',stepper(['Services','Property','Timing','Review'])+`<div class="planner-content"><div><strong>Select Service(s)</strong><div class="choice-grid"><label class="choice"><input type="checkbox" name="services" value="Curtains & Blinds" checked/> Curtains & Blinds</label><label class="choice"><input type="checkbox" name="services" value="Wardrobes" checked/> Wardrobes</label><label class="choice"><input type="checkbox" name="services" value="Flooring"/> Flooring</label><label class="choice"><input type="checkbox" name="services" value="Painting"/> Painting</label><label class="choice"><input type="checkbox" name="services" value="Carpentry"/> Carpentry</label><label class="choice"><input type="checkbox" name="services" value="Lighting"/> Lighting</label></div><div class="form-grid" style="margin-top:18px">${field('Number of Rooms','<input type="number" name="rooms" min="1" value="3"/>')}${field('Property Location','<input name="location" value="Kangra"/>')}${field('Property Type','<select name="property"><option>Independent home</option><option>Apartment</option></select>')}${field('Preferred Timing','<select name="timing"><option>Within 3 months</option><option>3–6 months</option><option>Flexible</option></select>')}${field('Budget Range','<select name="budget"><option>Under ₹2 lakh</option><option>₹2–5 lakh</option><option>₹5 lakh+</option><option>Not decided</option></select>')}</div></div><div>${field('Upload Photos (optional)','<div class="upload-box">⇧<br/>Drag and drop photos here<br/>or click to upload</div>')}<div class="photo-strip" style="margin-top:12px"><img src="${A}curtains-room.png" alt="Room"/><img src="${A}wardrobe-room.png" alt="Room"/><img src="${A}full-home-room.png" alt="Room"/></div></div></div>`,'your-plan-estimate.html','Review My Plan','home'); }

function plannerShell(no,title,content,next,label,plan){ return shell(`<section class="planner-page"><div class="container"><div class="planner-page-title"><span class="number-badge">${no}</span><h1>${title}</h1></div><div class="planner-panel">${content}<div class="planner-actions"><a class="button secondary" href="plan-your-home.html">← Back</a><a class="button" href="${next}" data-plan-next="${plan}">${label} →</a></div></div></div></section>`); }

const escapeHtml=value=>String(value??'').replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
const planDetails=()=>{
  const params=new URLSearchParams(window.location.search);
  const plan=params.get('plan');
  const privacyLabels={1:'Low',2:'Medium',3:'High'};
  const configs={
    curtains:{title:'Curtains & Blinds',image:A+'curtains-room.png',edit:'curtains-planner.html',service:'Curtains & Blinds',details:[['Room',params.get('room')],['Window',params.get('window')],['Size',`${params.get('width')||'—'} × ${params.get('height')||'—'} cm`],['Privacy',privacyLabels[params.get('privacy')]||'—'],['Light control',params.get('light')],['Budget',params.get('budget')]]},
    wardrobe:{title:'Wardrobe',image:A+'wardrobe-room.png',edit:'wardrobe-planner.html',service:'Wardrobes & Storage',details:[['Type',params.get('type')],['Size',`${params.get('width')||'—'} × ${params.get('height')||'—'} × ${params.get('depth')||'—'} cm`],['Storage',params.getAll('storage').join(', ')||'Not selected'],['Finish',params.get('finish')],['Budget',params.get('budget')]]},
    home:{title:'Home Project',image:A+'full-home-room.png',edit:'home-project-planner.html',service:'Full Home Interiors',details:[['Services',params.getAll('services').join(', ')||'Not selected'],['Rooms',params.get('rooms')],['Location',params.get('location')],['Property',params.get('property')],['Timing',params.get('timing')],['Budget',params.get('budget')]]}
  };
  return {params,plan,config:configs[plan]};
};

function estimate(){
  const {params,config}=planDetails();
  const hasPlan=Boolean(config);
  const editLink=hasPlan?`${config.edit}?${params.toString()}`:'plan-your-home.html';
  const summaryContent=hasPlan
    ? `<div class="summary-grid single">${summary(config.image,config.title,config.details,editLink)}</div>`
    : `<div class="empty-plan"><h3>No plan selections found</h3><p>Choose a planning tool and complete your preferences to see a personalised summary.</p><a class="button" href="plan-your-home.html">Choose a Planner →</a></div>`;
  const reviewLink=hasPlan?`start-project.html?${params.toString()}`:'plan-your-home.html';
  const backLink=editLink;
  const reviewLabel=hasPlan?'Submit for Review →':'Choose a Planner →';
  return shell(`<section class="planner-page"><div class="container"><div class="planner-page-title"><span class="number-badge">13</span><h1>Your Plan &amp; Estimate</h1></div><div class="planner-panel"><h2>Summary of Your Selections</h2>${summaryContent}<div class="notice"><strong>Estimated Cost</strong><br/>Indicative range available after review. We will provide a detailed quotation after understanding your requirements and site conditions.</div><div class="split-notes"><div><h3>✓ Inclusions (typical)</h3><ul><li>Supply of selected materials</li><li>Installation workmanship</li><li>Disposal of packaging</li></ul></div><div class="negative"><h3>✕ Exclusions (typical)</h3><ul><li>Structural works</li><li>Electrical and plumbing works</li><li>Special permits or approvals</li></ul></div></div><div class="planner-actions"><a class="button secondary" href="${backLink}">← Edit Selections</a><a class="button" href="${reviewLink}">${reviewLabel}</a></div></div></div></section>`);
}
const summary=(img,title,details,editHref)=>`<article class="summary-card"><img src="${img}" alt="${title}"/><div class="summary-card-head"><h3>${title}</h3><a href="${editHref}">Edit</a></div><dl>${details.map(([label,value])=>`<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value||'—')}</dd>`).join('')}</dl></article>`;

function commitment(){ const cards=[['▤','Proposed Written Scope','A clear and itemised scope of works based on your requirements.'],['◇','Approved Materials','Only materials and brands agreed in the quotation will be used.'],['□','Agreed Timelines','A mutually agreed schedule with realistic timelines.'],['✓','Change Approval','Any changes require your prior approval in writing.'],['⌂','Installation Checks','Quality checks throughout installation.'],['◉','After-sales Support','We remain available after completion.']]; return shell(hero({eyebrow:'Our Service Commitment',title:'Good interiors.<br>Clear commitments.',copy:'Know what you can expect before your project begins.',image:A+'full-home-room.png'})+`<section class="page-section"><div class="container"><h2>What You Can Expect</h2><div class="content-grid">${cards.map(x=>`<article class="content-card"><div class="content-card-body"><span class="line-icon">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('')}</div><div class="notice">Final commitments will be confirmed in your written quotation.</div></div></section>`+cta()); }

function journey(){ const steps=['Plan online','Discuss remotely','Review suitability','Site measurement','Written quotation','Approval','Execute','Handover']; return shell(hero({eyebrow:'How We Work',title:'Your Project Journey',copy:'A clear path from your first plan to final handover.',image:A+'hero-living-room.png'})+`<section class="page-section"><div class="container"><div class="journey">${steps.map((x,i)=>`<article class="journey-step"><span class="step-no">${i+1}</span><strong>${x}</strong><p>${['Tell us about your home and select the services you need.','We discuss your needs and answer questions.','We review your requirements, photos and information.','We visit to take accurate measurements and confirm details.','You receive a clear and itemised quotation.','You confirm the scope and approve the quotation.','Our team completes the agreed work.','We carry out final checks and hand over your completed project.'][i]}</p></article>`).join('')}</div></div></section>`); }

const projectStories = {
  'living-room-curtains': {
    category:'curtains', cardImage:A+'curtains-room.png', cardTitle:'Living room curtains',
    eyebrow:'Projects · Living room curtains', title:'Soft light and privacy<br>for everyday living',
    copy:'An illustrative living-room project using layered curtains to balance daylight, privacy and warmth.',
    heroImage:A+'curtains-room.png', beforeImage:A+'project-curtains-before.png', afterImage:A+'curtains-room.png',
    beforeAlt:'Living room before layered curtains', afterAlt:'Living room with finished layered curtains',
    problem:'Strong daylight and an exposed window made the living room feel less comfortable at different times of day.',
    approach:'We planned a light sheer layer for daytime softness with fuller curtains for privacy and evening comfort.',
    materials:'Ceiling-height sheers, lined curtains, coordinated tracks and warm neutral fabrics.',
    result:'A brighter, softer living room with flexible privacy and a finish that complements the furniture.'
  },
  'bedroom-fitted-storage': {
    category:'wardrobes', cardImage:A+'wardrobe-room.png', cardTitle:'Bedroom with fitted storage',
    eyebrow:'Projects · Bedroom with fitted storage', title:'A calmer, more<br>organised bedroom',
    copy:'An illustrative project showing how thoughtful storage can change the way a bedroom feels.',
    heroImage:A+'wardrobe-room.png', beforeImage:A+'project-wardrobe-before.png', afterImage:A+'wardrobe-room.png',
    beforeAlt:'Bedroom before fitted storage planning', afterAlt:'Bedroom with finished fitted wardrobes',
    problem:'Limited storage left everyday belongings visible and made the bedroom feel busy rather than restful.',
    approach:'We planned a fitted wardrobe around clothing, luggage and daily-access needs while keeping circulation clear.',
    materials:'Warm timber interiors, soft neutral shutters, discreet handles and durable wardrobe hardware.',
    result:'A calm, organised bedroom with practical storage and a clean, cohesive appearance.'
  },
  'dining-room-blinds': {
    category:'curtains', cardImage:A+'project-blinds-after.png', cardTitle:'Living room blinds',
    eyebrow:'Projects · Living room blinds', title:'Comfortable daylight<br>throughout the day',
    copy:'An illustrative project using tailored Roman blinds to control glare while keeping the room open and bright.',
    heroImage:A+'project-blinds-after.png', beforeImage:A+'project-curtains-before.png', afterImage:A+'project-blinds-after.png',
    beforeAlt:'Living room windows before blinds were installed', afterAlt:'The same living room with tailored Roman blinds',
    problem:'Direct sunlight created glare and heat in the living room during the brightest hours.',
    approach:'We selected an adjustable blind solution that could soften sunlight without closing off the view.',
    materials:'Made-to-measure blinds, colour-matched headrail and easy-clean light-filtering fabric.',
    result:'A more comfortable living area with practical light control and a restrained finish.'
  },
  'feature-wall-restoration': {
    category:'full-home', cardImage:A+'damp-wall.png', cardTitle:'Feature wall restoration',
    eyebrow:'Projects · Feature wall restoration', title:'A healthy wall with<br>a considered finish',
    copy:'An illustrative restoration showing why the source of moisture should be addressed before decorating.',
    heroImage:A+'damp-wall.png', beforeImage:A+'damp-wall.png', afterImage:A+'project-wall-after.png',
    beforeAlt:'Feature wall showing visible damp damage', afterAlt:'Restored interior wall with a clean decorative finish',
    problem:'Recurring damp marks and peeling paint prevented the room from feeling finished and well maintained.',
    approach:'The moisture source was reviewed first, followed by drying, surface preparation and a suitable final treatment.',
    materials:'Repair compound, moisture-appropriate primer and a durable decorative wall finish.',
    result:'A clean, stable feature wall prepared for long-term use rather than a short cosmetic cover-up.'
  },
  'fitted-wardrobe-storage': {
    category:'wardrobes', cardImage:A+'wardrobe-room.png', cardTitle:'Fitted wardrobe storage',
    eyebrow:'Projects · Fitted wardrobe storage', title:'Storage planned around<br>real daily routines',
    copy:'An illustrative wardrobe project that turns a full wall into useful, easy-to-maintain storage.',
    heroImage:A+'wardrobe-room.png', beforeImage:A+'project-wardrobe-before.png', afterImage:A+'wardrobe-room.png',
    beforeAlt:'Room wall before fitted wardrobe installation', afterAlt:'Full-wall fitted wardrobe with organised storage',
    problem:'Freestanding storage used the wall inefficiently and did not provide enough space for clothes and accessories.',
    approach:'We divided the wardrobe into hanging, folded, drawer and overhead zones based on everyday use.',
    materials:'Custom cabinetry, soft-close hardware, internal drawers and a warm neutral laminate finish.',
    result:'More usable storage, easier organisation and a built-in appearance that makes the room feel quieter.'
  },
  'coordinated-home-interior': {
    category:'full-home', cardImage:A+'full-home-room.png', cardTitle:'Coordinated home interior',
    eyebrow:'Projects · Coordinated home interior', title:'One clear language<br>across the whole home',
    copy:'An illustrative full-home project connecting living, dining and storage spaces through consistent details.',
    heroImage:A+'full-home-room.png', beforeImage:A+'project-full-home-before.png', afterImage:A+'full-home-room.png',
    beforeAlt:'Home interior before coordinated design work', afterAlt:'Completed open-plan home interior',
    problem:'Individual rooms felt disconnected because colours, lighting and furniture finishes had been chosen separately.',
    approach:'We created a shared palette and repeated key materials while adapting each room to its own function.',
    materials:'Warm wood finishes, layered lighting, neutral upholstery and coordinated storage details.',
    result:'A cohesive home where each room has its own purpose while still feeling part of the same design.'
  }
};

function projects(){ const ps=Object.entries(projectStories); return shell(hero({eyebrow:'Projects & Client Stories',title:'Real homes.<br>Thoughtful solutions.',copy:'Explore recent work and find ideas for your home.',image:A+'full-home-room.png'})+`<section class="page-section"><div class="container"><div class="project-filters" aria-label="Filter projects"><button class="pill active" type="button" data-filter="all" aria-pressed="true">All</button><button class="pill" type="button" data-filter="curtains" aria-pressed="false">Curtains & Blinds</button><button class="pill" type="button" data-filter="wardrobes" aria-pressed="false">Wardrobes & Storage</button><button class="pill" type="button" data-filter="full-home" aria-pressed="false">Full Home</button></div><div class="project-grid" aria-live="polite">${ps.map(([slug,p])=>`<article class="project-card" data-category="${p.category}"><a class="project-card-link" href="project-story.html?project=${slug}"><img src="${p.cardImage}" alt="${p.cardTitle}"/><h3>${p.cardTitle}</h3></a><p>Illustrative project · Kangra</p></article>`).join('')}</div></div></section>`); }

function projectStory(){
  const slug=new URLSearchParams(window.location.search).get('project') || 'bedroom-fitted-storage';
  const p=projectStories[slug] || projectStories['bedroom-fitted-storage'];
  return shell(hero({eyebrow:p.eyebrow,title:p.title,copy:p.copy,image:p.heroImage})+`<section class="page-section"><div class="container"><a class="story-back" href="projects.html">← Back to all projects</a><div class="story-images"><figure><img src="${p.beforeImage}" alt="${p.beforeAlt}"/><figcaption>Before</figcaption></figure><figure><img src="${p.afterImage}" alt="${p.afterAlt}"/><figcaption>After</figcaption></figure></div><p class="story-note">Matched-view concept visualisation showing the same space before and after the proposed design work.</p><div class="story-facts"><article><h3>The problem</h3><p>${p.problem}</p></article><article><h3>Our approach</h3><p>${p.approach}</p></article><article><h3>Materials</h3><p>${p.materials}</p></article><article><h3>The result</h3><p>${p.result}</p></article></div></div></section>`+cta());
}

const adviceCards=[
  [A+'curtains-room.png','Curtains or blinds: Which suits your room?','Compare light control, privacy, maintenance and style.','guide-curtains-vs-blinds.html'],
  [A+'curtains-room.png','Privacy without losing natural light','Layered solutions for bright rooms that still feel private.','guide-privacy-natural-light.html'],
  [A+'wardrobe-room.png','Choosing wardrobes for small bedrooms','Plan storage, circulation and door clearances carefully.','guide-small-bedroom-wardrobes.html'],
  [A+'wardrobe-room.png','Hinged versus sliding wardrobe doors','Understand space, access, maintenance and cost trade-offs.','guide-hinged-vs-sliding.html'],
  [A+'full-home-room.png','Understanding an interior quotation','Know what is included, excluded and still provisional.','guide-interior-quotation.html'],
  [A+'full-home-room.png','Before paying an installer advance','Agree the scope, materials, payment stages and timeline first.','guide-before-paying-advance.html'],
  [A+'damp-wall.png','Seepage or damp walls? Find the cause first','Why moisture diagnosis must come before repainting or covering.','guide-damp-walls.html']
];

function advice(){ return shell(hero({eyebrow:'Home Advice & Guides',title:'Practical answers for<br>Indian homes.',copy:'Clear guidance for common decisions about curtains, privacy, storage, quotations, installation and damp walls.',image:A+'curtains-room.png'})+`<section class="page-section"><div class="container"><h2>Browse all guides</h2><p class="section-intro">Start with the problem you are trying to solve. Each guide explains the options, trade-offs and useful next steps.</p><div class="content-grid">${adviceCards.map(x=>imgCard(x[0],x[1],x[2],x[3],'Read guide')).join('')}</div></div></section>`); }

const articleData={
  curtains:{title:'Curtains or blinds:<br>which suits your room?',intro:'The right choice depends on how you use the room, the amount of sunlight, the privacy you need and the look you prefer.',image:A+'curtains-room.png',takeaway:'Choose around the room’s practical problem first. Style becomes easier once privacy, glare, cleaning and daily operation are clear.',steps:[['Start with the room problem','Note whether your priority is privacy, glare control, darkness for sleep, heat reduction, easy cleaning or a softer decorative finish.'],['When curtains work well','Curtains suit bedrooms and living rooms where softness, acoustic comfort, layering and full-height visual impact matter.'],['When blinds work well','Blinds suit compact windows, work areas and rooms where precise light control or a cleaner visual line is useful.'],['Consider maintenance','Curtains may need periodic washing or dry cleaning. Blinds require regular dusting and accessible operating mechanisms.'],['Combine when necessary','A sheer curtain with a blackout layer, or a blind with decorative curtains, can solve privacy and light-control needs together.']]},
  privacy:{title:'Privacy without losing<br>natural light',intro:'A bright home does not need to feel exposed. Layering and the right fabric openness can protect privacy while keeping daylight.',image:A+'curtains-room.png',takeaway:'Daytime privacy and night-time privacy are different. Plan both conditions before choosing a sheer fabric or blind.',steps:[['Observe the window at different times','Check visibility from outside in the morning, afternoon and after lights are switched on at night.'],['Use sheers for daytime diffusion','Well-chosen sheers soften harsh sunlight and reduce direct views while still allowing the room to feel bright.'],['Add a private evening layer','At night, illuminated interiors can be visible through sheers. Add lined curtains, blackout curtains or an opaque blind.'],['Control glare without closing the room','Light-filtering blinds, adjustable slats and layered curtains can reduce glare on televisions and work surfaces.'],['Match the solution to window orientation','Strong west-facing sun may need denser light control than a shaded north-facing opening.']]},
  smallWardrobes:{title:'Choosing wardrobes<br>for small bedrooms',intro:'In a compact bedroom, wardrobe size is only part of the decision. Door movement, walking space and internal organisation matter just as much.',image:A+'wardrobe-room.png',takeaway:'Measure the usable room after accounting for the bed, bedside movement, switches, windows and door swings.',steps:[['Map the circulation path','Keep a comfortable route from the room entrance to the bed, wardrobe and windows.'],['Use the full height carefully','Overhead storage can help with occasional items, while daily-use shelves and rails should remain easy to reach.'],['Choose the right door system','Sliding doors save opening clearance. Hinged doors offer wider access and simpler internal fittings where space permits.'],['Plan internal zones around real belongings','Count hanging garments, folded clothes, shoes, luggage and accessories before dividing the wardrobe.'],['Keep the finish visually calm','Light finishes, fewer external breaks and restrained handles can make a large storage unit feel quieter in a small room.']]},
  hingedSliding:{title:'Hinged versus sliding<br>wardrobe doors',intro:'Both systems can work well. The better choice depends on room clearance, wardrobe width, access preferences, hardware and maintenance.',image:A+'wardrobe-room.png',takeaway:'Do not choose sliding doors only because the room is small. Check internal access, track quality and the exact furniture clearance first.',steps:[['Compare opening clearance','Hinged shutters need clear space in front. Sliding shutters remain within the wardrobe footprint.'],['Compare access','Hinged doors can expose the full wardrobe at once. Sliding systems usually keep one section covered.'],['Review hardware and maintenance','Hinges are straightforward to adjust. Sliding tracks and rollers need good-quality hardware and occasional cleaning.'],['Consider mirrors and accessories','Full-height mirrors and door-mounted fittings may influence shutter weight and the preferred mechanism.'],['Price the complete system','Compare shutters, internal divisions, tracks or hinges, handles, installation and future servicing rather than only the panel cost.']]},
  quotation:{title:'Understanding an interior<br>quotation and its exclusions',intro:'A clear quotation should help you understand what is being supplied, how quantities are calculated and which costs may still change.',image:A+'full-home-room.png',takeaway:'Compare quotations line by line. A lower total is difficult to judge when scope, brands, quantities or exclusions are unclear.',steps:[['Check the scope room by room','Confirm exactly which rooms, units and activities are included.'],['Look for specifications','Materials, brands, finishes, hardware and thicknesses should be described clearly enough to compare.'],['Understand quantities and rates','Check whether pricing is lump sum, per square foot, per running foot or based on measured quantities.'],['Read every exclusion','Civil work, electrical changes, plumbing, painting, transport, taxes, removal and repairs may be separate.'],['Clarify provisional items','Site conditions, final measurements and selections can change the final cost. Ask how those changes will be approved.']]},
  advance:{title:'What to agree before<br>paying an installer advance',intro:'An advance should follow a shared understanding of the work, materials, price, timeline and responsibilities.',image:A+'full-home-room.png',takeaway:'Keep the agreed scope, payment stages and material specifications in writing before transferring an advance.',steps:[['Confirm the written scope','List the rooms, items, quantities, finishes and installation activities included.'],['Approve materials and samples','Record brands, colours, fabrics, hardware and acceptable alternatives before procurement.'],['Agree payment milestones','Link later payments to measurable stages such as material approval, delivery, installation and handover.'],['Set a realistic timeline','Document dependencies, site-readiness requirements and how delays or changes will be communicated.'],['Record change and cancellation rules','Agree how additional work, refunds, cancellations, warranties and installation concerns will be handled.']]},
  damp:{title:'Seepage or damp walls?<br>Understand the cause first.',intro:'Visible damp, stains or peeling paint can signal a moisture problem. Identify and address the source before repainting or covering the wall.',image:A+'damp-wall.png',takeaway:'A cosmetic finish can hide symptoms briefly, but trapped moisture may damage the new surface and nearby materials.',steps:[['Recognise the symptoms','Look for damp patches, stains, peeling paint or wallpaper, musty smells, powdery deposits and recurring mould.'],['Consider possible sources','Rain penetration, plumbing leaks, rising moisture, roof or balcony failure and condensation can create similar symptoms.'],['Observe the pattern','Note whether the patch changes after rain, plumbing use, cold weather or periods when the room stays closed.'],['Fix and dry before finishing','Repair the source, allow sufficient drying time and confirm the wall condition before repainting or installing panels.'],['Seek specialist diagnosis when needed','If the source is unclear, recurring or structural, consult an appropriate waterproofing, plumbing or building specialist.']]}
};

function articleGuide(key){ const a=articleData[key]; const related=adviceCards.filter(x=>!x[1].startsWith(a.title.split('<br>')[0])).slice(0,3); return shell(`<section class="article-page-intro"><div class="container"><article class="article-cover-card"><img src="${a.image}" alt="${a.title.replace('<br>',' ')}"/><div class="article-cover-copy"><p class="eyebrow">Home Advice &amp; Guides</p><h1>${a.title}</h1><p>${a.intro}</p></div></article></div></section><section class="article-body"><div class="container"><div class="article-surface"><div class="guide-layout"><div><div class="guide-list">${a.steps.map(x=>`<article><div><h3>${x[0]}</h3><p>${x[1]}</p></div></article>`).join('')}</div><div class="notice" style="margin-top:28px"><strong>Planning note:</strong> These guides provide general information. Final recommendations should account for actual measurements, site conditions and confirmed product specifications.</div></div><aside class="side-panel"><h3>Key takeaway</h3><p>${a.takeaway}</p><a class="button" href="start-project.html">Plan Your Project →</a></aside></div></div></div></section><section class="page-section tint"><div class="container"><h2>Related guides</h2><div class="content-grid">${related.map(x=>imgCard(x[0],x[1],x[2],x[3],'Read guide')).join('')}</div></div></section>`); }

function guide(){ return articleGuide('damp'); }

function about(){ return shell(hero({eyebrow:'About AK Interiors',title:'Helping you create<br>a home you’ll love.',copy:'Friendly, personal service from initial ideas to final installation, focused on quality, practicality and attention to detail.',image:A+'hero-living-room.png'})+`<section class="page-section"><div class="container"><div class="content-grid"><article class="content-card"><div class="content-card-body"><span class="line-icon">◇</span><h3>Our approach</h3><p>We take time to understand your home and how you live, then recommend solutions that suit your needs.</p></div></article><article class="content-card"><div class="content-card-body"><span class="line-icon">⌖</span><h3>Local service</h3><p>Based locally, we serve homeowners across Kangra and surrounding areas of Himachal Pradesh.</p></div></article><article class="content-card"><div class="content-card-body"><span class="line-icon">✓</span><h3>Practical quality</h3><p>Clear choices, coordinated installation and thoughtful final checks.</p></div></article></div></div></section>`+cta()); }

function faqs(){ const qs=[['Estimates & quotations','Information about estimates, what is included and how long they are valid.'],['Home visits','When we arrange home visits and what to expect.'],['Materials & products','Questions about fabrics, finishes, sourcing and care.'],['Installation','How installation works, timescales and preparation.'],['Aftercare & support','Information on guarantees, maintenance and getting in touch.']]; return shell(hero({eyebrow:'FAQs',title:'Frequently asked questions',copy:'Quick answers to common questions.',image:A+'full-home-room.png'})+`<section class="page-section"><div class="container"><div class="faq-list">${qs.map(x=>`<details><summary>${x[0]}</summary><p>${x[1]} Contact us if you need advice specific to your project.</p></details>`).join('')}</div></div></section>`); }

function startProject(){
  const {params,config}=planDetails();
  const value=name=>params.get(name)||'';
  const selected=(actual,expected)=>actual===expected?' selected':'';
  const planText=config?config.details.map(([label,item])=>`${label}: ${item||'—'}`).join('\n'):'';
  const carriedPlan=config?`<div class="carried-plan"><strong>✓ Your ${config.title} plan is attached</strong><p>Your selections have been carried forward. Review them below, then add your contact details.</p><dl>${config.details.map(([label,item])=>`<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(item||'—')}</dd>`).join('')}</dl></div>`:'';
  const successUrl=config?`enquiry-received.html?${params.toString()}`:'enquiry-received.html';
  return shell(`<section class="form-page"><div class="container"><div class="form-shell"><div><p class="eyebrow">Start Your Project</p><h1>${config?'Review and send your plan.':'Tell us about your home.'}</h1><p>${config?'Your planning choices are ready. Complete your details and send the same plan for review.':'Share your requirements and we’ll contact you to discuss the next steps.'} Submission does not automatically confirm a visit.</p>${carriedPlan}<div class="upload-box">⇧<br/>Project photos (optional)<br/><small>Drag and drop or click to upload</small></div></div><form class="form-grid" data-demo-form data-api="/api/enquiries" data-success="${successUrl}">${field('Service',`<select name="service" required><option value=""${selected(config?.service||'','')}>Select a service</option><option${selected(config?.service,'Curtains & Blinds')}>Curtains & Blinds</option><option${selected(config?.service,'Wardrobes & Storage')}>Wardrobes & Storage</option><option${selected(config?.service,'Full Home Interiors')}>Full Home Interiors</option></select>`)}<label class="field">Location <span class="optional-label">(optional)</span><input name="location" placeholder="Town or area" value="${escapeHtml(value('location'))}"/></label>${field('Budget range',`<select name="budget"><option>Select a budget range</option><option${selected(value('budget'),'Under ₹2 lakh')}>Under ₹2 lakh</option><option${selected(value('budget'),'₹2–5 lakh')}>₹2–5 lakh</option><option${selected(value('budget'),'₹5 lakh+')}>₹5 lakh+</option><option${selected(value('budget'),'Not decided')}>Not decided</option></select>`)}${field('Preferred timing',`<select name="timing"><option>Select timing</option><option${selected(value('timing'),'Within 3 months')}>Within 3 months</option><option${selected(value('timing'),'3–6 months')}>3–6 months</option><option${selected(value('timing'),'Flexible')}>Flexible</option></select>`)}${field('Name','<input name="name" autocomplete="name" placeholder="Your name" required/>')}${field('Mobile number','<input name="mobile" type="tel" inputmode="tel" autocomplete="tel" pattern="[0-9+() -]{10,20}" placeholder="Your mobile number" required/>')}<label class="field span-two">Email <span class="optional-label">(optional)</span><input name="email" type="email" autocomplete="email" placeholder="you@example.com"/></label><label class="field span-two">Tell us about your project<textarea name="project" placeholder="Your rooms, needs and priorities">${escapeHtml(planText)}</textarea></label><div class="location-share span-two"><div><strong>Share your current location <span class="optional-label">(optional)</span></strong><p>This helps our team understand your service area. You can continue without sharing it.</p></div><button class="button secondary" type="button" data-share-location>⌖ Share Location</button><input type="hidden" name="latitude"/><input type="hidden" name="longitude"/><input type="hidden" name="locationAccuracy"/><span class="location-status" aria-live="polite"></span></div><label class="span-two"><input type="checkbox" required/> I agree to the Privacy Policy and Terms &amp; Consultation Policy.</label><label class="honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"/></label><p class="form-status span-two" aria-live="polite"></p><button class="button span-two" type="submit">Submit Enquiry →</button></form></div></div></section>`);
}

function received(){
  const {params,plan,config}=planDetails();
  const articleIndexes={curtains:[0,1,4],wardrobe:[2,3,4],home:[4,5,6]};
  const related=(articleIndexes[plan]||[0,4,5]).map(index=>adviceCards[index]);
  const phoneDisplay='9736485128';
  const whatsappText=encodeURIComponent(`Hello AK Interiors, I have submitted ${config?`my ${config.title} plan`:'an enquiry'} and would like to discuss it or arrange a quick consultation.`);
  const requestId=params.get('requestId');
  const requestCard=requestId?`<div class="request-receipt"><div><span>Your request ID</span><strong>${escapeHtml(requestId)}</strong><small>Keep this ID to check your latest stage at any time.</small></div><a class="button" href="track-request.html?requestId=${encodeURIComponent(requestId)}">Track My Request →</a></div>`:'';
  const planSnapshot=requestCard+(config?`<aside class="received-plan"><p class="eyebrow">Your submitted plan</p><h2>${config.title}</h2><dl>${config.details.map(([label,item])=>`<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(item||'—')}</dd>`).join('')}</dl></aside>`:'');
  return shell(`<section class="form-page received-page"><div class="container"><div class="success-panel"><span class="success-check">✓</span><p class="eyebrow">Enquiry received</p><h1>${config?`Your ${config.title} plan is ready for review`:'Your enquiry is ready for review'}</h1><p>Thank you for getting in touch. Our team will review the details and contact you for a focused discussion.</p></div><div class="received-layout"><div><div class="next-steps"><article><span class="step-no">1</span><h3>We review your enquiry</h3><p>We check your selected requirements, measurements and preferences.</p></article><article><span class="step-no">2</span><h3>Phone discussion</h3><p>We clarify priorities, practical options and the suitable next step.</p></article><article><span class="step-no">3</span><h3>If suitable, a visit</h3><p>We arrange a convenient site visit for measurements and confirmation.</p></article></div><div class="notice blue"><strong>Please note:</strong> A visit is confirmed only after we review and discuss your requirements.</div></div>${planSnapshot}</div><section class="quick-connect" aria-labelledby="quick-connect-title"><div><p class="eyebrow">Need help sooner?</p><h2 id="quick-connect-title">Not sure about something? Talk to us directly.</h2><p>Call or WhatsApp AK Interiors to discuss your plan or request a convenient time for a quick consultation.</p></div><div class="connect-actions"><a class="button call-button" href="tel:+919736485128"><span aria-hidden="true">☎</span> Call ${phoneDisplay}</a><a class="button whatsapp-button" href="https://wa.me/919736485128?text=${whatsappText}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12 12 0 0 0-10.3 18.2L4 28l7-1.7A12 12 0 1 0 16 3Zm0 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-4.1 1 1.1-4-.3-.4A9.7 9.7 0 1 1 16 24.8Zm5.3-7.3c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1-2-.8-3.4-1.9-4.5-3.8-.2-.3 0-.5.1-.7l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.5 0-.7l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.3-.3-.4-.6-.5Z"/></svg> WhatsApp Us</a></div></section><div class="trust-mini" aria-label="AK Interiors trust indicators"><article><strong>1,000+</strong><span>Happy Homes</span></article><article><strong>20+</strong><span>Years of Experience</span></article><article><strong>4.9/5.0</strong><span>Average Customer Rating</span></article><article><strong>200+</strong><span>Areas Served</span></article></div><section class="received-guides"><div class="section-heading-inline"><div><p class="eyebrow">Helpful while you wait</p><h2>Advice related to your enquiry</h2></div><a href="home-advice.html">View all guides →</a></div><div class="content-grid">${related.map(item=>imgCard(item[0],item[1],item[2],item[3],'Read guide')).join('')}</div></section></div></section>`);
}

function contact(){ return shell(`<section class="form-page"><div class="container contact-grid"><article class="contact-panel"><p class="eyebrow">Contact & Service Areas</p><h1>Get in Touch</h1><p>We’d love to hear about your project. Reach out using the options below or send us a service-area enquiry.</p><a class="button" href="start-project.html">Request a Call</a> <a class="button" href="start-project.html">Start an Enquiry</a><hr style="margin:28px 0;border:0;border-top:1px solid #ddd"/>${field('Service Area Enquiry','<input placeholder="Town or area"/>')}<a class="button" href="start-project.html">Send Enquiry →</a></article><aside class="service-area"><div><h2>Our Service Areas</h2><h3>Kangra<br/>Himachal Pradesh</h3><p>We undertake projects across Kangra and surrounding areas.</p></div></aside></div></section>`); }

const policyText={privacy:[['Data we collect','We may collect your name, contact details, project information, photos and other details you provide. If you choose Share Location, we also collect the coordinates supplied by your browser to confirm our service area. Location sharing is optional.'],['Purpose','We use your information to respond to enquiries, discuss and plan your project, confirm service coverage, arrange visits where suitable and provide our services.'],['Retention','We keep your information only for as long as necessary to fulfil these purposes or as required by law.'],['Your choices','You can decline location sharing and still submit an enquiry. You can also request access, updates or deletion of your information by contacting us.']],terms:[['Estimates and limitations','Any estimate or initial advice is based on the information available at the time. Final scope, specification and costs are confirmed after consultation and site review where appropriate.'],['Consultation booking','After reviewing your enquiry, we contact you to discuss your project. A visit is not automatically confirmed.'],['Scope approval','Work proceeds once the scope, design, quotation and project details have been agreed in writing.'],['Changes','Changes to scope, materials, timing or cost require written approval before work continues.']]};
function policy(kind){ const title=kind==='privacy'?'Privacy Policy':'Terms & Consultation Policy'; return shell(`<section class="form-page"><div class="container policy"><p class="eyebrow">AK Interiors</p><h1>${title}</h1><p>This readable draft explains how we handle ${kind==='privacy'?'your personal information':'enquiries, consultations and project scope'}.</p>${policyText[kind].map((x,i)=>`<article><h2>${i+1}. ${x[0]}</h2><p>${x[1]}</p></article>`).join('')}</div></section>`); }

function dashboard(){ return dashboardShell(`<div class="dashboard-head"><h1>Enquiries</h1><a class="button" href="start-project.html">+ New Enquiry</a></div><div class="filters">${['Status','Service','Location','Date range'].map(x=>field(x,'<select><option>All</option></select>')).join('')}</div><div class="data-card"><table class="data-table"><thead><tr><th>ID</th><th>Service</th><th>Location</th><th>Budget</th><th>Timing</th><th>Status</th></tr></thead><tbody>${[['ENQ-001','Curtains & Blinds','Kangra','Mid range','3–6 months','New'],['ENQ-002','Wardrobes','Dharamshala','Not specified','Flexible','In review'],['ENQ-003','Full Home','Kangra','Mid to high','1–3 months','Contacted'],['ENQ-004','New build','Palampur','Not specified','Flexible','New'],['ENQ-005','Wardrobes','Kangra','Low to mid','3–6 months','In review']].map(r=>`<tr>${r.map((c,i)=>i===5?`<td><span class="status ${c==='In review'?'review':c==='Contacted'?'contacted':''}">${c}</span></td>`:`<td>${i===0?`<a href="enquiry-detail.html">${c}</a>`:c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`); }
function dashboardShell(content){ return `<main class="dashboard-shell"><aside class="dashboard-sidebar"><div class="dashboard-logo">AK INTERIORS</div><nav class="dashboard-nav"><a href="index.html">⌂ Overview</a><a class="active" href="enquiry-dashboard.html">✉ Enquiries</a><a href="#">▣ Visits</a></nav></aside><section class="dashboard-main">${content}</section></main>`; }
function detail(){ return dashboardShell(`<div class="dashboard-head"><div><a href="enquiry-dashboard.html">← Back to enquiries</a><h1>ENQ-002 <span class="status review">In review</span></h1></div></div><div class="detail-grid"><article class="detail-card"><h2>Service brief</h2><p>Wardrobes for an existing home. The customer is looking for a modern, functional design with natural materials.</p><dl><dt>Location</dt><dd>Dharamshala</dd><dt>Budget range</dt><dd>Mid to high</dd><dt>Preferred timing</dt><dd>3–6 months</dd></dl></article><article class="detail-card"><h2>Project photos</h2><div class="photo-strip"><img src="${A}wardrobe-room.png" alt="Project"/><img src="${A}curtains-room.png" alt="Project"/><img src="${A}full-home-room.png" alt="Project"/></div></article><article class="detail-card"><h2>Notes</h2><p>Client prefers an open, organised layout and will discuss material options and sustainability during the call.</p>${field('Review status','<select><option>In review</option><option>Contacted</option><option>Ready for visit</option></select>')}</article><article class="detail-card"><h2>Actions</h2><div style="display:flex;flex-wrap:wrap;gap:10px"><button class="button secondary">Request info</button><button class="button secondary">Arrange call</button><button class="button">Ready for visit</button></div></article></div>`); }

const enquiryStages={
  new:['Request received','We have safely received the enquiry.'],
  reviewing:['Under review','Our team is reviewing the requirements and service area.'],
  contacted:['Customer contacted','Our team has started the project discussion.'],
  visit_scheduled:['Visit scheduled','A site visit has been arranged with the customer.'],
  quotation:['Quotation in progress','The scope and quotation are being prepared.'],
  approved:['Approved','The customer has approved the agreed scope.'],
  in_progress:['Work in progress','The AK Interiors team is working on the project.'],
  completed:['Completed','The project has reached handover or completion.'],
  closed:['Closed','This request has been closed.']
};
const stageOptions=selectedStatus=>Object.entries(enquiryStages).map(([value,[label]])=>`<option value="${value}"${value===selectedStatus?' selected':''}>${label}</option>`).join('');

function trackRequest(){
  const requestId=new URLSearchParams(window.location.search).get('requestId')||'';
  return shell(`<section class="form-page tracking-page"><div class="container"><div class="tracking-intro"><p class="eyebrow">Customer request tracker</p><h1>Track your AK Interiors request</h1><p>Enter the request ID shown after you submitted your enquiry. You will see the latest stage shared by our team.</p><form class="tracking-form" data-track-form><label class="field">Request ID<input name="requestId" value="${escapeHtml(requestId)}" placeholder="AKI-2026-XXXXXXXXXX" autocomplete="off" required/></label><button class="button" type="submit">Check Status →</button></form></div><div class="tracking-result" data-track-result aria-live="polite"><p>Enter your request ID to view its current stage.</p></div><div class="tracking-help"><strong>Need help finding your request?</strong><span>Call <a href="tel:+919736485128">9736485128</a> or contact us on WhatsApp.</span></div></div></section>`);
}

function dashboardLive(){
  return dashboardShell(`<div class="dashboard-head"><div><p class="eyebrow">AK team workspace</p><h1>Customer Enquiries</h1></div><a class="button" href="start-project.html">+ New Enquiry</a></div><section class="admin-access" data-admin-access><div><h2>Connect the live dashboard</h2><p>Enter the private team access key from your deployment settings. It stays in this browser session.</p></div><form><input type="password" name="adminKey" placeholder="Team access key" required/><button class="button" type="submit">Open Dashboard</button></form><p class="admin-message" aria-live="polite"></p></section><div class="dashboard-live" data-dashboard-live hidden><div class="dashboard-summary" data-dashboard-summary></div><div class="data-card"><table class="data-table"><thead><tr><th>Request ID</th><th>Customer</th><th>Contact</th><th>Service</th><th>Location</th><th>Submitted</th><th>Lead stage</th></tr></thead><tbody data-enquiry-rows></tbody></table></div><p class="admin-message" data-dashboard-message aria-live="polite"></p></div>`);
}

const renderers={services:servicesOverview,curtains:()=>servicePage('curtains'),wardrobes:()=>servicePage('wardrobes'),kitchens:()=>servicePage('kitchens'),'full-home':()=>servicePage('full-home'),'other-services':()=>servicePage('other-services'),materials:()=>servicePage('materials'),'plan-home':planHome,'curtains-planner':curtainsPlanner,'wardrobe-planner':wardrobePlanner,'project-planner':projectPlanner,estimate,commitment,journey,projects,'project-story':projectStory,advice,guide,'article-curtains':()=>articleGuide('curtains'),'article-privacy':()=>articleGuide('privacy'),'article-small-wardrobes':()=>articleGuide('smallWardrobes'),'article-hinged-sliding':()=>articleGuide('hingedSliding'),'article-quotation':()=>articleGuide('quotation'),'article-advance':()=>articleGuide('advance'),about,faqs,'start-project':startProject,received,contact,privacy:()=>policy('privacy'),terms:()=>policy('terms'),dashboard:dashboardLive,detail,track:trackRequest};
const page=document.body.dataset.page;
if(page==='project-story'){
  const storySlug=new URLSearchParams(window.location.search).get('project') || 'bedroom-fitted-storage';
  document.title=`${(projectStories[storySlug] || projectStories['bedroom-fitted-storage']).cardTitle} | AK Interiors`;
}else{
  document.title=`${pageNames[page]||'AK Interiors'} | AK Interiors`;
}
document.querySelector('#app').innerHTML=(renderers[page]||servicesOverview)();

const currentParams=new URLSearchParams(window.location.search);
if(currentParams.get('plan')){
  document.querySelectorAll('.planner-panel input[name],.planner-panel select[name],.planner-panel textarea[name]').forEach(control=>{
    const values=currentParams.getAll(control.name);
    if(!values.length)return;
    if(control.type==='radio'||control.type==='checkbox')control.checked=values.includes(control.value);
    else control.value=values[0];
  });
}

const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.main-nav');
if(menuButton&&navigation){menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('[data-plan-next]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  const params=new URLSearchParams({plan:link.dataset.planNext});
  link.closest('.planner-panel').querySelectorAll('input[name],select[name],textarea[name]').forEach(control=>{
    if((control.type==='radio'||control.type==='checkbox')&&!control.checked)return;
    if(control.type==='checkbox')params.append(control.name,control.value);
    else params.set(control.name,control.value);
  });
  window.location.href=`your-plan-estimate.html?${params.toString()}`;
}));
document.querySelectorAll('[data-share-location]').forEach(button=>button.addEventListener('click',()=>{
  const form=button.closest('form');
  const status=form.querySelector('.location-status');
  if(!navigator.geolocation){status.textContent='Location sharing is not supported by this browser. You can continue without it.';return;}
  button.disabled=true;
  button.textContent='Getting location…';
  status.textContent='Your browser may ask for location permission.';
  navigator.geolocation.getCurrentPosition(position=>{
    form.elements.latitude.value=String(position.coords.latitude);
    form.elements.longitude.value=String(position.coords.longitude);
    form.elements.locationAccuracy.value=String(Math.round(position.coords.accuracy));
    button.textContent='✓ Location Shared';
    status.textContent=`Location added (accuracy about ${Math.round(position.coords.accuracy)} metres).`;
  },()=>{
    button.disabled=false;
    button.textContent='⌖ Share Location';
    status.textContent='Location was not shared. You can submit your enquiry without it.';
  },{enableHighAccuracy:true,timeout:10000,maximumAge:60000});
}));
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',async event=>{
  event.preventDefault();
  const button=form.querySelector('button[type="submit"]');
  const status=form.querySelector('.form-status');
  if(!form.dataset.api){window.location.href=form.dataset.success;return;}
  const values=Object.fromEntries(new FormData(form).entries());
  const query=new URLSearchParams(window.location.search);
  values.planType=query.get('plan')||'';
  values.planData=Object.fromEntries([...new Set(query.keys())].filter(key=>key!=='v').map(key=>[key,query.getAll(key).length>1?query.getAll(key):query.get(key)]));
  button.disabled=true;
  button.textContent='Saving your enquiry…';
  status.textContent='Securely saving your details.';
  status.classList.remove('error');
  try{
    const response=await fetch(form.dataset.api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.message||'We could not save your enquiry.');
    const destination=new URL(form.dataset.success,window.location.href);
    if(result.requestId)destination.searchParams.set('requestId',result.requestId);
    window.location.href=destination.href;
  }catch(error){
    status.textContent=`${error.message} You can call or WhatsApp us on 9736485128.`;
    status.classList.add('error');
    button.disabled=false;
    button.textContent='Submit Enquiry →';
  }
}));

const trackingForm=document.querySelector('[data-track-form]');
if(trackingForm){
  const resultPanel=document.querySelector('[data-track-result]');
  const renderTrackingError=()=>{
    const whatsappMessage=encodeURIComponent('Hello AK Interiors, I am unable to track my request ID and need assistance.');
    resultPanel.innerHTML=`<div class="tracking-error-card"><span class="tracking-error-icon" aria-hidden="true">!</span><div><h2>Please enter the correct request ID</h2><p>We could not find or verify this request. Check the ID shown on your enquiry confirmation and try again. It should begin with <strong>AKI-</strong>.</p><p>For immediate resolution, call or WhatsApp AK Interiors.</p><div class="tracking-error-actions"><a class="button" href="tel:+919736485128">☎ Call 9736485128</a><a class="button whatsapp-button" href="https://wa.me/919736485128?text=${whatsappMessage}" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></div></div></div>`;
  };
  const loadRequest=async requestId=>{
    const normalized=requestId.trim().toUpperCase();
    if(!normalized)return;
    if(!/^AKI-\d{4}-[A-F0-9]{10}$/.test(normalized)){renderTrackingError();return;}
    resultPanel.innerHTML='<p>Checking your request…</p>';
    try{
      const response=await fetch(`/api/enquiries?requestId=${encodeURIComponent(normalized)}`);
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.message||'Unable to check this request.');
      const enquiry=result.enquiry;
      const [label,description]=enquiryStages[enquiry.status]||[enquiry.status,'Your request is being processed.'];
      const stageKeys=Object.keys(enquiryStages).filter(key=>key!=='closed');
      const currentIndex=Math.max(0,stageKeys.indexOf(enquiry.status));
      resultPanel.innerHTML=`<p class="eyebrow">Request ${escapeHtml(enquiry.requestId)}</p><h2>${escapeHtml(label)}</h2><p>${escapeHtml(description)}</p><div class="tracking-meta"><span><strong>Service</strong>${escapeHtml(enquiry.service||'Not specified')}</span><span><strong>Area</strong>${escapeHtml(enquiry.location||'Not shared')}</span><span><strong>Last updated</strong>${new Date(enquiry.statusUpdatedAt).toLocaleString('en-IN')}</span></div><ol class="status-progress">${stageKeys.map((key,index)=>`<li class="${index<currentIndex?'done':index===currentIndex?'current':''}"><span>${index<currentIndex?'✓':index+1}</span>${escapeHtml(enquiryStages[key][0])}</li>`).join('')}</ol>`;
      history.replaceState(null,'',`track-request.html?requestId=${encodeURIComponent(normalized)}`);
    }catch(error){renderTrackingError();}
  };
  trackingForm.addEventListener('submit',event=>{event.preventDefault();loadRequest(new FormData(trackingForm).get('requestId'));});
  const initialId=new URLSearchParams(window.location.search).get('requestId');
  if(initialId)loadRequest(initialId);
}

const adminAccess=document.querySelector('[data-admin-access]');
if(adminAccess){
  const live=document.querySelector('[data-dashboard-live]');
  const rowsContainer=document.querySelector('[data-enquiry-rows]');
  const dashboardMessage=document.querySelector('[data-dashboard-message]');
  const renderRows=enquiries=>{
    document.querySelector('[data-dashboard-summary]').innerHTML=`<article><strong>${enquiries.length}</strong><span>Total enquiries</span></article><article><strong>${enquiries.filter(item=>['new','reviewing'].includes(item.status)).length}</strong><span>Awaiting action</span></article><article><strong>${enquiries.filter(item=>item.latitude!=null).length}</strong><span>Locations shared</span></article>`;
    rowsContainer.innerHTML=enquiries.length?enquiries.map(item=>`<tr><td><strong>${escapeHtml(item.request_id||'Pending ID')}</strong></td><td>${escapeHtml(item.customer_name)}</td><td><a href="tel:${escapeHtml(item.mobile)}">${escapeHtml(item.mobile)}</a>${item.email?`<small>${escapeHtml(item.email)}</small>`:''}</td><td>${escapeHtml(item.service)}</td><td>${item.latitude!=null?`<a href="https://www.google.com/maps?q=${item.latitude},${item.longitude}" target="_blank" rel="noopener">${escapeHtml(item.location||'Shared pin')} ↗</a>`:escapeHtml(item.location||'Not shared')}</td><td>${new Date(item.created_at).toLocaleDateString('en-IN')}</td><td><select data-stage-select data-previous="${escapeHtml(item.status)}" data-request-id="${escapeHtml(item.request_id||'')}">${stageOptions(item.status)}</select></td></tr>`).join(''):'<tr><td colspan="7">No enquiries yet.</td></tr>';
  };
  const loadDashboard=async key=>{
    const response=await fetch('/api/enquiries',{headers:{'x-admin-key':key}});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.message||'Unable to open the dashboard.');
    sessionStorage.setItem('akAdminKey',key);
    renderRows(result.enquiries);
    live.hidden=false;
    adminAccess.hidden=true;
  };
  adminAccess.querySelector('form').addEventListener('submit',async event=>{
    event.preventDefault();
    const key=new FormData(event.currentTarget).get('adminKey');
    const message=adminAccess.querySelector('.admin-message');
    message.textContent='Connecting…';
    try{await loadDashboard(key);}catch(error){message.textContent=error.message;}
  });
  live.addEventListener('change',async event=>{
    const select=event.target.closest('[data-stage-select]');
    if(!select)return;
    const previous=select.dataset.previous||'';
    select.disabled=true;
    dashboardMessage.textContent='Updating the customer’s request stage…';
    try{
      const response=await fetch('/api/enquiries',{method:'PATCH',headers:{'Content-Type':'application/json','x-admin-key':sessionStorage.getItem('akAdminKey')||''},body:JSON.stringify({requestId:select.dataset.requestId,status:select.value})});
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.message||'The stage could not be updated.');
      select.dataset.previous=select.value;
      dashboardMessage.textContent=`${select.dataset.requestId} updated to ${enquiryStages[select.value][0]}. The customer tracker now shows this stage.`;
    }catch(error){if(previous)select.value=previous;dashboardMessage.textContent=error.message;}finally{select.disabled=false;}
  });
  const savedKey=sessionStorage.getItem('akAdminKey');
  if(savedKey)loadDashboard(savedKey).catch(()=>sessionStorage.removeItem('akAdminKey'));
}
document.querySelectorAll('.project-filters .pill').forEach(pill=>pill.addEventListener('click',()=>{
  const selected=pill.dataset.filter;
  document.querySelectorAll('.project-filters .pill').forEach(button=>{
    const active=button===pill;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  document.querySelectorAll('.project-card').forEach(card=>{
    card.hidden=selected!=='all'&&card.dataset.category!==selected;
  });
}));
