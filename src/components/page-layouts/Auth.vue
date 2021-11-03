<template>
  <div
    class="
      signin
      flex-row-fluid
      justify-content-between
      align-items-between
      position-x-center
      bg-white
      bgi-no-repeat bgi-size-contain bgi-attachment-fixed
    "
  >
    <!--begin::Content-->
    <div class="d-flex flex-start flex-column flex-column-fluid p-10 pb-lg-20 background-signin">
      <!--begin::Logo-->
      <a href="#" class="mb-12">
        <img alt="Logo" src="media/logos/logo-kp2.png?version=1.0" class="h-45px" />
      </a>
      <!--end::Logo-->

    </div>
    <div class="d-flex align-self-center flex-column flex-column-fluid p-10 pb-lg-20">
      <router-view></router-view>
    </div>
    <!--end::Content-->

    <!-- begin::Footer-->
    <!-- <div class="d-flex flex-center flex-column-auto p-10">
      <div class="d-flex align-items-center fw-bold fs-6">
        <a href="#" class="text-muted text-hover-primary px-2">About</a>

        <a href="#" class="text-muted text-hover-primary px-2">Contact</a>

        <a href="#" class="text-muted text-hover-primary px-2">Contact Us</a>
      </div>
    </div> -->
    <!--end::Footer -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "auth",
  components: {},
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(Actions.ADD_BODY_CLASSNAME, "bg-body");
    });

    onUnmounted(() => {
      store.dispatch(Actions.REMOVE_BODY_CLASSNAME, "bg-body");
    });
  },
});
</script>


<style lang="scss">
@media screen and (min-width: 768px) {
  .signin{
    display: flex;
    flex-direction: row;
  }

  .background-signin{
    background-image: url('/media/svg/Mask Group.png?version=1.0');
    background-color: #1C314A;
    background-repeat: no-repeat;
    background-size: cover;
    width: 5%;
  }
}
</style>