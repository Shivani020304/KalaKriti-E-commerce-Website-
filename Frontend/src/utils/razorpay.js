export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiatePayment = async ({ amount, name, email, phone, orderId }) => {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
  }

  const key = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_XXXXXXXXXXXXXXXX';

  return new Promise((resolve, reject) => {
    const options = {
      key,
      amount: amount * 100,
      currency: 'INR',
      name: import.meta.env.VITE_SHOP_NAME || 'KalaKriti',
      description: `Order #${orderId}`,
      order_id: undefined,
      handler: function (response) {
        resolve({
          paymentId: response.razorpay_payment_id,
          orderId: orderId,
          signature: response.razorpay_signature || 'demo_signature',
        });
      },
      prefill: {
        name,
        email,
        contact: phone,
      },
      theme: {
        color: '#2D6A4F',
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled by user.'));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      reject(new Error(response.error.description || 'Payment failed. Please try again.'));
    });
    rzp.open();
  });
};
