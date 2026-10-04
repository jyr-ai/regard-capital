// Runs the dashboard's own health audit headlessly by capturing the useMemo result.
// Prints grade, score, and every deduction with its point value.
const fs=require('fs'),path=require('path'),babel=require('@babel/core');
const FILE=process.env.ADE_FILE||path.join(__dirname,'..','src','ade-portfolio-v6.jsx');
let src=fs.readFileSync(FILE,'utf8');
src=src.replace(/^\s*import\s+[^;]+;?\s*$/mg,'').replace(/export\s+default\s+/,'module.exports.App=');
const out=babel.transformSync(src,{presets:[['@babel/preset-env',{targets:{node:'current'}}],['@babel/preset-react',{runtime:'classic',development:false}]],filename:'ade.jsx'}).code;
const React=require('react'),RDS=require('react-dom/server');
let captured=null;
const spy=(fn,deps)=>{const v=React.useMemo(fn,deps);if(v&&v.checks&&v.totalScore!==undefined)captured=v;return v;};
const m={exports:{}};
new Function('require','module','exports','React','useState','useEffect','useMemo','useRef','useCallback',out)
  (require,m,m.exports,Object.assign({},React,{useMemo:spy}),React.useState,React.useEffect,spy,React.useRef,React.useCallback);
const App=m.exports.App||m.exports.default||m.exports;
RDS.renderToString(React.createElement(App));
if(!captured){console.error('health object not captured');process.exit(1);}
console.log('GRADE',captured.grade,'| SCORE',captured.totalScore,'| checks',captured.checks.length);
const by={};captured.checks.forEach(c=>{(by[c.sev]=by[c.sev]||[]).push(c);});
['HIGH','MED','LOW'].forEach(s=>{
  if(!by[s])return;
  console.log('\n===== '+s+' ('+by[s].length+') =====');
  by[s].forEach(c=>console.log(' ['+(c.pts!==undefined?c.pts:'')+'] '+(c.cat||'')+' :: '+String(c.msg||'').slice(0,300)));
});
console.log('\nOK:',(by.OK||[]).length);
