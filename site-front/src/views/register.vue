<template l>
    <div>
        <router-link to="/register" class="btn btn-primary">Регистрация</router-link>
        <router-link to="/auth" class="btn btn-primary">Авторизация</router-link>
        <router-link to="/" class="btn btn-primary">Главная</router-link>

        <dev v-if="id">
                <router-link :to="`/busket/${id}`" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bucket"
                        viewBox="0 0 16 16" style="
                  width: 50px;
                  height: 50px;
                  
                  justify-content: center;
                  display: flex;
                  align-self: center;">
                        <path
                            d="M2.522 5H2a.5.5 0 0 0-.494.574l1.372 9.149A1.5 1.5 0 0 0 4.36 16h7.278a1.5 1.5 0 0 0 1.483-1.277l1.373-9.149A.5.5 0 0 0 14 5h-.522A5.5 5.5 0 0 0 2.522 5zm1.005 0a4.5 4.5 0 0 1 8.945 0H3.527zm9.892 1-1.286 8.574a.5.5 0 0 1-.494.426H4.36a.5.5 0 0 1-.494-.426L2.58 6h10.838z" />
                    </svg>
                </router-link>
            </dev>

        <div class="form">
            <form class="form2" @submit.prevent="">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <p v-if="emailError">{{ emailError }}</p>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="email" @blur="validateEmail">
                    <div id="emailHelp" class="form-text">Введите свою почту.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <p v-if="passwordError">{{ passwordError }}</p>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password"
                        @blur="validatePassword">
                    <div id="emailHelp" class="form-text">Введите пароль.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">RePassword</label>
                    <p v-if="re_passwordError">{{ re_passwordError }}</p>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="repassword"
                        @blur="validateRePassword">
                    <div id="emailHelp" class="form-text">Повторите пароль.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Имя</label>
                    <p v-if="firstNameError">{{ firstNameError }}</p>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model="firstName"
                        @blur="validateFirstName">
                    <div id="emailHelp" class="form-text">Введите имя.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Фамилия</label>
                    <p v-if="lastNameError">{{ lastNameError }}</p>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model="secondName"
                        @blur="validateLastName">
                    <div id="emailHelp" class="form-text">Введите фамилию.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Username</label>
                    <input type="text" class="form-control" id="exampleInputPassword1" v-model="username">
                    <div id="emailHelp" class="form-text">Введите username.</div>
                </div>

                <button type="submit" class="btn btn-primary" @click="register">Submit</button>
            </form>
        </div>


    </div>
</template>
<script>
import axios from "axios";
export default {

    data() {
        return {
            email: "",
            password: "",
            repassword: "",
            firstName: "",
            secondName: "",
            username: "",
            sucses: "",
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            re_passwordError: "",
            id: localStorage.id
        }
    },
    methods: {
        async register() {
            axios.post(localStorage.ip + 'auth/register', {
                email: this.email,
                password: this.password,
                firstName: this.firstName,
                secondName: this.secondName,
                username: this.username

            }).then((response) => {
                this.sucses = "Подтвердите почту"
                console.log(response)
            }).catch((e) => {
                console.log(e)
            })
        },
        validateEmail() {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(this.email)) {
                this.emailError = "Некорректная почта";
            } else {
                this.emailError = "";
            }
        },
        validatePassword() {
            const passwordRegex =
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            if (!passwordRegex.test(this.password)) {
                this.passwordError =
                    "Пароль должен содержать не менее 8 символов, включая цифры, заглавные и строчные буквы";
            } else {
                this.passwordError = "";
            }
        },
        validateRePassword() {
            if (this.password != this.re_password) {
                this.re_passwordError = "Пароли не совпадают!";
            } else {
                this.re_passwordError = "";
            }
        },
        validateFirstName() {
            const re = /[А-Я][а-я]{1,15}/;
            if (!re.test(this.firstName)) {
                this.firstNameError =
                    "Имя состоит из букв русского алфавита и начинается с заглавной буквы";
            } else {
                this.firstNameError = "";
            }
        },
        validateLastName() {
            const re = /[А-Я][а-я]{1,15}/;
            if (!re.test(this.lastName)) {
                this.lastNameError =
                    "Фамилия состоит из букв русского алфавита и начинается с заглавной буквы";
            } else {
                this.lastNameError = "";
            }
        },
    }

}
</script>
<style>
.form {
    width: 30%;
    height: 30%;
    margin-top: 10%;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>