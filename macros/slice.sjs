macro (fast-slice) {
  rule {
    $source:ident to $to as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = 0; i < $to && i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source to $to as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = 0; i < $to && i < length; i++) {
      $target[i] = reference[i];
    }
  }
  rule {
    $source:ident from $from as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = $from; i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source from $from as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = $from; i < length; i++) {
      $target[i] = reference[i];
    }
  }
  rule {
    $source:ident from $from to $to as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = $from; i < $to && i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source from $from to $to as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = $from; i < $to && i < length; i++) {
      $target[i] = reference[i];
    }
  }
  rule {
    $source:ident as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = 0; i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = 0; i < length; i++) {
      $target[i] = reference[i];
    }
  }
}


export (fast-slice)

