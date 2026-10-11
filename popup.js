const api = typeof browser!=='undefined'?browser:chrome;

function toObsidianMd(title, url, transcript) {
  const date = new Date().toISOString().split('T')[0];
  return `---
source: ${url}
title: "${title.replace(/"/g, "'")}"
date: ${date}
type: youtube-transcript
---

# ${title}

Link: ${url}

## Transcript

${transcript}
`;
}

document.addEventListener('DOMContentLoaded', async()=>{
  const hideEl=document.getElementById('hideButton');
  const darkEl=document.getElementById('darkMode');
  const tsEl=document.getElementById('timestamps');
  const formatEl=document.getElementById('format');
  const yoinkBtn=document.getElementById('yoink');
  const statusEl=document.getElementById('status');

  const d=await api.storage.local.get(['showYTButton','darkMode','includeTimestamps','exportFormat']);
  hideEl.checked=!(d.showYTButton??true);
  darkEl.checked=d.darkMode??false;
  tsEl.checked=d.includeTimestamps===true;
  formatEl.value=d.exportFormat||'txt';
  document.body.classList.toggle('dark',darkEl.checked);

  hideEl.addEventListener('change',()=>api.storage.local.set({showYTButton:!hideEl.checked}));
  darkEl.addEventListener('change',()=>{api.storage.local.set({darkMode:darkEl.checked}); document.body.classList.toggle('dark',darkEl.checked);});
  tsEl.addEventListener('change',()=>api.storage.local.set({includeTimestamps:tsEl.checked}));
  formatEl.addEventListener('change',()=>api.storage.local.set({exportFormat:formatEl.value}));

  yoinkBtn.addEventListener('click', async()=>{
    const format = formatEl.value;
    statusEl.textContent="Yoinking..."; yoinkBtn.disabled=true;
    try{
      const tabs=await api.tabs.query({active:true,currentWindow:true});
      const tab = tabs[0];
      const reqFormat = format === 'obsidian-export'? 'txt' : (format.startsWith('srt')? 'srt' : 'txt');
      const res=await api.tabs.sendMessage(tab.id,{action:'yoink', format: reqFormat});
      if(!res.ok) throw new Error(res.error);

      if(format === 'txt'){
        await navigator.clipboard.writeText(res.text);
        statusEl.textContent=`Copied ${res.lines} lines!`;
      } else if(format === 'srt-copy'){
        await navigator.clipboard.writeText(res.text);
        statusEl.textContent=`Copied SRT!`;
      } else if(format === 'srt-download'){
        const blob = new Blob([res.text], {type: 'text/srt'});
        const url = URL.createObjectURL(blob);
        const title = tab.title.replace(/[^\w\d-]/g,'_').slice(0,80);
        await api.downloads.download({url, filename: `${title}.srt`});
        statusEl.textContent=`Downloading SRT!`;
      } else if(format === 'obsidian-export'){
        const md = toObsidianMd(tab.title, tab.url, res.text);
        const safeTitle = tab.title.replace(/[\\/:*?"<>|]/g,'_').slice(0,80);
        const fileName = `${safeTitle}.md`;
        const obsidianUrl = `obsidian://new?file=${encodeURIComponent(`YouTube/${fileName}`)}&content=${encodeURIComponent(md)}`;
        await api.tabs.create({url: obsidianUrl});
        statusEl.textContent=`Sent to Obsidian!`;
      }
    }catch(e){
      statusEl.textContent=e.message.includes("Receiving end")?"Refresh YouTube":e.message;
    }finally{
      yoinkBtn.disabled=false;
      setTimeout(()=>statusEl.textContent="",3000);
    }
  });
});
