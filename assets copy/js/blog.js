(function(){
  const RSS='https://medium.com/feed/@bbtha';
  const API='https://api.rss2json.com/v1/api.json?rss_url='+encodeURIComponent(RSS);
  const wrap=document.getElementById('blogs-content');

  function strip(h){const d=document.createElement('div');d.innerHTML=h||'';return d.textContent||'';}
  function img(i){if(i.thumbnail)return i.thumbnail;if(i.enclosure?.link)return i.enclosure.link;const m=i.content?.match(/<img[^>]+src="([^">]+)"/);return m?m[1]:null;}

  fetch(API).then(r=>r.json()).then(d=>{
    if(!d.items)throw 0;
    wrap.innerHTML='';
    d.items.slice(0,6).forEach(i=>{
      const c=document.createElement('div');
      c.className='blog-card';
      const image=img(i);
      c.innerHTML=`
        ${image?`<img src="${image}" loading="lazy">`:``}
        <div class="blog-body">
          <div class="blog-title">${i.title}</div>
          <div class="blog-excerpt">${strip(i.description).slice(0,200)}…</div>
          <div class="blog-meta">
            <span>${new Date(i.pubDate).toLocaleDateString()}</span>
            <a href="${i.link}" target="_blank" class="blog-link">READ</a>
          </div>
        </div>`;
      wrap.appendChild(c);
    });
  }).catch(()=>{
    wrap.innerHTML=`<div class="text-green-400">BLOG_FEED_OFFLINE</div>`;
  });
})();
