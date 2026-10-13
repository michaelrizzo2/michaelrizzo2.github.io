(function(root){
'use strict';
const listings=[
{id:'a',title:'Northstar N14 — tested laptop',price:14500,shipping:1800,repair:0,resale:26000,relevance:1,condition:.9,evidence:'model confirmed; charging test recorded; screen test recorded',flags:[]},
{id:'b',title:'Northstar N14 — untested bargain',price:8500,shipping:2200,repair:6000,resale:26000,relevance:1,condition:.25,evidence:'model confirmed',flags:['battery health missing','charging function unknown','repair reserve is an assumption']},
{id:'c',title:'Meridian M2 — working laptop',price:13000,shipping:0,repair:0,resale:21000,relevance:.2,condition:.85,evidence:'seller reports working',flags:['different model from the target']}
];
const jobs=[
{id:'automation',title:'AI Automation Engineer — fictional workshop',skills:1,responsibilities:.95,preferences:.8,remote:true,evidence:'Python integrations, human approval workflows and evaluations are central responsibilities.',flags:['salary not supplied']},
{id:'backend',title:'Python Backend Engineer — fictional startup',skills:.8,responsibilities:.6,preferences:1,remote:true,evidence:'API development is central; the role has fewer AI workflow responsibilities.',flags:[]},
{id:'ml',title:'ML Research Scientist — fictional lab',skills:.2,responsibilities:.25,preferences:.25,remote:false,evidence:'Research and model training are required rather than API automation.',flags:['research experience not established by the demo profile']}
];
function cost(i){for(const k of ['price','shipping','repair','resale'])if(!Number.isSafeInteger(i[k])||i[k]<0)throw Error('Invalid cost.');const taxable=i.price+i.shipping,landed=taxable+Math.floor((taxable*7+50)/100)+i.repair,fee=Math.floor((i.resale*13+50)/100);return{landed_cents:landed,resale_fee_cents:fee,profit_cents:i.resale-fee-landed};}
function repair(s){
const base={kind:'repair',synthetic:true,mode:'browser demonstration',events:['Read the selected fictional request.']};
const reviews={missing_model:['clarify','Ask for the device model','A charging symptom is not a diagnosis. Ask for the model before selecting compatible inventory or estimating a repair.'],no_stock:['review','Compatible part unavailable','The fictional Meridian M2 charging kit is out of stock. A technician needs to review the next step.'],unsupported:['review','Route to a person','Account recovery is outside this repair demo. No account tools are connected.'],tool_failure:['review','Inventory lookup failed','The simulated tool failure stops the estimate. A technician should review the request.']};
if(reviews[s]){const[status,title,message]=reviews[s];return{...base,status,title,message};}
if(s!=='charging')throw Error('Unknown repair scenario.');
return{...base,status:'approval_required',title:'Estimate ready for review',message:'We can inspect the fictional Northstar N14. This provisional estimate does not confirm the cause of the charging problem.',estimate:{lines:[{label:'Compatible diagnostic charging kit',cents:4900},{label:'Diagnostic labor',cents:4500},{label:'Illustrative tax (7%)',cents:658}],total_cents:10058},slot:'Fictional Tuesday, 10:00',events:[...base.events,'Matched Northstar N14 inventory: 3 compatible kits.','Calculated the estimate using integer cents.','Prepared a draft and fictional appointment for approval.']};
}
function listingRank(s,w){
if(!['all','tested_only','missing_evidence'].includes(s))throw Error('Unknown listing filter.');
const items=listings.filter(i=>s==='all'||(s==='tested_only'?!i.flags.length:!!i.flags.length)).map(i=>({...cost(i),id:i.id,title:i.title,score:100*(w/100*i.relevance+(1-w/100)*i.condition),dimensions:{relevance:i.relevance,condition:i.condition},reason:i.evidence,flags:i.flags,eligible_for_review:!i.flags.length}));
return{kind:'listing',mode:'preset judgments',synthetic:true,items:items.sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)),weights:{relevance:w/100,condition:1-w/100},message:'Change the weights to see the tradeoffs. Listings and judgments are synthetic; 7% purchase tax and 13% resale fees are illustrative assumptions.'};
}
function jobRank(s,w){
if(!['all','remote','automation'].includes(s))throw Error('Unknown opportunity filter.');
const weights={skills:.6*w/100,responsibilities:.4*w/100,preferences:1-w/100};
const items=jobs.filter(i=>s==='all'||(s==='remote'&&i.remote)||(s==='automation'&&i.id==='automation')).map(i=>({id:i.id,title:i.title,score:100*(i.skills*weights.skills+i.responsibilities*weights.responsibilities+i.preferences*weights.preferences),dimensions:{skills:i.skills,responsibilities:i.responsibilities,preferences:i.preferences},reason:i.evidence,flags:i.flags,source:'fictional opportunity, not an active vacancy'}));
return{kind:'jobs',mode:'preset judgments',synthetic:true,weights,items:items.sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)),message:'Explore how technical fit and personal preferences change the order. These fictional posts illustrate a job-search aid, not real vacancies or hiring decisions.'};
}
function prices(s,n=240){if(!['trending','choppy','declining'].includes(s))throw Error('Unknown price regime.');return Array.from({length:n},(_,i)=>Math.round((2000+(s==='trending'?3*i:s==='declining'?-2*i:0)+(s==='choppy'?60:25)*Math.sin(i/(s==='choppy'?2:9)))*100)/100);}
function signals(p){if(p.length<19||p.some(v=>!Number.isFinite(v)||v<=0))throw Error('Need sufficient positive finite prices.');return p.map((v,i)=>i<16?0:Number(p.slice(i-4,i+1).reduce((a,b)=>a+b,0)/5>p.slice(i-16,i+1).reduce((a,b)=>a+b,0)/17));}
function backtest(p,bps){
if(!Number.isFinite(bps)||bps<0||bps>100)throw Error('Invalid fee.');const sig=signals(p),fee=bps/10000;let cash=10000,units=0,peak=10000,dd=0,trades=0;const curve=[cash];
for(let i=1;i<p.length;i++){if(sig[i-1]&&!units){units=cash/(p[i]*(1+fee));cash=0;}else if(!sig[i-1]&&units){cash=units*p[i]*(1-fee);units=0;trades++;}const equity=cash+units*p[i];peak=Math.max(peak,equity);dd=Math.max(dd,1-equity/peak);curve.push(equity);}
if(units){cash=units*p.at(-1)*(1-fee);trades++;curve[curve.length-1]=cash;dd=Math.max(dd,1-cash/peak);}
return{net_return_pct:(cash/10000-1)*100,max_drawdown_pct:dd*100,trades,final_equity_usd:Math.round(cash*100)/100,equity_curve:curve};
}
function gate(s,bps){const metrics=backtest(prices(s),bps),checks=[{label:'Verified historical data provenance',passed:false},{label:'Untouched holdout evaluation available',passed:false},{label:'At least 20 completed trades',passed:metrics.trades>=20},{label:'Positive return after selected fees',passed:metrics.net_return_pct>0},{label:'Maximum drawdown at or below 10%',passed:metrics.max_drawdown_pct<=10}];return{kind:'gate',mode:'illustrative backtest',synthetic:true,allowed:checks.every(c=>c.passed),checks,metrics,bars:240,fee_bps:bps,message:'Synthetic data and missing holdout evidence block this paper-trading experiment. No exchange or order endpoint is connected.',strategy:'Illustrative 5/17 crossover. Signals execute at the following close, with fees on both sides. Spread and slippage are not modeled.'};}
function run(project,scenario,weight=50){if(!Number.isInteger(weight)||weight<0||weight>100)throw Error('Weight must be an integer from 0 to 100.');if(project==='repair')return repair(scenario);if(project==='listings')return listingRank(scenario,weight);if(project==='jobs')return jobRank(scenario,weight);if(project==='trading')return gate(scenario,weight);throw Error('Unknown project.');}
const api={run,cost,prices,signals,backtest,listings,jobs};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PortfolioDemo=api;
})(typeof globalThis!=='undefined'?globalThis:this);
