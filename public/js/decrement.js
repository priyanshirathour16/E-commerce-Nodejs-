// const qualityDecrement = async (productId, btn) => {
//   const response = await axios({
//     method: "post",
//     url: `/products/${productId}/decrement`,
//     Headers: {
//       "X-Requested-with": "XMLHttpRequest",
//     },
//   });
//   const display = document.querySelector(".decrement-display");
//   // const quantitydisplay = document.querySelector("#display");
//   display.innerText = response.data.decre.quantity;
//   // quantitydisplay.innerText = response.data.decre.quantity;
// };

// window.document.addEventListener("click", (e) => {
//   const btn = e.target;
//   if (btn.classList.contains("decrement-btn")) {
//     const productId = btn.getAttribute("quality-decrement");
//     qualityDecrement(productId, btn);
//   }
// });
