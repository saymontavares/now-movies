<template>
    <!-- start -->
    <!-- Page header -->
    <div class="bg-success" :style="{ backgroundImage: `url(${require('./assets/images/bg-header.jpg')})` }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div class="py-4 py-lg-6">
              <h1 class="mb-0 text-white display-4" style="text-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important"><i class="bi bi-play-circle mr-3"></i>NOW Filmes</h1>
              <p class="text-white mb-0 lead" style="text-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important">
                Fique ligado nos filmes que estão rolando!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MoviesList/>

    <Footer/>
</template>

<script>
import MoviesList from './components/MoviesList/index'
import Footer from "./components/Footer"

export default {
  name: 'App',
  components: {
    MoviesList,
    Footer
  },
  data() {
    return {
      urlEntradas: process.env.VUE_APP_BASE_URL_ENTRADAS
    }
  },
}
</script>

<style>
  .min-h {
    min-height: 120px;
  }
</style>