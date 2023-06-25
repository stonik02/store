<template>
    <div>
        <div style="padding-bottom: 1%;">
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
        </div>

        <div class="container">
            <div class="row">
                <div class="col-md-11">
                    <div class="card shadow-sm">
                        <img :src="ip + product.image" class="product-image" alt="Пример">
                    </div>
                </div>
                <div class="col-md-6" style="padding-top: 1%;">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text">{{ product.description }}</p>
                            <strong class="card-text">{{ product.price }}</strong>
                            <p>Дополнительное содержимое или описание</p>
                            <div class="card-body">
                                <p> {{ errorQuantity }} </p>
                                <p>{{ errorSize }}</p>
                                <input v-model="quantity" @keypress="isNumber($event)" placeholder="Колличество"
                                    style="width: 10em;">
                            </div>
                            <div class="btn-group">

                                <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Размеры
                                </button>
                                <ul class="dropdown-menu">
                                    <li v-for="{ size, id } in size">
                                    <li><a class="dropdown-item" @click="getSize(id)">{{ size }}</a></li>
                                    </li>

                                </ul>
                                <button type="submit" class="btn btn-primary" @click="createBusket"
                                    style="margin-left: 10em; width: 10em;">В корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
  


<script>
import axios from "axios"
export default {
    data() {
        return {
            product: {},
            id: "sdf",
            size: [],
            mySize: "",
            quantity: 0,
            errorSize: "",
            errorQuantity: "",
            ip: localStorage.ip,
            id: localStorage.id
        }
    },
    methods: {
        isNumber: function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        },

        getSize(size) {
            this.mySize = size
            console.log(this.mySize)
        },

        async createBusket() {
            this.errorSize = ""
            this.errorQuantity = ""
            if (this.mySize == "" && this.quantity == 0) {
                this.errorSize = "Вы не выбрали размер и колличество товара"
                return
            }
            if (this.mySize == "" && this.quantity > 10) {
                this.errorSize = "Вы не выбрали размер и ввели слишком большое колличество товара"
                return
            }
            if (this.mySize == "") {
                this.errorSize = "Вы не выбрали размер"
                return
            }
            if (this.quantity == 0) {
                this.errorQuantity = "Вы не выбрали колличество товара"
                return
            }
            if (this.quantity > 10) {
                this.errorQuantity = "Вы уверены что хотите заказать столько товара?)"
                return
            }



            if (!localStorage.refresh && !localStorage.id) {
                this.id = Math.round((Math.random() * (1000000 - 100000)) + 100000)
                console.log(this.id, "Создал в моменте")
                localStorage.id = this.id
            } else {
                if (!localStorage.refresh && localStorage.id) {
                    this.id = localStorage.id
                    console.log(this.id, "Из localStorage")
                } else {
                    if (localStorage.id) {
                        console.log('Чисто из localstorage')
                    } else {
                        if (localStorage.refresh) {
                            axios
                                .post(localStorage.ip + "token/refresh/", {
                                    refresh: localStorage.getItem("refresh"),
                                })
                                .then((response) => {
                                    console.log(response);
                                    localStorage.accessToken = response.data.access;
                                    axios
                                        .get(localStorage.ip + "users/me", {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.accessToken}`,
                                            },
                                        })
                                        .then((response) => {
                                            this.id = response.data.id
                                            localStorage.id = this.id
                                            console.log(response.data.id);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    }
                }
            }
            const id = this.id

            axios.post(localStorage.ip + `busket/add/${id}`, {
                quantity: this.quantity,
                size: this.mySize,
                product: this.product.id,

            }).then((response) => {
                this.sucses = "Подтвердите почту"
                console.log(response)
            }).catch((e) => {
                console.log(e)
            })
        }

    },
    mounted() {
        axios.get(localStorage.ip + `products/${this.$route.params.id}`).then((response) => {
            this.product = response.data
            this.size = response.data.size
            console.log(this.product)
            console.log(this.size)
        }).catch((e) => {
            console.log(e)
        })
    }

}
</script>
<style lang="">
    
</style>