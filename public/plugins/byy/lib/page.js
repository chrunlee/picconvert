/*
	@company 博育云
	@site : www.boyuyun.cn
	@author boyuyun
*/

byy.define(function(a){"use strict";function b(a){new i(a)}var c=document,d="getElementsByTagName",e={},f={},g=0,h=0,i=function(a){var b=this;(b.config=a||{}).item=g++,a.selector in f||(f[a.selector]=a.pagesize,e[a.selector]=!1),b.render(!0)};i.on=function(a,b,c){return a.attachEvent?a.attachEvent("on"+b,function(){c.call(a,window.even)}):a.addEventListener(b,c,!1),i},i.prototype.type=function(){var a=this.config;if("object"==typeof a.selector)return void 0===a.selector.length?2:3},i.prototype.view=function(){var a=this,b=a.config,c=[],d={};if(b.pageArray=!!byy.isArray(b.pageArray)&&b.pageArray,b.curr=0|b.curr||1,b.total=b.total||0,b.pagesize=b.pagesize||10,b.always=b.always||!1,b.pages=0==b.total||b.pagesize<1?0:b.total%b.pagesize==0?b.total/b.pagesize:parseInt(b.total/b.pagesize+1,10),b.showTotal="showTotal"in b&&!0===b.showTotal,b.increment="increment"in b?0|b.increment:5,h=b.increment,b.first="first"in b?b.first:byy.lang.page.first,b.last="last"in b?b.last:byy.lang.page.last,b.prev="prev"in b?b.prev:byy.lang.page.prev,b.next="next"in b?b.next:byy.lang.page.next,!b.always&&b.pages<=1&&!e[b.selector])return"";for(b.increment>b.pages&&(b.increment=b.pages),!0===b.showTotal&&c.push('<span class="byy-page-text" style="background-color:transparent;">'+byy.formatStr(byy.lang.page.total,b.total||0)+"</span>"),b.pageArray.length>0&&c.push('<span class="byy-page-text" style="background-color:transparent;"><select class="byy-page-select">'+function(a){return a.map(function(a){return"<option value="+a+" "+(b.pagesize==a?"selected":"")+">"+a+"</option>"}).join("")}(b.pageArray)+"</select></span>"),d.index=Math.ceil((b.curr+(b.increment>1&&b.increment!==b.pages?1:0))/(0===b.increment?1:b.increment)),b.curr>1&&b.prev&&c.push('<a href="javascript:;" class="byy-page-prev" data-page="'+(b.curr-1)+'">'+b.prev+"</a>"),d.index>1&&b.first&&0!==b.increment&&c.push('<a href="javascript:;" class="byy-page-first" data-page="1"  title="'+byy.lang.page.first+'">'+b.first+"</a><span>&#x2026;</span>"),d.poor=Math.floor((b.increment-1)/2),d.start=d.index>1?b.curr-d.poor:1,d.end=d.index>1?function(){var a=b.curr+(b.increment-d.poor-1);return a>b.pages?b.pages:a}():b.increment,d.end-d.start<b.increment-1&&(d.start=d.end-b.increment+1);d.start<=d.end;d.start++)d.start===b.curr?c.push('<span class="byy-page-curr"><em class="byy-page-em" '+(/^#/.test(b.skin)?'style="background-color:'+b.skin+';"':"")+"></em><em>"+d.start+"</em></span>"):c.push('<a href="javascript:;" data-page="'+d.start+'">'+d.start+"</a>");return 0===d.end&&b.always&&c.push('<span class="byy-page-curr"><em class="byy-page-em" '+(/^#/.test(b.skin)?'style="background-color:'+b.skin+';"':"")+"></em><em>"+d.start+"</em></span>"),b.pages>b.increment&&d.end<b.pages&&b.last&&0!==b.increment&&c.push('<span>&#x2026;</span><a href="javascript:;" class="byy-page-last" title="'+byy.lang.page.last+'"  data-page="'+b.pages+'">'+b.last+"</a>"),d.flow=!b.prev&&0===b.increment,(b.curr!==b.pages&&b.next||d.flow)&&c.push(function(){return d.flow&&b.curr===b.pages?'<span class="byy-page-nomore" title="'+byy.lang.page.nomore+'">'+b.next+"</span>":0==b.pages?"":'<a href="javascript:;" class="byy-page-next" data-page="'+(b.curr+1)+'">'+b.next+"</a>"}()),'<div class="byy-content-box byy-page byy-page-'+(b.skin?function(a){return/^#/.test(a)?"molv":a}(b.skin):"default")+'" id="byy-page-'+a.config.item+'">'+c.join("")+function(){return b.skip?'<span class="byy-page-total">'+byy.lang.page.jumpB+' <input type="number" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" value="'+b.curr+'" class="byy-page-skip"> '+byy.lang.page.jumpA+' <button type="button" class="byy-page-btn">'+byy.lang.page.okBtn+"</button></span>":""}()+"</div>"},i.prototype.callback=function(a){if(a){for(var b=this,c=b.config,g=a.children,j=a[d]("button")[0],k=a[d]("input")[0],l=a[d]("select")[0],m=0,n=g.length;m<n;m++)"a"===g[m].nodeName.toLowerCase()&&i.on(g[m],"click",function(){var a=0|this.getAttribute("data-page");c.curr=a,c.callback&&c.callback(c),b.render()});j&&i.on(j,"click",function(){var a=0|k.value.replace(/\s|\D/g,"");a&&a<=c.pages&&(c.curr=a,b.render())}),l&&i.on(l,"change",function(){try{c.pagesize=parseInt(l.value,10),c.pagesize>f[c.selector]?e[c.selector]=!0:e[c.selector]=!1}catch(a){}c.increment=h,c.curr=1,c.callback&&c.callback(c)})}},i.prototype.render=function(a){var b=this,d=b.config,e=b.type(),f=b.view();2===e?($(d.selector).html(f),$(d.selector).attr("page-curr",d.curr),$(d.selector).attr("page-size",d.pagesize)):3===e?(d.selector.html(f),d.selector.data("obj",d),$(d.selector).attr("page-curr",d.curr),$(d.selector).attr("page-size",d.pagesize)):($(d.selector).html(f),$(d.selector).data("obj",d),$(d.selector).attr("page-curr",d.curr),$(d.selector).attr("page-size",d.pagesize)),b.callback(c.getElementById("byy-page-"+d.item)),d.hash&&!a&&(location.hash="!"+d.hash+"="+d.curr)},a("page",b)});