const productImagePath: Record<string, string> = {
  calculator: '/product_img/calculator.png',
  camera: '/product_img/camera.png',
  cctv: '/product_img/cctv.png',
  charger: '/product_img/charger.png',
  engine: '/product_img/engine.png',
  fan: '/product_img/fan.png',
  gamepad: '/product_img/gamepad.png',
  headphone: '/product_img/headphone.png',
  heater: '/product_img/heater.png',
  keyboard: '/product_img/keyboard.png',
  lancable: '/product_img/lancable.png',
  laptop: '/product_img/laptop.png',
  microphone: '/product_img/microphone.png',
  moniter: '/product_img/moniter.png',
  mouse: '/product_img/mouse.png',
  phone: '/product_img/phone.png',
  razor: '/product_img/razor.png',
  sewingmachine: '/product_img/sewingmachine.png',
  speaker: '/product_img/speaker.png',
  usb: '/product_img/usb.png',
  washingmachine: '/product_img/washingmachine.png',
  default: '/product_img/default.png',
};

function productImage(image: string) {
  const imageName = image.toLowerCase();

  if (imageName in productImagePath) {
    return productImagePath[imageName];
  } else {
    return productImagePath.default;
  }
}

export default productImage;
