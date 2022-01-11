<template>
    <div class="py-6" style="margin-top: -23px;background: #f5f4f8;z-index: 9999999;width: 79%;margin-left: 11%;border-radius: 8px;box-shadow: 0px -10px 5px #00000021;">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-sm-6 col-md-10">
                            <h4 class="mb-3 mb-md-0">Filmes <b>LANÇAMENTOS</b></h4>
                        </div>

                        <div class="col-sm-6 col-md-2">
                            <button type="button" class="btn btn-primary btn-block" data-bs-toggle="modal" data-bs-target="#ModalMyFavorite">
                                <i class="bi bi-heart-fill mr-1" style="color: #e35d6a"></i>Meus Favoritos
                            </button>
                        </div>

                        <div class="col-12 mt-2">
                            <div class="form-group has-search">
                                <span class="fa fa-search form-control-feedback"></span>
                                <input type="text" class="form-control" placeholder="Buscar Filmes..." v-model="search">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <transition-group class="row ml-1" name="list" tag="div" enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster">
            <div class="col-sm-12 col-md-3 mb-3" v-for="movie in filterListMovies" :key="movie.id">
                <div class="card bg-dark text-white">
                    <img v-lazy="`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`" class="card-img" :alt="movie.title">
                    <div class="card-img-overlay">
                        <h4 class="card-title" style="color: #f8f9fa">{{ movie.title }}</h4>
                        <p class="card-text">{{ `${movie.overview.substring(0, 150)}...` }}</p>
                        <div class="row row-absolut">
                            <div class="col-12">
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-success" role="progressbar" :style="{ width: `${movie.vote_average * 10}%`}" aria-valuenow="25" :aria-valuemin="movie.vote_average * 10" aria-valuemax="100">{{ `${movie.vote_average * 10}%` }}</div>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="d-grid gap-1">
                                    <a :href="`https://www.themoviedb.org/movie/${movie.id}?language=pt-BR`" class="btn btn-primary btn-block" target="_blank">
                                        Ver <i class="bi bi-plus"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-light btn-block" @click="handleClickFavoriteMovie(movie.key)">
                                    <i :class="{bi: true, 'bi-heart-fill': movie.favorite, 'bi-heart': !movie.favorite}" :style="{color: movie.favorite ? '#e35d6a' : '#18113c'}"></i>
                                </button>
                            </div>
                            <div class="col-12">
                                <small class="card-text">Lançamento: <b>{{ new Date(movie.release_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) }}</b></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </div>

    <ModalMyFavorites :listMovies="movies" />
</template>

<script>
import 'animate.css'
import ModalMyFavorites from "./ModalMyFavorites";

export default {
    components: {
        ModalMyFavorites
    },
    data() {
        return {
            movies: [],
            search: null
        }
    },
    created() {
        this.getMoviesList()
    },
    methods: {
        handleClickFavoriteMovie(key) {
            let movies = this.$cookies.get('favorite_movie') == null ? [] : JSON.parse(this.$cookies.get('favorite_movie'))
            let movie = this.movies[key]
            let check = movies.find(item => {
                return item.id == movie.id
            })

            if (!movie || !movie.favorite) {
                // add
                if (!check) {
                    movies.push({
                        id: movie.id,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                        title: movie.title,
                        key: key
                    })
                    this.$cookies.set('favorite_movie', JSON.stringify(movies))
                    this.movies[key].favorite = true
                }
            } else {
                // remove
                let id
                movies.find((item, k) => {
                    if (item.key == key) {
                        id = k
                    }
                })
                movies.splice(id, 1)
                this.$cookies.set('favorite_movie', JSON.stringify(movies))
                this.movies[key].favorite = false
            }
        },
        async getMoviesList() {
            try {
                const response = await this.axios.get(`/movie/now_playing?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=pt-BR&page=1`)
                this.movies = response.data.results
                let ckMovies = this.$cookies.get('favorite_movie') == null ? [] : JSON.parse(this.$cookies.get('favorite_movie'))
                ckMovies.map(item => this.movies[item.key].favorite = true)
                this.movies.map((item, k) => item.key = k)
            } catch (ex) {
                // eslint-disable-next-line
                console.warn(ex)
            }
        }
    },
    computed: {
        filterListMovies() {
            let search = this.search ? this.search.toLowerCase().trim() : false
            if (!search) return this.movies
            return this.movies.filter(c => ((c.title) ? c.title.toLowerCase().indexOf(search) > -1 : false))
        }
    }
}
</script>

<style scoped>
    .row-absolut {
        bottom: 4%;
        position: absolute;
        right: 7%;
        left: 7%;
    }
    .card-img-overlay {
        background: rgba(0, 0, 0, .6);
        transition: all .7s;
    }
    .card-img-overlay:hover {
        background: rgba(0, 0, 0, .25);
    }
    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        pointer-events: none;
        color: #aaa;
    }
    .has-search .form-control {
        padding-left: 2.375rem;
    }
</style>