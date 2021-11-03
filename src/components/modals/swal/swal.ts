import store from "@/store";
import Swal from "sweetalert2/dist/sweetalert2.min.js";


// modal swal untuk login success atau error
const SwalModals =  {
  SwalLoginSuccess ()
  { Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        width: 280,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
    })
  },
  SwalLoginError ()
  {
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
  }
}

export default SwalModals;