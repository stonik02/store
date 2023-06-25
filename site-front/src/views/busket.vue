<template >
    <div>
        <router-link to="/register" class="btn btn-primary">Регистрация</router-link>
        <router-link to="/auth" class="btn btn-primary">Авторизация</router-link>
        <router-link to="/" class="btn btn-primary">Главная</router-link>
        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <li v-for="item in busket_items">
                        <div class="col">
                            <div class="card shadow-sm">
                                <router-link :to="`/product/${item.products.id}`">
                                    <img :src="ip + item.products.image" class="bd-placeholder-img card-img-top" width="100%" height="250"
                                        alt="Пример" aria-label="Placeholder: Thumbnail">
                                </router-link>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em" style="text-align: center;">{{ item.products.name }}</text>

                                <div class="card-body">
                                    <p><strong class="card-text" style="text-align: center;">Цена : {{ item.products.price }}</strong></p>
                                    <p><strong class="card-text" style="text-align: center;">Размер : {{ item.sizes.size }}</strong></p>
                                    <p><strong class="card-text" style="text-align: center;">Колличество : {{ item.quantity }}</strong></p>
                                    <!-- <p><strong class="card-text" style="text-align: center;">Общая сумма : {{ item.quantity * item.products.price }}</strong></p> -->
                                    <div class="d-flex justify-content-between align-items-center">

                                    </div>
                                </div>
                            </div>

                        </div>
                    </li>
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
            busket_items: [],
            ip : localStorage.ip
        }
    },
    methods: {

    },
    mounted() {
        axios.get(localStorage.ip + `busket/get/${this.$route.params.id}`).then((response) => {
            this.busket_items = response.data
            console.log(this.busket_items[0].products.name)
        }).catch((e) => {
            console.log(e)
        })
    }

}
</script>
<style lang="">
    
</style>