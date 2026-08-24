(function () {
  var currentPage = window.location.pathname.split('/').pop() || 'Biography.html';
  var pageNames = {
    'Biography.html': 'Biography',
    'research.html': 'Research',
    'old_research.html': 'Research',
    'contact.html': 'Contact'
  };
  var currentName = pageNames[currentPage] || 'Home';

  document.body.classList.add('inner-page', `inner-page--${currentName.toLowerCase()}`);
  document.querySelectorAll('.c-header, .footer, .top, .inner-page-banner').forEach(function (element) {
    element.remove();
  });

  var navItems = [
    ['Home', 'index.html'],
    ['Biography', 'Biography.html'],
    ['Research', 'research.html'],
    ['Contact', 'contact.html'],
    ['Agent Tutorial &#8599;', 'https://llm-agent-tutorial.github.io/website/']
  ];
  var navMarkup = navItems.map(function (item) {
    var active = item[0] === currentName ? ' class="is-active"' : '';
    var external = item[1].indexOf('http') === 0 ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a${active} href="${item[1]}"${external}>${item[0]}</a>`;
  }).join('');

  var header = document.createElement('header');
  header.className = 'site-header inner-site-header';
  header.innerHTML = `
    <a class="wordmark" href="index.html" aria-label="Shuyue Hu home">
      <span class="wordmark__mark">SH</span>
      <span class="wordmark__text">shuyue hu<span class="wordmark__dot">.</span></span>
    </a>
    <div class="header__side">
      <span class="header__status"><span class="status-dot"></span> currently in shanghai</span>
      <nav class="site-nav" aria-label="Primary navigation">${navMarkup}</nav>
    </div>`;

  document.body.prepend(header);

  var main = document.querySelector('main.content');
  if (main) {
    main.classList.add('inner-main');
  }

  var eyebrowLabels = {
    Biography: 'a little context',
    Contact: 'say hello'
  };
  var pageInfo = main && main.querySelector('.page__info');
  if (pageInfo && eyebrowLabels[currentName] && !pageInfo.querySelector('.eyebrow')) {
    var eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow';
    eyebrow.innerHTML = '<span class="eyebrow__line"></span> ' + eyebrowLabels[currentName];
    pageInfo.prepend(eyebrow);
  }

  if (currentName === 'Research' && main && !main.querySelector('.inner-page-intro')) {
    main.querySelectorAll('.research-topic[id^="topic-"]').forEach(function (legacyTopic) {
      legacyTopic.remove();
    });
    var intro = document.createElement('div');
    intro.className = 'inner-page-intro page-width';
    intro.innerHTML = '<p class="eyebrow"><span class="eyebrow__line"></span> the work desk</p><h1>Research<span class="title-dot">.</span></h1><p>These are the research topics I’m most interested in right now. They reflect my current focus, not the full range of my past work or research interests. For a complete list of my publications, please visit my <a href="https://scholar.google.com.hk/citations?user=JLdYe_IAAAAJ&amp;hl=zh-CN" target="_blank" rel="noopener noreferrer">Google Scholar profile</a>.</p>';
    main.prepend(intro);
  }

  var footer = document.createElement('footer');
  footer.className = 'site-footer page-width inner-site-footer';
  footer.innerHTML = '<a class="wordmark" href="index.html" aria-label="Back to home"><span class="wordmark__mark">SH</span><span class="wordmark__text">shuyue hu<span class="wordmark__dot">.</span></span></a><p>Made with research, snacks &amp; a two-year-old named Kexong.</p><a href="#top" class="footer-top">Back to top &#8593;</a>';
  document.body.append(footer);
})();
