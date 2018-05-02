/*
	@company 博育云
	@site : www.boyuyun.cn
	@author boyuyun
*/

byy.define(["laytpl","page","win"],function(a){"use strict";var b=window.jQuery||byy.jquery,c=byy.laytpl,d=byy.page,e=byy.win,f=byy.error,g=byy.device(),h={config:{checkName:"BYY_CHECKED",indexName:"BYY_TABLE_INDEX"},cache:{},index:byy.table?byy.table.index+1e4:0,set:function(a){var c=this;return c.config=b.extend({},c.config,a),c},on:function(a,b){return byy.onevent.call(this,j,a,b)}},i=function(){var a=this,b=a.config,c=b.id;return c&&(i.config[c]=b),{reload:function(b){a.reload.call(a,b)},config:b}},j="table",k="byy-none",l=".byy-table-sort",m="byy-table-edit",n=function(a){return a=a||{},['<table cellspacing="0" cellpadding="0" border="0" class="byy-table" ','{{# if(d.data.skin){ }}byy-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}byy-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}byy-even{{# } }}>',"<thead>","{{# byy.each(d.data.cols, function(i1, item1){ }}","<tr>","{{# byy.each(item1, function(i2, item2){ }}",'{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}','{{# if(item2.fixed === "right"){ right = true; } }}',function(){return a.fixed&&"right"!==a.fixed?'{{# if(item2.fixed && item2.fixed !== "right"){ }}':"right"===a.fixed?'{{# if(item2.fixed === "right"){ }}':""}(),'<th data-field="{{ item2.field||i2 }}" {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} {{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}} {{# if(item2.unresize){ }}data-unresize="true"{{# } }}>','<div class="byy-table-cell byytable-cell-',"{{# if(item2.colspan > 1){ }}","group","{{# } else { }}","{{d.index}}-{{item2.field || i2}}",'{{# if(item2.type !== "normal"){ }}'," byytable-cell-{{ item2.type }}","{{# } }}","{{# } }}",'" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>','{{# if(item2.type === "checkbox"){ }}','<input type="checkbox" name="byyTableCheckbox" class="byy-form-checkbox" title=" " byy-skin="primary" byy-filter="byyTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>',"{{# } else { }}",'<span>{{item2.title||""}}</span>',"{{# if(!(item2.colspan > 1) && item2.sort){ }}",'<span class="byy-table-sort byy-inline"><i class="byy-edge byy-table-sort-asc"></i><i class="byy-edge byy-table-sort-desc"></i></span>',"{{# } }}","{{# } }}","</div>","</th>",a.fixed?"{{# }; }}":"","{{# }); }}","</tr>","{{# }); }}","</thead>","</table>"].join("")},o=['<table cellspacing="0" cellpadding="0" border="0" class="byy-table" ','{{# if(d.data.skin){ }}byy-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}byy-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}byy-even{{# } }}>',"<tbody></tbody>","</table>"].join(""),p=['<div class="byy-box {{d.VIEW_CLASS}}" byy-filter="BYY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">',"{{# if(d.data.toolbar){ }}",'<div class="byy-table-tool"></div>',"{{# } }}",'<div class="byy-table-box">',"{{# var left, right; }}",'<div class="byy-table-header">',n(),"</div>",'<div class="byy-table-body byy-table-main">',o,"</div>","{{# if(left){ }}",'<div class="byy-table-fixed byy-table-fixed-l">','<div class="byy-table-header">',n({fixed:!0}),"</div>",'<div class="byy-table-body">',o,"</div>","</div>","{{# }; }}","{{# if(right){ }}",'<div class="byy-table-fixed byy-table-fixed-r">','<div class="byy-table-header">',n({fixed:"right"}),'<div class="byy-table-mend"></div>',"</div>",'<div class="byy-table-body">',o,"</div>","</div>","{{# }; }}","</div>","{{# if(d.data.page){ }}",'<div class="byy-table-page">','<div id="byy-table-page{{d.index}}"></div>',"</div>","{{# } }}","<style>","{{# byy.each(d.data.cols, function(i1, item1){","byy.each(item1, function(i2, item2){ }}",".byytable-cell-{{d.index}}-{{item2.field||i2}}{ ","{{# if(item2.width){ }}","width: {{item2.width}}px;","{{# } }}"," }","{{# });","}); }}","</style>","</div>"].join(""),q=b(window),r=b(document),s=function(a){var c=this;c.index=++h.index,c.config=b.extend({},c.config,h.config,a),c.render()};s.prototype.config={limit:10,loading:!0,cellMinWidth:60,text:{none:"没有找到符合条件数据！"}},s.prototype.render=function(){var a=this,d=a.config;if(d.elem=b(d.elem),d.where=d.where||{},d.id=d.id||d.elem.attr("id"),d.request=b.extend({pageName:"page",limitName:"rows"},d.request),d.response=b.extend({statusName:"code",msgName:"msg",dataName:"rows",countName:"total"},d.response),"object"==typeof d.page&&(d.limit=d.page.limit||d.limit,d.limits=d.page.limits||d.limits,a.page=d.page.curr=d.page.curr||1,delete d.page.elem,delete d.page.jump),!d.elem[0])return a;a.setArea();var e=d.elem,f=e.next(".byy-table-view"),g=a.elem=b(c(p).render({VIEW_CLASS:"byy-table-view",data:d,index:a.index}));if(d.index=a.index,f[0]&&f.remove(),e.after(g),a.layHeader=g.find(".byy-table-header"),a.layMain=g.find(".byy-table-main"),a.layBody=g.find(".byy-table-body"),a.layFixed=g.find(".byy-table-fixed"),a.layFixLeft=g.find(".byy-table-fixed-l"),a.layFixRight=g.find(".byy-table-fixed-r"),a.layTool=g.find(".byy-table-tool"),a.layPage=g.find(".byy-table-page"),a.layTool.html(c(b(d.toolbar).html()||"").render(d)),d.height&&a.fullSize(),d.cols.length>1){var h=a.layFixed.find(".byy-table-header").find("th");h.height(a.layHeader.height()-1-parseFloat(h.css("padding-top"))-parseFloat(h.css("padding-bottom")))}a.pullData(a.page,a.loading()),a.events()},s.prototype.initOpts=function(a){var b=this,c=(b.config,{checkbox:48,space:15,numbers:40});a.checkbox&&(a.type="checkbox"),a.space&&(a.type="space"),a.type||(a.type="normal"),"normal"!==a.type&&(a.unresize=!0,a.width=a.width||c[a.type])},s.prototype.setArea=function(){var a=this,b=a.config,c=0,d=0,e=0,f=0,g=b.width||function(){var a=function(c){var d,e;c=c||b.elem.parent(),d=c.width();try{e="none"===c.css("display")}catch(a){}return!c[0]||d&&!e?d:a(c.parent())};return a()}();a.eachCols(function(){c++}),g-=function(){return"line"===b.skin||"nob"===b.skin?2:c+1}(),byy.each(b.cols,function(b,c){byy.each(c,function(b,e){var h;if(!e)return void c.splice(b,1);a.initOpts(e),h=e.width||0,e.colspan>1||(/\d+%$/.test(h)?e.width=h=Math.floor(parseFloat(h)/100*g):h||(e.width=h=0,d++),f+=h)})}),a.autoColNums=d,g>f&&d&&(e=(g-f)/d),byy.each(b.cols,function(a,c){byy.each(c,function(a,c){var d=c.minWidth||b.cellMinWidth;c.colspan>1||0===c.width&&(c.width=Math.floor(e>=d?e:d))})}),b.height&&/^full-\d+$/.test(b.height)&&(a.fullHeightGap=b.height.split("-")[1],b.height=q.height()-a.fullHeightGap)},s.prototype.reload=function(a){var c=this;c.config.data&&c.config.data.constructor===Array&&delete c.config.data,c.config=b.extend({},c.config,a),c.render()},s.prototype.page=1,s.prototype.pullData=function(a,c){var d=this,f=d.config,g=f.request,h=f.response,i=function(){"object"==typeof f.initSort&&d.sort(f.initSort.field,f.initSort.type)};if(d.startTime=(new Date).getTime(),f.url){var j={};j[g.pageName]=a,j[g.limitName]=f.limit,b.ajax({type:f.method||"get",url:f.url,data:b.extend(j,f.where),dataType:"json",success:function(b){b[h.statusName]!=h.statusCode?(d.renderForm(),d.layMain.html('<div class="byy-none">'+(b[h.msgName]||"返回的数据状态异常")+"</div>")):(d.renderData(b,a,b[h.countName]),i(),f.time=(new Date).getTime()-d.startTime+" ms"),c&&e.close(c),"function"==typeof f.done&&f.done(b,a,b[h.countName])},error:function(a,b){d.layMain.html('<div class="byy-none">数据接口请求异常</div>'),d.renderForm(),c&&e.close(c),"function"==typeof f.error&&f.error(a,b)}})}else if(f.data&&f.data.constructor===Array){var k={},l=a*f.limit-f.limit;k[h.dataName]=f.data.concat().splice(l,f.limit),k[h.countName]=f.data.length,d.renderData(k,a,f.data.length),i(),"function"==typeof f.done&&f.done(k,a,k[h.countName])}},s.prototype.eachCols=function(a){var c=b.extend(!0,[],this.config.cols),d=[],e=0;byy.each(c,function(a,b){byy.each(b,function(b,f){if(f.colspan>1){var g=0;e++,f.CHILD_COLS=[],byy.each(c[a+1],function(a,b){b.PARENT_COL||g==f.colspan||(b.PARENT_COL=e,f.CHILD_COLS.push(b),g+=b.colspan>1?b.colspan:1)})}f.PARENT_COL||d.push(f)})});var f=function(b){byy.each(b||d,function(b,c){if(c.CHILD_COLS)return f(c.CHILD_COLS);a(b,c)})};f()},s.prototype.renderData=function(a,f,g,i){var j=this,l=j.config,m=a[l.response.dataName]||[],n=[],o=[],p=[],q=function(){if(!i&&j.sortKey)return j.sort(j.sortKey.field,j.sortKey.sort,!0);byy.each(m,function(a,d){var e=[],g=[],k=[],m=a+l.limit*(f-1)+1;0!==d.length&&(i||(d[h.config.indexName]=a),j.eachCols(function(a,f){var i=f.field||a,n=d[i];j.getColElem(j.layHeader,i);if(void 0!==n&&null!==n||(n=""),!(f.colspan>1)){var o=['<td data-field="'+i+'" '+function(){var a=[];return f.edit&&a.push('data-edit="'+f.edit+'"'),f.align&&a.push('align="'+f.align+'"'),f.templet&&a.push('data-content="'+n+'"'),f.toolbar&&a.push('data-off="true"'),f.event&&a.push('byy-event="'+f.event+'"'),f.style&&a.push('style="'+f.style+'"'),f.minWidth&&a.push('data-minwidth="'+f.minWidth+'"'),a.join(" ")}()+">",'<div class="byy-table-cell byytable-cell-'+function(){var a=l.index+"-"+i;return"normal"===f.type?a:a+" byytable-cell-"+f.type}()+'">'+function(){var a=b.extend(!0,{LAY_INDEX:m},d);return"checkbox"===f.type?'<input type="checkbox" class="byy-form-checkbox" title=" " name="byyTableCheckbox" byy-skin="primary" '+function(){var b=h.config.checkName;return f[b]?(d[b]=f[b],f[b]?"checked":""):a[b]?"checked":""}()+">":"numbers"===f.type?m:f.toolbar?c(b(f.toolbar).html()||"").render(a):f.templet?function(){return"function"==typeof f.templet?f.templet(a):c(b(f.templet).html()||String(n)).render(a)}():n}(),"</div></td>"].join("");e.push(o),f.fixed&&"right"!==f.fixed&&g.push(o),"right"===f.fixed&&k.push(o)}}),n.push('<tr data-index="'+a+'">'+e.join("")+"</tr>"),o.push('<tr data-index="'+a+'">'+g.join("")+"</tr>"),p.push('<tr data-index="'+a+'">'+k.join("")+"</tr>"))}),j.layBody.scrollTop(0),j.layMain.find("."+k).remove(),j.layMain.find("tbody").html(n.join("")),j.layFixLeft.find("tbody").html(o.join("")),j.layFixRight.find("tbody").html(p.join("")),j.renderForm(),j.syncCheckAll(),j.haveInit?j.scrollPatch():setTimeout(function(){j.scrollPatch()},50),j.haveInit=!0,e.close(j.tipsIndex),0===m.length&&(j.renderForm(),j.layFixed.remove(),j.layMain.find("tbody").html(""),j.layMain.find("."+k).remove(),j.layMain.append('<div class="byy-none">'+l.text.none+"</div>"))};return j.key=l.id||l.index,h.cache[j.key]=m,j.layPage[0===m.length&&1==f?"addClass":"removeClass"]("hide"),i?q():0===m.length?(j.renderForm(),j.layFixed.remove(),j.layMain.find("tbody").html(""),j.layMain.find("."+k).remove(),j.layMain.append('<div class="byy-none">'+l.text.none+"</div>")):(q(),void(l.page&&(l.page=b.extend({selector:"#byy-table-page"+l.index,total:g,pagesize:l.pagesize||10,always:!0,pageArray:l.pageArray||[10,20,50,100,200,500],layout:["prev","page","next","skip","count","limit"],jump:function(a,b){b||(j.page=a.curr,l.limit=a.limit,j.pullData(a.curr,j.loading()))},callback:function(a){j.page=a.curr,l.limit=a.pagesize,j.pullData(a.curr,j.loading())}},l.page),l.page.total=g,d(l.page))))},s.prototype.getColElem=function(a,b){var c=this,d=c.config;return a.eq(0).find(".byytable-cell-"+d.index+"-"+b+":eq(0)")},s.prototype.renderForm=function(a){byy.initUI()},s.prototype.sort=function(a,c,d,e){var g,i,k=this,m={},n=k.config,o=n.elem.attr("byy-filter"),p=h.cache[k.key];"string"==typeof a&&k.layHeader.find("th").each(function(c,d){var e=b(this),f=e.data("field");if(f===a)return a=e,g=f,!1});try{var g=g||a.data("field");if(k.sortKey&&!d&&g===k.sortKey.field&&c===k.sortKey.sort)return;var q=k.layHeader.find("th .byytable-cell-"+n.index+"-"+g).find(l);k.layHeader.find("th").find(l).removeAttr("byy-sort"),q.attr("byy-sort",c||null),k.layFixed.find("th")}catch(a){return f("Table modules: Did not match to field")}k.sortKey={field:g,sort:c},"asc"===c?i=byy.sort(p,g):"desc"===c?i=byy.sort(p,g,!0):(i=byy.sort(p,h.config.indexName),delete k.sortKey),m[n.response.dataName]=i,k.renderData(m,k.page,k.count,!0),e&&byy.event.call(a,j,"sort("+o+")",{field:g,type:c})},s.prototype.loading=function(){var a=this,b=a.config;if(b.loading&&b.url)return e.msg("数据请求中",{icon:16,offset:[a.elem.offset().top+a.elem.height()/2-35-q.scrollTop()+"px",a.elem.offset().left+a.elem.width()/2-90-q.scrollLeft()+"px"],time:-1,anim:-1,fixed:!1})},s.prototype.setCheckData=function(a,b){var c=this,d=c.config,e=h.cache[c.key];e[a]&&e[a].constructor!==Array&&(e[a][d.checkName]=b)},s.prototype.syncCheckAll=function(){var a=this,b=a.config,c=a.layHeader.find('input[name="byyTableCheckbox"]'),d=function(c){return a.eachCols(function(a,d){"checkbox"===d.type&&(d[b.checkName]=c)}),c};c[0]&&(h.checkStatus(a.key).isAll?(c[0].checked||(c.prop("checked",!0),a.renderForm("checkbox")),d(!0)):(c[0].checked&&(c.prop("checked",!1),a.renderForm("checkbox")),d(!1)))},s.prototype.getCssRule=function(a,b){var c=this,d=c.elem.find("style")[0],e=d.sheet||d.styleSheet||{},f=e.cssRules||e.rules;byy.each(f,function(d,e){if(e.selectorText===".byytable-cell-"+c.index+"-"+a)return b(e),!0})},s.prototype.fullSize=function(){var a,b=this,c=b.config,d=c.height;b.fullHeightGap&&(d=q.height()-b.fullHeightGap,d<135&&(d=135),b.elem.css("height",d)),a=parseFloat(d)-parseFloat(b.layHeader.height())-1,c.toolbar&&(a-=b.layTool.outerHeight()),c.page&&(a=a-b.layPage.outerHeight()-1),b.layMain.css("height",a)},s.prototype.getScrollWidth=function(a){var b=0;return a?b=a.offsetWidth-a.clientWidth:(a=document.createElement("div"),a.style.width="100px",a.style.height="100px",a.style.overflowY="scroll",document.body.appendChild(a),b=a.offsetWidth-a.clientWidth,document.body.removeChild(a)),b},s.prototype.scrollPatch=function(){var a=this,c=a.layMain.children("table"),d=a.layMain.width()-a.layMain.prop("clientWidth"),e=a.layMain.height()-a.layMain.prop("clientHeight"),f=a.getScrollWidth(a.layMain[0]),g=c.outerWidth()-a.layMain.width();if(a.autoColNums&&g<5&&!a.scrollPatchWStatus){var h=a.layHeader.eq(0).find("thead th:last-child"),i=h.data("field");a.getCssRule(i,function(b){var c=b.style.width||h.outerWidth();b.style.width=parseFloat(c)-f-g+"px",a.layMain.height()-a.layMain.prop("clientHeight")>0&&(b.style.width=parseFloat(b.style.width)-1+"px"),a.scrollPatchWStatus=!0})}if(d&&e){if(!a.elem.find(".byy-table-patch")[0]){var j=b('<th class="byy-table-patch"><div class="byy-table-cell"></div></th>');j.find("div").css({width:d}),a.layHeader.eq(0).find("thead tr").append(j)}}else a.layHeader.eq(0).find(".byy-table-patch").remove();var k=a.layMain.height(),l=k-e;a.layFixed.find(".byy-table-body").css("height",c.height()>l?l:"auto"),a.layFixRight[g>0?"removeClass":"addClass"]("hide"),a.layFixRight.css("right",d-1)},s.prototype.events=function(){var a,d=this,f=d.config,i=b("body"),k={},n=d.layHeader.find("th"),o=f.elem.attr("byy-filter");n.on("mousemove",function(a){var c=b(this),d=c.offset().left,e=a.clientX-d;c.attr("colspan")>1||c.data("unresize")||k.resizeStart||(k.allowResize=c.width()-e<=10,i.css("cursor",k.allowResize?"col-resize":""))}).on("mouseleave",function(){b(this);k.resizeStart||i.css("cursor","")}).on("mousedown",function(a){var c=b(this);if(k.allowResize){var e=c.data("field");a.preventDefault(),k.resizeStart=!0,k.offset=[a.clientX,a.clientY],d.getCssRule(e,function(a){var b=a.style.width||c.outerWidth();k.rule=a,k.ruleWidth=parseFloat(b),k.minWidth=c.data("minwidth")||f.cellMinWidth})}}),r.on("mousemove",function(b){if(k.resizeStart){if(b.preventDefault(),k.rule){var c=k.ruleWidth+b.clientX-k.offset[0];c<k.minWidth&&(c=k.minWidth),k.rule.style.width=c+"px",e.close(d.tipsIndex)}a=1}}).on("mouseup",function(b){k.resizeStart&&(k={},i.css("cursor",""),d.scrollPatch()),2===a&&(a=null)}),n.on("click",function(){var c,e=b(this),f=e.find(l),g=f.attr("byy-sort");if(!f[0]||1===a)return a=2;c="asc"===g?"desc":"desc"===g?null:"asc",d.sort(e,c,null,!0)}).find(l+" .byy-edge ").on("click",function(a){var c=b(this),e=c.index(),f=c.parents("th").eq(0).data("field");byy.stope(a),0===e?d.sort(f,"asc",null,!0):d.sort(f,"desc",null,!0)}),d.elem.on("click",'input[name="byyTableCheckbox"]+',function(){var a=b(this).prev(),c=d.layBody.find('input[name="byyTableCheckbox"]'),e=a.parents("tr").eq(0).data("index"),f=a[0].checked,g="byyTableAllChoose"===a.attr("byy-filter");g?(c.each(function(a,b){b.checked=f,d.setCheckData(a,f)}),d.syncCheckAll(),d.renderForm("checkbox")):(d.setCheckData(e,f),d.syncCheckAll()),byy.event.call(this,j,"checkbox("+o+")",{checked:f,data:h.cache[d.key]?h.cache[d.key][e]||{}:{},type:g?"all":"one"})}),d.layBody.on("mouseenter","tr",function(){var a=b(this),c=a.index();d.layBody.find("tr:eq("+c+")").addClass("byy-table-hover")}).on("mouseleave","tr",function(){var a=b(this),c=a.index();d.layBody.find("tr:eq("+c+")").removeClass("byy-table-hover")}),d.layBody.on("change","."+m,function(){var a=b(this),c=this.value,e=a.parent().data("field"),f=a.parents("tr").eq(0).data("index"),g=h.cache[d.key][f];g[e]=c,byy.event.call(this,j,"edit("+o+")",{value:c,data:g,field:e})}).on("blur","."+m,function(){var a,e=b(this),f=e.parent().data("field"),g=e.parents("tr").eq(0).data("index"),i=h.cache[d.key][g];d.eachCols(function(b,c){c.field==f&&c.templet&&(a=c.templet)}),e.siblings(".byy-table-cell").html(a?c(b(a).html()||this.value).render(i):this.value),e.parent().data("content",this.value),e.remove()}),d.layBody.on("click","td",function(){var a=b(this),c=a.data("field"),i=a.data("edit"),k=a.children(".byy-table-cell");if(e.close(d.tipsIndex),!a.data("off")){var l=a.closest("tr"),n=d.layBody.find("tr:eq("+l.index()+")"),p=n.find('input[name="byyTableCheckbox"]:enabled');if(p.length>0){var q=!l.hasClass("selected");p.prop("checked",q);var r=a.parents("tr").eq(0).data("index");d.setCheckData(r,q),d.syncCheckAll(),byy(p).checkbox(),n.toggleClass("selected")}else d.layBody.find("tr.selected").removeClass("selected"),n.toggleClass("selected");if(i)if("select"===i);else{var s=b('<input class="byy-form-input '+m+'">');s[0].value=a.data("content")||k.text(),a.find("."+m)[0]||a.append(s),s.focus()}else k.find(".byy-form-switch,.byy-form-checkbox")[0]||(Math.round(k.prop("scrollWidth"))>Math.round(k.outerWidth())&&(d.tipsIndex=e.tips(['<div class="byy-table-tips-main" style="margin-top: -'+(k.height()+16)+"px;"+function(){return"sm"===f.size?"padding: 4px 15px; font-size: 12px;":"lg"===f.size?"padding: 14px 15px;":""}()+'">',k.html(),"</div>",'<i class="byy-table-tips-c byyicon icon-close"></i>'].join(""),k[0],{tips:[3,""],time:-1,anim:-1,maxWidth:g.ios||g.android?300:600,isOutAnim:!1,skin:"byy-table-tips",success:function(a,b){a.find(".byy-table-tips-c").on("click",function(){e.close(b)})}})),byy.event.call(this,j,"td("+o+")",{event:a.attr("byy-event"),data:h.cache[d.key][l.data("index")],field:c}))}}),d.layBody.on("click","*[byy-event]",function(){var a=b(this),e=a.parents("tr").eq(0).data("index"),f=d.layBody.find('tr[data-index="'+e+'"]'),g=h.cache[d.key][e];byy.event.call(this,j,"tool("+o+")",{data:h.clearCacheKey(g),event:a.attr("byy-event"),tr:f,del:function(){h.cache[d.key][e]=[],f.remove(),d.scrollPatch()},update:function(a){a=a||{},byy.each(a,function(a,e){if(a in g){var h,i=f.children('td[data-field="'+a+'"]');g[a]=e,d.eachCols(function(b,c){c.field==a&&c.templet&&(h=c.templet)}),i.children(".byy-table-cell").html(h?c(b(h).html()||e).render(g):e),i.data("content",e)}})}}),f.addClass("byy-table-click").siblings("tr").removeClass("byy-table-click")}),d.layMain.on("scroll",function(){var a=b(this),c=a.scrollLeft(),f=a.scrollTop();d.layHeader.scrollLeft(c),d.layFixed.find(".byy-table-body").scrollTop(f),e.close(d.tipsIndex)}),q.on("resize",function(){d.fullSize(),d.scrollPatch()})},h.init=function(a,c){c=c||{};var d=this,e=b(a?'table[byy-filter="'+a+'"]':".byy-table[byy-data]"),g="Table element property byy-data configuration item has a syntax error: ";return e.each(function(){var d=b(this),e=d.attr("byy-data");try{e=new Function("return "+e)()}catch(a){f(g+e)}var i=[],j=b.extend({elem:this,cols:[],data:[],skin:d.attr("byy-skin"),size:d.attr("byy-size"),even:"string"==typeof d.attr("byy-even")},h.config,c,e);a&&d.hide(),d.find("thead>tr").each(function(a){j.cols[a]=[],b(this).children().each(function(c){var d=b(this),e=d.attr("byy-data");try{e=new Function("return "+e)()}catch(a){return f(g+e)}var h=b.extend({title:d.text(),colspan:d.attr("colspan")||0,rowspan:d.attr("rowspan")||0},e);h.colspan<2&&i.push(h),j.cols[a].push(h)})}),d.find("tbody>tr").each(function(a){var c=b(this),d={};c.children("td").each(function(a,c){var e=b(this),f=e.data("field");if(f)return d[f]=e.html()}),byy.each(i,function(a,b){var e=c.children("td").eq(a);d[b.field]=e.html()}),j.data[a]=d}),h.render(j)}),d},h.checkStatus=function(a){var b=0,c=0,d=[],e=h.cache[a]||[];return byy.each(e,function(a,e){if(e.constructor===Array)return void c++;e[h.config.checkName]&&(b++,d.push(h.clearCacheKey(e)))}),{data:d,isAll:!!e.length&&b===e.length-c}},i.config={},h.reload=function(a,c){var d=i.config[a];return c=c||{},d?(c.data&&c.data.constructor===Array&&delete d.data,h.render(b.extend(!0,{},d,c))):f("The ID option was not found in the table instance")},h.render=function(a){var b=new s(a);return i.call(b)},h.clearCacheKey=function(a){return a=b.extend({},a),delete a[h.config.checkName],delete a[h.config.indexName],a},h.init(),a(j,h)});