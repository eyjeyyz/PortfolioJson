const fetchStatusEl = document.getElementById('fetchStatus');
const toggleBtn      = document.getElementById('toggleBtn');
const btnLabel       = document.getElementById('btnLabel');
const portfolioBody  = document.getElementById('portfolioBody');

let portfolioData = null;  
let isVisible     = false;  

fetch('portfolio.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    portfolioData = data;
    renderPersonalInfo(data.personalInfo);
    renderSkills(data.skills);
    renderEducation(data.education);
    renderProjects(data.projects);
    renderContact(data.contact);

    fetchStatusEl.textContent = 'file loaded ✓';
    toggleBtn.disabled = false;
    btnLabel.textContent = 'Show Portfolio';
  })
  .catch((error) => {
    console.error('Error fetching portfolio.json:', error);
    fetchStatusEl.textContent = 'failed to load file';
    btnLabel.textContent = 'Retry';
    document.getElementById('heroName').textContent = 'Could not load portfolio data';
  });

function renderPersonalInfo(info) {
  document.getElementById('heroName').innerHTML =
    `${info.fullName}<span class="cursor">_</span>`;
  document.getElementById('heroCourse').textContent = info.course;
  document.getElementById('heroAbout').textContent = info.about;
  document.title = `${info.fullName} — Portfolio`;
}

function renderSkills(skills) {
  const list = document.getElementById('skillsList');
  list.innerHTML = '';
  skills.forEach((skill) => {
    const li = document.createElement('li');
    li.textContent = skill;
    list.appendChild(li);
  });
}

function renderEducation(educationEntries) {
  const container = document.getElementById('eduList');
  container.innerHTML = '';
  educationEntries.forEach((edu) => {
    const item = document.createElement('div');
    item.className = 'edu-item';
    item.innerHTML = `
      <p class="edu-school">${edu.school}</p>
      <p class="edu-degree">${edu.degree}</p>
      <p class="edu-year">${edu.year}</p>
    `;
    container.appendChild(item);
  });
}

function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  projects.forEach((project) => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const tags = project.technologies
      .map((tech) => `<span>${tech}</span>`)
      .join('');

    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tech-tags">${tags}</div>
    `;
    grid.appendChild(card);
  });
}

function renderContact(contact) {
  const container = document.getElementById('contactList');
  container.innerHTML = `
    <div class="contact-row">
      <span class="c-key">email:</span>
      <a href="mailto:${contact.email}">${contact.email}</a>
    </div>
    <div class="contact-row">
      <span class="c-key">phone:</span>
      <span>${contact.phone}</span>
    </div>
    ${contact.link ? `
    <div class="contact-row">
      <span class="c-key">link:</span>
      <a href="${contact.link}" target="_blank" rel="noopener noreferrer">${contact.link}</a>
    </div>` : ''}
  `;
}

toggleBtn.addEventListener('click', () => {
  if (!portfolioData) return; 

  isVisible = !isVisible;

  portfolioBody.hidden = !isVisible;
  toggleBtn.classList.toggle('is-open', isVisible);
  btnLabel.textContent = isVisible ? 'Hide Portfolio' : 'Show Portfolio';

  document.getElementById('lineInfo').textContent = isVisible
    ? `Ln ${1 + document.querySelectorAll('.block').length * 4}, Col 1`
    : 'Ln 1, Col 1';
});
