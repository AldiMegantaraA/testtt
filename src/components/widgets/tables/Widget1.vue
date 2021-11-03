<template>
  <!--begin::Tables Widget 1-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">Tasks Overview</span>

        <span class="text-muted fw-bold fs-7">Pending 10 tasks</span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen024.svg" />
          </span>
        </button>
        <Dropdown1></Dropdown1>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-5">
          <!--begin::Table head-->
          <thead>
            <tr>
              <th class="p-0 w-50px"></th>
              <th class="p-0 min-w-200px"></th>
              <th class="p-0 min-w-100px"></th>
              <th class="p-0 min-w-40px"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <div v-if="loading" class="loader"></div>
            <div v-if="error">Something wrong..</div>
            <div v-if="info">
              <template v-for="(item, index) in info" :key="index">
                <tr v-if="index <= 5">
                  <th>
                    <div class="symbol symbol-50px me-2">
                      <span class="symbol-label">
                        <img
                          src="media/illustrations/dozzy-1/1.png"
                          class="h-50 align-self-center"
                          alt=""
                        />
                      </span>
                    </div>
                  </th>

                  <td>
                    <a
                      href="#"
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >{{ item.title }}</a
                    >
                    <span class="text-muted fw-bold d-block fs-7">{{
                      item.id
                    }}</span>
                  </td>

                  <!-- <td>
                    <div class="d-flex flex-column w-100 me-2">
                      <div class="d-flex flex-stack mb-2">
                        <span class="text-muted me-2 fs-7 fw-bold">
                          {{ item.progress.value }}%
                        </span>
                      </div>

                      <div class="progress h-6px w-100">
                        <div
                          :class="`
                            progress-bar
                            bg-${item.progress.color}
                          `"
                          role="progressbar"
                          :style="`width: ${item.progress.value}%`"
                          :aria-valuenow="item.progress.value"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </td> -->

                  <td class="text-end">
                    <a
                      href="#"
                      class="
                        btn btn-sm btn-icon btn-bg-light btn-active-color-primary
                      "
                    >
                      <span class="svg-icon svg-icon-2">
                        <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                      </span>
                    </a>
                  </td>
                </tr>
              </template>
            </div>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
  </div>
  <!--endW::Tables Widget 1-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";

export default defineComponent({
  name: "kt-widget-1",
  components: {
    Dropdown1,
  },
  props: {
    widgetClasses: String,
  },
  data () {
    return {
      loading: false,
      error: false,
      info: []
    }
  },
  async mounted () {
    this.loading = true;
    try{
      await fetch('http://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => this.info = data)
      this.loading = false
      this.error = false
    } catch (error) {
      console.log(error.message)
      this.loading= false
      this.error = true
    }
  }
});
</script>

<style lang="scss" scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>