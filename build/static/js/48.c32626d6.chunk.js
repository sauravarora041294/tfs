(this.webpackJsonplms=this.webpackJsonplms||[]).push([[48],{1043:function(e,t,r){e.exports={thirdPartyAuthContainer:"RegisterEmployee_thirdPartyAuthContainer__39mFO",formWrapper:"RegisterEmployee_formWrapper__1VWUv",signUpForm:"RegisterEmployee_signUpForm__A4WzD",signUpFormFooter:"RegisterEmployee_signUpFormFooter__2WO5A",signUpRoot:"RegisterEmployee_signUpRoot__1M4xM",registerCreatorSkillsCard:"RegisterEmployee_registerCreatorSkillsCard__3XY2s",signupForm:"RegisterEmployee_signupForm__L67_q",alertMessage:"RegisterEmployee_alertMessage__24tv1",signupFormTitle:"RegisterEmployee_signupFormTitle__AU3bs",signupFormSubtitle:"RegisterEmployee_signupFormSubtitle__1tXUi",signupFormField:"RegisterEmployee_signupFormField__1qznQ",skillFormItem:"RegisterEmployee_skillFormItem__3utpm",selectSkillRow:"RegisterEmployee_selectSkillRow__rWMrQ",selectSkillInput:"RegisterEmployee_selectSkillInput__2DUg0",signupFormHalfSizeField:"RegisterEmployee_signupFormHalfSizeField__2U7E7",signupFormCard:"RegisterEmployee_signupFormCard__2sREQ",submitButton:"RegisterEmployee_submitButton__1jOmT",redirectButton:"RegisterEmployee_redirectButton__qtLFn",headerImage:"RegisterEmployee_headerImage__3qG1g",signupFormRow:"RegisterEmployee_signupFormRow__1B9R0",signupFormColumn:"RegisterEmployee_signupFormColumn__1sozz",signupViewGridArea:"RegisterEmployee_signupViewGridArea__CMQqS",signupViewGridRow:"RegisterEmployee_signupViewGridRow__3Gv1u",navbarContainer:"RegisterEmployee_navbarContainer__1SkqL",signupViewLeftSideContent:"RegisterEmployee_signupViewLeftSideContent__3ICC0",signupViewRightSideContent:"RegisterEmployee_signupViewRightSideContent__1lT-5",signUpFooter:"RegisterEmployee_signUpFooter__3eYVl",submitSignupFormButton:"RegisterEmployee_submitSignupFormButton__iNbJt",divResumeUpload:"RegisterEmployee_divResumeUpload__18cFR",formCardTitle:"RegisterEmployee_formCardTitle__3_wBt",formCardSubTitle:"RegisterEmployee_formCardSubTitle__2RiKw",alreadyHaveAccountText:"RegisterEmployee_alreadyHaveAccountText__1OmCx"}},1079:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return W}));var a,n=r(15),i=r(35),o=r(0),s=r.n(o),l=r(6),m=r(1),u=r.n(m),c=r(11),p=r(4),_=r(651),g=r(19),d=r(1064),E=r(685),f=r(99),S=r(721),F=r.n(S),R=r(722),y=r.n(R),h=r(1043),b=r.n(h),I=r(725),O=r(650),w=r(727),v=r(539),C={height:"14px",width:"14px"},N=function(){return s.a.createElement("img",{style:C,src:F.a})},U=function(){return s.a.createElement("img",{style:C,src:y.a})},M=function(e,t){var r=Object(l.g)(),a=s.a.useRef();s.a.useImperativeHandle(t,(function(){return{}}));var n=s.a.useMemo((function(){return e.detailsFormError&&s.a.createElement(_.a,{className:b.a.alertMessage,message:"Registration Failed",description:e.detailsFormError.message,type:"error"})}),[]);return s.a.createElement("div",{className:b.a.signUpRoot},s.a.createElement(I.a,null),s.a.createElement("div",{className:b.a.formWrapper},s.a.createElement("div",{className:b.a.signUpForm},s.a.createElement("div",{className:"backButton",onClick:function(){return r.goBack()}},s.a.createElement(g.a,{type:"arrow-left"})," \xa0 Back"," "),s.a.createElement("div",{className:b.a.formCardTitle},"Sign Up as an Employee"),s.a.createElement("div",{className:b.a.formCardSubTitle},"Sign in with your email and password"),s.a.createElement(d.a,{ref:a,onSubmit:function(t){t.preventDefault(),e.signupWithEmailAndPassword()}},s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("firstName",{rules:[{required:!0,message:"Please provide your first name.",whitespace:!0}],initialValue:e.formData.firstName})(s.a.createElement(v.a,{placeholder:"First Name",autoComplete:"given-name"}))),s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("lastName",{rules:[{required:!0,message:"Please provide your last name.",whitespace:!0}],initialValue:e.formData.lastName})(s.a.createElement(v.a,{placeholder:"Last Name",autoComplete:"last-name"}))),s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("email",{rules:[{required:!0,message:"Please provide your email address.",whitespace:!0}],initialValue:e.formData.email})(s.a.createElement(v.a,{placeholder:"Email",type:"email",autoComplete:"username"}))),s.a.createElement(d.a.Item,null,e.form.getFieldDecorator("password",{rules:[{required:!0,message:"Please provide a password of at least 6 characters.",whitespace:!0,min:6}],initialValue:e.formData.password})(s.a.createElement(v.a,{placeholder:"Password",type:"password",autoComplete:"new-password"}))),n,s.a.createElement(d.a.Item,null,s.a.createElement(O.a,{type:"primary",loading:e.isSubmittingForm},"Create Your Account"))),s.a.createElement(E.a,null,"OR"),s.a.createElement("div",{className:"".concat(b.a.thirdPartyAuthContainer," loginPageAuthContainer")},s.a.createElement(w.a,{onClick:e.continueWithGoogle},s.a.createElement(g.a,{component:N}),"Sign In with Google"),s.a.createElement(w.a,{onClick:e.continueWithFacebook},s.a.createElement(g.a,{component:U}),"Sign In with Facebook")),s.a.createElement("div",{className:b.a.signUpFormFooter},s.a.createElement("div",{className:b.a.alreadyHaveAccountText},"Already have an Employee account? ",s.a.createElement(f.b,{to:"/login-employee?redirect=".concat(new URLSearchParams(window.location.search).get("redirect")||"")},"Login"))))))},D=r(79),A=r(648),k={email:"",password:"",firstName:"",lastName:""};!function(e){e.BEGIN_FORM_SUBMISSION="BEGIN_FORM_SUBMISSION",e.FINISHED_FORM_SUBMISSION_WITH_ERROR="FINISHED_FORM_SUBMISSION_WITH_ERROR",e.FINISHED_FORM_SUBMISSION_SUCCESSFULLY="FINISHED_FORM_SUBMISSION_SUCCESSFULLY",e.SET_FORM_DATA="SET_FORM_DATA"}(a||(a={}));var B=function(e){return Object(c.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!1,formData:k,formSubmissionError:null})},j=function(e,t){switch(t.type){case a.SET_FORM_DATA:return Object(c.a)({},e,{formData:Object(c.a)({},e.formData,{},t.formData)});case a.BEGIN_FORM_SUBMISSION:return Object(c.a)({},e,{isSubmittingForm:!0});case a.FINISHED_FORM_SUBMISSION_SUCCESSFULLY:return Object(c.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!0});case a.FINISHED_FORM_SUBMISSION_WITH_ERROR:return Object(c.a)({},e,{isSubmittingForm:!1,successfullySubmittedForm:!1,formSubmissionError:t.formSubmissionError});default:return e}},T=r(29),x=r(9),L=Object(x.a)(l.h)((function(e){var t=s.a.useReducer(j,{},B),r=Object(n.a)(t,2),i=r[0],o=r[1],l=function(){var t=Object(p.a)(u.a.mark((function t(){var r,a;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D.d.Auth.handleThirdPartyEmployeeSignInRedirect();case 2:(r=t.sent).savedUser&&(a=Object(D.e)("/creator-payouts"),e.history.push(a)),r.error&&A.a.error({message:"Problem Signing Up",description:"An error occurred while trying to sign you up: ".concat(r.error),placement:"bottomRight"});case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();s.a.useEffect((function(){l()}),[]);var m=s.a.useRef(),c=d.a.create({name:"employeeSignupForm"})(s.a.forwardRef(Object(D.a)(M))),_=function(){var t=Object(p.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:m.current.validateFieldsAndScroll(function(){var t=Object(p.a)(u.a.mark((function t(r,n){var i;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r){t.next=7;break}return o({type:a.SET_FORM_DATA,formData:n}),o({type:a.BEGIN_FORM_SUBMISSION}),t.next=5,D.d.Auth.registerEmployeeWithEmailAndPassword(n.email,n.password,n.firstName,n.lastName);case 5:(i=t.sent).error?o({type:a.FINISHED_FORM_SUBMISSION_WITH_ERROR,formSubmissionError:i.error}):(o({type:a.FINISHED_FORM_SUBMISSION_SUCCESSFULLY}),e.history.push("/creator-payouts"));case 7:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),g=function(){var e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.d)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.e)();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(c,{ref:m,signupWithEmailAndPassword:_,continueWithGoogle:E,continueWithFacebook:g,detailsFormError:i.formSubmissionError,isSubmittingForm:i.isSubmittingForm,formData:i.formData}))})),H=r(146),W=function(e){var t=s.a.useContext(i.a),r=Object(n.a)(t,1)[0],a=function(e,t,r){var a=s.a.useState({isLoading:!0,error:null}),i=Object(n.a)(a,2),o=i[0],l=i[1],m=function(){var t=Object(p.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e)try{l(Object(c.a)({},o,{isLoading:!1}))}catch(r){console.log("RouteFetchDataError: ".concat(r)),l(Object(c.a)({},o,{isLoading:!1,error:r}))}else l(Object(c.a)({},o,{isLoading:!1}));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return s.a.useEffect((function(){m()}),[]),o}(r.authUser,e.location.pathname,e.match.params);if(r.authUser&&!r.currentEmployee)return s.a.createElement(H.a,null);if(r.authUser&&r.currentEmployee&&"APPROVED"===r.currentEmployee.employeeStatus){var o=Object(D.e)("/creator-payouts");return s.a.createElement(l.a,{to:o})}return s.a.createElement(L,{error:a.error})}}}]);
//# sourceMappingURL=48.c32626d6.chunk.js.map