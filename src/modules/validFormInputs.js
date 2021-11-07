const maskPhone = (input, masked = '+7 (___) ___-__-__') => {

  function mask(event) {
  const keyCode = event.keyCode;
  const template = masked,
    def = template.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");

  let i = 0,
    newValue = template.replace(/[_\d]/g, (a) => {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
  i = newValue.indexOf("_");
  if (i != -1) {
    newValue = newValue.slice(0, i);
  }
  let reg = template.substr(0, this.value.length).replace(/_+/g,
    (a) => {
      return "\\d{1," + a.length + "}";
    }).replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
    this.value = newValue;
  }
  if (event.type == "blur" && this.value.length < 5) {
    this.value = "";
  }

}

input.addEventListener("input", mask);
input.addEventListener("focus", mask);
input.addEventListener("blur", mask);

};

const validFormInputs = () => {
    const forms = document.querySelectorAll('[name="user_form"]');
    forms.forEach((form) => {
      const formPhoneInput = form.querySelector('.form-phone');
      maskPhone(formPhoneInput);
    });
    
    document.addEventListener('input', (event) => {
      const target = event.target;

      if (target.closest('.form-name') || target.placeholder === 'Ваше имя') {
        target.value = target.value.replace(/[^а-яё ]+$/gi, '');
      }
    });

};

export default validFormInputs;