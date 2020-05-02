(this.webpackJsonponly_mid_single_draft=this.webpackJsonponly_mid_single_draft||[]).push([[0],{46:function(e,t,a){e.exports=a(67)},51:function(e,t,a){},67:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(9),o=a(11),l=a(12),s=a(21),i=a(1),c=a.n(i),m=a(17),u=a.n(m),d=a(14),h=a(15),p=(a(51),a(52),a(22)),g=a(16),f=a.n(g),y=(a(53),function(){function e(t,a,r){var o=this;Object(n.a)(this,e),this.config={apiKey:"AIzaSyCVXi7MSmaFcSDtvK2eYdpggzQgbHOf_dk",authDomain:"onlymid-6adbf.firebaseapp.com",databaseURL:"https://onlymid-6adbf.firebaseio.com",projectId:"onlymid-6adbf",storageBucket:"onlymid-6adbf.appspot.com",messagingSenderId:"464340805319",appId:"1:464340805319:web:65283996aefc809d2800e2"},f.a.initializeApp(this.config),this.db=f.a.firestore(),console.log("Using production game collection"),this.gameCollectionName="game",this.heroStatsDocument="hero_stats",this.gameCollection=this.db.collection(this.gameCollectionName),this.heroStatsCollection=this.db.collection(e.HERO_STATS_COLLECTION),this.gameDoc=null,this.gameCollection.orderBy("timestamp").limitToLast(1).onSnapshot((function(e){e.docs.forEach((function(e){var t=null!=o.gameDoc&&o.gameDoc.id!==e.id;o.gameDoc=e.ref,t&&r(),a(e.data())}))}),(function(e){return console.log(e)})),this.heroStats=null,this.heroStatsCollection.doc(this.heroStatsDocument).get().then((function(e){var a=e.data().stats;o.heroStats=a,t(a)})).catch((function(e){console.log("Error while loading hero stats from backend: "+e),o.getUpdatedHeroStats().then((function(e){console.log("FALLING BACK TO UPDATED HERO STATS"),o.heroStats=e,t(e)}))}))}return Object(r.a)(e,[{key:"getUpdatedHeroStats",value:function(){return fetch("https://api.opendota.com/api/heroStats").then((function(e){return e.json()}))}},{key:"convertToApiPath",value:function(e){return"https://api.opendota.com"+e}},{key:"sendChatMessage",value:function(e,t,a){var n="teams."+e+".chat";this.gameDoc.update(n,f.a.firestore.FieldValue.arrayUnion({timestamp:f.a.firestore.Timestamp.fromDate(new Date),player:t,message:a})).catch((function(e){return console.log(e)}))}},{key:"setPlayerName",value:function(e,t){var a="teams."+e+".players";this.gameDoc.update(a,f.a.firestore.FieldValue.arrayUnion(t)).catch((function(e){return console.log(e)}))}},{key:"setSelectedHero",value:function(e,t,a){var n="teams.".concat(e,".selectedHeroes.").concat(t);this.gameDoc.update(n,a).catch((function(e){return console.log(e)}))}},{key:"setReady",value:function(e,t){var a="teams.".concat(e,".ready");this.gameDoc.update(a,t).catch((function(e){return console.log(e)}))}},{key:"startNewGame",value:function(){var e=this;if(null!==this.heroStats){var t={int:[],str:[],agi:[]};this.heroStats.forEach((function(e){var a=e.primary_attr;t[a].push(e)}));var a=function(){return[e.randomSamplePop(t.int).id,e.randomSamplePop(t.str).id,e.randomSamplePop(t.agi).id]},n=function(){return{ready:!1,players:[],chat:[],draft:{0:a(),1:a(),2:a(),3:a(),4:a(),5:a(),6:a()},selectedHeroes:{0:null,1:null,2:null,3:null,4:null,5:null,6:null}}},r=this.getUpdatedHeroStats().then((function(t){return console.log("Loaded updated hero stats from API"),function(t){return e.heroStatsCollection.doc(e.heroStatsDocument).set({stats:t}).then((function(){console.log("Hero stats cached to backend")}))}(t)})).catch((function(t){return console.log("Failed getting hero stats: "+t+". Falling back to cached data"),e.heroStats})),o=new Promise((function(t,a){var n=setTimeout((function(){clearTimeout(n),t(e.heroStats)}),5e3)}));Promise.race([r,o]).then((function(){e.gameCollection.add({timestamp:f.a.firestore.Timestamp.fromDate(new Date),teams:{radiant:n(),dire:n()}}).then((function(){return console.log("Created new game!")})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}))}else console.log("Cannot create new game - hero stats not loaded yet")}},{key:"randomSamplePop",value:function(e){var t=Math.floor(Math.random()*e.length),a=e[t];return e.splice(t,1),a}}]),e}());y.HERO_STATS_COLLECTION="hero_stats";var E=y;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v=a(93),b=a(68),k=a(69),S=a(70),O=a(71),w=a(72),C=a(73),N=a(74),j=a(75),D=a(76),x=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={newGameDialogShowing:!1},r}return Object(r.a)(a,[{key:"toggleNewGameDialog",value:function(){this.setState({newGameDialogShowing:!this.state.newGameDialogShowing})}},{key:"startNewGameClicked",value:function(){this.setState({newGameDialogShowing:!0})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",null,c.a.createElement(v.a,{isOpen:this.state.newGameDialogShowing,className:this.props.className,toggle:function(){return e.toggleNewGameDialog()}},c.a.createElement(b.a,null,"Starting new game"),c.a.createElement(k.a,null,"This will reset the existing draft and teams"),c.a.createElement(S.a,null,c.a.createElement(O.a,{color:"primary",onClick:function(){e.props.backend.startNewGame(),e.toggleNewGameDialog()}},"Start new game!"),c.a.createElement(O.a,{color:"muted",onClick:function(){return e.toggleNewGameDialog()}},"Cancel"))),c.a.createElement(w.a,{color:"dark",className:"navbar-dark",expand:"md",style:{marginBottom:"5px"}},c.a.createElement(C.a,{tag:d.b,to:"/"},"Only Mid Single Draft"),c.a.createElement(N.a,{className:"ml-auto",navbar:!0},c.a.createElement(j.a,null,c.a.createElement(D.a,{tag:d.b,to:"/old"},"Old App")),c.a.createElement(j.a,null,c.a.createElement(D.a,{tag:d.b,to:"/",onClick:function(t){t.preventDefault(),e.startNewGameClicked()}},"Start New Game")))))}}]),a}(c.a.Component),T=a(77),_=a(78),P=a(79),I=a(80),M=a(81),A=a(82),H=a(83),G=a(84),B=a(85),L=a(86),R=a(87),V=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.teams;if(null==e)return c.a.createElement("div",null,c.a.createElement("h1",null,"Loading teams..."),c.a.createElement(T.a,{color:"primary"}));var t=e.radiant.players.map((function(e){return c.a.createElement(_.a,{key:e},e)})),a=e.dire.players.map((function(e){return c.a.createElement(_.a,{key:e},e)}));return c.a.createElement(P.a,null,c.a.createElement(I.a,null,c.a.createElement(M.a,null,c.a.createElement(A.a,null,c.a.createElement(H.a,{src:"https://gamepedia.cursecdn.com/dota2_gamepedia/9/9b/Radiant_logo.png?version=32e00d1012d73614f60704d6a77207cb",alt:"Radiant logo"}),c.a.createElement(G.a,null,c.a.createElement(B.a,null,c.a.createElement("h2",null,"Radiant")),c.a.createElement(L.a,null,"Players:"),c.a.createElement(R.a,{flush:!0},t),c.a.createElement(O.a,{color:"primary",tag:d.b,to:"/radiant",disabled:e.radiant.players.length>=5},"Join")))),c.a.createElement(M.a,null,c.a.createElement(A.a,null,c.a.createElement(H.a,{src:"https://gamepedia.cursecdn.com/dota2_gamepedia/4/46/Dire_logo.png?version=26566f7414e47fa1203d2f0a0ae3d64b",alt:"Dire logo"}),c.a.createElement(G.a,null,c.a.createElement(B.a,null,c.a.createElement("h2",null,"Dire")),c.a.createElement(L.a,null,"Players:"),c.a.createElement(R.a,{flush:!0},a),c.a.createElement(O.a,{color:"primary",tag:d.b,to:"/dire",disabled:e.dire.players.length>=5},"Join"))))))}}]),a}(c.a.Component),U=a(89),F=a(90),z=a(91),K=a(88),J=a(94),Y=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).scrollToBottom=function(){r.messagesEnd.scrollIntoView({behavior:"smooth"})},r.state={inputValue:""},r}return Object(r.a)(a,[{key:"componentDidMount",value:function(){this.submitMessage("Has joined the team!"),this.scrollToBottom()}},{key:"updateInputValue",value:function(e){this.setState({inputValue:e.target.value})}},{key:"handleKeyPress",value:function(e){"Enter"===e.key&&this.submitMessage(this.state.inputValue)}},{key:"submitMessage",value:function(e){this.props.backend.sendChatMessage(this.props.team,this.props.player,e),this.setState({inputValue:""})}},{key:"componentDidUpdate",value:function(e){e.messages.length!==this.props.messages.length&&this.scrollToBottom()}},{key:"render",value:function(){var e=this,t=this.props.messages.map((function(e){return c.a.createElement(_.a,{key:e.timestamp},e.player+": "+e.message)})),a=c.a.createElement("div",{style:{float:"left",clear:"both"},ref:function(t){e.messagesEnd=t}});return c.a.createElement("div",null,c.a.createElement(R.a,{flush:!0,style:{overflowY:"auto",maxHeight:"700px"}},t,a),c.a.createElement(K.a,null,c.a.createElement(U.a,{value:this.state.inputValue,onChange:function(t){return e.updateInputValue(t)},onKeyPress:function(t){return e.handleKeyPress(t)}}),c.a.createElement(J.a,{addonType:"append"},c.a.createElement(O.a,{color:"info",disabled:this.state.inputValue.length<=0,onClick:function(){return e.submitMessage(e.state.inputValue)}},"Send"))))}}]),a}(c.a.Component),W=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={playerNameInput:"",playerName:null},r}return Object(r.a)(a,[{key:"onPlayerNameInput",value:function(e){this.setState({playerNameInput:e})}},{key:"playerNameChosen",value:function(){var e=this.state.playerNameInput;this.setState({playerName:e,playerNameInput:""}),this.props.backend.setPlayerName(this.props.teamName,e)}},{key:"onHeroClicked",value:function(e,t){this.props.backend.setSelectedHero(this.props.teamName,e,t)}},{key:"render",value:function(){var e=this,t=this.props.team,a=this.props.heroStats;if(null==t||null==a)return c.a.createElement("div",null,c.a.createElement("h1",null,"Loading teams..."),c.a.createElement(T.a,{color:"primary"}));var n=this.state.playerName,r=t.players;if(null==n)return r.length>=5&&this.props.history.push("/"),c.a.createElement(v.a,{isOpen:!0,autoFocus:!1,className:this.props.className},c.a.createElement(b.a,null,"Specify name"),c.a.createElement(k.a,null,c.a.createElement(U.a,{type:"text",autoFocus:!0,onChange:function(t){return e.onPlayerNameInput(t.target.value)},placeholder:"Please input your desired player name"})),c.a.createElement(S.a,null,c.a.createElement(O.a,{color:"primary",disabled:this.state.playerNameInput.length<=0,onClick:function(){e.playerNameChosen()}},"Join"),c.a.createElement(O.a,{color:"muted",tag:d.b,to:"/"},"Go back")));for(var o=this.props.teamName,l=function(t,n,r,o){return c.a.createElement(I.a,{style:{marginBottom:"10px"},key:n},c.a.createElement("div",{style:{width:"100%",textAlign:"center"}},c.a.createElement(M.a,null,c.a.createElement("h5",{style:{marginBottom:"2px"}},n))),c.a.createElement(I.a,{style:{marginLeft:"0px",marginRight:"0px"}},r.map((function(r){var l,s=(l=r,a.filter((function(e){return e.id===l}))[0]),i=r===o,m="Card_"+n+r;return c.a.createElement(M.a,{xs:"4",style:{padding:"2px"},key:m},c.a.createElement(A.a,Object.assign({href:"#",id:m,style:{cursor:"pointer"},onClick:function(){return e.onHeroClicked(t,r)}},i?{color:"info",inverse:!0}:{}),c.a.createElement(H.a,{top:!0,src:e.props.backend.convertToApiPath(s.img),alt:"hero image"}),c.a.createElement(F.a,{style:{fontSize:"1.0rem",textAlign:"center",padding:"0.75rem 0.25rem"}},s.localized_name)))}))))},s=[],i=0;i<r.length;i++){var m=r[i],u=t.draft[i.toString()],h=t.selectedHeroes[i.toString()];s.push(l(i,m,u,h))}var p=t.ready,g=this.props.readiness.radiant,f=this.props.readiness.dire,y=c.a.createElement("div",{style:{width:"100%",textAlign:"center",marginBottom:"30px"}},c.a.createElement(O.a,Object.assign({style:{marginBottom:"10px"}},p?{color:"success"}:{color:"secondary"},{onClick:function(){return e.props.backend.setReady(o,!p)}}),"Ready"),c.a.createElement(z.a,{multi:!0},c.a.createElement(z.a,Object.assign({bar:!0,value:"50"},g?{color:"success"}:{color:"danger"}),"Radiant"),c.a.createElement(z.a,Object.assign({bar:!0,value:"50"},f?{color:"success"}:{color:"danger"}),"Dire")));return c.a.createElement(P.a,null,c.a.createElement(I.a,null,c.a.createElement(M.a,{sm:"12",md:"6"},s),c.a.createElement(M.a,{sm:"12",md:"6"},y,c.a.createElement(Y,{backend:this.props.backend,player:this.state.playerName,team:o,messages:this.props.messages}))))}}]),a}(c.a.Component),Q=a(92);function X(){var e=Object(s.a)(["\n  text-align: center;\n  vertical-align: middle;\n"]);return X=function(){return e},e}var $=p.a.div(X()),q=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={heroes:[],draft:[],team:[]},fetch("https://api.opendota.com/api/heroStats").then((function(e){return e.json()})).then((function(e){r.setState({heroes:e}),r.performDraft()})),r}return Object(r.a)(a,[{key:"performDraft",value:function(){var e=this,t={int:[],str:[],agi:[]};this.state.heroes.forEach((function(e){var a=e.primary_attr;t[a].push(e)})),this.setState({draft:Object.values(t).map((function(t){return e.randomSample(t)}))})}},{key:"convertToApiPath",value:function(e){return"https://api.opendota.com"+e}},{key:"randomSample",value:function(e){return e[Math.floor(Math.random()*e.length)]}},{key:"render",value:function(){var e=this;if(!(this.state.heroes.length>0))return c.a.createElement($,null,c.a.createElement("h1",null,"Loading heroes..."),c.a.createElement(T.a,{style:{width:"2rem",height:"2rem"}}));var t=this.state.draft.map((function(t){return c.a.createElement(M.a,{md:"4",xs:"12",key:t.id},c.a.createElement(A.a,null,c.a.createElement(H.a,{top:!0,width:"100%",src:e.convertToApiPath(t.img),alt:"hero image"}),c.a.createElement(G.a,null,c.a.createElement(B.a,null,c.a.createElement("h3",null,t.localized_name)),c.a.createElement(L.a,{className:"text-primary"},t.attack_type+" "+t.primary_attr),c.a.createElement(Q.a,{className:"text-info"},t.roles.join(", ")))))}));return c.a.createElement($,null,c.a.createElement("h1",null,"You have been given:"),c.a.createElement(P.a,{style:{marginTop:"20px",marginBottom:"50px"}},c.a.createElement(I.a,null,t)),c.a.createElement(O.a,{color:"primary",onClick:function(t){t.preventDefault(),e.performDraft()}},"Roll the dice again..."))}}]),a}(c.a.Component);function Z(){var e=Object(s.a)(["\n  max-width: 1024px;\n  margin: 0 auto; // Center in website\n"]);return Z=function(){return e},e}var ee=p.a.div(Z()),te=function(e){Object(l.a)(a,e);var t=Object(o.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).state={teams:null,radiantMessages:[],direMessages:[],heroStats:null,readiness:{radiant:!1,dire:!1}},r.backend=new E((function(e){r.setState({heroStats:e})}),(function(e){var t=e.teams;r.setState({teams:t,radiantTeam:t.radiant,direTeam:t.dire,radiantMessages:t.radiant.chat,direMessages:t.dire.chat,readiness:{radiant:t.radiant.ready,dire:t.dire.ready}})}),(function(){console.log("New game detected - forcing all players back to welcome screen"),r.router.history.push("/")})),r}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return c.a.createElement(d.a,{basename:"/",ref:function(t){e.router=t}},c.a.createElement("div",null,c.a.createElement(x,{backend:this.backend}),c.a.createElement(ee,null,c.a.createElement(h.c,null,c.a.createElement(h.a,{exact:!0,path:"/",render:function(t){return c.a.createElement(V,Object.assign({},t,{teams:e.state.teams}))}}),c.a.createElement(h.a,{exact:!0,path:"/old",render:function(e){return c.a.createElement(q,e)}}),c.a.createElement(h.a,{exact:!0,path:"/radiant",render:function(t){return c.a.createElement(W,Object.assign({},t,{backend:e.backend,teamName:"radiant",team:e.state.radiantTeam,readiness:e.state.readiness,heroStats:e.state.heroStats,messages:e.state.radiantMessages}))}}),c.a.createElement(h.a,{exact:!0,path:"/dire",render:function(t){return c.a.createElement(W,Object.assign({},t,{backend:e.backend,teamName:"dire",team:e.state.direTeam,readiness:e.state.readiness,heroStats:e.state.heroStats,messages:e.state.direMessages}))}}),c.a.createElement(h.a,{render:function(t){return c.a.createElement(V,Object.assign({},t,{teams:e.state.teams}))}})))))}}]),a}(c.a.Component);u.a.render(c.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[46,1,2]]]);
//# sourceMappingURL=main.33ebcd80.chunk.js.map