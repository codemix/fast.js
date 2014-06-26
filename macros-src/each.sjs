macro (fast-each) {
  // fast-each [key value] in array { ... }
  rule {
    [ $key:ident $value:ident ] in $in { $body... }
  } => {
    var source = $in,
        length = source.length,
        $key, $value;
    for ($key = 0; $key < length; $key++) {
      $value = source[$key];
      $body...
    }
  }
  // fast-each [value] in array { ... }
  rule {
    [ $value:ident ] in $in { $body... }
  } => {
    var source = $in,
        length = source.length,
        i, $value;
    for (i = 0; i < length; i++) {
      $value = source[i];
      $body...
    }
  }
  // fast-each {key value} in object { ... }
  rule {
    { $key:ident $value:ident } in $in { $body... }
  } => {
    var source = $in,
        keys = Object.keys(source),
        length = keys.length,
        i, $key, $value;
    for (i = 0; i < length; i++) {
      $key = keys[i];
      $value = source[$key];
      $body...
    }
  }
  // fast-each {value} in object { ... }
  rule {
    { $value:ident } in $in { $body... }
  } => {
    var source = $in,
        keys = Object.keys(source),
        length = keys.length,
        i, key, $value;
    for (i = 0; i < length; i++) {
      key = keys[i];
      $value = source[key];
      $body...
    }
  }
}

export (fast-each);

