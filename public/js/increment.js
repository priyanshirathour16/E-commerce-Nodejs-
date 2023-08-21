// const qunatityIncrement = async (productId) => {
//   const response = await axios({
//     method: "patch",
//     url: `/products/${productId}/increment`,
//     Headers: {
//       "X-Requested-with": "XMLHttpRequest",
//     },
//   });
//   console.log(response);
//   const display = document.querySelector(".decrement-display");
//   // const quantitydisplay = document.querySelector("#display");
//   display.innerText = response.data.cartItem.quantity;
//   // quantitydisplay.innerText = response.data.cartItem.quantity;
// };

// window.document.addEventListener("click", (e) => {
//   const btn = e.target;
//   if (btn.classList.contains("increment-btn")) {
//     const productId = btn.getAttribute("quality-increment");
//     console.log(productId);
//     qunatityIncrement(productId);
//   }
// });
