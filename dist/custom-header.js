var e={},t=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,o="[^\\s]+",n=/\[([^]*?)\]/gm,r=function(){};function a(e,t){for(var o=[],n=0,r=e.length;n<r;n++)o.push(e[n].substr(0,t));return o}function i(e){return function(t,o,n){var r=n[e].indexOf(o.charAt(0).toUpperCase()+o.substr(1).toLowerCase());~r&&(t.month=r)}}function s(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}var c=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],l=["January","February","March","April","May","June","July","August","September","October","November","December"],d=a(l,3),u=a(c,3);e.i18n={dayNamesShort:u,dayNames:c,monthNamesShort:d,monthNames:l,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}};var h={D:function(e){return e.getDate()},DD:function(e){return s(e.getDate())},Do:function(e,t){return t.DoFn(e.getDate())},d:function(e){return e.getDay()},dd:function(e){return s(e.getDay())},ddd:function(e,t){return t.dayNamesShort[e.getDay()]},dddd:function(e,t){return t.dayNames[e.getDay()]},M:function(e){return e.getMonth()+1},MM:function(e){return s(e.getMonth()+1)},MMM:function(e,t){return t.monthNamesShort[e.getMonth()]},MMMM:function(e,t){return t.monthNames[e.getMonth()]},YY:function(e){return s(String(e.getFullYear()),4).substr(2)},YYYY:function(e){return s(e.getFullYear(),4)},h:function(e){return e.getHours()%12||12},hh:function(e){return s(e.getHours()%12||12)},H:function(e){return e.getHours()},HH:function(e){return s(e.getHours())},m:function(e){return e.getMinutes()},mm:function(e){return s(e.getMinutes())},s:function(e){return e.getSeconds()},ss:function(e){return s(e.getSeconds())},S:function(e){return Math.round(e.getMilliseconds()/100)},SS:function(e){return s(Math.round(e.getMilliseconds()/10),2)},SSS:function(e){return s(e.getMilliseconds(),3)},a:function(e,t){return e.getHours()<12?t.amPm[0]:t.amPm[1]},A:function(e,t){return e.getHours()<12?t.amPm[0].toUpperCase():t.amPm[1].toUpperCase()},ZZ:function(e){var t=e.getTimezoneOffset();return(t>0?"-":"+")+s(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4)}},m={D:["\\d\\d?",function(e,t){e.day=t}],Do:["\\d\\d?"+o,function(e,t){e.day=parseInt(t,10)}],M:["\\d\\d?",function(e,t){e.month=t-1}],YY:["\\d\\d?",function(e,t){var o=+(""+(new Date).getFullYear()).substr(0,2);e.year=""+(t>68?o-1:o)+t}],h:["\\d\\d?",function(e,t){e.hour=t}],m:["\\d\\d?",function(e,t){e.minute=t}],s:["\\d\\d?",function(e,t){e.second=t}],YYYY:["\\d{4}",function(e,t){e.year=t}],S:["\\d",function(e,t){e.millisecond=100*t}],SS:["\\d{2}",function(e,t){e.millisecond=10*t}],SSS:["\\d{3}",function(e,t){e.millisecond=t}],d:["\\d\\d?",r],ddd:[o,r],MMM:[o,i("monthNamesShort")],MMMM:[o,i("monthNames")],a:[o,function(e,t,o){var n=t.toLowerCase();n===o.amPm[0]?e.isPm=!1:n===o.amPm[1]&&(e.isPm=!0)}],ZZ:["[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",function(e,t){var o,n=(t+"").match(/([+-]|\d\d)/gi);n&&(o=60*n[1]+parseInt(n[2],10),e.timezoneOffset="+"===n[0]?o:-o)}]};m.dd=m.d,m.dddd=m.ddd,m.DD=m.D,m.mm=m.m,m.hh=m.H=m.HH=m.h,m.MM=m.M,m.ss=m.s,m.A=m.a,e.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},e.format=function(o,r,a){var i=a||e.i18n;if("number"==typeof o&&(o=new Date(o)),"[object Date]"!==Object.prototype.toString.call(o)||isNaN(o.getTime()))throw new Error("Invalid Date in fecha.format");r=e.masks[r]||r||e.masks.default;var s=[];return(r=(r=r.replace(n,(function(e,t){return s.push(t),"@@@"}))).replace(t,(function(e){return e in h?h[e](o,i):e.slice(1,e.length-1)}))).replace(/@@@/g,(function(){return s.shift()}))},e.parse=function(o,r,a){var i=a||e.i18n;if("string"!=typeof r)throw new Error("Invalid format in fecha.parse");if(r=e.masks[r]||r,o.length>1e3)return null;var s={},c=[],l=[];r=r.replace(n,(function(e,t){return l.push(t),"@@@"}));var d,u=(d=r,d.replace(/[|\\{()[^$+*?.-]/g,"\\$&")).replace(t,(function(e){if(m[e]){var t=m[e];return c.push(t[1]),"("+t[0]+")"}return e}));u=u.replace(/@@@/g,(function(){return l.shift()}));var h=o.match(new RegExp(u,"i"));if(!h)return null;for(var p=1;p<h.length;p++)c[p-1](s,h[p],i);var y,b=new Date;return!0===s.isPm&&null!=s.hour&&12!=+s.hour?s.hour=+s.hour+12:!1===s.isPm&&12==+s.hour&&(s.hour=0),null!=s.timezoneOffset?(s.minute=+(s.minute||0)-+s.timezoneOffset,y=new Date(Date.UTC(s.year||b.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0))):y=new Date(s.year||b.getFullYear(),s.month||0,s.day||1,s.hour||0,s.minute||0,s.second||0,s.millisecond||0),y};(function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}})(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}();const p=()=>{const e=new Date;return{time:e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),date:e.toLocaleDateString([],{}),monthNum:e.getMonth()+1,monthNumLZ:String(e.getMonth()+1).padStart(2,0),monthNameShort:e.toLocaleDateString([],{month:"short"}),monthNameLong:e.toLocaleDateString([],{month:"long"}),dayNum:e.getDate(),dayNumLZ:String(e.getDate()).padStart(2,0),dayNameShort:e.toLocaleDateString([],{weekday:"short"}),dayNameLong:e.toLocaleDateString([],{weekday:"long"}),hours12:e.getHours()>12?e.getHours()-12:e.getHours(),hours12LZ:String(e.getHours()>12?e.getHours()-12:e.getHours()).padStart(2,0),hours24:e.getHours(),hours24LZ:String(e.getHours()).padStart(2,0),minutes:e.getMinutes(),minutesLZ:String(e.getMinutes()).padStart(2,0),year2d:String(e.getFullYear()).substr(-2),year4d:e.getFullYear(),AMPM:e.getHours()>=12?"PM":"AM",ampm:e.getHours()>=12?"pm":"am"}},y=document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main"),b=document.body.querySelector("home-assistant").hass,f=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}(),_=function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root"))return e.shadowRoot}(),w=e=>{let t;const{views:o}=f.config;return isNaN(e)?o.forEach(n=>{n.title!==e&&n.path!==e||(t=o.indexOf(n))}):t=parseInt(e,10),t},g=e=>{const t=[],o=(e,t)=>new Array(t-e+1).fill(void 0).map((t,o)=>o+e);if(e.includes("to")){const n=e.split("to");parseInt(n[1])>parseInt(n[0])?t.push(o(parseInt(n[0]),parseInt(n[1]))):t.push(o(parseInt(n[1]),parseInt(n[0])))}return t.flat()},S=e=>{let t=[];e="string"==typeof e?e.replace(/\s+/g,"").split(","):e;for(const o in e)"string"==typeof e[o]&&e[o].includes("to")?t.push(g(e[o])):t.push(e[o]);t=t.flat();for(const e in t)isNaN(t[e])?t[e]=w(t[e]):t[e]=parseInt(t[e]);return t.sort((e,t)=>e-t)},v=e=>{let t={},o=0;return e.exceptions&&e.exceptions.forEach(e=>{const n=(e=>{const t={user:document.body.querySelector("home-assistant").hass.user.name,user_agent:navigator.userAgent};let o=0;for(const n in e)if("user"==n&&e[n].includes(","))e[n].split(/[ ,]+/).forEach(e=>{t[n]==e&&o++});else{if(!(t[n]==e[n]||"query_string"==n&&window.location.search.includes(e[n])||"user_agent"==n&&t[n].includes(e[n])||"media_query"==n&&window.matchMedia(e[n]).matches))return 0;o++}return o})(e.conditions);n>o&&(o=n,t=e.config)}),t.hide_tabs&&e.show_tabs&&t.hide_tabs.length&&e.show_tabs.length?delete e.show_tabs:t.show_tabs&&e.hide_tabs&&t.show_tabs.length&&e.hide_tabs.length&&delete e.hide_tabs,{...e,...t}},q=(()=>{if(_.querySelector("cch-header"))return;const e={},t=Array.from((_.querySelector("paper-tabs")||_).querySelectorAll("paper-tab"));e.tabContainer=document.createElement("paper-tabs"),e.tabContainer.setAttribute("scrollable",""),e.tabContainer.setAttribute("dir","ltr"),e.tabContainer.style.width="100%",e.tabContainer.style.marginLeft="0",t.forEach(o=>{const n=t.indexOf(o),r=o.cloneNode(!0),a=r.querySelector("ha-icon");a&&a.setAttribute("icon",f.config.views[n].icon),r.addEventListener("click",()=>{_.querySelector("paper-tabs").querySelectorAll("paper-tab")[n].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))}),e.tabContainer.appendChild(r)}),e.tabs=e.tabContainer.querySelectorAll("paper-tab");const o=(t,o,n)=>{if("options"===t){e[t]=_.querySelector(n).cloneNode(!0),e[t].removeAttribute("horizontal-offset"),e[t].querySelector("paper-icon-button").style.height="48px";const o=Array.from(e[t].querySelectorAll("paper-item"));o.forEach(e=>{const t=o.indexOf(e);e.addEventListener("click",()=>{_.querySelector(n).querySelectorAll("paper-item")[t].dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})})}else{if("voice"!==t||_.querySelector("ha-start-voice-button")||(n='[icon="hass:microphone"]'),!_.querySelector(n))return;e[t]=document.createElement("paper-icon-button"),e[t].addEventListener("click",()=>{(_.querySelector(n).shadowRoot.querySelector("paper-icon-button")||_.querySelector(n)).dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0}))})}e[t].setAttribute("icon",o),e[t].setAttribute("buttonElem",t),e[t].style.flexShrink="0",e[t].style.height="48px"};o("menu","mdi:menu","ha-menu-button"),o("voice","mdi:microphone","ha-start-voice-button"),o("options","mdi:dots-vertical","paper-menu-button");const n=document.createElement("cch-stack"),r=document.createElement("div");return r.setAttribute("id","contentContainer"),e.container=document.createElement("cch-header"),e.menu&&e.container.appendChild(e.menu),e.container.appendChild(n),e.stack=e.container.querySelector("cch-stack"),e.stack.appendChild(r),e.stack.appendChild(e.tabContainer),e.voice&&"hidden"!=e.voice.style.visibility&&e.container.appendChild(e.voice),e.options&&e.container.appendChild(e.options),_.querySelector("ha-app-layout").appendChild(e.container),e})(),M=(e,t,o)=>{const n=(e,t)=>{let o;const n=document.querySelector("home-assistant").hass;return o="raw_editor"===t?n.localize("ui.panel.lovelace.editor.menu.raw_editor"):"unused_entities"==t?n.localize("ui.panel.lovelace.unused_entities.title"):n.localize(`ui.panel.lovelace.menu.${t}`),e.innerHTML.includes(o)||e.getAttribute("aria-label")==o};(o?document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("app-toolbar > paper-menu-button"):t.options).querySelector("paper-listbox").querySelectorAll("paper-item").forEach(t=>{e.hide_help&&n(t,"help")||e.hide_unused&&n(t,"unused_entities")||e.hide_refresh&&n(t,"refresh")||e.hide_config&&n(t,"configure_ui")||e.hide_raw&&n(t,"raw_editor")?t.style.display="none":t.style.display=""})},x=e=>{if(window.location.href.includes("disable_ch"))return;let t=document.createElement("style");t.setAttribute("id","cch_header_style"),t.innerHTML+="\n        #drawer {\n          display: none;\n        }\n      ",e||(t.innerHTML+="\n        cch-header {\n          display: none;\n        }\n        app-header {\n          display: none;\n        }\n        hui-view, hui-panel-view {\n          min-height: 100vh;\n        }\n      ");const o=_.querySelector("#cch_header_style");o&&o.innerText==t.innerHTML||(_.appendChild(t),o&&o.remove()),y.shadowRoot.querySelector("#drawer").style.display="none",y.shadowRoot.querySelector("ha-sidebar").shadowRoot.querySelector("#cch_sidebar_style")||((t=document.createElement("style")).setAttribute("id","cch_sidebar_style"),t.innerHTML=":host(:not([expanded])) {width: 0px !important;}",y.shadowRoot.querySelector("ha-sidebar").shadowRoot.appendChild(t)),y.shadowRoot.querySelector("#cch_sidebar_style")||((t=document.createElement("style")).setAttribute("id","cch_sidebar_style"),t.innerHTML=":host {--app-drawer-width: 0px !important;}",y.shadowRoot.appendChild(t)),window.dispatchEvent(new Event("resize"))},R=()=>{y.shadowRoot.querySelector("#drawer").style.display="";let e=y.shadowRoot.querySelector("#cch_sidebar_style");e&&e.remove(),(e=y.shadowRoot.querySelector("ha-sidebar").shadowRoot.querySelector("#cch_sidebar_style"))&&e.remove(),y.shadowRoot.querySelector("#drawer").style.display=""},H=e=>{window.location.href.includes("disable_ch")&&(e.disabled_mode=!0);const t=y.shadowRoot.querySelector("ha-sidebar");if(window.customHeaderConfig=e,e.disabled_mode)return window.customHeaderDisabled=!0,R(),q.container&&(q.container.style.visibility="hidden"),_.querySelector("#cch_header_style")&&_.querySelector("#cch_header_style").remove(),_.querySelector("#cch_view_style")&&_.querySelector("#cch_view_style").remove(),q.tabContainer.shadowRoot.querySelector("#cch_chevron")&&q.tabContainer.shadowRoot.querySelector("#cch_chevron").remove(),q.menu.style.display="none",_.querySelector("ha-menu-button").style.display="",t.shadowRoot.querySelector(".menu").style="",t.shadowRoot.querySelector("paper-listbox").style="",t.shadowRoot.querySelector("div.divider").style="",void window.dispatchEvent(new Event("resize"));if(window.customHeaderDisabled=!1,M(e,q,!1),q.menu.style.display="",q.container&&(q.container.style.visibility="visible"),q.tabs.length||(e.compact_mode=!1),e.disable_sidebar?x(!0):e.disable_sidebar||e.kiosk_mode||(R(),t.shadowRoot.querySelector(".menu").style="height:49px;",t.shadowRoot.querySelector("paper-listbox").style="height:calc(100% - 155px);",t.shadowRoot.querySelector("div.divider").style="margin-bottom: -10px;"),((e,t,o,n)=>{let r=48;e.compact_mode||("rtl"==e.button_direction?(o.container.querySelector("#contentContainer").dir="ltr",o.container.querySelector("#contentContainer").style.textAlign="right"):(o.container.querySelector("#contentContainer").style.textAlign="",o.container.querySelector("#contentContainer").dir=""),o.container.querySelector("#contentContainer").innerHTML=e.header_text,r=o.tabs.length?96:48);let a=document.createElement("style");a.setAttribute("id","cch_header_style"),a.innerHTML=`\n      cch-header {\n        padding-left: 10px;\n        padding-right: 10px;\n        width: calc(100% - 20px);\n        display:flex;\n        justify-content: center;\n        font: 400 20px Roboto, sans-serif;\n        background: ${e.background||"var(--primary-color)"};\n        color: ${e.elements_color||"var(--text-primary-color)"};\n        margin-top: 4px;\n        margin-bottom: 0px;\n        margin-top: ${e.footer_mode?"4px;":"0px"};\n        ${e.footer_mode?"position: sticky; bottom: 0px;":"position: sticky; top: 0px;"}\n      }\n      cch-stack {\n        flex-direction: column;\n        width: 100%;\n        margin-left: 9px;\n        margin-right: 9px;\n      }\n      #contentContainer {\n        padding: 12px 6px 12px 6px;\n        color: var(--text-primary-color);\n        ${e.compact_mode?"display: none;":""}\n      }\n      app-header {\n        display: none;\n      }\n      paper-tab.iron-selected {\n        ${e.active_tab_color?`color: ${e.active_tab_color};`:""}\n      }\n      paper-listbox {\n        position: fixed;\n        width: fit-content;\n        ${"rtl"==e.button_direction?"left: 0":"right: 0"};\n        ${e.footer_mode?"bottom: 0":"top: 0"};\n      }\n      [buttonElem="menu"] {\n        ${e.menu_color?`color: ${e.menu_color};`:""}\n        ${e.menu_hide?"display: none;":""}\n      }\n      [buttonElem="options"] {\n        ${e.options_color?`color: ${e.options_color};`:""}\n        ${e.options_hide?"display: none;":""}\n      }\n      [buttonElem="voice"] {\n        ${e.voice_color?`color: ${e.voice_color};`:""}\n        ${e.voice_hide?"display: none;":""}\n      }\n      paper-tab {\n        ${e.all_tabs_color?`color: ${e.all_tabs_color};`:""}\n      }\n      paper-tabs {\n        ${e.indicator_color?`--paper-tabs-selection-bar-color: ${e.indicator_color} !important;`:""}\n      }\n    `,e.tabs_color&&Object.keys(e.tabs_color).forEach(t=>{a.innerHTML+=`\n      paper-tab:nth-child(${n(t)+1}) {\n        color: ${e.tabs_color[t]};\n      }\n    `}),e.hide_tabs&&e.hide_tabs.forEach(e=>{a.innerHTML+=`\n      paper-tab:nth-child(${n(e)+1}) {\n        display: none;\n      }\n    `});let i=t.querySelector("#cch_header_style");t.appendChild(a),i&&i.remove(),(a=document.createElement("style")).setAttribute("id","cch_view_style"),a.innerHTML=`\n        hui-view, hui-panel-view {\n          min-height: calc(100vh - ${r}px);\n          padding-top: 2px;\n          ${e.footer_mode?`padding-bottom: ${r}px;`:""}\n          ${e.footer_mode?`margin-bottom: -${r+4}px;`:""}\n        }\n        hui-panel-view {\n          padding-top: 0px;\n        }\n        #view {\n          ${e.footer_mode?`min-height: calc(100vh - ${r+4}px) !important;`:""}\n        }\n      `,(i=t.querySelector("#cch_view_style"))&&a.innerHTML==i.innerHTML||(t.appendChild(a),i&&i.remove()),(a=document.createElement("style")).setAttribute("id","cch_chevron"),a.innerHTML='\n      .not-visible[icon*="chevron"] {\n        display:none;\n      }\n    ',i=o.tabContainer.shadowRoot.querySelector("#cch_chevron"),o.tabContainer.shadowRoot.appendChild(a),i&&i.remove()})(e,_,q,w),e.chevrons?q.tabContainer.hideScrollButtons=!1:q.tabContainer.hideScrollButtons=!0,e.indicator_top?q.tabContainer.alignBottom=!0:q.tabContainer.alignBottom=!1,e.footer_mode?q.options.setAttribute("vertical-align","bottom"):q.options.removeAttribute("vertical-align"),e.footer_mode?q.container.removeAttribute("slot"):q.container.setAttribute("slot","header"),q.tabContainer.dir=e.tab_direction,q.container.dir=e.button_direction,e.tab_icons)for(const t in e.tab_icons){const o=w(t),n=q.tabs[o].querySelector("ha-icon");e.tab_icons[t]?n.icon=e.tab_icons[t]:n.icon=f.config.views[o].icon}if(e.button_icons)for(const t in e.button_icons)e.button_icons[t]?"options"===t?q[t].querySelector("paper-icon-button").icon=e.button_icons[t]:q[t].icon=e.button_icons[t]:"menu"===t?q.menu.icon="mdi:menu":"voice"===t?q.voice.icon="mdi:microphone":"options"===t&&(q[t].querySelector("paper-icon-button").icon="mdi:dots-vertical");if(e.button_text)for(const t in e.button_text){const o=document.createElement("p");o.className="buttonText";const n="options"===t?q[t].querySelector("paper-icon-button"):q[t];e.button_text[t]||!n.shadowRoot.querySelector(".buttonText")?e.button_text[t]&&(n.shadowRoot.querySelector(".buttonText")?n.shadowRoot.querySelector(".buttonText").innerText=e.button_text[t]:(o.innerText=e.button_text[t],n.shadowRoot.appendChild(o)),"rtl"==e.button_direction?n.shadowRoot.querySelector(".buttonText").dir="ltr":n.shadowRoot.querySelector(".buttonText").dir="",n.shadowRoot.querySelector("iron-icon").style.display="none",n.style.width="auto",n.shadowRoot.querySelector(".buttonText").style.margin="5.5px 0px 0px 0px"):(n.shadowRoot.querySelector(".buttonText").remove(),n.shadowRoot.querySelector("iron-icon").style.display="",n.style.width="")}const o=null!=e.default_tab?w(e.default_tab):null;if(e.hidden_tab_redirect&&q.tabs.length){const t=q.tabContainer.indexOf(q.tabContainer.querySelector("paper-tab.iron-selected"));if(e.hide_tabs.includes(t)&&e.hide_tabs.length!=q.tabs.length)if(o&&!e.hide_tabs.includes(w(o)))"none"!=getComputedStyle(q.tabs[o]).display&&q.tabs[o].click();else for(const e of q.tabs)if("none"!=getComputedStyle(e).display){e.click();break}}null!=o&&!window.customHeaderDefaultClicked&&q.tabs[o]&&"none"!=getComputedStyle(q.tabs[o]).display&&q.tabs[o].click(),window.customHeaderDefaultClicked=!0,q.tabs.length&&_.querySelector("paper-tab.iron-selected")?q.tabs[_.querySelector("paper-tabs").indexOf(_.querySelector("paper-tab.iron-selected"))].click():q.tabContainer.style.display="none",((e,t,o)=>{const n=o.querySelector("ha-menu-button"),r=()=>{const t=document.createElement("div");return t.className="dot",t.style.cssText=`\n        pointer-events: none;\n        position: relative;\n        background-color: ${e.notification_dot_color};\n        width: 12px;\n        height: 12px;\n        top: -28px;\n        right: ${"rtl"==e.button_direction?"":"-"}16px;\n        border-radius: 50%;\n    `,t},a=()=>{e.disable_sidebar||window.customHeaderDisabled||("hidden"===n.style.visibility?t.menu.style.display="none":t.menu.style.display="initial")},i=e=>{const t=document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").shadowRoot.querySelector("hui-root");e.forEach(({addedNodes:e,removedNodes:o})=>{if(e)for(const o of e)"dot"!==o.className||t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot")||t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.appendChild(r());if(o)for(const e of o)"dot"===e.className&&t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot")&&t.shadowRoot.querySelector('[buttonElem="menu"]').shadowRoot.querySelector(".dot").remove()})};if(!window.customHeaderMenuObserver){window.customHeaderMenuObserver=!0,new MutationObserver(i).observe(n.shadowRoot,{childList:!0}),new MutationObserver(a).observe(n,{attributes:!0,attributeFilter:["style"]})}a();const s=t.menu.shadowRoot.querySelector(".dot");s&&s.style.cssText!=r().style.cssText&&s.remove(),!t.menu.shadowRoot.querySelector(".dot")&&o.querySelector("ha-menu-button").shadowRoot.querySelector(".dot")&&t.menu.shadowRoot.appendChild(r())})(e,q,_),window.dispatchEvent(new Event("resize"))},C={footer_mode:!1,kiosk_mode:!1,disabled_mode:!1,compact_mode:!1,disable_sidebar:!1,background:"var(--primary-color)",elements_color:"var(--text-primary-color)",menu_color:"",voice_color:"",options_color:"",all_tabs_color:"",tabs_color:[],tab_direction:"ltr",button_direction:"ltr",chevrons:!0,indicator_top:!1,hide_tabs:[],show_tabs:[],template_variables:"",exceptions:[],header_text:"Home Assistant",hidden_tab_redirect:!0,default_tab:0,sidebar_right:!1,hide_help:!1,hide_unused:!1,hide_refresh:!1,hide_config:!1,hide_raw:!1,notification_dot_color:"#ff9800"},D=e=>{let t={...C,...f.config.custom_header};const o=(t={...t,...v(t)}).template_variables;delete t.template_variables;const n=()=>{t.hide_tabs&&(t.hide_tabs=S(t.hide_tabs)),t.show_tabs&&(t.show_tabs=S(t.show_tabs)),t.show_tabs&&t.show_tabs.length&&(t.hide_tabs=(e=>{const t=Array.from(_.querySelectorAll("paper-tab"));if(e&&e.length){const o=[];for(let e=0;e<t.length;e+=1)o.push(e);return o.filter(t=>!e.includes(t))}})(t.show_tabs)),t.kiosk_mode&&!t.disabled_mode?x(!1):H(t)};let r=!1;const a=JSON.stringify(t),i=!!o||a.includes("{{")||a.includes("{%");let s;i?s=((e,t)=>{const o=b.connection,n={user:b.user.name,browser:navigator.userAgent,...t.variables,...p()},r=t.template,a=t.entity_ids;return o.subscribeMessage(t=>e(t.result),{type:"render_template",template:r,variables:n,entity_ids:a})})(o=>{if(r=!0,e||window.customHeaderLastTemplateResult!=o){window.customHeaderLastTemplateResult=o;try{t=JSON.parse(o.replace(/"true"/gi,"true").replace(/"false"/gi,"false").replace(/""/,""))}catch(e){console.log(`Custom-Header: There was an issue with the template: ${((e,t)=>{const o=t.toString().match(/\d+/g)[0],n=e.substr(0,o).match(/[^,]*$/),r=e.substr(o).match(/^[^,]*/);return`${n?n[0]:""}${r?r[0]:""}`.replace('":"',":")})(o,e)}`)}n()}},{template:JSON.stringify(o).replace(/\\/g,"")+JSON.stringify(t).replace(/\\/g,"")}):n(),!e&&i&&window.setTimeout(()=>{(async()=>{const e=await s;s=void 0,await e()})(),D(!1)},1e3*(60-(new Date).getSeconds())),setTimeout((function(){!r&&i&&console.log("Custom-Header: There was an issue with one or more templates in your config.")}),1e4)};D(!1),(()=>{const e=new MutationObserver(e=>{const t=window.customHeaderConfig;e.forEach(({addedNodes:e,target:o})=>{e.length&&"PARTIAL-PANEL-RESOLVER"==o.nodeName?D(!0):"edit-mode"===o.className&&e.length?(window.customHeaderDisabled||M(t,q,!0),q.menu.style.display="none",_.querySelector("cch-header").style.display="none",_.querySelector("app-header").style.display="block",window.scrollTo({top:0,behavior:"smooth"}),_.querySelector("#cch_view_style")&&_.querySelector("#cch_view_style").remove()):"APP-HEADER"===o.nodeName&&e.length&&(D(!0),_.querySelector("app-header").style.display="none",q.menu.style.display="",_.querySelector("cch-header").style.display="")})});e.observe(y.shadowRoot.querySelector("partial-panel-resolver"),{childList:!0}),e.observe(_.querySelector("app-header"),{childList:!0})})();
