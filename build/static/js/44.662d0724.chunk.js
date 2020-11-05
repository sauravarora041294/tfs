(this.webpackJsonplms=this.webpackJsonplms||[]).push([[44],{1078:function(e,r,t){"use strict";t.r(r),t.d(r,"default",(function(){return K}));var a,n=t(15),o=t(35),i=t(0),s=t.n(i),c=t(6),u=t(146),l=t(11),m=t(1),g=t.n(m),_=t(4),p=t(30),d=function(){var e=Object(_.a)(g.a.mark((function e(r){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.Creator.get(r);case 2:if(e.sent.creatorStatus){e.next=6;break}return e.next=6,p.a.Creator.upgradeUserToCreator(r);case 6:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),f=t(648),S=t(1064),E=t(651),F=t(9),C=t(19),h=t(685),b=t(99),I=t(805),O=t.n(I),w=t(725),R=t(721),L=t.n(R),v=t(722),y=t.n(v),N=t(539),A=t(650),T=t(727),k=t(737),x=t.n(k),j=t(738),D=t.n(j),M={height:"14px",width:"14px"},B=function(){return s.a.createElement("img",{style:M,src:L.a})},U=function(){return s.a.createElement("img",{style:M,src:y.a})},P=function(){return s.a.createElement("img",{style:M,src:x.a})},W=function(){return s.a.createElement("img",{style:M,src:D.a})},H=function(e,r){var t=s.a.useRef();s.a.useImperativeHandle(r,(function(){return{}}));var a=Object(c.g)();return s.a.createElement("div",{className:O.a.loginRoot},s.a.createElement(w.a,null),s.a.createElement("div",{className:O.a.formWrapper},s.a.createElement("div",{className:O.a.loginForm},s.a.createElement("div",{className:"backButton",onClick:function(){return a.goBack()}},s.a.createElement(C.a,{type:"arrow-left"})," \xa0 Back"," "),s.a.createElement("div",{className:O.a.formCardTitle},"Login"),s.a.createElement("div",{className:O.a.formCardSubTitle},"Sign in with your username or email and password"),s.a.createElement(S.a,{ref:t,onSubmit:function(r){r.preventDefault(),e.loginWithEmailAndPassword()}},s.a.createElement(S.a.Item,null,e.form.getFieldDecorator("email",{rules:[{required:!0,message:"Please provide your email address.",whitespace:!0}],initialValue:e.formData.email})(s.a.createElement(N.a,{placeholder:"Email",type:"email",autoComplete:"username",suffix:s.a.createElement(C.a,{style:{opacity:"0.6"},component:P})}))),s.a.createElement(S.a.Item,null,e.form.getFieldDecorator("password",{rules:[{required:!0,message:"Please provide a password.",whitespace:!0}],initialValue:e.formData.password})(s.a.createElement(N.a,{placeholder:"Password",type:"password",autoComplete:"current-password",suffix:s.a.createElement(C.a,{style:{opacity:"0.6"},component:W})}))),e.detailsFormError?s.a.createElement(E.a,{className:O.a.alertMessage,message:"Sign In Failed",description:e.detailsFormError.message,type:"error"}):null,s.a.createElement(S.a.Item,null,s.a.createElement(A.a,{type:"primary",loading:e.isSubmittingForm},"Sign In"))),s.a.createElement(h.a,null,"OR"),s.a.createElement("div",{className:"".concat(O.a.thirdPartyAuthContainer," loginPageAuthContainer")},s.a.createElement(T.a,{onClick:e.continueWithGoogle},s.a.createElement(C.a,{component:B}),"Sign In with Google"),s.a.createElement(T.a,{onClick:e.continueWithFacebook},s.a.createElement(C.a,{component:U}),"Sign In with Facebook")),s.a.createElement("div",{className:O.a.loginFormFooter},s.a.createElement("div",{className:O.a.forgotPasswordText},s.a.createElement(b.b,{to:"/resetpassword-creator"},"Forgot password?")),s.a.createElement("div",{className:O.a.alreadyHaveAccountText},"Need an account? ",s.a.createElement(b.b,{to:"/register-creator"}," Sign up"))))))},V=t(79),G={password:"",email:""};!function(e){e.SET_FORM_DATA="SET_FORM_DATA",e.BEGIN_FORM_SUBMISSION="BEGIN_FORM_SUBMISSION",e.FINISHED_FORM_SUBMISSION_WITH_ERROR="FINISHED_FORM_SUBMISSION_WITH_ERROR",e.FINISHED_FORM_SUBMISSION_SUCCESSFULLY="FINISHED_FORM_SUBMISSION_SUCCESSFULLY"}(a||(a={}));var Y=function(e){return Object(l.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!1,formData:G})},J=function(e,r){switch(r.type){case a.SET_FORM_DATA:return Object(l.a)({},e,{formData:Object(l.a)({},e.formData,{},r.formData)});case a.BEGIN_FORM_SUBMISSION:return Object(l.a)({},e,{isSubmittingForm:!0});case a.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:return Object(l.a)({},e,{isSubmittingForm:!1,sucessfullySubmittedForm:!0});case a.FINISHED_FORM_SUBMISSION_WITH_ERROR:return Object(l.a)({},e,{isSubmittingForm:!1,sucessfullySubmittedForm:!1,formSubmissionError:r.submissionError});default:return e}},q=t(29),z=Object(F.a)(c.h)((function(e){var r=s.a.useContext(o.a),t=Object(n.a)(r,1)[0],i=s.a.useReducer(J,{},Y),c=Object(n.a)(i,2),u=c[0],l=c[1],m=function(){var r=Object(_.a)(g.a.mark((function r(){var t,a;return g.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,V.d.Auth.handleThirdPartyCreatorSignInRedirect();case 2:(t=r.sent).savedUser&&(a=Object(V.e)("/"),e.history.push(a)),t.error&&f.a.error({message:"Problem Signing In",description:"An error occurred while trying to sign you in: ".concat(t.error),placement:"bottomRight"});case 5:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();s.a.useEffect((function(){m()}),[]);var p=s.a.useRef(),F=S.a.create({name:"creatorLoginForm"})(s.a.forwardRef(Object(V.a)(H))),C=function(){var r=Object(_.a)(g.a.mark((function r(){return g.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:p.current.validateFieldsAndScroll(function(){var r=Object(_.a)(g.a.mark((function r(n,o){var i,s;return g.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n){r.next=17;break}return l({type:a.SET_FORM_DATA,formData:o}),l({type:a.BEGIN_FORM_SUBMISSION}),r.next=5,V.d.Auth.signInWithEmailAndPassword(o.email,o.password);case 5:if(!(i=r.sent).error){r.next=10;break}l({type:a.FINISHED_FORM_SUBMISSION_WITH_ERROR,submissionError:i.error}),r.next=17;break;case 10:if(!i.authResponse.user){r.next=17;break}return l({type:a.FINISHED_FORM_SUBMISSION_SUCCESSFULLY}),r.next=14,d(i.authResponse.user.uid);case 14:t.redirectTargetAfterAuth&&e.history.push(t.redirectTargetAfterAuth),s=Object(V.e)("/"),e.history.push(s);case 17:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),h=function(){var e=Object(_.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.d)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(_.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(q.e)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=s.a.useMemo((function(){return t.invalidAuthTokenError&&s.a.createElement(E.a,{className:O.a.alertJWTError,message:"Authentication Error",description:"We had some issues authenticating you. Please log in again.",type:"error",showIcon:!0})}),[t.invalidAuthTokenError]);return s.a.createElement(s.a.Fragment,null,I,s.a.createElement(F,{ref:p,loginWithEmailAndPassword:C,continueWithGoogle:b,continueWithFacebook:h,detailsFormError:u.formSubmissionError,isSubmittingForm:u.isSubmittingForm,formData:u.formData}))})),K=function(e){var r=s.a.useContext(o.a),t=Object(n.a)(r,1)[0],a=function(e,r,t){var a=s.a.useState({isLoading:!0,error:null}),o=Object(n.a)(a,2),i=o[0],c=o[1],u=function(){var r=Object(_.a)(g.a.mark((function r(){return g.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e)try{c(Object(l.a)({},i,{isLoading:!1}))}catch(t){console.log("RouteFetchDataError: ".concat(t)),c(Object(l.a)({},i,{isLoading:!1,error:t}))}else c(Object(l.a)({},i,{isLoading:!1}));case 1:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return s.a.useEffect((function(){u()}),[]),i}(t.authUser,e.location.pathname,e.match.params);if(t.authUser){if(t.currentCreator&&"NEEDS_PROFILE_DETAILS"===t.currentCreator.creatorStatus)return s.a.createElement(c.a,{to:"/creator-registration-details"});if(t.authUser&&t.currentCreator&&"PENDING_APPROVAL"===t.currentCreator.creatorStatus)return s.a.createElement(c.a,{to:"/creator-pending-approval"});if(t.authUser&&t.currentCreator&&"APPROVED"===t.currentCreator.creatorStatus){var i=Object(V.e)("/");return s.a.createElement(c.a,{to:i})}return s.a.createElement(u.a,null)}return s.a.createElement(z,{error:a.error})}},737:function(e,r,t){e.exports=t.p+"static/media/atTheRate.01f1962f.svg"},738:function(e,r,t){e.exports=t.p+"static/media/passswordLock.d7852dc9.svg"},805:function(e,r,t){e.exports={thirdPartyAuthContainer:"LoginCreator_thirdPartyAuthContainer__Bki9b",formWrapper:"LoginCreator_formWrapper__1S2pA",loginFormFooter:"LoginCreator_loginFormFooter__soVQ-",loginForm:"LoginCreator_loginForm__14eDL",loginRoot:"LoginCreator_loginRoot__3AtPd",registerCreatorSkillsCard:"LoginCreator_registerCreatorSkillsCard__32lAm",signupForm:"LoginCreator_signupForm__3BhNV",alertMessage:"LoginCreator_alertMessage__1AyFK",signupFormTitle:"LoginCreator_signupFormTitle__u2bAY",signupFormSubtitle:"LoginCreator_signupFormSubtitle__3TFuF",signupFormField:"LoginCreator_signupFormField__2BB7C",skillFormItem:"LoginCreator_skillFormItem__1pKqf",selectSkillRow:"LoginCreator_selectSkillRow__1wB_j",selectSkillInput:"LoginCreator_selectSkillInput__3uher",signupFormHalfSizeField:"LoginCreator_signupFormHalfSizeField__23y_-",signupFormCard:"LoginCreator_signupFormCard__2JwSx",submitButton:"LoginCreator_submitButton__LneYJ",redirectButton:"LoginCreator_redirectButton__vtzWj",headerImage:"LoginCreator_headerImage__ZYhbk",signupFormRow:"LoginCreator_signupFormRow__1qWaR",signupFormColumn:"LoginCreator_signupFormColumn__3jsJT",signupViewGridArea:"LoginCreator_signupViewGridArea__38YgW",signupViewGridRow:"LoginCreator_signupViewGridRow__3-NpV",navbarContainer:"LoginCreator_navbarContainer__3ojSP",signupViewLeftSideContent:"LoginCreator_signupViewLeftSideContent__3TrE2",signupViewRightSideContent:"LoginCreator_signupViewRightSideContent__1cppc",signUpFooter:"LoginCreator_signUpFooter__1gEtY",submitSignupFormButton:"LoginCreator_submitSignupFormButton__3JfnL",divResumeUpload:"LoginCreator_divResumeUpload__1NPR3",formCardTitle:"LoginCreator_formCardTitle__2DeoX",formCardSubTitle:"LoginCreator_formCardSubTitle__1Dzfw",alreadyHaveAccountText:"LoginCreator_alreadyHaveAccountText__13x9W",forgotPasswordText:"LoginCreator_forgotPasswordText__CQYmk"}}}]);
//# sourceMappingURL=44.662d0724.chunk.js.map