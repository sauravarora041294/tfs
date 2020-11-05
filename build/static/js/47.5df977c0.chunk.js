(this.webpackJsonplms=this.webpackJsonplms||[]).push([[47],{1077:function(e,r,t){"use strict";t.r(r),t.d(r,"default",(function(){return H}));var a,n=t(15),i=t(35),o=t(0),s=t.n(o),c=t(6),u=t(146),l=t(1),m=t.n(l),_=t(11),p=t(4),g=t(648),d=t(1064),S=t(9),f=t(19),F=t(651),R=t(685),C=t(99),E=t(953),h=t.n(E),b=t(725),I=t(721),O=t.n(I),w=t(722),v=t.n(w),N=t(650),U=t(727),y=t(539),D={height:"14px",width:"14px"},M=function(){return s.a.createElement("img",{style:D,src:O.a})},A=function(){return s.a.createElement("img",{style:D,src:v.a})},k=function(e,r){var t=Object(c.g)(),a=s.a.useRef();s.a.useImperativeHandle(r,(function(){return{}}));return s.a.createElement("div",{className:h.a.signUpRoot},s.a.createElement(b.a,null),s.a.createElement("div",{className:h.a.formWrapper},s.a.createElement("div",{className:h.a.signUpForm},s.a.createElement("div",{className:"backButton",onClick:function(){return t.goBack()}},s.a.createElement(f.a,{type:"arrow-left"})," \xa0 Back"," "),s.a.createElement("div",{className:h.a.formCardTitle},"Sign Up as a Creator"),s.a.createElement("div",{className:h.a.formCardSubTitle},"Sign in with your username or email and password"),s.a.createElement(d.a,{ref:a,onSubmit:function(r){r.preventDefault(),e.signupWithEmailAndPassword()}},s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("firstName",{rules:[{required:!0,message:"Please provide your first name.",whitespace:!0}],initialValue:e.formData.firstName})(s.a.createElement(y.a,{placeholder:"First Name",autoComplete:"given-name"}))),s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("lastName",{rules:[{required:!0,message:"Please provide your last name.",whitespace:!0}],initialValue:e.formData.lastName})(s.a.createElement(y.a,{placeholder:"Last Name",autoComplete:"last-name"}))),s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("email",{rules:[{required:!0,message:"Please provide your email address.",whitespace:!0}],initialValue:e.formData.email})(s.a.createElement(y.a,{placeholder:"Email",type:"email",autoComplete:"username"}))),s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("password",{rules:[{required:!0,message:"Please provide a password of at least 6 characters.",whitespace:!0,min:6}],initialValue:e.formData.password})(s.a.createElement(y.a,{placeholder:"Password",type:"password",autoComplete:"new-password"}))),e.detailsFormError?s.a.createElement(F.a,{className:h.a.alertMessage,message:"Registration Failed",description:e.detailsFormError.message,type:"error"}):null,s.a.createElement(d.a.Item,null,s.a.createElement(N.a,{type:"primary",loading:e.isSubmittingForm},"Create Your Account"))),s.a.createElement(R.a,null,"OR"),s.a.createElement("div",{className:"".concat(h.a.thirdPartyAuthContainer," loginPageAuthContainer")},s.a.createElement(U.a,{onClick:e.continueWithGoogle},s.a.createElement(f.a,{component:M}),"Sign In with Google"),s.a.createElement(U.a,{onClick:e.continueWithFacebook},s.a.createElement(f.a,{component:A}),"Sign In with Facebook")),s.a.createElement("div",{className:h.a.signUpFormFooter},s.a.createElement("div",{className:h.a.alreadyHaveAccountText},"Already have a creator account? ",s.a.createElement(C.b,{to:"/login-creator?redirect=".concat(new URLSearchParams(window.location.search).get("redirect")||"")},"Login"))))))},T={email:"",password:"",firstName:"",lastName:""};!function(e){e.BEGIN_FORM_SUBMISSION="BEGIN_FORM_SUBMISSION",e.FINISHED_FORM_SUBMISSION_WITH_ERROR="FINISHED_FORM_SUBMISSION_WITH_ERROR",e.FINISHED_FORM_SUBMISSION_SUCCESSFULLY="FINISHED_FORM_SUBMISSION_SUCCESSFULLY",e.SET_FORM_DATA="SET_FORM_DATA"}(a||(a={}));var j=function(e){return Object(_.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!1,formData:T})},B=function(e,r){switch(r.type){case a.SET_FORM_DATA:return Object(_.a)({},e,{formData:Object(_.a)({},e.formData,{},r.formData)});case a.BEGIN_FORM_SUBMISSION:return Object(_.a)({},e,{isSubmittingForm:!0});case a.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:return Object(_.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!0});case a.FINISHED_FORM_SUBMISSION_WITH_ERROR:return Object(_.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!1,formSubmissionError:r.formSubmissionError});default:return e}},P=t(79),L=t(29),x=Object(S.a)(c.h)((function(e){var r=s.a.useReducer(B,{},j),t=Object(n.a)(r,2),i=t[0],o=t[1],c=function(){var r=Object(p.a)(m.a.mark((function r(){var t,a;return m.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,P.d.Auth.handleThirdPartyCreatorSignInRedirect();case 2:(t=r.sent).savedUser&&(a=Object(P.e)("/creator-registration-details"),e.history.push(a)),t.error&&g.a.error({message:"Problem Signing Up",description:"An error occurred while trying to sign you up: ".concat(t.error),placement:"bottomRight"});case 5:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();s.a.useEffect((function(){c()}),[]);var u=s.a.useRef(),l=d.a.create({name:"creatorSignupForm"})(s.a.forwardRef(Object(P.a)(k))),_=function(){var r=Object(p.a)(m.a.mark((function r(){return m.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:u.current.validateFieldsAndScroll(function(){var r=Object(p.a)(m.a.mark((function r(t,n){var i,s,c;return m.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t){r.next=9;break}return o({type:a.SET_FORM_DATA,formData:n}),o({type:a.BEGIN_FORM_SUBMISSION}),i=new URLSearchParams(window.location.search),s=i?i.get("inviteCode"):null,r.next=7,P.d.Auth.registerCreatorWithEmailAndPassword(n.email,n.password,n.firstName,n.lastName,s);case 7:(c=r.sent).error?o({type:a.FINISHED_FORM_SUBMISSION_WITH_ERROR,formSubmissionError:c.error}):(o({type:a.FINISHED_FORM_SUBMISSION_SUCCESSFULLY}),e.history.push("/creator-registration-details"));case 9:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}());case 1:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),S=function(){var e=Object(p.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(L.d)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(p.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(L.e)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(l,{ref:u,signupWithEmailAndPassword:_,continueWithGoogle:f,continueWithFacebook:S,detailsFormError:i.formSubmissionError,isSubmittingForm:i.isSubmittingForm,formData:i.formData}))})),H=function(e){var r=s.a.useContext(i.a),t=Object(n.a)(r,1)[0],a=function(e,r,t){var a=s.a.useState({isLoading:!0,error:null}),i=Object(n.a)(a,2),o=i[0],c=i[1],u=function(){var r=Object(p.a)(m.a.mark((function r(){return m.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e)try{c(Object(_.a)({},o,{isLoading:!1}))}catch(t){console.log("RouteFetchDataError: ".concat(t)),c(Object(_.a)({},o,{isLoading:!1,error:t}))}else c(Object(_.a)({},o,{isLoading:!1}));case 1:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();return s.a.useEffect((function(){u()}),[]),o}(t.authUser,e.location.pathname,e.match.params);if(t.authUser){if(t.authUser&&t.currentCreator&&"NEEDS_PROFILE_DETAILS"===t.currentCreator.creatorStatus)return s.a.createElement(c.a,{to:"/creator-registration-details"});if(t.authUser&&t.currentCreator&&"PENDING_APPROVAL"===t.currentCreator.creatorStatus)return s.a.createElement(c.a,{to:"/creator-pending-approval"});if(t.authUser&&t.currentCreator&&"APPROVED"===t.currentCreator.creatorStatus){var o=Object(P.e)("/");return s.a.createElement(c.a,{to:o})}return s.a.createElement(u.a,null)}return s.a.createElement(x,{error:a.error})}},953:function(e,r,t){e.exports={thirdPartyAuthContainer:"RegisterCreator_thirdPartyAuthContainer__JDGQM",formWrapper:"RegisterCreator_formWrapper__2wVxz",signUpForm:"RegisterCreator_signUpForm__21b3v",signUpFormFooter:"RegisterCreator_signUpFormFooter__2bDrl",signUpRoot:"RegisterCreator_signUpRoot__TUPgD",registerCreatorSkillsCard:"RegisterCreator_registerCreatorSkillsCard__3WYFk",signupForm:"RegisterCreator_signupForm__1QU8l",alertMessage:"RegisterCreator_alertMessage__2edkQ",signupFormTitle:"RegisterCreator_signupFormTitle__36TuX",signupFormSubtitle:"RegisterCreator_signupFormSubtitle__V6pBg",signupFormField:"RegisterCreator_signupFormField__2QC0b",skillFormItem:"RegisterCreator_skillFormItem__10x2u",selectSkillRow:"RegisterCreator_selectSkillRow__2sLem",selectSkillInput:"RegisterCreator_selectSkillInput__2-wiZ",signupFormHalfSizeField:"RegisterCreator_signupFormHalfSizeField__26OaX",signupFormCard:"RegisterCreator_signupFormCard__NFfaT",submitButton:"RegisterCreator_submitButton__JbwbJ",redirectButton:"RegisterCreator_redirectButton__1tD66",headerImage:"RegisterCreator_headerImage__1Ve1a",signupFormRow:"RegisterCreator_signupFormRow__1gbwE",signupFormColumn:"RegisterCreator_signupFormColumn__21cj1",signupViewGridArea:"RegisterCreator_signupViewGridArea__1eSbK",signupViewGridRow:"RegisterCreator_signupViewGridRow__OIM2h",navbarContainer:"RegisterCreator_navbarContainer__2_2cf",signupViewLeftSideContent:"RegisterCreator_signupViewLeftSideContent__1DZ8I",signupViewRightSideContent:"RegisterCreator_signupViewRightSideContent__1Qsvm",signUpFooter:"RegisterCreator_signUpFooter__3OWjW",submitSignupFormButton:"RegisterCreator_submitSignupFormButton__3Va2a",divResumeUpload:"RegisterCreator_divResumeUpload__1Friq",formCardTitle:"RegisterCreator_formCardTitle__d-AcB",formCardSubTitle:"RegisterCreator_formCardSubTitle__uQDUQ",alreadyHaveAccountText:"RegisterCreator_alreadyHaveAccountText__2X5sa"}}}]);
//# sourceMappingURL=47.5df977c0.chunk.js.map