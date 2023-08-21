async function makeOrder(amount, id) {
  try {
    const response = await axios({
      method: "POST",
      url: "/order",
      data: {
        amount,
        id,
      },
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const { order } = response.data;

    var options = {
      key: "rzp_test_Ih16DsEx3siIS7",
      amount: order.amount,
      currency: "INR",
      name: "E-commerce",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      callback_url: "http://localhost:3000/payment-verify",
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (err) {
    console.log(err);
    window.location.replace("/login");
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  const checBtn = document.getElementById("check-btn");

  checBtn.addEventListener("click", () => {
    const amount = document.querySelector("#total-price").innerText;
    const productData = document.querySelectorAll(".cart-item-product");
    productData.forEach((val) => {
      const id = val.dataset.productid;
      makeOrder(amount, id);
    });
  });
});
