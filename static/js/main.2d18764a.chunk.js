(this.webpackJsonponly_mid_single_draft=this.webpackJsonponly_mid_single_draft||[]).push([[0],{25:function(e,t,n){e.exports=n(37)},35:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(1),o=n.n(r),i=n(13),l=n.n(i),c=n(14),u=n(15),m=n(24),s=n(16),h=n(21),f=n(39),p=n(40),d=n(41),v=n(42),g=n(43),E=n(44),y=n(45),b=n(46),w=n(47),k=n(48),j=n(49),_=n(8);function O(){var e=Object(a.a)(["\n  text-align: center;\n  vertical-align: middle;\n"]);return O=function(){return e},e}var x=_.a.div(O()),S=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(m.a)(this,Object(s.a)(t).call(this,e))).state={heroes:[],draft:[]},fetch("https://api.opendota.com/api/heroStats").then((function(e){return e.json()})).then((function(e){n.setState({heroes:e}),n.performDraft()})),n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"performDraft",value:function(){var e=this,t={int:[],str:[],agi:[]};this.state.heroes.forEach((function(e){var n=e.primary_attr;t[n].push(e)})),this.setState({draft:Object.values(t).map((function(t){return e.randomSample(t)}))})}},{key:"convertToApiPath",value:function(e){return"https://api.opendota.com"+e}},{key:"randomSample",value:function(e){return e[Math.floor(Math.random()*e.length)]}},{key:"render",value:function(){var e=this;if(!(this.state.heroes.length>0))return o.a.createElement(x,null,o.a.createElement("h1",null,"Loading heroes..."),o.a.createElement(f.a,{style:{width:"2rem",height:"2rem"}}));var t=this.state.draft.map((function(t){return o.a.createElement(p.a,{md:"4",xs:"12",key:t.id},o.a.createElement(d.a,null,o.a.createElement(v.a,{top:!0,width:"100%",src:e.convertToApiPath(t.img),alt:"hero image"}),o.a.createElement(g.a,null,o.a.createElement(E.a,null,o.a.createElement("h3",null,t.localized_name)),o.a.createElement(y.a,null,t.attack_type+" "+t.primary_attr),o.a.createElement(b.a,null,"roles: "+t.roles.join(", ")))))}));return o.a.createElement(x,null,o.a.createElement("h1",null,"You have been given:"),o.a.createElement(w.a,{style:{marginTop:"20px",marginBottom:"50px"}},o.a.createElement(k.a,null,t)),o.a.createElement(j.a,{color:"primary",onClick:function(){return e.performDraft()}},"Roll the dice again..."))}}]),t}(o.a.Component);n(35),n(36),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(){var e=Object(a.a)(["\n  max-width: 1024px;\n  margin: 0 auto; // Center in website\n"]);return B=function(){return e},e}var C=_.a.div(B());l.a.render(o.a.createElement(C,null,o.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[25,1,2]]]);
//# sourceMappingURL=main.2d18764a.chunk.js.map