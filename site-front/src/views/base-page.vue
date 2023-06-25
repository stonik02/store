<template >
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


        <div class="album py-5 bg-light">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <li v-for="{ image, name, description, id } in categories" :key="name">
                        <div class="col">
                            <div class="card shadow-sm">
                                <router-link :to="`/category/${id}`">
                                    <img :src="ip + image" class="bd-placeholder-img card-img-top" width="100%" height="270"
                                        alt="Пример" aria-label="Placeholder: Thumbnail">
                                </router-link>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em" style="text-align: center;">{{ name }}</text>

                                <div class="card-body">
                                    <p class="card-text" style="text-align: center;">{{ description }}</p>
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
            categories: [],
            ip: localStorage.ip,
            id: localStorage.id
        }
    },
    methods: {

    },
    mounted() {
        axios.get(localStorage.ip + 'categories').then((response) => {
            this.categories = response.data
            console.log(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }
}
</script>
<!-- <style >
.image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.image-list li {
    max-width: 33%;
    padding: 10px;
    box-sizing: border-box;
}

.rounded {
    width: 100%;
    height: auto;
    max-width: 300px;
    max-height: 300px;
}</style> -->

<style>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>