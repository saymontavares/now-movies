<template>
    <!-- start -->
    <!-- Page header -->
    <div class="bg-success" :style="{ backgroundImage: `url(${require('./assets/images/bg-header.jpg')})` }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div class="py-4 py-lg-6">
              <h1 class="mb-0 text-white display-4" style="text-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important">NOW Filmes</h1>
              <p class="text-white mb-0 lead" style="text-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important">
                Fique ligado nos filmes que estão rolando!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MoviesList :movies="movies"></MoviesList>

    <div class="footer">
        <div class="container">
            <div class="row align-items-center no-gutters border-top py-2">
                <!-- Desc -->
                <div class="col-md-6 col-12">
                    <small>© 2021 Powred by <b>Saymon Tavares</b></small>
                </div>
            </div>
        </div>
    </div>
    <!-- end -->
</template>

<script>
import MoviesList from './components/MoviesList.vue'

export default {
  name: 'App',
  components: {
    MoviesList
  },
  created() {
    this.getMoviesList()
  },
  data() {
    return {
      search: null,
      movies: [],
      urlEntradas: process.env.VUE_APP_BASE_URL_ENTRADAS
    }
  },
  methods: {
    async getMoviesList() {
      try {
        const response = await this.axios.get(`/movie/now_playing?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=pt-BR&page=1`)
        this.movies = response.data.results
      } catch (ex) {
        // eslint-disable-next-line
        console.warn(ex)
      }
    }
  }
}
</script>

<style>
  .min-h {
    min-height: 120px;
  }
</style>