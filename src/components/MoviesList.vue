<template>
    <div class="py-6" style="margin-top: -23px;background: #f5f4f8;z-index: 9999999;width: 79%;margin-left: 11%;border-radius: 8px;box-shadow: 0px -10px 5px #00000021;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-12">
                        <h4 class="mb-3 mb-md-0">Filmes <b>LANÇAMENTOS</b></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row ml-1">
            <div class="row row-cols-1 row-cols-md-4 g-4">
                <div class="col mb-3" v-for="(movie, k) in movies" :key="movie.id">
                    <div class="card h-100">
                        <img :src="`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">{{ movie.title }}</h5>
                            <p class="card-text">{{ `${movie.overview.substring(0, 150)}...` }}</p>
                            <div class="progress mb-3">
                                <div class="progress-bar bg-success" role="progressbar" :style="{ width: `${movie.vote_average * 10}%`}" aria-valuenow="25" :aria-valuemin="movie.vote_average * 10" aria-valuemax="100">{{ `${movie.vote_average * 10}%` }}</div>
                            </div>
                            <div class="row">
                                <div class="col-8">
                                    <div class="d-grid gap-1">
                                        <a :href="`https://www.themoviedb.org/movie/${movie.id}?language=pt-BR`" class="btn btn-primary btn-block" target="_blank">
                                            Ver <i class="bi bi-plus"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-light btn-block" @click="handleClickFavoriteMovie(k)">
                                        <i class="bi bi-heart"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Lançamento: <b>{{ new Date(movie.release_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) }}</b></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        movies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleClickFavoriteMovie(key) {
            console.log(this.movies[key])
        }
    }
}
</script>

<style>

</style>