<template>
    <!-- Content -->
    <div class="py-6" style="margin-top: -23px;background: #f5f4f8;z-index: 9999999;width: 79%;margin-left: 11%;border-radius: 8px;box-shadow: 0px -10px 5px #00000021;">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="row justify-content-between align-items-center">
              <div class="col-12">
                <h4 class="mb-3 mb-md-0">Eventos <b>ABERTOS</b></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="container">
      <div class="row ml-1">

        <div class="col-xl-4 col-lg-6 col-md-6 col-12" v-for="evento in eventos" :key="evento.id">
          <!-- Card -->
          <div class="card mb-4 card-hover">
            <a :href="evento.id != 9 ? `${urlEntradas}/${evento.id}` : 'https://cursos.satc.edu.br/'" target="_blank">
              <div class="d-flex justify-content-between align-items-center p-4 min-h">
                <div class="d-flex">
                  <!-- Img -->
                  <!-- <img src="../assets/images/path-bootstrap.jpg" alt="" class="avatar-md"> -->
                  <i class="bi bi-broadcast" style="color: rgba(24, 17, 60, .5); font-size: 2rem;"></i>
                  <div class="ml-3">
                    <h4 class="mb-1">
                      {{ evento.nome }}
                    </h4>
                    <p class="mb-0 font-size-xs">
                      <span class="mr-2" v-show="evento.id != 9">
                        <i class="bi bi-calendar-range mr-1 font-weight-medium" style="color: #19cb98"></i>
                        <span class="text-dark">{{ new Date(evento.dt_inicio).toLocaleDateString() }} até {{ new Date(evento.dt_fim).toLocaleDateString() }}</span>
                      </span>
                      <span class="mr-2" v-show="evento.id == 9">
                        <i class="bi bi-link mr-1 font-weight-medium" style="color: #19cb98"></i>
                        <span class="text-dark">Acessar</span>
                      </span>
                      <!-- <span>
                        <i class="bi bi-people mr-1 font-weight-medium" style="color: #19cb98"></i>
                        <span class="text-dark">30</span>
                      </span> -->
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
export default {
    props: {
        eventos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            urlEntradas: process.env.VUE_APP_BASE_URL_ENTRADAS
        }
    }
}
</script>

<style>

</style>