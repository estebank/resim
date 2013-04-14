var resim = function(img_class, src_attribute_name) {
  var images;
  if (img_class === undefined) {
    images = document.getElementsByTagName('img');
  } else {
    images = document.getElementsByClassName(img_class)
  }
  var i = 0;
  var img;
  var size = '';
  for (i = 0; i < images.length; i++) {
    img = images[i];
    console.log('Setting responsive URL for ', img);
    size = resim.get_size(img);
    resim.replace_with_correct_src(img, src_attribute_name, size);
  }
  resim.create_cookie('image-size', size);
  return size;
};


resim.default_src_attribute_name = 'src';


resim.create_cookie = function(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toGMTString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}


resim.pixel_size = window.devicePixelRatio || 1;


resim.url_size_placeholder = 'normal';


resim.dynamic_size = function(img) {
  return img.clientWidth * resim.pixel_size + 'x' + img.clientHeight * resim.pixel_size;
};


resim.ratio = {
  '1': 'normal',
  '0.5': 'half',
  '0.25': 'quarter',
  '2': 'double'
};


resim.standard_size = function(img) {
  var _size = {
    'x': img.clientWidth * resim.pixel_size,
    'y': img.clientHeight * resim.pixel_size
  };
  var intended_size = img.getAttribute('data-image-size').split(',');
  var ratio = resim.ratio[_size.x / intended_size[0]];
  if (ratio === undefined) {
    ratio = 'normal';
  }
  return ratio;
};


resim.replace_with_correct_src = function(img, src_attribute_name, size) {
  if (src_attribute_name === undefined) {
    src_attribute_name = resim.default_src_attribute_name;
  }
  var current_src = img.getAttribute(src_attribute_name);
  console.log(current_src, img, src_attribute_name, size);

  img.setAttribute('src', current_src.replace(this.url_size_placeholder, size));

  return img;
};

resim.get_size = resim.standard_size;
