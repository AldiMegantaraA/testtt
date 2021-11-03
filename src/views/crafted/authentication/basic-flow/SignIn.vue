<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-lg p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h3 class="text-dark mb-3">Login</h3>
        <!--end::Title-->
      </div>
      <!--begin::Heading-->

      <!-- begin::Toast Email atau Password salah -->
      <div class="toast w-100 bg-KP-danger-400-base text-white mb-3 px-5" v-if="wrongEmailPass" id="wrongEmailPass" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <div><i class="fas fa-exclamation-triangle text-white"></i> Email atau password salah</div>
          <button type="button" @click="hideToastOne" class="bg-transparent border-0" data-bs-dismiss="toast" aria-label="Close"><i class="fas fa-times text-white"></i></button>
        </div>
      </div>
      <!-- end::Toast Email atau Password salah -->

      <!-- begin::Akun dengan email tersebut tidak tersedia -->
      <div class="toast w-100 bg-KP-danger-400-base text-white mb-3 px-5" v-if="noUser" id="noUser" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <div><i class="fas fa-exclamation-triangle text-white"></i> Akun dengan email tersebut tidak tersedia</div>
          <button type="button" @click="hideToastTwo" class="bg-transparent border-0" data-bs-dismiss="toast" aria-label="Close"><i class="fas fa-times text-white"></i></button>
        </div>
      </div>
      <!-- end::Akun dengan email tersebut tidak tersedia -->

      <!-- begin::Jaringan anda sedang bermasalah -->
      <div class="toast w-100 bg-KP-warning-600-primary text-white mb-3 px-5" v-if="errorNetwork" id="errorNetwork" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex flex-row justify-content-between align-items-center">
          <div><i class="fas fa-exclamation-circle text-white"></i> Jaringan anda sedang bermasalah</div>
          <button type="button" @click="hideToastThree" class="bg-transparent border-0" data-bs-dismiss="toast" aria-label="Close"><i class="fas fa-times text-white"></i></button>
        </div>
      </div>
      <!-- end::Jaringan anda sedang bermasalah -->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid border border-2 bg-white"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email"><i class="fas fa-exclamation-triangle text-danger"> Silahkan gunakan email dengan format yang benar</i></ErrorMessage>
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0"
            >Password</label
          >
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bolder">
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid border border-2 bg-white"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-KP-Yellow-Primary-900 w-100 mb-5"
        >
          <span class="indicator-label text-white"> {{ translate("signIn") }} </span>

          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        <!--begin::Separator-->
        <div class="text-center fw-bolder mb-5">
          Atau
        </div>
        <!--end::Separator-->

        <!--begin::Google link-->
        <a
          href="#"
          class="btn btn-flex flex-center text-uppercase btn-light btn-lg w-100 mb-5"
        >
          <img
            alt="Logo"
            src="media/svg/brand-logos/google-icon.svg?version=1.0"
            class="h-20px me-3"
          />
          Masuk dengan Google
        </a>
        <!--end::Google link-->

      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    // Close Toast Error Message
    const hideToastOne = () => {
      document.getElementById('wrongEmailPass')?.remove();
    }
    const hideToastTwo = () => {
      document.getElementById('noUser')?.remove();
    }
    const hideToastThree = () => {
      document.getElementById('errorNetwork')?.remove();
    }

    // Toast 
    let noUser = false;

    const store = useStore();
    const router = useRouter();
    const { t, te } = useI18n();

    const submitButton = ref<HTMLElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    //Form submit function
    const onSubmitLogin = (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      // Disable button login submit
      document.getElementById('kt_sign_in_submit')?.setAttribute("disabled", "disabled")

      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Dummy delay
      setTimeout(() => {
        // Send login request
        store
          .dispatch(Actions.LOGIN, values)
          .then(() => {
            Swal.fire({
              text: "All is cool! Now you submit this form",
              icon: "success",
              width: 280,
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            }).then(function () {
              // Go to page after successfully login
              router.push({ name: "dashboard" });
            });
          })
          .catch(() => {
            Swal.fire({
              text: store.getters.getErrors,
              icon: "error",
              width: 280,
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            })
            .then(() => {
              noUser = true;
            })
            .then(function (){
              // Enable button login submit
              document.getElementById('kt_sign_in_submit')?.removeAttribute("disabled");
            });
          });

        //Deactivate indicator
        submitButton.value?.removeAttribute("data-kt-indicator");
      }, 2000);
    };

    return {
      onSubmitLogin,
      login,
      submitButton,
      translate,
      hideToastOne,
      hideToastTwo,
      hideToastThree,
      noUser
    };
  },
});
</script>

<style lang="scss">
.toast{
  opacity: 1 !important;
}
</style>
