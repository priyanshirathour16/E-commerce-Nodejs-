async function likeButton(productId, btn) {
  try {
    const response = await axios({
      method: "post",
      url: `/products/${productId}/like`,
      Headers: {
        "X-Requested-with": "XMLHttpRequest",
      },
    });
    if (btn.classList.contains("fa-regular")) {
      btn.classList.remove("fa-regular");
      btn.classList.add("fa-solid");
    } else {
      btn.classList.remove("fa-solid");
      btn.classList.add("fa-regular");
    }
  } catch (e) {
    window.location.replace("/login");
  }
}

window.document.addEventListener("click", (e) => {
  const btn = e.target;
  if (btn.classList.contains("product-like-btn")) {
    const productId = btn.getAttribute("product-like");
    // console.log(productID);
    likeButton(productId, btn);
  }
});
