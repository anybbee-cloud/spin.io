const LS_PLAYERS='np_players_v3',LS_ROLE='np_role_v3',LS_PLAYER='np_player_v3';

function now(){return new Date().toLocaleString();}
function getPlayers(){return JSON.parse(localStorage.getItem(LS_PLAYERS)||'[]');}
function savePlayers(d){localStorage.setItem(LS_PLAYERS,JSON.stringify(d));}

// Login ใหม่: Admin ต้องใส่รหัส 1234, Player ใส่ชื่อ ระบบสร้างรหัสให้เองถ้ายังไม่มี
function appLogin(user,pass){
    if(user==='admin' && pass==='1234'){localStorage.setItem(LS_ROLE,'admin');return 'admin';}
    let players=getPlayers();
    let p=players.find(x=>x.name===user);
    if(!p){
        // สร้างผู้เล่นใหม่ + รหัสอัตโนมัติ
        const code=Math.floor(Math.random()*9000+1000).toString();
        p={name:user,code,link:'#',created:now()};
        players.push(p); savePlayers(players);
    }
    localStorage.setItem(LS_ROLE,'player'); localStorage.setItem(LS_PLAYER,user);
    return 'player';
}

function getRole(){return localStorage.getItem(LS_ROLE);}
function getPlayerName(){return localStorage.getItem(LS_PLAYER);}
function clearRole(){localStorage.removeItem(LS_ROLE); localStorage.removeItem(LS_PLAYER);}
function getPlayerData(name){return getPlayers().find(x=>x.name===name);}
function updatePlayerLink(name,link){
    const players=getPlayers();
    const idx=players.findIndex(x=>x.name===name);
    if(idx>=0){players[idx].link=link; savePlayers(players);}
}
function deletePlayer(name){
    if(!confirm('Delete '+name+'?')) return;
    const players=getPlayers().filter(x=>x.name!==name);
    savePlayers(players);
}
