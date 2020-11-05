(this.webpackJsonplms=this.webpackJsonplms||[]).push([[40],{1069:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return S}));var r=a(15),n=a(35),i=a(0),c=a.n(i),o=a(146),s=a(11),u=a(1),l=a.n(u),d=a(4),_=a(30),m=a(523),b=a(796),g=a.n(b),T=a(1047),p=a(775),f=a(99),h=a(79),y=a(628),C=function(e){var t=[{title:"Rating",dataIndex:"rating",sorter:function(e,t){return Object(h.c)(e.rating,t.rating)},render:function(e,t,a){return c.a.createElement(T.a,{disabled:!0,allowHalf:!0,value:e})},width:140},{title:"Feedback",dataIndex:"feedback",width:200},{title:"Video",dataIndex:"metadata",sorter:function(e,t){return Object(h.b)(e.metadata.resource.title,t.metadata.resource.title)},filters:e.resourceFilters,onFilter:function(e,t){return t.resourceId===e},render:function(e,t,a){return c.a.createElement(f.b,{to:t.redirectURL},e.resource.title)},width:200},{title:"Date Submitted",dataIndex:"dateCreated",sorter:function(e,t){return Object(h.c)(e.dateCreated._seconds,t.dateCreated._seconds)},render:function(e,t,a){return Object(h.k)(e._seconds)},width:140}],a=c.a.useMemo((function(){return e.ratings}),[e.ratings]);return c.a.createElement(p.a,{columns:t,dataSource:a,footer:null,onChange:function(e,t,a){},locale:{emptyText:"No ratings to show yet"},pagination:{pageSize:10,size:"small",hideOnSinglePage:!0,itemRender:y.a}})},E=function(e){var t=e.ratings.map((function(e){return Object(s.a)({},e,{redirectURL:"/editvideo/".concat(e.metadata.resource.objectID)})}));return c.a.createElement("div",{className:g.a.rightHandSectionCard},c.a.createElement(C,{resourceFilters:e.resourceFilters,ratings:t}))},O=function(e){return Object(s.a)({},e)},R=function(e,t){return t.type,e},v=a(532),N=function(e){var t=c.a.useReducer(R,{currentUser:e.currentUser,ratings:e.ratings},O),a=Object(r.a)(t,1)[0];return c.a.createElement(v.a,{title:"Feedback for Me",subTitle:"See feedback users have given about your videos.",className:g.a.myFeedbackRoot,withDefaultBodyPadding:!0},c.a.createElement(m.a,null,c.a.createElement(m.a.Column,{width:16},c.a.createElement(E,{resourceFilters:e.resourceFilters,ratings:a.ratings}))))},S=function(e){var t=c.a.useContext(n.a),a=Object(r.a)(t,1)[0],i=function(e,t,a){var n=c.a.useState({isLoading:!0,ratings:null,error:null,resourceFilters:null}),i=Object(r.a)(n,2),o=i[0],u=i[1],m=function(){var t=Object(d.a)(l.a.mark((function t(){var a,r,n,i;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,_.a.Resource.getUploadedByUser(e.uid);case 3:return a=t.sent,r=a.map(function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.a.Rating.getLatestForUserByResourceId(t.objectID);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),t.next=7,Promise.all(r);case 7:n=t.sent.reduce((function(e,t){return e.concat(t)})),i=a.map((function(e){return{text:e.title,value:e.objectID}})),u(Object(s.a)({},o,{ratings:n,isLoading:!1,resourceFilters:i})),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(0),console.log("RouteFetchDataError: ".concat(t.t0)),u(Object(s.a)({},o,{isLoading:!1,error:t.t0}));case 16:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}();return c.a.useEffect((function(){m()}),[]),o}(a.authUser,e.location.pathname,e.match.params);return i.isLoading?c.a.createElement(o.a,null):c.a.createElement(N,{currentUser:a.currentCreator,ratings:i.ratings,error:i.error,resourceFilters:i.resourceFilters})}},528:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var r=a(530),n=function(e){var t=e.withMargin,a=e.size,n={},i=a.top,c=void 0===i?"0":i,o=a.left,s=void 0===o?"0":o,u=a.right,l=void 0===u?"0":u,d=a.bottom,_=void 0===d?"0":d;switch(t){case r.c.ALL:n.margin="".concat(c," ").concat(l," ").concat(_," ").concat(s," ");break;case r.c.LEFT_AND_RIGHT:n.marginLeft=s,n.marginRight=l;break;case r.c.TOP_AND_BOTTOM:n.marginTop=c,n.marginBottom=_;break;case r.c.TOP:n.marginTop=c;break;case r.c.BOTTOM:n.marginBottom=_;break;case r.c.LEFT:n.marginLeft=s;break;case r.c.RIGHT:n.marginRight=l}return n}},530:function(e,t,a){"use strict";var r,n,i;a.d(t,"c",(function(){return r})),a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return i})),function(e){e.ALL="ALL",e.LEFT_AND_RIGHT="LEFT_AND_RIGHT",e.TOP_AND_BOTTOM="TOP_AND_BOTTOM",e.TOP="TOP",e.LEFT="LEFT",e.RIGHT="RIGHT",e.BOTTOM="BOTTOM"}(r||(r={})),function(e){e.SMALL="fontSize__small",e.MEDIUM="fontSize__medium",e.LARGE="fontSize__large"}(n||(n={})),function(e){e.BLACK="fontColor__black",e.DARK_GREY="fontColor__darkGrey",e.GREY="fontColor__grey",e.BLUE="fontColor__blue"}(i||(i={}))},531:function(e,t,a){"use strict";a.d(t,"b",(function(){return g})),a.d(t,"a",(function(){return r}));var r,n=a(0),i=a.n(n),c=a(54),o=a(529),s=a(516),u=a(541),l=a.n(u),d=a(5),_=a.n(d),m=a(528),b=function(e){var t=e.type,a=e.centered,r=e.color,n=e.className,u=e.withMargin,d=Object(o.a)(e,["type","centered","color","className","withMargin"]),b=Object(m.a)({withMargin:u,size:{top:"1rem",bottom:"1rem",left:"1rem",right:"1rem"}});return i.a.createElement("span",{className:"".concat(l.a.TypographyTitle),style:b},i.a.createElement(s.a.Title,Object.assign({},d,{style:{margin:0},className:_()(Object(c.a)({},t,!0),{centered:a},Object(c.a)({},r,r),Object(c.a)({},n,n))}),e.children))},g=function(e){return i.a.createElement(b,e)};!function(e){e.CARD_TITLE="cardTitle",e.CARD_SUB_TITLE="cardSubTitle",e.CARD_SUB_SUB_TITLE="cardSubSubTitle",e.PAGE_HEADER_TITLE="pageHeaderTitle",e.SECONDARY_TITLE="secondaryTitle"}(r||(r={}))},532:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var r=a(0),n=a.n(r),i=a(54),c=a(540),o=a.n(c),s=a(531),u=a(537),l=a(5),d=a.n(l),_=a(530),m=a(528),b=function(e){var t=e.withMargin,a=e.withDefaultBodyPadding,r=e.smallSizeTitleAndSubtitle,c=e.customBodyPaddingValues,l=Object(m.a)({withMargin:t,size:{top:"30px",bottom:"30px",left:"4vh",right:"4vh"}});return n.a.createElement("div",{className:"".concat(o.a.WhiteCard," ").concat(e.className),style:l},(e.title||e.subTitle)&&n.a.createElement("div",{className:d()(Object(i.a)({},o.a.headerContainer,!0),Object(i.a)({},o.a.centered,e.titleAndSubtitleAlignCenter),e.headerClassName)},e.title&&n.a.createElement(s.b,{withMargin:_.c.BOTTOM,type:r?s.a.CARD_SUB_TITLE:s.a.CARD_TITLE,centered:e.titleAndSubtitleAlignCenter},e.title),e.subTitle&&n.a.createElement(u.b,{type:r?u.a.SECONDARY_DESCRIPTION:u.a.PRIMARY_DESCRIPTION,className:o.a.whiteCardSubTitle,centered:e.titleAndSubtitleAlignCenter},e.subTitle)),n.a.createElement("div",{className:d()(Object(i.a)({},o.a.whiteCardBody,!0),Object(i.a)({},"".concat(o.a.bodyPadding," bodyPadding"),a),e.bodyClassName),style:c&&{padding:"".concat(c.top," ").concat(c.right," ").concat(c.bottom," ").concat(c.left," ")}},e.children))},g=function(e){return n.a.createElement(b,e)}},537:function(e,t,a){"use strict";a.d(t,"b",(function(){return g})),a.d(t,"a",(function(){return r}));var r,n=a(0),i=a.n(n),c=a(54),o=a(529),s=a(516),u=a(542),l=a.n(u),d=a(5),_=a.n(d),m=a(528),b=function(e){var t=e.type,a=e.centered,r=e.color,n=e.withMargin,u=e.className,d=Object(o.a)(e,["type","centered","color","withMargin","className"]),b=Object(m.a)({withMargin:n,size:{top:"1rem",bottom:"1rem",left:"1rem",right:"1rem"}});return i.a.createElement("span",{className:l.a.TypographyDescription,style:b},i.a.createElement(s.a.Text,Object.assign({},d,{className:_()(Object(c.a)({},t,!e.className),{centered:a},Object(c.a)({},r,r),Object(c.a)({},u,u))}),e.children))},g=function(e){return i.a.createElement(b,e)};!function(e){e.PAGE_HEADER_DESCRIPTION="pageHeaderDescription",e.PRIMARY_DESCRIPTION="primaryDescription",e.SECONDARY_DESCRIPTION="secondaryDescription",e.TERNARY_DESCRIPTION="ternaryDescription"}(r||(r={}))},540:function(e,t,a){e.exports={WhiteCard:"WhiteCard_WhiteCard__1KNRm",headerContainer:"WhiteCard_headerContainer__27ghD",centered:"WhiteCard_centered__2HafX",center:"WhiteCard_center__B85TX",whiteCardTitle:"WhiteCard_whiteCardTitle__1G_Ow",whiteCardSubTitle:"WhiteCard_whiteCardSubTitle__3_gPd",whiteCardBody:"WhiteCard_whiteCardBody__1YeSi",whiteCardSubtitle:"WhiteCard_whiteCardSubtitle__2WbJC",bodyPadding:"WhiteCard_bodyPadding__sydh2"}},541:function(e,t,a){e.exports={TypographyTitle:"TypographyTitle_TypographyTitle__3Dwn1"}},542:function(e,t,a){e.exports={TypographyDescription:"TypographyDescription_TypographyDescription__3PGqZ"}},628:function(e,t,a){"use strict";var r=a(0),n=a.n(r),i=a(19),c=a(639),o=a.n(c);t.a=function(e,t,a){return"prev"===t?n.a.createElement("a",null," ",n.a.createElement("span",{className:o.a.paginationPrev},n.a.createElement(i.a,{type:"left"})," "," Previous")):"next"===t?n.a.createElement("a",null,n.a.createElement("span",{className:o.a.paginationNext},"Next ",n.a.createElement(i.a,{type:"right"}))):a}},639:function(e,t,a){e.exports={paginationPrev:"PaginationItemRender_paginationPrev__25XC6",paginationNext:"PaginationItemRender_paginationNext__3owrh"}},796:function(e,t,a){e.exports={myFeedbackRoot:"MyFeedback_myFeedbackRoot__1ylXQ",contentTableCreatorName:"MyFeedback_contentTableCreatorName__2A9tF",contentTableCreatorAvatar:"MyFeedback_contentTableCreatorAvatar__2ysRZ",rightHandSectionCard:"MyFeedback_rightHandSectionCard__1ML_t",contentTableThumbnailImage:"MyFeedback_contentTableThumbnailImage__p7kP8",contentTableHeaderText:"MyFeedback_contentTableHeaderText__1yWFa",myContentActionButton:"MyFeedback_myContentActionButton__3VlZS",pageHeader:"MyFeedback_pageHeader__9WzZu",pageHeaderSubtitleText:"MyFeedback_pageHeaderSubtitleText__2NItK"}}}]);
//# sourceMappingURL=40.b23ffd48.chunk.js.map