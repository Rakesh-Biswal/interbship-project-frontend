customElements.get("product-form")||customElements.define("product-form",class extends HTMLElement{constructor(){super(),this.form=this.querySelector("form"),this.form.querySelector("[name=id]").disabled=!1,this.form.addEventListener("submit",this.onSubmitHandler.bind(this)),this.cart=document.querySelector("cart-notification")||document.querySelector("cart-drawer"),this.submitButton=this.querySelector('[type="submit"]'),document.querySelector("cart-drawer")&&this.submitButton.setAttribute("aria-haspopup","dialog"),this.hideErrors=this.dataset.hideErrors==="true"}onSubmitHandler(evt){if(evt.preventDefault(),this.submitButton.getAttribute("aria-disabled")==="true")return;this.handleErrorMessage(),this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.classList.add("loading"),this.querySelector(".loading__spinner").classList.remove("hidden");const config=fetchConfig("javascript");config.headers["X-Requested-With"]="XMLHttpRequest",delete config.headers["Content-Type"];const formData=new FormData(this.form);this.cart&&(formData.append("sections",this.cart.getSectionsToRender().map(section=>section.id)),formData.append("sections_url",window.location.pathname),this.cart.setActiveElement(document.activeElement)),config.body=formData,fetch(`${routes.cart_add_url}`,config).then(response=>response.json()).then(response=>{if(response.status){publish(PUB_SUB_EVENTS.cartError,{source:"product-form",productVariantId:formData.get("id"),errors:response.errors||response.description,message:response.message}),this.handleErrorMessage(response.description);const soldOutMessage=this.submitButton.querySelector(".sold-out-message");if(!soldOutMessage)return;this.submitButton.setAttribute("aria-disabled",!0),this.submitButton.querySelector("span").classList.add("hidden"),soldOutMessage.classList.remove("hidden"),this.error=!0;return}else if(!this.cart){window.location=window.routes.cart_url;return}this.error||publish(PUB_SUB_EVENTS.cartUpdate,{source:"product-form",productVariantId:formData.get("id"),cartData:response}),this.error=!1;const quickAddModal=this.closest("quick-add-modal");quickAddModal?(document.body.addEventListener("modalClosed",()=>{setTimeout(()=>{this.cart.renderContents(response)})},{once:!0}),quickAddModal.hide(!0)):this.cart.renderContents(response)}).catch(e=>{console.error(e)}).finally(()=>{this.submitButton.classList.remove("loading"),this.cart&&this.cart.classList.contains("is-empty")&&this.cart.classList.remove("is-empty"),this.error||this.submitButton.removeAttribute("aria-disabled"),this.querySelector(".loading__spinner").classList.add("hidden")})}handleErrorMessage(errorMessage=!1){this.hideErrors||(this.errorMessageWrapper=this.errorMessageWrapper||this.querySelector(".product-form__error-message-wrapper"),this.errorMessageWrapper&&(this.errorMessage=this.errorMessage||this.errorMessageWrapper.querySelector(".product-form__error-message"),this.errorMessageWrapper.toggleAttribute("hidden",!errorMessage),errorMessage&&(this.errorMessage.textContent=errorMessage)))}});
//# sourceMappingURL=/cdn/shop/t/6/assets/product-form.js.map?v=133081758708377679181708935550
