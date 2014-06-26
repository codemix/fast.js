macro (fast-clone) {
  rule {
    $subject as $target ;...
  } => {
    var source = $subject;
    if (!source || typeof source !== 'object') {
      var $target = source;
    }
    else if (Array.isArray(source)) {
      var length = source.length,
          $target = new Array(length),
          i;
      for (i = 0; i < length; i++) {
        $target[i] = source[i];
      }
    }
    else {
      var keys = Object.keys(source),
          length = keys.length,
          $target = {},
          key, i;
      for (i = 0; i < length; i++) {
        key = keys[i];
        $target[key] = source[key];
      }
    }
  }
}

macro (fast-clone-array) {
  rule {
    $subject as $target ;...
  } => {
    var source = $subject,
        length = source.length,
        $target = new Array(length),
        i;
    for (i = 0; i < length; i++) {
      $target[i] = source[i];
    }
  }
}

macro (fast-clone-object) {
  rule {
    $subject as $target ;...
  } => {
    var source = $subject,
        keys = Object.keys(source),
        length = keys.length,
        $target = {},
        key, i;
    for (i = 0; i < length; i++) {
      key = keys[i];
      $target[key] = source[key];
    }
  }
}

export (fast-clone);
export (fast-clone-object);
export (fast-clone-array);

