import { clearPage, renderPageTitle } from '../../utils/render';
import { addOneUser } from '../../model/users';
import Navigate from '../Router/Navigate';
import { getRememberMe, setRememberMe } from '../../utils/auths';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterForm();
  eventListenerCheckPasswords();
};

function eventListenerCheckPasswords() {
  const form = document.querySelector('#registerForm');
  const username = document.querySelector('#username');
  const password = document.querySelector('#password');
  const passwordConfirmation = document.querySelector('#passwordConfirmation');
  const span = document.querySelector('.error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isOk = true;

    if (password.value !== passwordConfirmation.value) {
      span.innerHTML = "Passwords don't match";
      span.className = 'alert alert-danger m-5';
      span.role = 'alert';
      isOk = false;
      Navigate('/register');
    }

    if (isOk) {
      const createUser = {
        username: username.value,
        password: password.value,
      };
      await addOneUser(createUser);

      Navigate('/login');
    }
  });
}

function renderRegisterForm() {
  const mainRegister = document.querySelector('main');

  mainRegister.innerHTML = `
  <section class="hero">
    <form id="registerForm" class="form p-5">
      <input type="text" id="name" placeholder="name" required class="form-control mb-3">
      <input type="text" id="firstname" placeholder="firstname" required class="form-control mb-3">
      <input type="email" id="email" placeholder="email" required class="form-control mb-3">
      <input type="text" id="username" placeholder="username" required class="form-control mb-3">
      <input type="password" id="password" placeholder="password" required class="password form-control mb-3">
      <input type="password" id="passwordConfirmation" placeholder="password confirmation" required class="passwordConfirmation form-control mb-3">
      <input type="submit" value="Register" class="btn btn-danger">
    </form>
    <span class="error"></span>
  </section>
  `;

  const formCheckWrapper = document.createElement('div');
  formCheckWrapper.className = 'mb-3 form-check';

  const rememberme = document.createElement('input');
  rememberme.type = 'checkbox';
  rememberme.className = 'form-check-input';
  rememberme.id = 'rememberme';
  const remembered = getRememberMe();
  rememberme.checked = remembered;
  rememberme.addEventListener('click', onCheckboxClicked);

  const checkLabel = document.createElement('label');
  checkLabel.htmlFor = 'rememberme';
  checkLabel.className = 'form-check-label';
  checkLabel.textContent = 'Remember me';

  const form = document.querySelector('#registerForm');
  
  formCheckWrapper.appendChild(rememberme);
  formCheckWrapper.appendChild(checkLabel);

  form.appendChild(formCheckWrapper);
  
}

function onCheckboxClicked(e) {
  setRememberMe(e.target.checked);
}

export default RegisterPage;
