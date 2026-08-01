const steamGames = [
  {
    title: "Fears to Fathom® - Scratch Creek",
    image: "previews/F2F_SC.png",
    url: "https://store.steampowered.com/app/4121170/Fears_to_Fathom__Scratch_Creek/"
  },
  {
    title: "ESKINITA",
    image: "previews/ESKINITA.png",
    url: "https://store.steampowered.com/app/4840880/ESKINITA/"
  },
  {
    title: "For Her",
    image: "previews/FORHER.png",
    url: "https://store.steampowered.com/app/3356320/For_Her/"
  }
];

const itchGames = [
  {
    title: "SEWER CALL",
    image: "previews/SEWERCALL.png",
    url: "https://v1to666.itch.io/sewer-call"
  },
  {
    title: "Pastor",
    image: "previews/PASTOR.png",
    url: "https://phontum.itch.io/pastor"
  }
];

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderGames(games, container){
  if(!container) return;
  container.innerHTML = games.map(game => `
    <a class="project" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer">
      <div class="thumb">
        <img src="${escapeHtml(game.image)}" alt="${escapeHtml(game.title)}" loading="lazy">
      </div>
      <span class="project-name">${escapeHtml(game.title)}</span>
    </a>
  `).join('');
}


function initCollapsibleCards(){
  document.querySelectorAll('.platform-header').forEach(header => {
    header.addEventListener('click', () => {
      const wasExpanded = header.getAttribute('aria-expanded') === 'true';
      header.setAttribute('aria-expanded', String(!wasExpanded));

      const card = header.closest('.platform-card');
      card.classList.toggle('collapsed', wasExpanded);

      const wrapper = card.querySelector('.collapse-wrapper');
      if(wrapper){
        wrapper.toggleAttribute('inert', wasExpanded);
      }
    });
  });
}

function initNavObserver(){
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if(!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        setActive(entry.target.id);
      }
    });
  }, {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  renderGames(steamGames, document.getElementById('steam-projects'));
  renderGames(itchGames, document.getElementById('itch-projects'));
  initCollapsibleCards();
  initNavObserver();
});
