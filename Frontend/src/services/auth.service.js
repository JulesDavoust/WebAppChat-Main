import router from "../router";

const API_URL = "http://localhost:8080/api/";


class AuthService {
  async login(user) {
    if (!this.isLogged()){
      await fetch(API_URL + 'signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            localStorage.setItem("user", JSON.stringify(data));
            router.push({ name: 'home' });
          } else {
            const errorDisplay = document.getElementsByClassName('errorMessage')[0];
            errorDisplay.textContent = data.message;
            errorDisplay.classList.remove('hide');
          }
      });
    }
  }

  async register(user, isLoggedDisplay) {
    if (!this.isLogged()){
      await fetch(API_URL + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Registered") {
            this.login({ email: user.emailUser, password: user.passwordUser })
              .then(data => isLoggedDisplay.value = this.isLogged());
          } else {
            const errorDisplay = document.getElementsByClassName('errorMessage')[1];
            errorDisplay.textContent = data.message;
            errorDisplay.classList.remove('hide');
          }
      });

    }
  }

  logout () {
    localStorage.removeItem("user");
  }

  authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

  isLogged() {
    return JSON.parse(localStorage.getItem("user")) ? true : false;
  }

  async isAdmin() {
    var isAdmin;
    await fetch(API_URL + 'users/admin', { headers : this.authHeader() })
      .then(response => response.json())
      .then(data => {
        isAdmin = data;
    });
    return isAdmin;
  }
}

export default new AuthService();
