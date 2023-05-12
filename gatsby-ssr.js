import React from 'react';
import dotenv from 'dotenv';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      key="chatlio"
      dangerouslySetInnerHTML={{
        __html: `
          window._chatlio = window._chatlio||[];
          !function(){ var t=document.getElementById("chatlio-widget-embed");if(t&&window.ChatlioReact&&_chatlio.init)return void _chatlio.init(t,ChatlioReact);for(var e=function(t){return function(){_chatlio.push([t].concat(arguments)) }},i=["configure","identify","track","show","hide","isShown","isOnline", "page", "open", "showOrHide"],a=0;a<i.length;a++)_chatlio[i[a]]||(_chatlio[i[a]]=e(i[a]));var n=document.createElement("script"),c=document.getElementsByTagName("script")[0];n.id="chatlio-widget-embed",n.src="https://w.chatlio.com/w.chatlio-widget.js",n.async=!0,n.setAttribute("data-embed-version","2.3");
            n.setAttribute('data-widget-id','76e10e85-fcbd-4bb1-69d9-433d77176bc8');
            c.parentNode.insertBefore(n,c);
          }();`,
      }}
    />,
    <script
      key="salespanel"
      dangerouslySetInnerHTML={{
        __html: `
      (function(e, f, g, h, i){
        $salespanel = window.$salespanel || (window.$salespanel = []);
        __sp = i;
        var a=f.createElement(g);
        a.type="text/javascript";
        a.async=1;
        a.src=("https:" == f.location.protocol ? "https://" : "http://") + h;
        var b = f.getElementsByTagName(g)[0];
        b.parentNode.insertBefore(a,b);
    })(window, document, "script", "salespanel.io/src/js/0085b0e0-a475-4471-969b-e46f570ea356/sp.js", "0085b0e0-a475-4471-969b-e46f570ea356");  
      `,
      }}
    />,
  ]);
};
