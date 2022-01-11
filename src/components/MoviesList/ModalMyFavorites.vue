<template>
    <div class="modal fade" id="ModalMyFavorite" tabindex="-1" aria-labelledby="ModalMyFavoriteLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalMyFavoriteLabel"><i class="bi bi-heart mr-2"></i>Meus Filmes Favoritos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x"></i></button>
            </div>
            <div class="modal-body">
                <div class="row" v-show="movies && movies.length > 0">
                    <div class="col-6" v-for="movie in movies" :key="movie.id">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row g-0">
                                <div class="col-sm-12 col-md-4" style="padding: 0">
                                    <img :src="`https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`" class="img-fluid rounded-start" style="width:100%;height:100%">
                                </div>
                                <div class="col-sm-12 col-md-8">
                                    <div class="card-body" style="padding: 0.7rem;">
                                        <h5 class="card-title">{{ movie.title }}</h5>
                                        <p class="card-text"><small class="text-muted">Lançamento: <b>{{ new Date(movie.release_date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) }}</b></small></p>
                                        <div class="row">
                                            <div class="col-8">
                                                <a :href="`https://www.themoviedb.org/movie/${movie.id}?language=pt-BR`" class="btn btn-primary btn-sm btn-block" target="_blank">
                                                    Ver <i class="bi bi-plus"></i>
                                                </a>
                                            </div>

                                            <div class="col-4">
                                                <button class="btn btn-danger btn-sm btn-block" @click="handleClickRemoveMyFavorite(movie)">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row" v-show="!movies || movies.length == 0">
                    <div class="col">
                        <p class="text-muted text-center">Você não tem filmes favoritos!</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        listMovies: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            movies: []
        }
    },
    mounted() {
        document.getElementById('ModalMyFavorite')
                .addEventListener('show.bs.modal', () => {
            this.movies = this.$cookies.get('favorite_movie') == null ? [] : JSON.parse(this.$cookies.get('favorite_movie'))
        })
    },
    methods: {
        handleClickRemoveMyFavorite(movie) {
            let id
            this.movies.find((item, k) => {
                if (item.id == movie.id) {
                    id = k
                }
            })
            this.movies.splice(id, 1)
            this.$cookies.set('favorite_movie', JSON.stringify(this.movies))
            this.listMoviesComp[movie.key].favorite = false
        }
    },
    computed: {
        listMoviesComp() {
            return this.listMovies
        }
    }
}
</script>

<style scoped>
    .btn-close {
        box-sizing: content-box;
        width: 1em;
        height: 1em;
        padding: 0.25em 0.25em;
        color: #000;
        border: 0;
        border-radius: 0.25rem;
        opacity: .5;
        background-color: transparent;
    }
</style>