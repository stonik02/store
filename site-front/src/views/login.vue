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
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        v-model="email">
                    <div id="emailHelp" class="form-text">Введите свою почту.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
                    <div id="emailHelp" class="form-text">Введите пароль.</div>
                </div>


                <button type="submit" class="btn btn-primary" @click="auth">Submit</button>
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
            id: localStorage.id
        }
    },
    methods: {
        async auth() {
            axios.post(localStorage.ip + 'auth/login', {
                email: this.email,
                password: this.password,

            }).then((response) => {
                localStorage.refresh = response.data.jwtRefresh
                axios
                    .get(localStorage.ip + "users/me", {
                        headers: {
                            Authorization: `Bearer ${localStorage.accessToken}`,
                        },
                    })
                    .then((response) => {
                        localStorage.id = response.data.id
                        console.log(response.data.id);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.$router.push("/");
                console.log(response)
            }).catch((e) => {
                console.log(e)
            })
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