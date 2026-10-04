// Parse + server-render validation. Must print RENDER OK before any deploy.
// A parse check alone is not enough: runtime errors only surface on render.
const fs=require('fs'),path=require('path'),babel=require('@babel/core');
const FILE=process.env.ADE_FILE||path.join(__dirname,'..','src','ade-portfolio-v6.jsx');
let src=fs.readFileSync(FILE,'utf8');
src=src.replace(/^\s*import\s+[^;]+;?\s*$/mg,'').replace(/export\s+default\s+/,'module.exports.App=');
const out=babel.transformSync(src,{presets:[['@babel/preset-env',{targets:{node:'current'}}],['@babel/preset-react',{runtime:'classic',development:false}]],filename:'ade.jsx'}).code;
const React=require('react'),RDS=require('react-dom/server');
const m={exports:{}};
new Function('require','module','exports','React','useState','useEffect','useMemo','useRef','useCallback',out)
  (require,m,m.exports,React,React.useState,React.useEffect,React.useMemo,React.useRef,React.useCallback);
const App=m.exports.App||m.exports.default||m.exports;
console.log('RENDER OK — html length',RDS.renderToString(React.createElement(App)).length);
